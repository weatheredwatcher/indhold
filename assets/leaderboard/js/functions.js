$(document).ready(function() {	
	
	//INITIALIZE
	
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
	    
	
	// Dave Can we add these functions as a call back to your getScore(); function to execute when complete?
	// reOrderRows();
	// duplicatePointsData();
	// $(".points").digits();
	

	//FUNCTIONS
	
	//Add commas to numbers
	$.fn.digits = function(){ 
	    return this.each(function(){ 
	        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
	    })
	}	
	

	// Move data attribute into points div
	function duplicatePointsData() {
		$('.row').each(function() {
			var pointValue = $(this).attr('data-points');
			$(this).find('.points').html(pointValue);
			$(this).find('.points').digits();
		});
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
		
	}



	//SOCIAL WALL
	
	function initSocialWall() {
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
	replaceHashTags();
   

    setTimeout(function() {
        initSocialWall();
    }, 8000);

    
    
    //Function to trigger based on slide
    $('.cycle-slideshow').on('cycle-after', function() {
	    
	    //get current slide
	    var currentSlide = $('.cycle-slideshow').data("cycle.opts").currSlide;
	    //leaderboards starts on slide 0
	    var firstLeaderboard = 0;
	    //social wall is slide 7
	    var socialWall = 7;
	    
	    
	    if (currentSlide == firstLeaderboard) {
		    
		    //get posts while cycling through leaderboards
		    getPosts();
		    
	    } else if (currentSlide == socialWall) {
		    
		    //get scores while on social wall
		    getScore();
		    
	    } else {
		    //do nothing
	    }
	    
	});
   
	
});