$(document).ready(function() {	
	
	/////////////////////////////
	//Carousel
	/////////////////////////////
	
	//initialize both carousels
	var mainCarousel = $('#pointGiver');
	
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
	

	//Carousel Functions
	window.selectedPoints = "";
	window.selectedTeam = "";
	
	$('.teamRow').click(function() {
		$('.teamRow').removeClass('selected');
		$(this).addClass('selected');
		window.selectedTeam = $(this).data('team');
		console.log($(this).data('team'));
		setTimeout(function(){
			mainCarousel.cycle('next');
		}, 500);
	});
	
	$('.pointRow').click(function() {
		$('.pointRow').removeClass('selected');
		$(this).addClass('selected');
		window.selectedPoints = $(this).data('points');
		console.log($(this).data('points'));
		if (selectedPoints != "" && selectedTeam != "") {
			$('#awardPointsButton').addClass('visible');
		} else {
			alert('There is an error in your selection, please make sure you have selected a team and point denomination');
		}
	});

	
	mainCarousel.on('cycle-after', function() {
		
		//gets current slide
		currSlide = ($(this).data("cycle.opts").currSlide);
		
		//if the carousel is swiped to slide #2, check to see if team value is selected, if not, send back to beginning
		if (currSlide == 1 && window.selectedTeam == "") {
			mainCarousel.cycle('goto', 0);
			alert("Please select a team");
		//if the carousel has gone back to slide #1, clear team and point selection
		} else if (currSlide == 0) {
			window.selectedPoints = "";
			window.selectedTeam = "";
			$('.pointRow').removeClass('selected');
			$('.teamRow').removeClass('selected');
			$('#awardPointsButton').removeClass('visible');
		}
		
	});	
	
	//Award Points Button
	$('#awardPointsButton').click(function(e) {
		e.preventDefault();
		
		//DAVE, CALL AJAX POST FUNCTIONS HERE, ON CONFIRMATION OF SUCCESSFUL POST, CALL THESE FUNCTIONS:
		var points = [(window.selectedPoints), (window.selectedTeam), $('#user_id').val()];
			console.log(points);
			$.ajax({        
			       type: "POST",
			       url: "/postPoints",
				   data: { points: points },
			       success: function() {
		   			alert('Points awarded successfully');
		   			resetInterface();
			       }
			    }); 
			
	});
	
	//reset the interface
	function resetInterface() {
		
		window.selectedPoints = "";
		window.selectedTeam = "";
		$('.teamRow, .pointRow').removeClass('selected');
		mainCarousel.cycle('goto', 0);
		$('#awardPointsButton').removeClass('visible');
	}


});