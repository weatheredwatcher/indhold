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

namespace Leaderboard;

use Silex\Application;
use Silex\Api\ControllerProviderInterface;

class LeaderboardControllerProvider implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
        // creates a new controller based on the default route
        $controllers = $app['controllers_factory'];

        $controllers->get('/', function (Application $app) {
            return $app['twig']->render('index.html');
        });
        
        $controllers->get('/mobile', function() use($app) {

          return $app['twig']->render('mobile.twig');
    
        });

        $controllers->get('/touch', function() use($app) {

          return $app['twig']->render('touch.twig');
        });
        

        return $controllers;
    }
}