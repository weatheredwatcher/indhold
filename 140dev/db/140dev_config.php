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
define('TWITTER_CONSUMER_KEY','1ftGdh0A0UwR0PTw9M08CiYch');
define('TWITTER_CONSUMER_SECRET','zyYz6tyymi2SCkrrMh2mcXQKzzAgRy4RVxI8KeLHwULW98Yi41');
define('OAUTH_TOKEN','17375108-scMpW7B7CzcPiVVjXrPhXJyNv5sA33ZRGLK49wAVI');
define('OAUTH_SECRET','i1kxZEa6wlpzgiNMl8Ozudooi1zG9qIYKLxVKSlWANvcN');

// Settings for monitor_tweets.php
define('TWEET_ERROR_INTERVAL',10);
// Fill in the email address for error messages
define('TWEET_ERROR_ADDRESS','dduggins@opentext.com');
?>