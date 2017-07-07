<?php
	
	//Brings in the required info to connect and connects to the database	
	require("config.php");
	$connection = mysqli_connect($db_host, $db_user, $db_password, $db_name);
	
?>

<!DOCTYPE html>
<html>

<head>
<meta name="viewport" content="initial-scale=1, width=device-width, maximum-scale=1, minimum-scale=1, user-scalable=no">
<title>EW2017 Updates</title>

<!--Scripts-->
<script language="javascript" type="text/javascript" src="../js/jquery-1.11.3.min.js"></script>

<!--Stylesheet-->
<link rel="stylesheet" href="../css/adminstyles.css" type="text/css" />

<!--Favicon-->
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
<link rel="icon" href="favicon.ico" type="image/x-icon">

	<script>
	$(document).ready(function() {
		
		$("tr:even").css("background-color", "rgba(255, 255, 255, 0.3);");
		$("tr:odd").css("background-color", "rgba(255, 255, 255, 0.2)");
	
		$('.checkbox').click(function() {
			var rowID = $(this).attr('rowID');
			var checkValue = $(this).prop('checked');
	
			if (checkValue == true) {	
				
				var publishedValue = "yes";
				
				$.post('update-published.php', 'rowID=' + rowID + '&published=' + publishedValue, function (response) {
			    	alert("This update is now published to the touchscreens");
			    });
	
			} else {
				
				var publishedValue = "no";
				
				$.post('update-published.php', 'rowID=' + rowID + '&published=' + publishedValue, function (response) {
			    	alert("This update is no longer published on the touchscreens");
			    });
			}	
			
		});
		
	});
	</script>

</head>

<body>
	
	<div id="wrapper">
	
		<img src="../assets/logo-otew2016.svg" style="width: 300px; margin-bottom: 20px;"/>
		
		<h1>EW2017 Program Updates</h1>
		
		<h2>Current Updates</h2>
		
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			
		<tr>
	    	<th width="5%">Live</th>
	    	<th width="*">Nature of Change</th>
	    	<th width="5"></th>
	  	</tr>
	
		<?php			
		
				$query = "SELECT * FROM updates ORDER BY id ASC";
				$result = mysqli_query($connection, $query);
				$rownum = mysqli_num_rows($result);
				
				for ($i = 0; $i < $rownum; $i++) {
				
					$id = stripslashes(mysqli_result($result, $i, "id"));
					$published = stripslashes(mysqli_result($result, $i, "published"));
					$sessionCode = stripslashes(mysqli_result($result, $i, "sessionCode"));
					$sessionName = stripslashes(mysqli_result($result, $i, "sessionName"));
					$changeReason = stripslashes(mysqli_result($result, $i, "changeReason"));
					
					echo "<tr><td><input class='checkbox' type='checkbox' name='published' rowID='$id'"; 
					
					if ($published == "yes") { 
						echo " checked>"; 
					} else {
						echo ">";
					} 
					
					echo "</td>
					<td>$sessionCode &mdash; $sessionName
					<br />
					$changeReason
					</td>
					<td><a href='delete.php?rowID=$id'><img src='../assets/delete.png' border='0'></a></td>
					</tr>
					
					
					";
					
				}
		
		?>
	
		</table>
		<br /><br />
		
		<h2>Add an update</h2>
		
		<form id="newUpdate" action="update-addnew.php" method="post">
			
			<ul>
			
				<li>
				<label for="sessionCode">Session Code:</label>
				<input name="sessionCode" type="text">
				</li>
				
				<li>
				<label for="sessionName">Session name:</label>
				<input name="sessionName" type="text">
				</li>
				
				<li>
				<label for="changeReason">What is the change?:</label>
				<input name="changeReason" type="text">
				</li>
				
			</ul>
	
			<input type="submit">
			
		
		</form>
	
	</div>
	

</body>

</html>