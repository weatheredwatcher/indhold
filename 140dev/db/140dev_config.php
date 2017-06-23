<?php
/**
* 140dev_config.php
* Constants for the entire 140dev Twitter framework
* You MUST modify these to match your server setup when installing the framework
* 
* Latest copy of this code: http://140dev.com/free-twitter-api-source-code-library/
* @author Adam Green <140dev@gmail.com>
* @license GNU Public License
* @version BETA 0.30
*/

// OAuth settings for connecting to the Twitter streaming API
// Fill in the values for a valid Twitter app

define('TWITTER_CONSUMER_KEY','D6mY61Jq1Qlp0JWJzAgwge4p5');
define('TWITTER_CONSUMER_SECRET','bKRait1JAVQ0H9xSk0NAyT31Gf9mTN9NzMNHVQ68fvtGP6dV7S');
define('OAUTH_TOKEN','17375108-uOAg5tpKoWgULOjgNryU0eps6A3cJe3VzriKXZ3WE');
define('OAUTH_SECRET','3nGTo7Ve2fcx6RgUnhL0LwBGiSNsEcYnHyRHOnRS5taUw');

// Settings for monitor_tweets.php
define('TWEET_ERROR_INTERVAL',10);
// Fill in the email address for error messages
define('TWEET_ERROR_ADDRESS','dduggins@opentext.com');
?>