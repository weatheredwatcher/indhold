<?php

namespace Admin;

/**
*
*  Leaderboard Admin Controller Code
* @author David Duggins <dduggins@opentext.com>
* @cannonical https://github.com/OpenText-DMG/otew-leaderboard
* 
* 
* 
*/

use Silex\Application;
use Silex\Api\ControllerProviderInterface;

class AdminControllerProvider implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        // creates a new controller based on the default route
        $controllers = $app['controllers_factory'];

        $controllers->match('/', function(Application $app) {
   
        	if (isset($_POST['email']) && $_POST['email'] != ""){
		
	            $email = $_POST['email'];
		        $password = $_POST['password'];
	            $sql = "SELECT id, password FROM users WHERE email = ? limit 1";
	            $results = $app['dbs']['points']->executeQuery($sql, array($email));
		
	            $user = $results->fetch();
	            $passworddb = $user['password'];
	            $id = $user['id'];
		  
		        if($password == $passworddb){
	                $app['session']->set('user', array('username' => $email, 'id' => $id));
	                return $app->redirect('/points-app');
                } //end password check
   
            }  //end if isset
               return "Coming Soon!";
               
            //fixme: need to completely refactor the admin section return $app['twig']->render('login.twig');
        });
        
        $controllers->match('/adduser', function (Request $request) use ($app) {
	if (null === $user = $app['session']->get('user')) {
	        return $app->redirect('/admin');
	    }
		$message = "Add User";
		if (isset($_POST['email'])){
			$email = $_POST['email'];
			$password = $_POST['password'];
			
		    $sql = "insert into users (email, password) values (?, ?)";
		   $app['dbs']['points']->executeQuery($sql, array($email, $password));
		  $message = "$email has been added to the tool"; 
		}
			
			
return $app['twig']->render('adduser.twig', array('message' => $message));

	

});

$controllers->match('/login', function (Request $request) use ($app) {
   
    
	
	if (isset($_POST['email']) && $_POST['email'] != ""){
		
	    $email = $_POST['email'];
		$password = $_POST['password'];
	    $sql = "SELECT id, password FROM users WHERE email = ? limit 1";
	    $results = $app['dbs']['points']->executeQuery($sql, array($email));
		
	    $user = $results->fetch();
	    $passworddb = $user['password'];
	    $id = $user['id'];
		if($password == $passworddb){
	    $app['session']->set('user', array('username' => $email, 'id' => $id));
	return $app->redirect('/points-app');
} //end password check
   
}  //end if isset
 return $app['twig']->render('login.twig');
});

$controllers->get('/logout', function () use ($app){


 $app['session']->clear();
 
 return $app->redirect('/login');

});

  return $controllers;
    }
}