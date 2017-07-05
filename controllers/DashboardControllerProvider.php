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
	            $sql = "SELECT id, password, isAdmin FROM users WHERE email = ? limit 1";
	            $results = $app['dbs']['points']->executeQuery($sql, array($email));
                //@FIXME: set the query to return the complete user object and pass that as an array into the session instead of creating a new one
                //@TODO: Abstract the authentication away from the ControllerServiceProvider
	            $user = $results->fetch();
	            $passworddb = $user['password'];
	            $id = $user['id'];
                $isAdmin = $user['isAdmin'];
		        if($password == $passworddb){
	                $app['session']->set('user', array('username' => $email, 'id' => $id, 'isAdmin' => $isAdmin));
	                $app->redirect($_SERVER['HTTP_REFERER']);
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

                $controllers->get('/users', function (Application $app) {

                      if (null === $user = $app['session']->get('user')) {
                	        return $app->redirect('/dashboard');
                	    }

                		    $sql = "select * from users";
                		   $request = $app['dbs']['points']->fetchAll($sql);
                        error_log(print_r($request, true));
                       return $app['twig']->render('dashboard/users.twig', array('user' => $user, 'users' => $request));



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




        return $app['twig']->render('adduser.twig', array('message' => $message, 'user' => $user));



        });

        $controllers->match('/addscreen', function (Application $app) {

            if (null === $user = $app['session']->get('user')) {
                return $app->redirect('/dashboard');
            }
            $message = "Add Screen";
            if (isset($_POST['submit'])) {

                $uploaddir = '/home/forge/otew.io/current/uploads/'; //getenv('UPLOAD_PATH');
                $uploadfile = $uploaddir . basename($_FILES['screen']['name']);
                $file = $_FILES['screen']['name'];
                $description = $_POST['description'];
                $container = $_POST['container'];
                $order = $_POST['order'];

                move_uploaded_file($_FILES['screen']['tmp_name'], $uploadfile);


                $sql = "insert into leaderboard (description, container, image, orderis) values (?, ?, ?, ?)";
                $app['dbs']['points']->executeQuery($sql, array($description, $container, $file, $order));
                $message = $uploadfile . " Screen Added";

            }

            return $app['twig']->render('addscreen.twig', array('message' => $message, 'user' => $user));



        });


       $controllers->match('/blacklist', function (Application $app){
               	if(isset($_POST['tweet_id'])){
                $tweet_id = $_POST['tweet_id'];
                $sql = "update tweets set allow=false where tweet_id=$tweet_id";
                $app['dbs']['tweets']->executeQuery($sql);

          $statusCode = 200;
          $response = array('status' => 'ok', 'code' => $statusCode, 'message' => 'Success');
          return $app->json((object) $response, $statusCode);
                } 

                return $app->json((object)  array('status' => 'error', 'code' => '200', 'message' => 'Failure'), 200);

       });

        $controllers->match('/whitelist', function (Application $app){
                if(isset($_POST['tweet_id'])){
                  $tweet_id = $_POST['tweet_id'];
                  $sql = "update tweets set allow=true where tweet_id=$tweet_id";
                  $app['dbs']['tweets']->executeQuery($sql);

                  $statusCode = 200;
                  $response = array('status' => 'ok', 'code'=> $statusCode, 'message' => 'Success');
                  return $app->json((object) $response, $statusCode);
                }

                return $app->json((object)  array('status' => 'error', 'code' => '200', 'message' => 'Failure'), 200);

                });

        $controllers->get('/points', function (Application $app) {

              if (null === $user = $app['session']->get('user')) {
                  return $app->redirect('/dashboard');
              }
                $queryBuilder = $app['dbs']['points']->createQueryBuilder();
              $sql = $queryBuilder 
                          ->select('p.id', 'p.team', 'p.points', 'u.email', 'p.source', 'p.timestamp')
                          ->from('points', 'p')
                          ->leftJoin('p', 'users', 'u', 'u.id = p.audit');

              //$sql = "select p.id, p.team, p.points, u.email, p.source, p.timestamp from points p left join users u on u.id=p.audit";
               $request = $app['dbs']['points']->fetchAll($sql);
                error_log(print_r($request, true));
               return $app['twig']->render('dashboard/points.twig', array('user' => $user, 'points' => $request));



        });

        $controllers->get('/tweets', function (Application $app){
          if (null === $user = $app['session']->get('user')) {
                  return $app->redirect('/dashboard');
              }

               $queryBuilder = $app['dbs']['tweets']->createQueryBuilder();
               $sql = $queryBuilder
                          ->select('t.tweet_id, t.tweet_text', 't.created_at', 't.screen_name', 't.name', 'm.media', 't.allow')
                          ->from('tweets', 't')
                          ->leftJoin('t', 'tweet_media', 'm', 't.tweet_id = m.tweet_id');
               $request = $app['dbs']['tweets']->fetchAll($sql);
               return $app['twig']->render('dashboard/tweets.twig', array('user' => $user, 'tweets' => $request));

        });


        $controllers->get('/leaderboard', function (Application $app){
            if (null === $user = $app['session']->get('user')) {
                return $app->redirect('/dashboard');
            }

            $PATH = dirname(__FILE__);

            $sql = "select * from leaderboard";

            $request = $app['dbs']['points']->fetchAll($sql);
            return $app['twig']->render('dashboard/leaderboard.twig', array('user' => $user, 'path' => getenv('IMAGE_PATH'), 'screens' => $request));

        });

        $controllers->match('/turn-off', function (Application $app){
            if(isset($_POST['id'])){
                $id = $_POST['id'];
                $sql = "update leaderboard set active=false where id=$id";
                $app['dbs']['points']->executeQuery($sql);

                $statusCode = 200;
                $response = array('status' => 'ok', 'code' => $statusCode, 'message' => 'Success');
                return $app->json((object) $response, $statusCode);
            }

            return $app->json((object)  array('status' => 'error', 'code' => '200', 'message' => 'Failure'), 200);

        });

        $controllers->match('/turn-on', function (Application $app){
            if(isset($_POST['id'])){
                $id = $_POST['id'];
                $sql = "update leaderboard set active=true where id=$id";
                $app['dbs']['points']->executeQuery($sql);

                $statusCode = 200;
                $response = array('status' => 'ok', 'code'=> $statusCode, 'message' => 'Success');
                return $app->json((object) $response, $statusCode);
            }

            return $app->json((object)  array('status' => 'error', 'code' => '200', 'message' => 'Failure'), 200);

        });

        $controllers->match('/admin', function (Application $app) {

            if (null === $user = $app['session']->get('user')) {
                return $app->redirect('/dashboard');
            }

            return $app['twig']->render('dashboard/admin.twig', array('user' => $user));


        });


        return $controllers;
    }
}
