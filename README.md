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

__Database Tables__

This application has two separate databases.  One is for the leaderboard and the other is for the twitter server.

For the leaderboard, create a database called ```otew_points``` and create the following tables:


```
points
+-----------+------------------+------+-----+-------------------+-----------------------------+
| Field     | Type             | Null | Key | Default           | Extra                       |
+-----------+------------------+------+-----+-------------------+-----------------------------+
| id        | int(11) unsigned | NO   | PRI | NULL              | auto_increment              |
| team      | varchar(255)     | YES  |     | NULL              |                             |
| points    | int(11)          | YES  |     | NULL              |                             |
| audit     | int(11)          | YES  |     | NULL              |                             |
| timestamp | timestamp        | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
+-----------+------------------+------+-----+-------------------+-----------------------------+

users
+----------+------------------+------+-----+---------+----------------+
| Field    | Type             | Null | Key | Default | Extra          |
+----------+------------------+------+-----+---------+----------------+
| id       | int(11) unsigned | NO   | PRI | NULL    | auto_increment |
| email    | varchar(255)     | YES  |     | NULL    |                |
| password | varchar(255)     | YES  |     | NULL    |                |
| isAdmin  | tinyint(1)       | NO   |     | 0       |                |
+----------+------------------+------+-----+---------+----------------+
```
Then in ```otew_tweets```

```
tweets
+-------------------+---------------------+------+-----+---------+-------+
| Field             | Type                | Null | Key | Default | Extra |
+-------------------+---------------------+------+-----+---------+-------+
| tweet_id          | bigint(20) unsigned | NO   | PRI | NULL    |       |
| tweet_text        | varchar(160)        | NO   | MUL | NULL    |       |
| created_at        | datetime            | NO   | MUL | NULL    |       |
| geo_lat           | decimal(10,5)       | YES  |     | NULL    |       |
| geo_long          | decimal(10,5)       | YES  |     | NULL    |       |
| user_id           | bigint(20) unsigned | NO   | MUL | NULL    |       |
| screen_name       | char(20)            | NO   | MUL | NULL    |       |
| name              | varchar(20)         | YES  | MUL | NULL    |       |
| profile_image_url | varchar(200)        | YES  |     | NULL    |       |
| is_rt             | tinyint(1)          | NO   |     | NULL    |       |
+-------------------+---------------------+------+-----+---------+-------+
```







__Generating__

Also in the ```config/``` folder is the file ```generate.php```.  This
files is used to parse a CSV file with customers and generate the
hashcodes for the short url's.  It will write all this to the database
and table specified in the config files.
