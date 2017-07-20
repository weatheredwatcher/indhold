<?php

//
/**
*
*  Leaderboard Points App Code
* @author David Duggins <dduggins@opentext.com>
* @cannonical https://github.com/OpenText-DMG/otew-leaderboard
*
*
*
*/

namespace Points;

use Silex\Application;
use Silex\Api\ControllerProviderInterface;

class PointsControllerProvider implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        // creates a new controller based on the default route
        $controllers = $app['controllers_factory'];

       $controllers->get('/', function () use ($app) {

	if (null === $user = $app['session']->get('user')) {
	       return $app->redirect('login');

	    }

    return $app['twig']->render('points/points.twig', array('user' => $user));
});

    $controllers->match('postPoints', function () use ($app) {

	    if(isset($_POST['points'])){
	    $points = $_POST['points'];
	    $score = $points[0];
	    $team = $points[1];
        $id = $points[2];
        $source = "PointsApp";}
        else {
		    $score = $_POST['score'];
		    switch ($_POST['team']) {

    	        case 'GR':
    	             $team = "grey";
    	        break;

    	        case 'TL':
    	             $team = "teal";
    	        break;

        	    case 'BL':
        	         $team = "blue";
    	        break;

        		case 'PL':
        	         $team = "purple";
    	        break;

    	        case 'RD':
    	            $team = "red";
    	        break;
		    }
				$id    = 99;
                $source = "Arcade";
        }
    $sql = "insert into points (team, points, audit, source) values (?, ?, ?, ?)";
  $app['dbs']['points']->executeQuery($sql, array($team, $score, $id, $source));

   $statusCode = 200;
          $response = array('status' => 'ok', 'code' => $statusCode, 'message' => 'Points Awarded.');
          return $app->json((object) $response, $statusCode);

});

    $controllers->match('/login', function () use ($app){

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
            return $app['twig']->render('points/login.twig');
        } else {

            return $app->redirect('/points');
                    }


    });

    $controllers->match('/delete', function () use ($app){

        if(isset($_POST['token'])){

            if($_POST['token'] == "otew17"){

                $id = $_POST['id'];
                $sql= "DELETE from points where id= ?";
                $app['dbs']['points']->executeQuery($sql, array($id));
                $message = "Success: Deleted points ID:" . $id;
            } else {

                $message = "Failed: Wrong token";
            }

        } else {

            $message = "Failed: Something went wrong";
        }

        $statusCode = 200;
        $response = array('status' => 'ok', 'code' => $statusCode, 'message' => $message);
        return $app->json((object) $response, $statusCode);

    });

        return $controllers;
    }
}
