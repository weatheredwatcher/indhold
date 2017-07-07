<?php
	
	//Brings in the required info to connect and connects to the database	
	require("config.php");
	$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name);
	
	$sessionCode = addslashes($_POST["sessionCode"]);
	$sessionName = addslashes($_POST["sessionName"]);
	$changeReason = addslashes($_POST["changeReason"]);

	$query = "INSERT into updates (published, sessionCode, sessionName, changeReason) VALUES ('yes', '$sessionCode', '$sessionName', '$changeReason')";
	
	mysqli_query($connection, $query) or die(mysqli_error());
	
	echo "Program update has been added and published to the touchscreen
	<br />
	<a href='update.php'>Return back to updates</a>
	";
	
?>