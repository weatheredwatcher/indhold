##EW 2016 Mailer App


This is the mailer app for Enterprise World

__Installation__

_Requires Composer_

If you do not already have composer, install it.
https://getcomposer.org/

Run ```composer install``` from the project root to install all the
dependencies.


_Database_

Create the following table structure:

    CREATE TABLE IF NOT EXISTS `mailer` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `ContactID` int(11) NOT NULL,
      `Title` varchar(255) NOT NULL,
      `Company` varchar(255) NOT NULL,
      `FirstName` varchar(255) NOT NULL,
      `LastName` varchar(255) NOT NULL,
      `Address1` varchar(255) NOT NULL,
      `City` varchar(255) NOT NULL,
      `State` varchar(255) NOT NULL,
      `PostalCode` varchar(255) NOT NULL,
      `Country` varchar(255) NOT NULL,
      `Email` varchar(255) NOT NULL,
      `BusinessPhone` varchar(255) NOT NULL,
      `Source` varchar(255) NOT NULL,
      `hashID` varchar(255) NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

__Configure__

This app is written in the Silex micro-framework.

Under the ```config/``` folder is the file ```register.php```.  This
file registers service for Silex.  Included in this application are two
services, the database and the templating language twig.  You must setup
the database connection by providing the credentials. For twig, the path
to the twig templating files is required.  This is already setup in the
structure, but you are welcome to change it as needed.


__Generating__

Also in the ```config/``` folder is the file ```generate.php```.  This
files is used to parse a CSV file with customers and generate the
hashcodes for the short url's.  It will write all this to the database
and table specified in the config files.
