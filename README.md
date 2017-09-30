##Inhold


CMS Framework based on Silex

__Installation__

_Requires Composer_

If you do not already have composer, install it.
https://getcomposer.org/

Run ```composer install``` from the project root to install all the
dependencies.


_Database_

We provide migrations to populate the database.

```php app/console doctrine:migrations:status```


__Configure__

This app is written in the Silex micro-framework.

Under the ```config/``` folder is the file ```register.php```.  This
file registers service for Silex.  Included in this application are two
services, the database and the templating language twig.  You must setup
the database connection by providing the credentials. For twig, the path
to the twig templating files is required.  This is already setup in the
structure, but you are welcome to change it as needed.

Under the ```src/``` folder are the site controller logic.


__Database Tables__


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
