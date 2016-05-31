<?php

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
      'db.options' => array(
                    'driver'    => 'mysqli',
                    'host'      => 'localhost',
                    'dbname'    => 'otewadmi_mailer',
                    'user'      => 'root',
                    'password'  => '',
                    'charset'   => 'utf8mb4',
                 ),
               ));

$app->register(new Silex\Provider\TwigServiceProvider(), array(
      'twig.path' => __DIR__.'/../views',
    ));


error_log( __DIR__.'/views');
