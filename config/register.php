
			   <?php
				 $dotenv = new Dotenv\Dotenv($_SERVER['DOCUMENT_ROOT']);
		 		 $dotenv->load();
			   $app->register(new Silex\Provider\DoctrineServiceProvider(), array(
			         'dbs.options' => array(
			   				'points' => array(
			                       'driver'    => 'mysqli',
			                       'host'      => getenv('MYSQL_HOST'),
			                       'dbname'    => 'otew_points',
			                       'user'      => getenv('MYSQL_USER'),
			                       'password'  => getenv('MYSQL_PASSWORD'),
			                       'charset'   => 'utf8mb4',
			   				             ),

				        'tweets' => array(
					                   'driver'    => 'mysqli',
					                   'host'      => getenv('MYSQL_HOST'),
					                   'dbname'    => 'otew_tweets',
					                   'user'      => getenv('MYSQL_USER'),
					                   'password'  => getenv('MYSQL_PASSWORD'),
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
