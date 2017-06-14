<?php

//
/**
*
* API Controller Code
* @author David Duggins <dduggins@opentext.com>
* @cannonical https://github.com/OpenText-DMG/otew-leaderboard
*
*
*
*/

namespace API;

use Silex\Application;
use Silex\Api\ControllerProviderInterface;
use Doctrine\DBAL\DBALException;

class APIControllerProvider implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        // creates a new controller based on the default route
        $controllers = $app['controllers_factory'];

       $controllers->get('/get_scores', function() use($app) {

	//pull tweet counts for each team:

	// #teal, #tl
	// #green #gr
	// #blue #bl
	// #purple #pl
	// #orange #or

	// * pull in scores from points table
        error_log("Get the Points");

       // $mysqli = new mysqli('72.249.150.224', 'otewadmi_admin', '__otew2016__', 'otewadmi_points');
        //$mysqli = new mysqli('localhost', 'root', '', 'points');

        $sql = "Select team, SUM(points) as total_points from points group by team;";
         //   if (!$result = $mysqli->query($sql)) {
		     // error_log ("Sorry, the script is experiencing problems. $mysqli->error");

           // }
        $response = $app['dbs']['points']->fetchAll($sql);
        error_log(print_r($response, true));
        error_log("Get the Points");
       // while ($row = $response) {
      foreach ($response as $value){
        error_log(print_r($value, true));
            $points_to_add[] = $value;
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

$controllers->get('/grab-tweets', function() use($app) {


        $green = "SELECT COUNT(tweet_id)*150 as green FROM `tweets` WHERE `tweet_id` IN (SELECT `tweet_id` FROM `tweet_tags` WHERE `tag` LIKE '%gr%')";
        $blue = "SELECT COUNT(tweet_id)*150 as blue FROM `tweets` WHERE `tweet_id` IN (SELECT `tweet_id` FROM `tweet_tags` WHERE `tag` LIKE '%bl%')";
        $teal = "SELECT COUNT(tweet_id)*150 as teal FROM `tweets` WHERE `tweet_id` IN (SELECT `tweet_id` FROM `tweet_tags` WHERE `tag` LIKE '%tl%')";
        $purple = "SELECT COUNT(tweet_id)*150 as purple FROM `tweets` WHERE `tweet_id` IN (SELECT `tweet_id` FROM `tweet_tags` WHERE `tag` LIKE '%pl%')";
        $orange = "SELECT COUNT(tweet_id)*150 as orange FROM `tweets` WHERE `tweet_id` IN (SELECT `tweet_id` FROM `tweet_tags` WHERE `tag` LIKE '%or%')";

        //$mysqli = new mysqli('localhost', 'root', '', 'otewadmi_tweets');
      //  $mysqli = new mysqli('localhost', 'weatheredwatcher', 'password', 'otew_tweets');

        try {
            $response = $app['dbs']['tweets']->fetchAll($green);
        }
        catch(DBALException $e){
            error_log($e->getMessage());
            exit;
        }


        foreach ($response as $key => $value) {

            $twitter_points[] = $value;
        }

        try {
            $response = $app['dbs']['tweets']->fetchAll($blue);
        }
        catch(DBALException $e){
            error_log($e->getMessage());
            exit;
        }


        foreach ($response as $key => $value) {


            $twitter_points[] = $value;
        }

        try {
            $response = $app['dbs']['tweets']->fetchAll($teal);
        }
        catch(DBALException $e){
            error_log($e->getMessage());
            exit;
        }


        foreach ($response as $key => $value) {

            $twitter_points[] = $value;
        }

        try {
            $response = $app['dbs']['tweets']->fetchAll($purple);
        }
        catch(DBALException $e){
            error_log($e->getMessage());
            exit;
        }


        foreach ($response as $key => $value) {


            $twitter_points[] = $value;
        }

        try {
            $response = $app['dbs']['tweets']->fetchAll($orange);
        }
        catch(DBALException $e){
            error_log($e->getMessage());
            exit;
        }


        foreach ($response as $key => $value) {


            $twitter_points[] = $value;
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



$controllers->get('/get_tweets', function() use($app) {


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

$controllers->get('/get_posts', function() use($app) {

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

        return $controllers;
    }
}
