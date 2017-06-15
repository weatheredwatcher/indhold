<?php

namespace Dashboard;

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

class DashboardControllerProvider implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        // creates a new controller based on the default route
        $controllers = $app['controllers_factory'];

        $controllers->match('/', function(Application $app) {

        	if (isset($_POST['Username']) && $_POST['Username'] != ""){

	            $email = $_POST['Username'];
		        $password = $_POST['Password'];
	            $sql = "SELECT id, password FROM users WHERE email = ? limit 1";
	            $results = $app['dbs']['points']->executeQuery($sql, array($email));

	            $user = $results->fetch();
	            $passworddb = $user['password'];
	            $id = $user['id'];

		        if($password == $passworddb){
	                $app['session']->set('user', array('username' => $email, 'id' => $id));
	                $app->redirect('/dashboard');
                } //end password check

            }  //end if isset

            if (null === $user = $app['session']->get('user')) {
             return $app['twig']->render('dashboard/login.twig');
           } else {

              return $app['twig']->render('dashboard/main.twig', array('user' => $user));
           }

        });

                $controllers->match('/logout', function(Application $app) {

                  $app['session']->clear();

                  return $app->redirect('/dashboard');


                });


  return $controllers;
    }
}
