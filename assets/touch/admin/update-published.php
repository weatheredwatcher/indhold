<?php
	
	//Brings in the required info to connect and connects to the database	
	require("/home/otewadmin/public_html/touch/admin/config.php");
	$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name);
	
	$id = addslashes($_POST["rowID"]);
	$published = addslashes($_POST["published"]);

	
	$query = "UPDATE updates SET published='$published' WHERE id=$id";
	mysqli_query($connection, $query) or die(mysqli_error());

	
?>