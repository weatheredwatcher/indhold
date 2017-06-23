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
var server_path = "http://otew.io";
//var server_path = "http://955832fa.ngrok.io"



function truncateName (name){
  
  fullName = name.split(' ');
  firstName = fullName[0];
  lastInitial = fullName[fullName.length - 1].charAt(0);
  
  return firstName + ' ' + lastInitial;
}

function getPoints(team){
   
    var jqxhr = $.getJSON(server_path + "/api/get_points/" + team )
   
          .done(function(response) {
              console.log('this is points: ' + response.points);
              return response.points;
          }).error(function(){console.log('error grabbing points');}).complete(function(){console.log('grabbing ' + team +' points is done now!')}) ;
    
}	
function getScore(){

    var jqxhr = $.getJSON(server_path + "/api/get_scores")

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
			  var name = truncateName(greenTeamLeaders[i].name);
			   var board_id = "#greenrow" + i;


            if ($(board_id).length > 0){
                $(board_id).remove();
                            }
			  $('#greenScoreboard').append('<div id="greenrow'+ i +'" class="teamRow">');
			  $('#greenrow' + i).append('<span class="rank green"></span>');
					$('#greenrow' + i).append('<span class="icon gr"></span>');
					$('#greenrow' + i).append('<span class="teamName">'+ name +'</span>');
					$('#greenrow' + i).append('<span class="points">'+ greenTeamLeaders[i].total +'</span>');
	      }
	  }


      var blueTeamLeaders = teamLeaders.Blue;

  for (var i in blueTeamLeaders) {
      if (blueTeamLeaders.hasOwnProperty(i)) {
		  console.log(blueTeamLeaders[i].name);
		  console.log(blueTeamLeaders[i].total);
		   var name = truncateName(blueTeamLeaders[i].name);
		   var board_id = "#bluerow" + i;


            if ($(board_id).length > 0){
                $(board_id).remove();
                            }
		    $('#blueScoreboard').append('<div id="bluerow'+ i +'" class="teamRow">');
			  $('#bluerow' + i).append('<span class="rank blue"></span>');
					$('#bluerow' + i).append('<span class="icon bl"></span>');
					$('#bluerow' + i).append('<span class="teamName">'+ name +'</span>');
					$('#bluerow' + i).append('<span class="points">'+ blueTeamLeaders[i].total +'</span>');


      }
  }

    var orangeTeamLeaders = teamLeaders.Orange;

for (var i in orangeTeamLeaders) {
    if (orangeTeamLeaders.hasOwnProperty(i)) {
	  console.log(orangeTeamLeaders[i].name);
	  console.log(orangeTeamLeaders[i].total);
	 var board_id = "#orangerow" + i;
	  var name = truncateName(orangeTeamLeaders[i].name);

            if ($(board_id).length > 0){
                $(board_id).remove();
                            }

	   $('#orangeScoreboard').append('<div id="orangerow'+ i +'" class="teamRow">');
			  $('#orangerow' + i).append('<span class="rank orange"></span>');
					$('#orangerow' + i).append('<span class="icon or"></span>');
					$('#orangerow' + i).append('<span class="teamName">'+ name +'</span>');
					$('#orangerow' + i).append('<span class="points">'+ orangeTeamLeaders[i].total +'</span>');

    }
}

    var purpleTeamLeaders = teamLeaders.Purple;

for (var i in purpleTeamLeaders) {
    if (purpleTeamLeaders.hasOwnProperty(i)) {
	  console.log(purpleTeamLeaders[i].name);
	  console.log(purpleTeamLeaders[i].total);

	 var board_id = "#purplerow" + i;
		var name = truncateName(purpleTeamLeaders[i].name);

            if ($(board_id).length > 0){
                $(board_id).remove();
                            }
	   $('#purpleScoreboard').append('<div id="purplerow'+ i +'" class="teamRow">');
			  $('#purplerow' + i).append('<span class="rank purple"></span>');
					$('#purplerow' + i).append('<span class="icon pl"></span>');
					$('#purplerow' + i).append('<span class="teamName">'+ name +'</span>');
					$('#purplerow' + i).append('<span class="points">'+ purpleTeamLeaders[i].total +'</span>');


    }
}

    var tealTeamLeaders = teamLeaders.Teal;

for (var i in tealTeamLeaders) {
    if (tealTeamLeaders.hasOwnProperty(i)) {
	  console.log(tealTeamLeaders[i].name);
	  console.log(tealTeamLeaders[i].total);

	  var board_id = "#tealrow" + i;
		var name = truncateName(tealTeamLeaders[i].name);

            if ($(board_id).length > 0){
                $(board_id).remove();
                            }
	  $('#tealScoreboard').append('<div id="tealrow'+ i +'" class="teamRow">');
			  $('#tealrow' + i).append('<span class="rank teal"></span>');
					$('#tealrow' + i).append('<span class="icon tl"></span>');
					$('#tealrow' + i).append('<span class="teamName">'+ name +'</span>');
					$('#tealrow' + i).append('<span class="points">'+ tealTeamLeaders[i].total +'</span>');

    }
}


