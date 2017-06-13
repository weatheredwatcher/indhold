##EW 2016 Leaderboard Application


This Enterprise World

__Installation__

_Requires Composer_

If you do not already have composer, install it.
https://getcomposer.org/

Run ```composer install``` from the project root to install all the
dependencies.


_Database_

Create the following table structure:

   
__Configure__

This app is written in the Silex micro-framework.

Under the ```config/``` folder is the file ```register.php```.  This
file registers service for Silex.  Included in this application are two
services, the database and the templating language twig.  You must setup
the database connection by providing the credentials. For twig, the path
to the twig templating files is required.  This is already setup in the
structure, but you are welcome to change it as needed.

Under the ```controller/``` folder are the site controller logic.

Under the ```model/``` is the domain models.


__Generating__

Also in the ```config/``` folder is the file ```generate.php```.  This
files is used to parse a CSV file with customers and generate the
hashcodes for the short url's.  It will write all this to the database
and table specified in the config files.
