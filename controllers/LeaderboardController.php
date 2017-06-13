<?php

//
/**
*
*  Leaderboard Controller Code
* @author David Duggins <dduggins@opentext.com>
* @cannonical https://github.com/OpenText-DMG/otew-leaderboard
* 
* 
* 
*/


$leaderboard = $app['controllers_factory'];

$leaderboard->get('/', function() use($app) {

  return $app['twig']->render('leaderboard.twig');
  
  
});

$leaderboard->get('/mobile', function() use($app) {

  return $app['twig']->render('mobile.twig');
    
});

$leaderboard->get('/touch', function() use($app) {

  return $app['twig']->render('touch.twig');
});