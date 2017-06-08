$(document).ready(function() {	
	
	/////////////////////////////
	//Carousel
	/////////////////////////////
	
	//initialize both carousels
	var mainCarousel = $('#videoWall');
	//var innerCarousel = $('#individualByTeamCarousel');
	
	//Main Carousel
	mainCarousel.cycle({
		fx: 'scrollHorz',
		speed: 800,
	});

	
	//keyboard functions for testing
	$(document).keydown(function(e) {
	    switch(e.which) {
	        case 37: // left
	        mainCarousel.cycle('prev');
	        break;
	
	        case 39: // right
	        mainCarousel.cycle('next');
	        break;
	
	        default: return; // exit this handler for other keys
	    }
	    e.preventDefault(); // prevent the default action (scroll / move caret)
	});	    
	    
	
	/////////////////////////////
	//LEADERBOARDS
	/////////////////////////////
	
	//Add commas to numbers
	$.fn.digits = function(){ 
	    return this.each(function(){ 
	        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
	    })
	}
	//run this function when points get added
	$(".points").digits();
	
	//Leaderboard sorting
	var $container = [$('#overallLeaderboard'), $('#individualLeaderboard'), $('.teamScoreboard')];
	
	jQuery.each($container, function (j) {
        this.isotope({
        getSortData: {
				number: '.points parseInt'
		},
		  	itemSelector: '.teamRow',
		  	layoutMode: 'vertical',
		  	sortBy: 'number',
		  	sortAscending: false,
		  	percentPosition: true,
		  	columnWidth: 40
        });

    });
	
	//Update rankings on an interval
	//Need to change this function to run only when text changes
	setInterval(function(){ 
		$('#overallLeaderboard').isotope('updateSortData').isotope();
		$('#individualLeaderboard').isotope('updateSortData').isotope();
		$('.teamScoreboard').isotope('updateSortData').isotope();
	 }, 2000);
	 
	 
	/////////////////////////////
	//SOCIAL WALL
	/////////////////////////////
	function initSocialWall() {
		$('#socialWallContainer').isotope({
			  itemSelector: '.socialPost',
			  getSortData: {
			      timestamp: '[data-timestamp] parseInt'
			  },
			  layoutMode: 'packery',
			  percentPosition: true,
			  sortBy: 'timestamp',
			  sortAscending: false
	    });
	}
    

    
    //Find hashtags and style appropriately
    
    hashtag_regexp = /#([a-zA-Z0-9]+)/g;
    function replaceHashTags() {
	     $('span.message').each(function() {
	        $(this).html(spanHashtags($(this).html()));
	    });
    }
    
    setInterval(function() {
	    $('span.message').each(function() {
	        $(this).html(spanHashtags($(this).html()));
	    });
    }, 10000);

	function spanHashtags(text) {
	    return text.replace(
	        hashtag_regexp,
	        '<span class="hashtag">#$1</a>'
	    );
	} 
	
	replaceHashTags();
	 
	
	/////////////////////////////
	//VIDEOS
	/////////////////////////////

	//Initialze Prize video
	/*
	var prizeLoopVideo = document.getElementById("prizeLoopVideo");
	prizeLoopVideo.load();
		
	prizeLoopVideo.onended = function() {
		mainCarousel.cycle('next');
		reinitializeInner();
	};
	*/
	
	/* Init Data */
	
	getPosts();
	getScore();
    setTimeout(function() {
		initSocialWall();
	}, 8000);
	
	setInterval(function() {
		$(".points").digits();
	}, 1000)

	
	//Please be kind rewind
	function resetVideos() {
		//prizeLoopVideo.currentTime = 0;
	}
	
	//triggers on carousel function
	mainCarousel.on( 'cycle-after', function(e, opts, curr, next) {
	    
	    
	    //fetches the current slide of the main carousel
	    var currentSlide = mainCarousel.data("cycle.opts").currSlide;
	    
	    //checks to see if current slide is leaderboards by team and pauses if true
	    if(currentSlide == 0) { //Team Carousel Slide
		   $('#socialWallContainer').isotope('destroy');
		    $('#socialWallContainer').empty();
		    getPosts();
		    setTimeout(function() {
				initSocialWall();
			}, 8000);   
	    }
	    
	    
	    if(currentSlide == 7) {
		    //$('#socialWallContainer').empty();
		   	getScore();
		   	
		   	$.getJSON('http://otew.io/grab-tweets').error(function(){ console.log('error');}).complete(function(){ console.log('tweet points complete');});
		}
	    
	});
	
	//Truncate last names
	/*
	setTimeout(function() {
		$('#individualLeaderboard .teamName, .leaderboardIndividualByTeam .teamName').each(function() {
			var person = $(this).text();
			
			var fullName = person.split(' '),
				firstName = fullName[0],
				lastInitial = fullName[fullName.length - 1].charAt(0);
				
			var truncatedName = firstName + ' ' + lastInitial;

			console.log(truncatedName);
		});
	}, 5000);
	*/

});