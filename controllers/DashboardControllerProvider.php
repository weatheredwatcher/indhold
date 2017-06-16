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
use CustomTraits;

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
	                $app->redirect($_SERVER['HTTP_REFERER']);
                } //end password check

            }  //end if isset

            if (null === $user = $app['session']->get('user')) {
             return $app['twig']->render('dashboard/login.twig');
           } else {

              return $app['twig']->render('dashboard/main.twig', array('user' => $user, 'version' => 'OpenText EW Leaderboard build:' . CustomTraits\ApplicationVersion::get()));
           }

        });

                $controllers->match('/logout', function(Application $app) {

                  $app['session']->clear();

                  return $app->redirect('/dashboard');


                });

                $controllers->get('/users', function (Application $app) {

                      if (null === $user = $app['session']->get('user')) {
                	        return $app->redirect('/dashboard');
                	    }

                		    $sql = "select * from users";
                		   $request = $app['dbs']['points']->fetchAll($sql);
                        error_log(print_r($request, true));
                       return $app['twig']->render('dashboard/users.twig', array('user' => $user, 'users' => $request, 'version' => 'OpenText EW Leaderboard build:' . CustomTraits\ApplicationVersion::get()));



                });

        $controllers->match('/adduser', function (Application $app) {

              if (null === $user = $app['session']->get('user')) {
        	        return $app->redirect('/dashboard');
        	    }
        		  $message = "Add User";
        		  if (isset($_POST['email'])){
        			  $email = $_POST['email'];
        			  $password = $_POST['password'];

        		    $sql = "insert into users (email, password) values (?, ?)";
        		   $app['dbs']['points']->executeQuery($sql, array($email, $password));
        		  $message = "$email has been added to the tool";
        		}




        return $app['twig']->render('adduser.twig', array('message' => $message, 'user' => $user, 'version' => 'OpenText EW Leaderboard build:' . CustomTraits\ApplicationVersion::get()));



        });

        $controllers->get('/points', function (Application $app) {

              if (null === $user = $app['session']->get('user')) {
                  return $app->redirect('/dashboard');
              }

                $sql = "select * from points";
               $request = $app['dbs']['points']->fetchAll($sql);
                error_log(print_r($request, true));
               return $app['twig']->render('dashboard/points.twig', array('user' => $user, 'points' => $request, 'version' => 'OpenText EW Leaderboard build:' . CustomTraits\ApplicationVersion::get()));



        });



  return $controllers;
    }
}
