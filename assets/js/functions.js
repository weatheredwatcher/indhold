$(document).ready(function() {	
	
	//vertically centering divs
		$('#welcomeMessage').flexVerticalCenter();
			
		enquire.register("screen  and (min-width : 768px)", {
	
		    match : function() {
			    $('#turntableContainer').addClass("vert");
			    $('.vert').flexVerticalCenter();
		    },      
		                                
		    unmatch : function() {
				$('#turntableContainer').removeClass("vert"); 
		    },    
		      
		});
	
	
	//Preloader
		function popUp() {
			$('#welcomeMessage').fadeIn({queue: false, duration: 'slow'});
			$('#welcomeMessage').velocity({ translateY: "-30px" }, { duration: 600 });
		}
	
		$(window).load(function() { // makes sure the whole site is loaded
            $('.spinner').fadeOut(); // will first fade out the loading animation
            $('#preloader').delay(350).fadeOut('slow', function() {
				popUp();
            }); // will fade out the white DIV that covers the website.
       	})
	
	
	//Initialize Music
		var music = document.getElementById("ewSong");
		music.load();
		
		music.onended = function() {
		    location.href='http://www.opentext.com/campaigns/enterprise-world-2016/why-attend';
		};
		

	//Animation Functions
	function closeModal() {
		$('#welcomeMessage').velocity({ 
			translateY: "30px",
			opacity: 0.0
		}, { 
			duration: 600,
			complete: function() {
				fadeOutModal();
			}
		});
	}
	
	function fadeOutModal() {
		$('#modal').velocity({ 
			opacity: 0.0 
		}, { 
			duration: 1500,
			complete: function() {
				$('#modal').css({display:"none"});
				startTurntable();
			}
		});
	}
	
	function spinTurntable() {
		$('#record').velocity({ 
		    rotateZ: "360deg"
		}, { 
			loop: true,
			duration: 4000,
			easing: [200]
		});	
	}
	
	function toneArmStart() {
		$('#tonearm').velocity({ 
			rotateZ: "18deg"
		}, {
			easing: "ease-in-out",
			duration: 3000,
			complete: function() {
				music.play();
				toneArmPlay();
			}
		});
	}
	
	function toneArmPlay() {
		$('#tonearm').velocity({ 
			rotateZ: "41deg"
		}, {
			duration: 58000
		});
	}
	
	function startTurntable(){
		spinTurntable();
		toneArmStart();	
	}

	
	//Interaction Functions
	
		//$('#playButton').click(function(){
		//	closeModal();
		//});
	
		$('#playButton').bind('touchstart click', function(){
			music.play();
			closeModal();
		});
		

	//Disable touch specific featyres
	
		//disable double tap to zoom
		$('*').nodoubletapzoom();
		
		//disable default functionality for touchmove
		document.ontouchmove = function(event){
		    event.preventDefault();
		}
		$(document).bind('touchmove', function(e) {
	    	e.preventDefault();
		});
	
});