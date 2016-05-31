_EW 2016 Mailer App_


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


