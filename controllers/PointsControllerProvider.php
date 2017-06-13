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
	       // return $app->redirect('/login');
	       $user = ['id'=> 1, 'username' => 'weatheredwatcher'];
	    }

    return $app['twig']->render('points.twig', array('user' => $user));
});

$controllers->match('postPoints', function () use ($app) {

	if(isset($_POST['points'])){
	$points = $_POST['points'];
	$score = $points[0];
	$team = $points[1];
	$id = $points[2];
	} else {
		$score = $_POST['score'];
		
		switch ($_POST['team']) {
    	
    	    case 'GR':
    	         $team = "green";
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
    	    
    	    case 'OR':
    	        $team = "orange";
    	    break;
		}
				$id    = 99;
	}
    $sql = "insert into points (team, points, audit) values (?, ?, ?)";
   $app['dbs']['points']->executeQuery($sql, array($team, $score, $id));
	
   $statusCode = 200;
          $response = array('status' => 'ok', 'code' => $statusCode, 'message' => 'Points Awarded.');
          return $app->json((object) $response, $statusCode);

});
        

        return $controllers;
    }
}