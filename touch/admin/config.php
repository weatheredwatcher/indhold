<?php
	$db_host = "localhost";  //
	$db_user = "weatheredwatcher"; //"leaderboard_user";
	$db_password = "password"; //"l3@d3rB0@rd";
	$db_name = "otew_points";
	
	function mysqli_result($res,$row=0,$col=0){
    $numrows = mysqli_num_rows($res);
    if ($numrows && $row <= ($numrows-1) && $row >=0){
        mysqli_data_seek($res,$row);
        $resrow = (is_numeric($col)) ? mysqli_fetch_row($res) : mysqli_fetch_assoc($res);
        if (isset($resrow[$col])){
            return $resrow[$col];
        }
    }
    return false;
    }
?>