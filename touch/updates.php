<?php
	
	//Brings in the required info to connect and connects to the database	
	require("admin/config.php");
	$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name);

	if (!$connection) {
	    echo "Error: Unable to connect to MySQL." . PHP_EOL;
	    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
	    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
	    exit;
	}
	
	//echo "Success: A proper connection to MySQL was made! The my_db database is great." . PHP_EOL;
	//echo "Host information: " . mysqli_get_host_info($link) . PHP_EOL;	
	
?>

<!DOCTYPE html>
<html>
<head>
<title>Updates</title>

<!--Scripts-->
<script language="javascript" type="text/javascript" src="../js/jquery-1.11.3.min.js"></script>

<!--Stylesheet-->
<link rel="stylesheet" href="css/updatestyles.css" type="text/css" />

<script>
$(document).ready(function() {
	$("tr:even").css("background-color", "rgba(255, 255, 255, 0.1);");
	$("tr:odd").css("background-color", "rgba(255, 255, 255, 0.1)");
	
	$(document).bind('touchmove', function(e) {
		e.preventDefault();
	});
	
});
	
</script>

</head>

<body>
	
	
	<?php
		
			error_reporting(E_ERROR);
			
			$query = "SELECT * FROM updates WHERE published='yes'";
			$result = mysqli_query($connection, $query);
			$rownum = mysqli_num_rows($result);
			
			if ($rownum == 0) {
				
				echo'<div id="noResults">There are currently no updates to the agenda at this time.</div>';
				
			} else {
				
				echo'<h1>Agenda Updates</h1>';
				
				echo'<table width="100%" border="0" cellspacing="0" cellpadding="0">';
			
					for ($i = 0; $i < $rownum; $i++) {
			
						$published = stripslashes(mysqli_result($result, $i, "published"));
						$sessionCode = stripslashes(mysqli_result($result, $i, "sessionCode"));
						$sessionName = stripslashes(mysqli_result($result, $i, "sessionName"));
						$changeReason = stripslashes(mysqli_result($result, $i, "changeReason"));
						
							echo "<tr><td>
							";
							if ($sessionCode != "") {
								echo"<span class='sessionCode'>($sessionCode)</span>&nbsp;&nbsp;";
							}
							echo"$sessionName<br /><span class='reason'>$changeReason</span></td></tr>";
							
					}
				
				echo'</table>';
				
			}	
	?>

</body>

</html>