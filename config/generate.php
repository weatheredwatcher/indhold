<?php

// Mailer Generator
//
// Takes CSV file for input, creates database entry and adds short code to table as well as csv file
//

// Report all PHP errors
error_reporting(-1);
require __DIR__ . '/../vendor/autoload.php';
use Hashids\Hashids;

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'otewadmi_mailer';
$mysqli = new mysqli($host,$user,$password,$database);
// Check connection
 if ($mysqli->connect_errno)
   {
     echo "Failed to connect to MySQL: " . $mysqli->connect_errno;
       }
 
 $csv = new parseCSV('mailer.csv');
//var_dump($csv);

foreach($csv->data as $k => $v)
{
  $name = $v['FirstName'] . " " . $v['LastName'];
  $hashids = new Hashids($name, 6, 'abcdefghij1234567890');
  $id = $hashids->encode(1, 2, 3);
  $numbers = $hashids->decode($id);

  //  $id = base_convert(microtime(false), 6, 36);

  //$ContactID = $mysqli->real_escape_string($v["ContactID"]);
  $Title = $mysqli->real_escape_string($v["Title"]);
  $Company = $mysqli->real_escape_string($v["Company"]);
  $FirstName = $mysqli->real_escape_string($v["FirstName"]);
  $LastName = $mysqli->real_escape_string($v["LastName"]);
  $Address1 = $mysqli->real_escape_string($v["Address"]);
  $City = $mysqli->real_escape_string($v["City"]);
  $State = $mysqli->real_escape_string($v["State"]);
  $PostalCode = $mysqli->real_escape_string($v["ZipCode"]);
  $Country = $mysqli->real_escape_string($v["Country"]);
  $Email = $mysqli->real_escape_string($v["Email"]);
  $BusinessPhone = $mysqli->real_escape_string($v["Phone"]);
  $Source = $mysqli->real_escape_string($v["Source"]);
  $url = "http://otew.io/" . $id; 
  $sql = "INSERT into mailer2 (ContactID,Title,Company,FirstName,LastName,Address1,City,State,PostalCode,Country,Email,BusinessPhone,Source,hashID, url) VALUES('','$Title','$Company','$FirstName','$LastName','$Address1','$City','$State','$PostalCode','$Country','$Email','$BusinessPhone','$Source','$id', '$url')"; 
  $mysqli->query($sql);

  var_dump($sql);
}


