$(document).ready(function() {

    $.fn.digits = function(){
        return this.each(function(){
            $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
        })
    };
	//INITIALIZE
	
	//SOCIAL WALL
    function startSocialWall() {
	    $('#socialWallContainer').isotope({
            getSortData: {
                number: '[data-timestamp]'
            },
            itemSelector: '.socialPost',
            layoutMode: 'packery',
            sortBy: 'number',
            sortAscending: false,
            percentPosition: true
        });
    }
	
	//get posts for social wall
	getPosts();
	
	//get scores for leaderboards
    getScore();
	
	//duplicate scores from data attribute and populate div
	duplicatePointsData();
	
	//order rows with highest scores at top
	reOrderRows();
	
	//Takes the scores and adds comma separators
	$(".points").digits();
	
	
	
	//KEYBOARD NAVIGATION

	//keyboard functions for testing
	$(document).keyup(function (e) {
	    if (e.keyCode == 39)
	    {        
	       $('.cycle-slideshow').cycle('next');
	    }
	
	    if (e.keyCode == 37)
	    {
	        $('.cycle-slideshow').cycle('prev');
	    }

	});

	//FUNCTIONS
	

	// Move data attribute into points div
	function duplicatePointsData() {
		$('.row').each(function() {
			var pointValue = $(this).attr('data-points');
			$(this).find('.points').html(pointValue);
			$(this).find('.points').digits();
		});
		
		console.log('duplicating points');
	}
	
	// Reordder the rows with highest scores at top
	function reOrderRows() {
		// define variables
		var overallTeam = $("#overallTeam .rows .row");
		var overallIndividual = $("#overallIndividual .rows .row");
		var teamBlue = $("#teamBlue .rows .row");
		var teamPurple = $("#teamPurple .rows .row");
		var teamRed = $("#teamRed .rows .row");
		var teamTeal = $("#teamTeal .rows .row");
		var teamGrey = $("#teamGrey .rows .row");
		
		//sort all rows for each
		overallTeam.sort(function(a, b){
		    return $(b).data("points") - $(a).data("points");
		});
		overallIndividual.sort(function(a, b){
		    return $(b).data("points") - $(a).data("points");
		});
		teamBlue.sort(function(a, b){
		    return $(b).data("points") - $(a).data("points");
		});
		teamPurple.sort(function(a, b){
		    return $(b).data("points") - $(a).data("points");
		});
		teamRed.sort(function(a, b){
		    return $(b).data("points") - $(a).data("points");
		});
		teamTeal.sort(function(a, b){
		    return $(b).data("points") - $(a).data("points");
		});
		teamGrey.sort(function(a, b){
		    return $(b).data("points") - $(a).data("points");
		});
		
		//output results
		$("#overallTeam .rows").html(overallTeam);
		$("#overallIndividual .rows").html(overallIndividual);
		$("#teamBlue .rows").html(teamBlue);
		$("#teamPurple .rows").html(teamPurple);
		$("#teamRed .rows").html(teamRed);
		$("#teamTeal .rows").html(teamTeal);
		$("#teamGrey .rows").html(teamGrey);
		
		//renumber divs
		var i = 1;
		$('#overallTeam .rows .row .rank').each(function() {
		    $(this).html(i++);
		});
		
		var j = 1;
		$('#overallIndividual .rows .row .rank').each(function() {
		    $(this).html(j++);
		});
		
		var k = 1;
		$('#teamBlue .rows .row .rank').each(function() {
		    $(this).html(k++);
		});
		
		var l = 1;
		$('#teamPurple .rows .row .rank').each(function() {
		    $(this).html(l++);
		});
		
		var m = 1;
		$('#teamRed .rows .row .rank').each(function() {
		    $(this).html(m++);
		});
		
		var n = 1;
		$('#teamTeal .rows .row .rank').each(function() {
		    $(this).html(n++);
		});
		
		var o = 1;
		$('#teamGrey .rows .row .rank').each(function() {
		    $(this).html(o++);
		});
		
		console.log('re ordering rows now');
		
	}
    
    //Find hashtags and style appropriately
    
    hashtag_regexp = /#([a-zA-Z0-9]+)/g;
    function replaceHashTags() {
	     $('span.message').each(function() {
	        $(this).html(spanHashtags($(this).html()));
	    });
    }
    
    hashtag_regexp = /#([a-zA-Z0-9]+)/g;

	function spanHashtags(text) {
	    return text.replace(
	        hashtag_regexp,
	        '<span class="hashtag">#$1</a>'
	    );
	}
	new
      
    
    //Function to trigger based on slide
    $('.cycle-slideshow').on('cycle-after', function() {
	    
	    console.log('on after triggering');
	    
	    //get current slide
	    var currentSlide = $('.cycle-slideshow').data("cycle.opts").currSlide;
	    //leaderboards starts on slide 0
	    var firstLeaderboard = 0;
	    //social wall is slide 7
	    var socialWall = 7;
	    
	    
	    if (currentSlide == firstLeaderboard) {
		    
		    //get posts while cycling through leaderboards
            $('#socialWallContainer').empty();
		    getPosts();

            $('#socialWallContainer').isotope({
                getSortData: {
                    number: '[data-timestamp]'
                },
                itemSelector: '.socialPost',
                layoutMode: 'packery',
                sortBy: 'number',
                sortAscending: false,
                percentPosition: true
            });
            
            console.log('on after - initializing social wall while on first leaderboard');

	    } else if (currentSlide == socialWall) {
		    
		    //get scores while on social wall
            $('#teamGrey').empty();
            $('#teamRed').empty();
            $('#teamPurple').empty();
            $('#teamTeal').empty();
            $('#teamBlue').empty();
            $('#individualLeaderboard').empty();
		    getScore();
		    
		    console.log('on after - initializing scoreboards while on video wall');
		    
	    } else {
		    console.log('nothing!');
	    }
	    
	});
	
	
	
	
	//DAVES SCOREBOARD CODE
		
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
	
	
	
	
	if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
		var server_path = "http://localhost:8080";
	}
		else {
	
		var server_path = "http://otew.io";
		}
	
	
	
	function truncateName (name){
	  
	  fullName = name.split(' ');
	  firstName = fullName[0];
	  lastInitial = fullName[fullName.length - 1].charAt(0);
	  
	  return firstName + ' ' + lastInitial;
	}
	
	function getPoints(team){
	   
	    var jqxhr = $.getJSON(server_path + "/api/get_points/" + team )
	   
	          .done(function(response) {
	              return response.points;
	          }).error(function(){console.log('error grabbing points');}).complete(function(){
	
	              duplicatePointsData();
	              $(".points").digits();
	              reOrderRows();
	              console.log('grabbing ' + team +' points is done now!')}) ;
	    
	}	
	function getScore(){
	
	    var jqxhr = $.getJSON(server_path + "/api/get_scores")
	
	          .done(function(response) {
	
	              //--OVERALL--
	
	              $('#blPoints').attr("data-points", response.overallScores.Blue);
	              $('#grPoints').attr("data-points", response.overallScores.Grey);
	              $('#tlPoints').attr("data-points", response.overallScores.Teal);
	              $('#rdPoints').attr("data-points", response.overallScores.Red);
	              $('#plPoints').attr("data-points", response.overallScores.Purple);
	
	
				//$(team).text(data);
	//---Team Rankings:--
			var teamLeaders = response.teamLeaders
	
	
	            var redTeamLeaders = teamLeaders.Red;
	            var greyTeamLeaders = teamLeaders.Grey;
	            var tealTeamLeaders = teamLeaders.Teal;
	            var purpleTeamLeaders = teamLeaders.Purple;
	            var blueTeamLeaders = teamLeaders.Blue;
	
	            $('#teamRed').append('<h1>Team Red Rankings</h1>');
	            $('#teamRed').append('<div class="teamBadge"></div>');
	            $('#teamRed').append('<div class="rows" id="redRow">');
	            for (var r in redTeamLeaders) {
	                if (redTeamLeaders.hasOwnProperty(r)) {
	
	                    name = truncateName(redTeamLeaders[r].name);
	
	
	                    $('#redRow').append('<div class="row red' + r + '" data-points="' + redTeamLeaders[r].total + '">');
	                    $('.red' + r).append('<div class="rank">');
	                    $('.red' + r).append('<div class="teamIcon">');
	                    $('.red' + r).append('<div class="name">' + name + '</div>');
	                    $('.red' + r).append('<div class="points">');
	                }
	            }
	
	              $('#teamGrey').append('<h1>Team Grey Rankings</h1>');
	              $('#teamGrey').append('<div class="teamBadge"></div>');
	              $('#teamGrey').append('<div class="rows" id="greyRow">');
	              for (var g in greyTeamLeaders) {
	                  if (greyTeamLeaders.hasOwnProperty(g)) {
	
	                      name = truncateName(greyTeamLeaders[g].name);
	
	
	                      $('#greyRow').append('<div class="row grey' + g + '" data-points="' + greyTeamLeaders[g].total + '">');
	                      $('.grey' + g).append('<div class="rank">');
	                      $('.grey' + g).append('<div class="teamIcon">');
	                      $('.grey' + g).append('<div class="name">' + name + '</div>');
	                      $('.grey' + g).append('<div class="points">');
	                  }
	              }
	
	              $('#teamTeal').append('<h1>Team Teal Rankings</h1>');
	              $('#teamTeal').append('<div class="teamBadge"></div>');
	              $('#teamTeal').append('<div class="rows" id="tealRow">');
	              for (var t in tealTeamLeaders) {
	                  if (tealTeamLeaders.hasOwnProperty(t)) {
	
	                      name = truncateName(tealTeamLeaders[t].name);
	
	
	                      $('#tealRow').append('<div class="row teal' + t + '" data-points="' + tealTeamLeaders[t].total + '">');
	                      $('.teal' + t).append('<div class="rank">');
	                      $('.teal' + t).append('<div class="teamIcon">');
	                      $('.teal' + t).append('<div class="name">' + name + '</div>');
	                      $('.teal' + t).append('<div class="points">');
	                  }
	              }
	
	
	              $('#teamPurple').append('<h1>Team Purple Rankings</h1>');
	              $('#teamPurple').append('<div class="teamBadge"></div>');
	              $('#teamPurple').append('<div class="rows" id="purpleRow">');
	              for (var p in purpleTeamLeaders) {
	                  if (purpleTeamLeaders.hasOwnProperty(g)) {
	
	                      name = truncateName(purpleTeamLeaders[p].name);
	
	
	                      $('#purpleRow').append('<div class="row purple' + p + '" data-points="' + purpleTeamLeaders[p].total + '">');
	                      $('.purple' + p).append('<div class="rank">');
	                      $('.purple' + p).append('<div class="teamIcon">');
	                      $('.purple' + p).append('<div class="name">' + name + '</div>');
	                      $('.purple' + p).append('<div class="points">');
	                  }
	              }
	
	              $('#teamBlue').append('<h1>Team Blue Rankings</h1>');
	              $('#teamBlue').append('<div class="teamBadge"></div>');
	              $('#teamBlue').append('<div class="rows" id="blueRow">');
	              for (var b in blueTeamLeaders) {
	                  if (blueTeamLeaders.hasOwnProperty(b)) {
	
	                      name = truncateName(blueTeamLeaders[b].name);
	
	
	                      $('#blueRow').append('<div class="row blue' + t + '" data-points="' + blueTeamLeaders[b].total + '">');
	                      $('.blue' + b).append('<div class="rank">');
	                      $('.blue' + b).append('<div class="teamIcon">');
	                      $('.blue' + b).append('<div class="name">' + name + '</div>');
	                      $('.blue' + b).append('<div class="points">');
	                  }
	              }
	
	var overallLeaders = response.overallLeaders;
	
	for (var x in overallLeaders){
		if(overallLeaders.hasOwnProperty(x)) {
			if (overallLeaders[x].team == "Teal") { team = "teal"; icon = "tl"; }
			else if (overallLeaders[x].team == "Purple") { team = "purple"; icon = "pl"; }
			else if (overallLeaders[x].team == "Grey" ){ team = "grey"; icon = "gr"; }
			else if (overallLeaders[x].team == "Blue") { team = "blue"; icon = "bl"; }
			else if (overallLeaders[x].team == "Red") { team = "red"; icon = "rd"; }
			var board_id = "#teamrow" + x;
			var name = truncateName(overallLeaders[x].name);
	
	            if ($(board_id).length > 0){
	                $(board_id).remove();
	                            }
	            $('#individualLeaderboard').append('<div id="teamRow' + x +'" class="row" data-points="'+ overallLeaders[x].total +'">');
	            $('#teamRow' + x).append('<div class="rank">');
	            $('#teamRow' + x).append('<div class="teamIcon ' + team + '">');
	            $('#teamRow' + x).append('<div class="name">' + name + '</div>');
	            $('#teamRow' + x).append('<div class="points">');
	
	
	
	
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
	
	        for (var tweet in tweets){
	
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
	
		  for (var post in posts) {
	              var test = posts[post].content;
				  var unixtime = posts[post].created
				  unixtime = unixtime.toString().slice(0, -3);
	
				  if(posts[post].teamId){
	    			  
	    			  teamname = posts[post].teamId.toLowerCase() + 'Post';} else { teamname = 'noTeamPost'; }
	    			  
				  if(posts[post].photo){
			      var photoUrl = JSON.stringify(posts[post].photo.publicUrl).replace(/^"(.*)"$/, '$1');
			      teamname = teamname + ' photo';
			      }
				   
				  $('#socialWallContainer').append('<div class="socialPost ' + teamname + ' sourceOT" id="' + post + '"data-timestamp="' + unixtime +'">');
				  $('#'+ post).append('<span class="username">' + posts[post].creatorName + '</span>');
				  $('#'+ post).append('<span class="message">' + posts[post].content + '</span>');
			if(posts[post].photo){ $('#' + post).append('<img src=https://appworks.opentext.com/'+ photoUrl +' alt="" />');}
				   
				 
		      }
	
		  
		  
	 
	
	           
			   
	           })
	           .fail(function() {
	             console.log( "error" );
	           })
	           .always(function() {
	
	               startSocialWall();
	               replaceHashTags();
	             console.log( "complete" );
	           });
		
		
		
		
	}

	
	
	
	
   
	
});