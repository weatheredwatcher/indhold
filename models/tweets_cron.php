<?php
	
require_once '../vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;

 

function get_tweets($q) 
{


$mysqli = new mysqli('127.0.0.1', 'root', '', 'otewadmi_tweets');
    	
$key = 'D6mY61Jq1Qlp0JWJzAgwge4p5'; //getenv(CONSUMER_KEY);
$secret = 'bKRait1JAVQ0H9xSk0NAyT31Gf9mTN9NzMNHVQ68fvtGP6dV7S'; //getenv(CONSUMER_SECRET);
$token = '17375108-uOAg5tpKoWgULOjgNryU0eps6A3cJe3VzriKXZ3WE'; //getenv(ACCESS_TOKEN);
$token_secret = '3nGTo7Ve2fcx6RgUnhL0LwBGiSNsEcYnHyRHOnRS5taUw'; //getenv(TOKEN_SECRET);
$connection = new TwitterOAuth($key, $secret, $token, $token_secret);

      $query = array("q" => $q);
   $tweets = $connection->get('search/tweets', $query);
   
   foreach($tweets->statuses as $tweet){
          $url        =  $mysqli->escape_string($tweet->user->profile_image_url);
		  $username   =  $tweet->user->name;
          $screenname =  $tweet->user->screen_name;
          $text       =  $mysqli->escape_string($tweet->text);
          $image      =  $tweet->entities->media[0]->media_url;
		  $UUID 	  =  $tweet->id_str; 
		  
		  
		  foreach($tweet->entities->hashtags as $hashtags){
		  	
			 $tags .= $hashtags->text . ' ';
		  }
    }

 $sql = "INSERT into tweets (id, tweet, username, screenname, hashtags, image, updated) VALUES ('$UUID', '$text', '$username', '$screenname', '$tags', '$image', UNIX_TIMESTAMP(now()))";
echo $sql;
//if (!$result = $mysqli->query($sql)) {
	//	      error_log ("Sorry, the script is experiencing problems. $mysqli->error");
		    
//}
    error_log("wrote $q to database");

}




error_log("grabbing OTEW16 tags");
get_tweets('otew16');
error_log("grabbing OTEW tags");
get_tweets('otew');


// end of file
