<?php

namespace EnterpriseWorld;

// web/index.php
require_once __DIR__.'/vendor/autoload.php';
date_default_timezone_set('America/New_York');

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

//use Symfony\Component\Debug\ErrorHandler;
//use Symfony\Component\Debug\ExceptionHandler;
ini_set('display_errors', 1);
error_reporting(-1);

//ExceptionHandler::register();
//ErrorHandler::register();

class ewApp extends Application {
	
	
}

$app = new ewApp(); //Silex\Application();


//load the Services (Database, Twig etc.)
require_once __DIR__.'/config/register.php';
//load the controllers:
//todo: create logic to loop controllers
require_once __DIR__.'/controllers/LeaderboardController.php';
use Leaderboard;

$app['debug'] = true;  //set to true to turn on debugging, otherwise error messages are user friendly

$app->get('/', function() use($app) {

  return "Home Page";
});

$app->mount('/leaderboard', new Leaderboard\LeaderboardControllerProvider());

$app->match('/admin', function (Request $request) use ($app) {
   
	if (null === $user = $app['session']->get('user')) {
	        return $app['twig']->render('login.twig');
	    }
	
	if (isset($_POST['email'])){
		
	    $email = $_POST['email'];
		$password = $_POST['password'];
	    $sql = "SELECT id, password FROM users WHERE email = ? limit 1";
	    $results = $app['dbs']['points']->executeQuery($sql, array($email));
		
	    $user = $results->fetch();
	    $passworddb = $user['password'];
	    $id = $user['id'];
		if($password == $passworddb){
	    
}
   
}
$app['session']->set('user', array('username' => $email, 'id' => $id));
$users = "SELECT * FROM users";
$return = $app['dbs']['points']->executeQuery($users);
 return $app['twig']->render('admin.twig', array('users' => $return));
});

