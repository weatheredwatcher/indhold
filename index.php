<?php
// web/index.php
require_once __DIR__.'/vendor/autoload.php';
date_default_timezone_set('America/New_York');
//use Symfony\Component\Debug\ErrorHandler;
//use Symfony\Component\Debug\ExceptionHandler;

ini_set('display_errors', 1);
error_reporting(-1);

//ExceptionHandler::register();
//ErrorHandler::register();

$app = new Silex\Application();
//load the Services (Database, Twig etc.)
require_once __DIR__.'/config/register.php';
$app['debug'] = true;  //set to true to turn on debugging, otherwise error messages are user friendly

$app->get('/', function() use($app) {

  return $app['twig']->render('index.twig', array('name' => ''));
});

 $app->get('/{id}', function($id) use($app) { 

   //
   // Here we prepare the SQL and execute with shortcut. mysql::executeQuery() 
   // This method protects from mysql injection
   //
    $sql = "SELECT * FROM mailer WHERE hashID = ?";
    $post = $app['db']->executeQuery($sql, array($id));
    $user = $post->fetch();
    $name = $user['FirstName'];
//
    // $sql = "UPDATE posts SET value = ? WHERE id = ?";
    //     $app['dbs']['mysql_write']->executeUpdate($sql, array('newValue', (int) $id));
    $sql = "UPDATE mailer SET viewedOn = now() WHERE hashID = ?";
   $app['db']->executeUpdate($sql, array($id));

    return $app['twig']->render('index.twig', array(
                  'name' => $name,
      )); 
 }); 


 $app->run();
