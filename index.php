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
use Symfony\Component\Debug\ErrorHandler;
use Symfony\Component\Debug\ExceptionHandler;

ini_set('display_errors', 0);
error_reporting(0);

//ExceptionHandler::register();
//ErrorHandler::register();

class ewApp extends Application {


}

$app = new ewApp(); //Silex\Application();


//load the Services (Database, Twig etc.)
require_once __DIR__.'/config/register.php';
//load the controllers:
//todo: create logic to loop controllers
require_once __DIR__.'/controllers/LeaderboardControllerProvider.php';
require_once __DIR__.'/controllers/AdminControllerProvider.php';
require_once __DIR__.'/controllers/PointsControllerProvider.php';
require_once __DIR__.'/controllers/APIControllerProvider.php';
require_once __DIR__.'/controllers/DashboardControllerProvider.php';
require_once __DIR__.'/config/traits.php';
use Leaderboard;
use Dashboard;
use Admin;
use Points;
use API;
use CustomTraits;

$app['debug'] = true;  //set to true to turn on debugging, otherwise error messages are user friendly

$app->get('/', function() use($app) {

    return $app['twig']->render('welcome.twig');
});

$app->mount('/leaderboard', new Leaderboard\LeaderboardControllerProvider());
$app->mount('/dashboard', new Dashboard\DashboardControllerProvider());
$app->mount('/admin', new Admin\AdminControllerProvider());
$app->mount('/points', new Points\PointsControllerProvider());
$app->mount('/api', new API\APIControllerProvider());




$app->get('/debug', function() use($app) {

  $sw = $app['dbs']['points']->getSchemaManager();

  $databases = $sw->listDatabases();
  return $app['twig']->render('debug.twig', array('database' => $databases));


});





$app->run();
