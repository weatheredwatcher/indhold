<?php
	
	//Brings in the required info to connect and connects to the database	
	require("/home/otewadmin/public_html/touch/admin/config.php");
	$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name);

	if (!$connection) {
	    echo "Error: Unable to connect to MySQL." . PHP_EOL;
	    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
	    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
	    exit;
	}
	
	//echo "Success: A proper connection to MySQL was made! The my_db database is great." . PHP_EOL;
	//echo "Host information: " . mysqli_get_host_info($link) . PHP_EOL;
			
	$query = "SELECT * FROM updates WHERE published='yes'";
	$result = mysqli_query($connection, $query);
	$rownum = mysqli_num_rows($result);
	
	echo json_encode( array('notificationCount'=>$rownum));

?>