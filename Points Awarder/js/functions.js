$(document).ready(function() {	
	
	/////////////////////////////
	//Carousel
	/////////////////////////////
	
	//initialize both carousels
	var mainCarousel = $('#pointGiver');
	
	//initally hide resetButton
	$('#resetButton').fadeOut(0);
	
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
	window.pointType = "";
	window.personsName = "";
	
	
	$('#individualButton').click(function(e) {
		e.preventDefault();
		window.pointType = "individual";
		setTimeout(function(){
			mainCarousel.cycle('goto', 1);
		}, 500);
	});
	
	$('#teamButton').click(function(e) {
		e.preventDefault();
		window.pointType = "team";
		setTimeout(function(){
			mainCarousel.cycle('goto', 2);
		}, 500);
	});
	
	$('#nextButton').click(function(e) {
		e.preventDefault();
		window.personsName = $('#recipientName').val()
		if (window.personsName == "") {
			alert("Please enter a name");
		} else {
			setTimeout(function(){
				mainCarousel.cycle('goto', 3);
			}, 500);	
		}
	});
	
	$('#resetButton').click(function(e) {
		setTimeout(function(){
			resetInterface()
		}, 300);
	});
	
	
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
		$('#awardPointsButton').addClass('visible');
	});



	
	mainCarousel.on('cycle-after', function() {
		
		//gets current slide
		currSlide = ($(this).data("cycle.opts").currSlide);
		
		if (currSlide == 0) {
			$('#resetButton').fadeOut(300);
		} else {
			$('#resetButton').fadeIn(300);
		}

	});	
	
	//Award Points Button
	$('#awardPointsButton').click(function(e) {
		e.preventDefault();
		
		if (window.pointType == "individual") {
			
			//DAVE, CALL AJAX POST FUNCTIONS HERE, ON CONFIRMATION OF SUCCESSFUL POST, CALL THESE FUNCTIONS:
			var points = [(window.selectedPoints), (window.personsName), $('#user_id').val()];
			console.log(points);
			$.ajax({        
			       type: "POST",
			       url: "/postPointsIndividual",
				   data: { points: points },
			       success: function() {
		   			alert('Individual points awarded successfully');
		   			resetInterface();
			       }
			});
			
		} else {
		
			//DAVE, CALL AJAX POST FUNCTIONS HERE, ON CONFIRMATION OF SUCCESSFUL POST, CALL THESE FUNCTIONS:
			var points = [(window.selectedPoints), (window.selectedTeam), $('#user_id').val()];
			console.log(points);
			$.ajax({        
			       type: "POST",
			       url: "/postPoints",
				   data: { points: points },
			       success: function() {
		   			alert('Team points awarded successfully');
		   			resetInterface();
			       }
			});
			
		} 
			
	});
	
	//reset the interface
	function resetInterface() {
		
		window.pointType == ""
		window.personsName == ""
		window.selectedPoints = "";
		window.selectedTeam = "";
		$('#recipientName').val("");
		$('.teamRow, .pointRow').removeClass('selected');
		mainCarousel.cycle('goto', 0);
		$('#awardPointsButton').removeClass('visible');
	}


});