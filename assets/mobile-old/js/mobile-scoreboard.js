/*!
 * Scoreboard JS v 2.0
 * http://weatheredwatcher.com/
 *
 *
 * Copyright 2015 David Duggins <weatheredwatcher@gmail.com>
 * Released under the MIT license
 * http://github.com/weatheredwatcher/scoreboard
 *
 * Last Modified Date: 2016-07-01
 */

	
function getScore(){
	
    var jqxhr = $.getJSON("http://otew.io/get_scores")
           .done(function(response) {
          
		   //console.log(response);
		   
		
		//$(team).text(data);
//---Team Rankings:--
		var teamLeaders = response.teamLeaders
		console.log('set teamLeaders to response');
        
        
        var greenTeamLeaders = teamLeaders.Green;
		
		console.log('set green team var');
	  for (var i in greenTeamLeaders) {
		  console.log('entered the loop');
	      if (greenTeamLeaders.hasOwnProperty(i)) {
			  console.log(greenTeamLeaders[i].name);
			  console.log(greenTeamLeaders[i].total);
			   
			  $('#greenteam').append('<div id="greenrow'+ i +'" class="teamRow">');
			  $('#greenrow' + i).append('<span class="rank green"></span>');
					$('#greenrow' + i).append('<span class="icon gr"></span>');
					$('#greenrow' + i).append('<span class="teamName">'+ greenTeamLeaders[i].name +'</span>');
					$('#greenrow' + i).append('<span class="points">'+ greenTeamLeaders[i].total +'</span>');
			
			 
	      }
	  }
	  
	  
      var blueTeamLeaders = teamLeaders.Blue;
	console.log('set blue team var');
  for (var i in blueTeamLeaders) {
      if (blueTeamLeaders.hasOwnProperty(i)) {
		 console.log(blueTeamLeaders[i].name);
			  console.log(blueTeamLeaders[i].total);
			   
			  $('#blueteam').append('<div id="bluerow'+ i +'" class="teamRow">');
			  $('#bluerow' + i).append('<span class="rank blue"></span>');
					$('#bluerow' + i).append('<span class="icon bl"></span>');
					$('#bluerow' + i).append('<span class="teamName">'+ blueTeamLeaders[i].name +'</span>');
					$('#bluerow' + i).append('<span class="points">'+ blueTeamLeaders[i].total +'</span>');
			
		 
      }
  }

    var orangeTeamLeaders = teamLeaders.Orange;

for (var i in orangeTeamLeaders) {
    if (orangeTeamLeaders.hasOwnProperty(i)) {
	  console.log(orangeTeamLeaders[i].name);
	  console.log(orangeTeamLeaders[i].total);
	   
			  $('#orangeteam').append('<div id="orangerow'+ i +'" class="teamRow">');
			  $('#orangerow' + i).append('<span class="rank orange"></span>');
					$('#orangerow' + i).append('<span class="icon or"></span>');
					$('#orangerow' + i).append('<span class="teamName">'+ orangeTeamLeaders[i].name +'</span>');
					$('#orangerow' + i).append('<span class="points">'+ orangeTeamLeaders[i].total +'</span>');

	 	  	 
    }
}	

    var purpleTeamLeaders = teamLeaders.Purple;

for (var i in purpleTeamLeaders) {
    if (purpleTeamLeaders.hasOwnProperty(i)) {
	  console.log(purpleTeamLeaders[i].name);
	  console.log(purpleTeamLeaders[i].total);
	 
	    
			  $('#purpleteam').append('<div id="purplerow'+ i +'" class="teamRow">');
			  $('#purplerow' + i).append('<span class="rank purple"></span>');
					$('#purplerow' + i).append('<span class="icon pl"></span>');
					$('#purplerow' + i).append('<span class="teamName">'+ purpleTeamLeaders[i].name +'</span>');
					$('#purplerow' + i).append('<span class="points">'+ purpleTeamLeaders[i].total +'</span>');
	 
    }
}

    var tealTeamLeaders = teamLeaders.Teal;

for (var i in tealTeamLeaders) {
    if (tealTeamLeaders.hasOwnProperty(i)) {
	  console.log(tealTeamLeaders[i].name);
	  console.log(tealTeamLeaders[i].total);
	  
	   
			  $('#tealteam').append('<div id="tealrow'+ i +'" class="teamRow">');
			  $('#tealrow' + i).append('<span class="rank teal"></span>');
					$('#tealrow' + i).append('<span class="icon tl"></span>');
					$('#tealrow' + i).append('<span class="teamName">'+ tealTeamLeaders[i].name +'</span>');
					$('#tealrow' + i).append('<span class="points">'+ tealTeamLeaders[i].total +'</span>');
    }
}		


//--OVERALL--				

$('#blPoints').text(response.overallScores.Blue);
$('#grPoints').text(response.overallScores.Green);
$('#tlPoints').text(response.overallScores.Teal);
$('#orPoints').text(response.overallScores.Orange);
$('#plPoints').text(response.overallScores.Purple);			

console.log('OVERALL LEADERS');				
var overallLeaders = response.overallLeaders;
console.log(overallLeaders);

for (var x in overallLeaders){
	if(overallLeaders.hasOwnProperty(x)) {
		if (overallLeaders[x].team == "Teal") { team = "teal"; icon = "tl"; }
		else if (overallLeaders[x].team == "Purple") { team = "purple"; icon = "pl"; }
		else if (overallLeaders[x].team == "Green" ){ team = "green"; icon = "gr"; }
		else if (overallLeaders[x].team == "Blue") { team = "blue"; icon = "bl"; }
		else if (overallLeaders[x].team == "Orange") { team = "orange"; icon = "or"; }
		
		$('#individualLeaderboard').append('<div id="teamrow'+ x +'" class="teamRow">');
            $('#teamrow' + x).append('<span class="rank ' + team + '"></span>');
            $('#teamrow' + x).append('<span class="icon ' + icon + '"></span>');
            $('#teamrow' + x).append('<span class="teamName">'+ overallLeaders[x].name +'</span>');
            $('#teamrow' + x).append('<span class="points">'+ overallLeaders[x].total +'</span>');
		
	}
}
           
		   
           })
           .fail(function() {
             console.log( "error" );
           })
           .always(function() {
             console.log( "complete" );
           });

}
