<?php
	
	//Brings in the required info to connect and connects to the database	
	require("config.php");
	$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name);
	
	$row = $_GET["rowID"];

	$query = "DELETE FROM updates WHERE id=$row";
	
	mysqli_query($connection, $query) or die(mysqli_error());
	
	echo "Update has been removed.
	<br />
	<a href='update.php'>Return back to updates</a>
	";
?>