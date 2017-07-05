$(document).ready(function() {	
	
	/////////////////////////////
	//Carousel
	/////////////////////////////
	
	//initialize both carousels
	var mainCarousel = $('#videoWall');
	
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
	var $container = [$('.leaderboard')];
	
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
	 
	 //for first run:
	 jQuery.each($container, function (j) {
        	this.isotope('updateSortData').isotope();
        });
	


});