$app->match('/admin/adduser', function (Request $request) use ($app) {
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

$app->match('/login', function (Request $request) use ($app) {
   
    
	
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

$app->get('/logout', function () use ($app){


 $app['session']->clear();
 
 return $app->redirect('/login');

});
  
 	 
$app->get('/points-app', function () use ($app) {
   
	if (null === $user = $app['session']->get('user')) {
	        return $app->redirect('/login');
	    }

    return $app['twig']->render('points.twig', array('user' => $user));
});

$app->match('postPoints', function () use ($app) {

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

$app->get('/debug', function() use($app) {

  return $app['twig']->render('debug.twig', array('name' => ''));
});


$app->get('/get_scores', function() use($app) {
	
	//pull tweet counts for each team:
	
	// #teal, #tl
	// #green #gr
	// #blue #bl
	// #purple #pl
	// #orange #or
	
	// * pull in scores from points table
    error_log("Get the Points");	

$mysqli = new mysqli('72.249.150.224', 'otewadmi_admin', '__otew2016__', 'otewadmi_points');
//$mysqli = new mysqli('localhost', 'root', '', 'points');

    $sql = "Select team, SUM(points) as total_points from points group by team;";
        if (!$result = $mysqli->query($sql)) {
		      error_log ("Sorry, the script is experiencing problems. $mysqli->error");
		    
        }
        //$response = $app['dbs']['points']->executeQuery($sql);
    //$points = $response->fetch();
   error_log("Get the Points");
   while ($row = $result->fetch_assoc()) {
       $points_to_add[] = $row;
   }
         
   error_log(print_r($points_to_add, true));
   	$headers = array();
	$headers[] = 'Content-Type: application/json';
	$headers[] = 'x-ew-app-key: 4f5ab637-e266-4401-aef1-ae64ccce9e49';
	
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,"https://appworks.opentext.com/enterprise-world-service/api/v1/games/totals");
    
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

	$server_output = curl_exec ($ch);
    curl_close ($ch);
	$arr = json_decode($server_output, true);
    
    //$tweetch = curl_init();
    
   // curl_setopt($tweetch, CURLOPT_URL,"http://955832fa.ngrok.io/grab-tweets");
   // $tweet_output = curl_exec ($tweetch);
  //  curl_close ($ch);
	//$tweet_arr = json_decode($tweet_output, true);
    //add scores to overallScores before we send to frontend
    	//error_log( print_r($tweet_output['orange']));
	$score = $arr['overallScores'];
   
   foreach($points_to_add as $value){
       
       switch($value['team']) {
           
           case 'green':
                        $arr['overallScores']['Green'] = $arr['overallScores']['Green'] + $value['total_points'];
            break;
           
           case 'blue':
           
            $arr['overallScores']['Blue'] = $arr['overallScores']['Blue'] + $value['total_points'];
            break;
           
           case 'teal':
           
             $arr['overallScores']['Teal'] = $arr['overallScores']['Teal'] + $value['total_points'];
            break; 
           
           
           case 'orange':
            
             $arr['overallScores']['Orange'] = $arr['overallScores']['Orange'] + $value['total_points'];
            break;
            
            
           case 'purple':
            
             $arr['overallScores']['Purple'] = $arr['overallScores']['Purple'] + $value['total_points'];
            break;
            
            default:
            error_log("Opps! something was missed!!");
            
       }

       
   }

   
    return $app->json($arr);
});

$app->get('/grab-tweets', function() use($app) {
       
       
$green = "SELECT COUNT(tweet_id)*150 as green FROM `tweets` WHERE `tweet_id` IN (SELECT `tweet_id` FROM `tweet_tags` WHERE `tag` LIKE '%gr%')";
$blue = "SELECT COUNT(tweet_id)*150 as blue FROM `tweets` WHERE `tweet_id` IN (SELECT `tweet_id` FROM `tweet_tags` WHERE `tag` LIKE '%bl%')";
$teal = "SELECT COUNT(tweet_id)*150 as teal FROM `tweets` WHERE `tweet_id` IN (SELECT `tweet_id` FROM `tweet_tags` WHERE `tag` LIKE '%tl%')";
$purple = "SELECT COUNT(tweet_id)*150 as purple FROM `tweets` WHERE `tweet_id` IN (SELECT `tweet_id` FROM `tweet_tags` WHERE `tag` LIKE '%pl%')";
$orange = "SELECT COUNT(tweet_id)*150 as orange FROM `tweets` WHERE `tweet_id` IN (SELECT `tweet_id` FROM `tweet_tags` WHERE `tag` LIKE '%or%')";

//$mysqli = new mysqli('localhost', 'root', '', 'otewadmi_tweets');
$mysqli = new mysqli('72.249.150.224', 'otewadmi_admin', '__otew2016__', 'otewadmi_tweets');
    
        if (!$result = $mysqli->query($green)) {
		      error_log ("Sorry, the script is experiencing problems. $mysqli->error");    
        }
        
   while ($row = $result->fetch_assoc()) {
       $twitter_points[] = $row;
   }

    
        if (!$result = $mysqli->query($blue)) {
		      error_log ("Sorry, the script is experiencing problems. $mysqli->error");	    
        }
        
   while ($row = $result->fetch_assoc()) {
       $twitter_points[] = $row;
   }

        if (!$result = $mysqli->query($teal)) {
		      error_log ("Sorry, the script is experiencing problems. $mysqli->error");   
        }
        
   while ($row = $result->fetch_assoc()) {
       $twitter_points[] = $row;
   }


    
        if (!$result = $mysqli->query($purple)) {
		      error_log ("Sorry, the script is experiencing problems. $mysqli->error");
		    
        }
        
   while ($row = $result->fetch_assoc()) {
       $twitter_points[] = $row;
   }
        if (!$result = $mysqli->query($orange)) {
		      error_log ("Sorry, the script is experiencing problems. $mysqli->error");
		    
        }
        
   while ($row = $result->fetch_assoc()) {
       $twitter_points[] = $row;
   }

        foreach($twitter_points as $key => $score){
            
           foreach($score as $team => $points){
               
                $sql_p = "UPDATE points SET points = ? where team= ? AND audit = 100";
                $app['dbs']['points']->executeQuery($sql_p, array($points, $team));
           }
        }

       $statusCode = 200;
          $response = array('status' => 'ok', 'code' => $statusCode, 'message' => $twitter_points);
          return $app->json((object) $response, $statusCode);
       
       
       
   });



$app->get('/get_tweets', function() use($app) {
	
	
error_log("Get the Tweets");
	
    $sql = "SELECT 
tweets.tweet_text, tweets.screen_name, tweets.created_at, UNIX_TIMESTAMP(created_at) AS unixstamo, tweet_media.media 
FROM tweets left join tweet_media on tweets.tweet_id = tweet_media.tweet_id  
ORDER BY tweets.created_at DESC limit 9";
    $tweets = $app['dbs']['tweets']->fetchall($sql);
   error_log("Get the Posts");
   json_encode($tweets);

   return $app->json($tweets);
});

$app->get('/get_posts', function() use($app) {

	$headers = array();
	$headers[] = 'Content-Type: application/json';
	$headers[] = 'x-ew-app-key: 4f5ab637-e266-4401-aef1-ae64ccce9e49';
	
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,"https://appworks.opentext.com/enterprise-world-service/api/v1/feed/latest");
    
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

	$server_output = curl_exec ($ch);

	curl_close ($ch);
	$arr = json_decode($server_output, true);
  
    return $app->json($arr);
});


 
$app->run();
