
			   <?php

			   $app->register(new Silex\Provider\DoctrineServiceProvider(), array(
			         'dbs.options' => array(
			   				'points' => array(
			                       'driver'    => 'mysqli',
			                       'host'      => 'localhost',
			                       'dbname'    => 'otewleaderboard',
			                       'user'      => 'weatheredwatcher',
			                       'password'  => 'password',
			                       'charset'   => 'utf8mb4',
			   				),
				'tweets' => array(
                    'driver'    => 'mysqli',
                    'host'      => 'localhost',
                    'dbname'    => 'otew_tweets',
                    'user'      => 'weatheredwatcher',
                    'password'  => 'password',
                    'charset'   => 'utf8mb4',
				),

			                    ),
			                  ));
			   
			   
	

			   $app->register(new Silex\Provider\TwigServiceProvider(), array(
			         'twig.path' => __DIR__.'/../views',
			       ));
			   use Silex\Provider\FormServiceProvider;
			   $app->register(new FormServiceProvider());


			   $app->register(new Silex\Provider\LocaleServiceProvider());
			   $app->register(new Silex\Provider\TranslationServiceProvider(), array(
			       'locale_Fallbacks' => array('en'),
			   ));
			   $app->register(new Silex\Provider\SessionServiceProvider(), array(
    			   'cookie_lifetime' => 216000,
			   ));

	
	

error_log( __DIR__.'/views');
