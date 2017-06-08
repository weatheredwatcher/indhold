$(document).ready(function() {	
	
	/////////////////////////////
	//Carousel
	/////////////////////////////
	
	//initialize both carousels
	var mainCarousel = $('#videoWall');
	var innerCarousel = $('#individualByTeamCarousel');
	
	//Main Carousel
	mainCarousel.cycle({
		fx: 'scrollHorz',
		speed: 800,
	});
	
	// Inner carousel for individuals by team
	innerCarousel.cycle({
		fx: 'scrollVert',
		speed: 800,
		loop: 1
	});	
	
	function reinitializeInner() {
		innerCarousel.cycle({
			fx: 'scrollVert',
			speed: 800,
			loop: 1
		});
	}	
	
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
	
	//Advance main carousel when inner carousel completes
	innerCarousel.on('cycle-finished', function(e, opts, curr, next) {
		mainCarousel.cycle('next');
	});
	
	mainCarousel.on( 'cycle-after', function(e, opts, curr, next) {
	    
	    // Slide 0 - Individual leaderboards by Team
	    // Slide 1 - Team Leaderboard
	    // Slide 2 - Individual Leaderboard
	    // Slide 4 - Social Wall
	    // Slide 5 - Sponsor Loop
	    // Slide 6 - Prize Loop
	    
	    //reset all videos
	    		
		resetVideos();
	    
	    //fetches the current slide of the main carousel
	    var currentSlide = mainCarousel.data("cycle.opts").currSlide;
	    
	    //checks to see if current slide is leaderboards by team and pauses if true
	    if(currentSlide == 0) { //Team Carousel Slide
		    //innerCarousel.cycle('resume');
	    }
	    
	    //checks to see if current slide is leaderboards by team and pauses if true
	    if(currentSlide == 1) { //Team Carousel Slide
		    innerCarousel.cycle('destroy');
	    }
	    
	    //checks to see if current slide is sponsor loop
	    if(currentSlide == 4) { //Team Carousel Slide
		    sponsorLoopVideo.play();
	    }
	    
	    //checks to see if current slide is sponsor loop
	    if(currentSlide == 5) { //Team Carousel Slide
		    prizeLoopVideo.play();
	    }
	    
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
		jQuery.each($container, function (j) {
        	this.isotope('updateSortData').isotope();
        });
	 }, 2000);
	 
	 
	/////////////////////////////
	//SOCIAL WALL
	/////////////////////////////
	
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
	
	replaceHashTags();
	 
	
	/////////////////////////////
	//VIDEOS
	/////////////////////////////
	
	//Initialze Sponsor video
	var sponsorLoopVideo = document.getElementById("sponsorLoopVideo");
	sponsorLoopVideo.load();
		
	sponsorLoopVideo.onended = function() {
		mainCarousel.cycle('next');
	};

	//Initialze Prize video
	var prizeLoopVideo = document.getElementById("prizeLoopVideo");
	prizeLoopVideo.load();
		
	prizeLoopVideo.onended = function() {
		mainCarousel.cycle('next');
		reinitializeInner();
	};
	
	
	//Please be kind rewind
	function resetVideos() {
		sponsorLoopVideo.currentTime = 0;
		prizeLoopVideo.currentTime = 0;
	}


});