//--OVERALL--

$('#blPoints').attr("data-points", response.overallScores.Blue);
$('#grPoints').attr("data-points", response.overallScores.Green);
$('#tlPoints').attr("data-points", response.overallScores.Teal);
$('#rdPoints').attr("data-points", response.overallScores.Red);
$('#plPoints').attr("data-points", response.overallScores.Purple);

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
		var board_id = "#teamrow" + x;
		var name = truncateName(overallLeaders[x].name);

            if ($(board_id).length > 0){
                $(board_id).remove();
                            }
            $('#individualLeaderboard').append('<div id="teamrow'+ x +'" class="teamRow">');
            $('#teamrow' + x).append('<span class="rank ' + team + '"></span>');
            $('#teamrow' + x).append('<span class="icon ' + icon + '"></span>');
            $('#teamrow' + x).append('<span class="teamName">'+ name +'</span>');
            $('#teamrow' + x).append('<span class="points">'+ overallLeaders[x].total +'</span>');




		//$('#individualLeaderboard').append('<div id="'+ board_id + '" class="teamRow">');
	    //$('"#' + board_id + '"').append('<span class="rank ' + overallLeaders[x].team +'"></span>');
        //$('"#' + board_id + '"').append('<span class="icon ' + icon +'"></span>')
        //$('"#' + board_id + '"').append('<span class="individualName">' + overallLeaders[x].name + '</span>')
        //$('"#' + board_id + '"').append('<span class="points pointsIndiv">'+ overallLeaders[x].total +'</span>')

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


function getPosts(){
	

 var jqxhr = $.getJSON(server_path + "/api/get_tweets")
      
 //  var jqhrt = $.getJSON("http://955832fa.ngrok.io/get_tweets")
                          .done(function(response){
                          
                            var tweets = response;
                            console.log(tweets);
        for (var tweet in tweets){
          console.log('starting the tweets: ');
          console.log(tweets[tweet].user_id);
          var tweetID = '#t' + tweet;
          var timestamp = tweets[tweet].created_at;
          //var parts = timestamp.match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/);
         // var unixtime = Date.UTC(+parts[3], parts[2]-1, +parts[1], +parts[4], +parts[5]);

         
          var teamname = "noTeamPost";
          if(tweets[tweet].image) {teamname = teamname + ' photo';}
          
         // console.log(unixtime);
			  $('#socialWallContainer').append('<div class="socialPost ' + teamname + ' sourceTwitter" id="t' + tweet + '"data-timestamp="' + tweets[tweet].unixstamo   +'">');
			  $(tweetID).append('<span class="username">' + tweets[tweet].screen_name + '</span>');
			  $(tweetID).append('<span class="message">' + tweets[tweet].tweet_text + '</span>');
             if(tweets[tweet].media){ $(tweetID).append('<img src='+ tweets[tweet].media +' alt="" />');}

        }
                    
                          });     
     
 
 var jqxhr = $.getJSON(server_path +"/api/get_posts")
 
 //       var jqxhr = $.getJSON("http://955832fa.ngrok.io/get_posts")
          .done(function(response) {
	 
        var posts = response.posts
			   console.log(posts);
		
	  for (var post in posts) {
		  console.log('entered the loop');
	      
			  console.log(posts[post].creatorName);
			  console.log(posts[post].content);
			  console.log(posts[post].updated);
			  var unixtime = posts[post].updated 
			  unixtime = unixtime.toString().slice(0, -3);
			  console.log('photo object');
			  if(posts[post].teamId){
    			  
    			  teamname = posts[post].teamId.toLowerCase() + 'Post';} else { teamname = 'noTeamPost'; }
    			  
			  if(posts[post].photo){
		      var photoUrl = JSON.stringify(posts[post].photo.publicUrl).replace(/^"(.*)"$/, '$1');
		      teamname = teamname + ' photo';
		      }
			   
			  $('#socialWallContainer').append('<div class="socialPost ' + teamname + ' sourceOT" id="' + post + '"data-timestamp="' + unixtime +'">');
			  $('#'+ post).append('<span class="name">' + posts[post].creatorName + '</span>');
			  $('#'+ post).append('<span class="message">' + posts[post].content + '</span>');
		if(posts[post].photo){ $('#' + post).append('<img src=https://appworks.opentext.com/'+ photoUrl +' alt="" />');}
			   
			 
	      }

	  
	  
 

           
		   
           })
           .fail(function() {
             console.log( "error" );
           })
           .always(function() {
             console.log( "complete" );
           });
	
	
	
	
}
