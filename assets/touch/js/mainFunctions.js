$(document).ready(function() {
	
	
	//DISABLING FUNCTIONS FOR TOUCHSCREEN
	
	//Prevent right click context menu
	$("body").bind("contextmenu",function(){
       return false;
    }); 
    
    //Reduce cpu consumption for animations
    jQuery.fx.interval = 50;
    
    
	//Disable Touch Scroll
    $(document).bind('touchmove', function(e) {
		e.preventDefault();
	});
	
	//init hide menu button
	hideTopButtons();
	
	//initiate local storage
	storage=$.localStorage;
	
	
	
	//GET VARIABLE FROM URL FOR EXPO HALL INSTALLTION
	var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
	};
	
	var expoHall = getUrlParameter('expo');
	
	
	
	
	//ANALYTICS
	
	//Local Analytics, check if storage exists to track section clicks, if not, create them
    if(storage.isSet('HomeClicks')) { /*do nothing*/ } else { storage.set('HomeClicks',0); }
    if(storage.isSet('AgendaClicks')) { /*do nothing*/ } else { storage.set('AgendaClicks',0); }
    if(storage.isSet('VenueMapClicks')) { /*do nothing*/ } else { storage.set('VenueMapClicks',0); }
    if(storage.isSet('EnterpriseExpoClicks')) { /*do nothing*/ } else { storage.set('EnterpriseExpoClicks',0); }
    if(storage.isSet('SponsorsClicks')) { /*do nothing*/ } else { storage.set('SponsorsClicks',0); }
    if(storage.isSet('SocialClicks')) { /*do nothing*/ } else { storage.set('SocialClicks',0); }
    if(storage.isSet('NetworkingClicks')) { /*do nothing*/ } else { storage.set('NetworkingClicks',0); }
    if(storage.isSet('TeamTweetClicks')) { /*do nothing*/ } else { storage.set('TeamTweetClicks',0); }
	
	//Touch and hold on header logo to reveal statistics
	//$('#tagline img').on("taphold", {duration: 6000}, function(){
	$('#ewtagline img').click(function(){
		var HomeTotalClicks = storage.get('HomeClicks');
		var AgendaTotalClicks = storage.get('AgendaClicks');
		var VenueMapTotalClicks = storage.get('VenueMapClicks');
		var EnterpriseExpoTotalClicks = storage.get('EnterpriseExpoClicks');
		var SponsorsTotalClicks = storage.get('SponsorsClicks');
		var SocialTotalClicks = storage.get('SocialClicks');
		var NetworkingTotalClicks = storage.get('NetworkingClicks');
		var TeamTweetsTotalClicks = storage.get('TeamTweetClicks');
		
		console.log(
			"Home: " + AgendaTotalClicks
			+'\n'+
			"Agenda: " + AgendaTotalClicks
			+'\n'+
			"Venue Map: " + VenueMapTotalClicks
			+'\n'+
			"Enterprise Expo: " + EnterpriseExpoTotalClicks
			+'\n'+
			"Sponsors: " + SponsorsTotalClicks
			+'\n'+
			"Social: " + SocialTotalClicks
			+'\n'+
			"Networking: " + NetworkingTotalClicks
			+'\n'+
			"Team Tweet: " + TeamTweetsTotalClicks
		);
	});
    
    ////////////////////////////////////////////////////////////////////////
	//GOOGLE ANALYTICS
	////////////////////////////////////////////////////////////////////////
   	
    ga_storage._setAccount('UA-56000503-4'); //Replace with your own
    ga_storage._trackPageview('/home', 'Home');
    ga_storage._setDomain('none');
	
			
   	// Home Screen and Slide Menu button tracking
   	
   	//Home Buttons
   	$('.sideMenuHome').on('click', function() {
		ga_storage._trackPageview('/agenda', 'Agenda');
		var homeTotal = storage.get('HomeClicks') + 1;
		storage.set('HomeClicks',homeTotal);
	});
   	
   	//Agenda Buttons
   	$('#homemenu-agenda a, .sideMenuAgenda').on('click', function() {
		ga_storage._trackPageview('/agenda', 'Agenda');
		var agendaTotal = storage.get('AgendaClicks') + 1;
		storage.set('AgendaClicks',agendaTotal);
	});
	
	$('#homemenu-venuemap a, .sideMenuVenueMap').on('click', function() {
		ga_storage._trackPageview('/venueMap', 'Venue Map');
		var venueTotal = storage.get('VenueMapClicks') + 1;
		storage.set('VenueMapClicks',venueTotal);
	});
   	
   	$('#homemenu-enterpriseexpo a, .sideMenuEnterpriseExpo').on('click', function() {
		ga_storage._trackPageview('/enterpriseExpo', 'Enterprise Expo');
		var enterpriseExpoTotal = storage.get('EnterpriseExpoClicks') + 1;
		storage.set('EnterpriseExpoClicks',enterpriseExpoTotal);
	});
	
	$('#homemenu-sponsors a, .sideMenuSponsors').on('click', function() {
		ga_storage._trackPageview('/sponsors', 'Sponsors');
		var sponsorsTotal = storage.get('SponsorsClicks') + 1;
		storage.set('SponsorsClicks',sponsorsTotal);
	});
	
	$('#homemenu-social a, .sideMenuSocial').on('click', function() {
		ga_storage._trackPageview('/social', 'Social');
		var socialTotal = storage.get('SocialClicks') + 1;
		storage.set('SocialClicks',socialTotal);
	});
	
	$('#homemenu-networking a, .sideMenuNetworking').on('click', function() {
		ga_storage._trackPageview('/networking', 'Networking');
		var networkingTotal = storage.get('NetworkingClicks') + 1;
		storage.set('NetworkingClicks',networkingTotal);
	});
	
	$('#homemenu-teamtweet a, .sideMenuTeamTweet').on('click', function() {
		ga_storage._trackPageview('/teamTweet', 'Team Tweet');
		var teamTweetTotal = storage.get('TeamTweetClicks') + 1;
		storage.set('TeamTweetClicks',teamTweetTotal);
	});
	
	//track sponsor clicks
	$('#platinum').on('click', function() {
		ga_storage._trackEvent('sponsors', 'click', 'platinum');
	});
	$('#gold').on('click', function() {
		ga_storage._trackEvent('sponsors', 'click', 'gold');
	});
	$('#silver').on('click', function() {
		ga_storage._trackEvent('sponsors', 'click', 'silver');
	});
	$('#bronze').on('click', function() {
		ga_storage._trackEvent('sponsors', 'click', 'bronze');
	});
	$('#pod').on('click', function() {
		ga_storage._trackEvent('sponsors', 'click', 'pod');
	});
	$('#promotional').on('click', function() {
		ga_storage._trackEvent('sponsors', 'click', 'promotional');
	});
	
	//track venue clicks
	$('#level1').on('click', function() {
		ga_storage._trackEvent('venuemap', 'click', 'Level1');
	});
	$('#level2').on('click', function() {
		ga_storage._trackEvent('venuemap', 'click', 'Level2');
	});
	$('#level3').on('click', function() {
		ga_storage._trackEvent('venuemap', 'click', 'Level3');
	});
	
	
	//track agenda clicks
	$('#agendaHome').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'Home(Agenda)');
	});
	$('#agendaOverview').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'Overview');
	});
	$('#agendaUpdates').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'Updates');
	});
	$('#agendaSunday').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'Sunday');
	});
	$('#agendaMonday').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'Monday');
	});
	$('#agendaTuesday').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'Tuesday');
	});
	$('#agendaWednesday').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'Wednesday');
	});
	$('#agendaThursday').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'Thursday');
	});
	$('#agendaFriday').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'Friday');
	});
	$('#agendaSAPTracks').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'SAPFocusTracks');
	});
	$('#agendaInnovationLab').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'InnovationLab');
	});
	$('#agendaDeveloper').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'DeveloperLab');
	});
	
	//track team tweet clicks
	$('#leaderboard').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'Leaderboard');
	});
	$('#teams').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'Teams');
	});
	$('#howtoscore').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'HowToScore');
	});
	$('#prizes').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'Prizes');
	});

	
	//AJAX CALL TO GRAB NUMBER OF UPDATES PUBLISHED WITHIN UPDATES DATABASE
	//THIS NUMBER IS DISPLAYED ON ALL UPDATE BADGES
	
	function getNotificationCount() {
		$.ajax({ 
			url: "notifications.php", 
			dataType:"json",
			success: function (data) {
				var notificationCount = data.notificationCount;
				if (notificationCount != 0) {
					$('.notificationContainer').html('<span>'+notificationCount+'</span>');
					$('.notificationContainer').css({'visibility': 'visible'});
				} else {
					$('.notificationContainer').css({'visibility': 'hidden'});	
				}
	        }
	    });
	}
	
	getNotificationCount();
	
	// repeats function at interval
	setInterval(function() {
		getNotificationCount();
	}, 60000);

	
	
	//TIMEOUT FUNCTIONS + RESETTING
	
	//Start the Idle Timer, when timer runs out the reset function is executes
    $.idleTimer(120000);
    $(document).bind("idle.idleTimer", function() {
        if($('body').hasClass('viewing-page-1') && expoHall!="yes") {
	    	// do nothing   
	    } else  if($('body').hasClass('viewing-page-1') && expoHall=="yes") {
		    triggerModal();
		} else  if($('body').hasClass('viewing-page-4') && expoHall=="yes") {
			//do nothing
		} else {    
		    triggerModal();
	    }
    });
    
    //goes home, and resets entire session (mainly used for session timeout)
    function resetUI() {
	    if (expoHall == "yes") {
		    goExpo();
	    } else {
		    goHome();
	    }
	    closeModal();
	    resetAllCarousels();
	    resetExpo();
    }
    
    //resets all of the carousels and sets initial menu item on submenu
    function resetAllCarousels() {
	    
	     //reset the default selection on all submenus
	    $('.sidebar ul.subMenu li a').removeClass('subMenuSelected');
	    $('.sidebar ul.subMenu li:first-child a').addClass('subMenuSelected');
	    
	    //SPONSORS
	    //reset sponsors carousel
	    $('#carouselSponsors.cycle-slideshow').cycle('goto', 0);
	    
	    //VENUE MAP
	    //reset venue map carousel
	    defaultLevel2 = storage.get('defLevel');
	    $('#carouselVenueMap.cycle-slideshow').cycle('goto', defaultLevel2);
	    
	    //remove selected state for all sub menu items
	    $('#venueMapMenu li a').removeClass('subMenuSelected');
	    
	    //select menu item for default level
	    $('#venueMapMenu li a[data-map=' + defaultLevel2 + ']').addClass('subMenuSelected');
	    
	    //Team TWEET
	    //reset venue map carousel
	    
	    $('#carouselTeamTweet.cycle-slideshow').cycle('goto', 0);
	    
	    //AGENDA
	    //reset venue map carousel
	    
		$('#carouselAgenda.cycle-slideshow').cycle('goto', 0);
	    
	    //reset check level on venue map carousel
	    checkLevel();
	    
	   // sponsorTarget = 0;
		//venueMapTarget = 0; 
		//tweetTarget = 0;
		agendaTarget = 0;
	    
    }
    
    function resetExpo() {
	    $('#otPods').mCustomScrollbar("scrollTo","top");
		$('#partnerPods').mCustomScrollbar("scrollTo","top");
		$('.expoRow').removeClass('rowSelected');
		$("#marker").css({'visibility': 'hidden'});	
    }
    
    
    
    
    
    //ANIMATION FUNCTIONS
    
    //Control the header movement
    function headerMove() {
	    
	    if($('body').hasClass('viewing-page-1')) {
			$('#ewlogo').stop().velocity({
				properties: { top: '160px' },
				options: { speed: 600 },
				easing: "ease-out"
			});
		} else {
			$('#ewlogo').stop().velocity({
				properties: { top: '52px' },
				options: { speed: 100 },
				easing: "ease-out"
			});
		}
		
    }

	//Sequences for home screen
	function revealHome() {
		
		setTimeout(function () {
			$('#homemenu-agenda').stop().velocity({
				properties: { opacity: 1 },
				options: { duration: 200 },
				easing: "ease-out"
			});
		}, 200);				
			
			
		setTimeout(function () {
			$('#homemenu-venuemap').stop().velocity({
				properties: { opacity: 1 },
				options: { duration: 200 },
				easing: "ease-out"
			});
		}, 300);
		
		
		setTimeout(function () {
			$('#homemenu-enterpriseexpo').stop().velocity({
				properties: { opacity: 1 },
				options: { duration: 200 },
				easing: "ease-out"
			});
		}, 400);
		setTimeout(function () {
			$('#homemenu-networking').stop().velocity({
				properties: { opacity: 1 },
				options: { duration: 200 },
				easing: "ease-out"
			});
		}, 500);
		setTimeout(function () {
			$('#homemenu-social').stop().velocity({
				properties: { opacity: 1 },
				options: { duration: 200 },
				easing: "ease-out"
			});
		}, 600);
		setTimeout(function () {
			$('#homemenu-teamtweet').stop().velocity({
				properties: { opacity: 1 },
				options: { duration: 200 },
				easing: "ease-out"
			});
		}, 700);
		
		setTimeout(function () {
			$('#homemenu-sponsors').stop().velocity({
				properties: { opacity: 1 },
				options: { duration: 200 },
				easing: "ease-out"
			});
		}, 800);
	}
		
		
	// hide the menu button
	function hideTopButtons() {
		$('#menuButton').stop().delay(100).velocity({
			properties: { opacity: 0, scale: "0%" },
			options: { duration: 200 },
			easing: "ease-out",
		});
		$('#homeButton').stop().velocity({
			properties: { opacity: 0, scale: "0%" },
			options: { duration: 200 },
			easing: "ease-out",
		});
		$('body').removeClass('blurBg');
	}	
	
	// show the menu button
	function showTopButtons() {
		$('#menuButton').stop().delay(100).velocity({
			properties: { opacity: 1, scale: "100%" },
			options: { duration: 200 },
			easing: "ease-out",
		});
		$('#homeButton').stop().velocity({
			properties: { opacity: 1, scale: "100%" },
			options: { duration: 200 },
			easing: "ease-out",
		});
		$('body').addClass('blurBg');
	}	
	
	
	// loop button highlighting
   	window.setInterval(function(){
	   	if($('body').hasClass('viewing-page-1')) {
			highlightButtons();
		}
   	}, 12000);
	
	//Highlight buttons
    function highlightButtons() {   
	    $('#homemenu-agenda').animate({backgroundColor: "rgba(125,125,125,0.5)"}, 500, function(){
		   $(this).animate({backgroundColor: "rgba(255,255,255,0.08)"}, 500, function(){
		   		$('#homemenu-venuemap').animate({backgroundColor: "rgba(125,125,125,0.5)"}, 500, function(){
		   			$(this).animate({backgroundColor: "rgba(255,255,255,0.08)"}, 500, function(){
		   				$('#homemenu-enterpriseexpo').animate({backgroundColor: "rgba(125,125,125,0.5)"}, 500, function(){
		   					$(this).animate({backgroundColor: "rgba(255,255,255,0.08)"}, 500, function(){
		   						$('#homemenu-networking').animate({backgroundColor: "rgba(125,125,125,0.5)"}, 500, function(){
		   							$(this).animate({backgroundColor: "rgba(255,255,255,0.08)"}, 500, function(){
		   								$('#homemenu-social').animate({backgroundColor: "rgba(125,125,125,0.5)"}, 500, function(){
		   									$(this).animate({backgroundColor: "rgba(255,255,255,0.08)"}, 500, function(){
		   										$('#homemenu-teamtweet').animate({backgroundColor: "rgba(125,125,125,0.5)"}, 500, function(){
		   											$(this).animate({backgroundColor: "rgba(255,255,255,0.08)"}, 500, function(){
		   												$('#homemenu-sponsors').animate({backgroundColor: "rgba(125,125,125,0.5)"}, 500, function(){
		   													$(this).animate({backgroundColor: "rgba(255,255,255,0.08)"}, 200, function(){
		   													});
		   												});
		   											});
		   										});
		   									});
		   								});
		   							});
		   						});
		   					});
		   				});
		   			});
		   		});
		    });
	    });
    }
		
		
		
		
		
		
		
	//PAGE TRANSITIONS

	// Initiate One Page Scroll Navigation
	$(".main").onepage_scroll({
	   sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
	   easing: "ease-in-out",             	// Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", 
	   beforeMove: beforePageTransition,
	   afterMove: afterPageTransition,
	   animationTime: 500,             	// AnimationTime let you define how long each section takes to animate
	   pagination: false,               // You can either show or hide the pagination. Toggle true for show, false for hide.
	   updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
	   loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
	   keyboard: true,                  // You can activate the keyboard controls
	   mousewheel: false,  
	   direction: "horizontal",        // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
	   responsiveFallback: false       // You can fallback to normal page scroll by defining the width of the browser in which
	});
	
	
	//Before Move Functions
	function beforePageTransition() {
		
		//control header position
		headerMove();
		
		//toggle slide menu
		closeSlideMenu();
		
		//Section dependent
		if($('body').hasClass('viewing-page-1')) {
			$('.cycle-slideshow').cycle('goto', 0);
			hideTopButtons();
		} else if ($('body').hasClass('viewing-page-2')) {
			$('.cycle-slideshow').cycle('goto', 1);
			showTopButtons();
		} else if ($('body').hasClass('viewing-page-3')) {
			$('.cycle-slideshow').cycle('goto', 2);
			showTopButtons();
		} else if ($('body').hasClass('viewing-page-4')) {
			$('.cycle-slideshow').cycle('goto', 3);
			showTopButtons();
		} else if ($('body').hasClass('viewing-page-5')) {
			$('.cycle-slideshow').cycle('goto', 4);
			showTopButtons();
		} else if ($('body').hasClass('viewing-page-6')) {
			$('.cycle-slideshow').cycle('goto', 5);
			showTopButtons();
		} else if ($('body').hasClass('viewing-page-7')) {
			$('.cycle-slideshow').cycle('goto', 6);
			showTopButtons();
		} else {
			$('.cycle-slideshow').cycle('goto', 7);
			showTopButtons();
		}
		
		resetAllCarousels();
	}
	
	
	//After Move Functions
	
	function afterPageTransition() {
		
		if($('body').hasClass('viewing-page-1')) {
			revealHome();
		} else {
			clearHome();
		}

		resetExpo();
	}
	
	
	//Clear Home Screen
	function clearHome() {
		
		$('#homemenu li').css({'opacity': 0});
		
	}
	
	
	
	// NAVIGATION FUNCTIONS
	
	//Home menu click functions
	$('#homemenu li a, #slideMenu ul li a').click(function(){
		pageTarget = $(this).data('index');
	   changePage(pageTarget);
   	});
	
	//Function to change page using One Page Scroll Plugin
	function changePage(pageTarget) {
	   	$('.main').moveTo(pageTarget);
   	} 
	
	$('#menuButton').click(function(){
		$(this).toggleClass('open');
		slideMenu();
	});
	
	function goHome() {
	   //navigate to home page
	   changePage(1);
	    ga_storage._trackPageview('/Home', 'Home(reset)');
	}
	
	function goExpo() {
		changePage(4);
	    ga_storage._trackPageview('/enterpriseExpo', 'Enterprise Expo(reset)');
	}
	
	function slideMenu() {
		if($('#slideMenu').hasClass('hide')) {
			$('#slideMenu').removeClass('hide');
			$('#slideMenu').addClass('show');
			$('#slideMenu').stop().velocity({
				properties: { right: '0px' },
				options: { speed: 100 },
				easing: "ease-out"
			});
			$('#homeButton').stop().velocity({
				properties: { opacity: 0 },
				options: { duration: 25 },
				easing: "ease-out",
			});
		} else {
			$('#slideMenu').removeClass('show');
			$('#slideMenu').addClass('hide');
			$('#slideMenu').stop().velocity({
				properties: { right: '-316px' },
				options: { speed: 100 },
				easing: "ease-out"
			});
			$('#homeButton').stop().velocity({
				properties: { opacity: 1.0 },
				options: { duration: 25 },
				easing: "ease-out",
			});
		}
	}
	
	function closeSlideMenu() {
		if($('#slideMenu').hasClass('show')) {
			$('#menuButton').toggleClass('open');
			$('#slideMenu').removeClass('show');
			$('#slideMenu').addClass('hide');
			$('#slideMenu').stop().velocity({
				properties: { right: '-316px' },
				options: { speed: 100 },
				easing: "ease-out"
			});
		}
	}
	
	$('#ewlogo, #homeButton').click(function(){
		goHome();
	});
	
	
	
	// Carousel / Cycle Controls
	
	$('#sponsorsMenu li a').click(function(){
		$('#sponsorsMenu li a').removeClass('subMenuSelected');
		$(this).addClass('subMenuSelected');
		sponsorTarget = $(this).data('sponsor');
		$('#carouselSponsors.cycle-slideshow').cycle('goto', sponsorTarget);
   	});
   
   	$('#venueMapMenu li a').click(function(){
		$('#venueMapMenu li a').removeClass('subMenuSelected');
		$(this).addClass('subMenuSelected');
		venueMapTarget = $(this).data('map');
		$('#carouselVenueMap.cycle-slideshow').cycle('goto', venueMapTarget);
   	});
   	
   	$('#tweetMenu li a').click(function(){
		$('#tweetMenu li a').removeClass('subMenuSelected');
		$(this).addClass('subMenuSelected');
		tweetTarget = $(this).data('tweet');
		$('#carouselTeamTweet.cycle-slideshow').cycle('goto', tweetTarget);
   	});
   	
   	$('#agendaMenu li a').click(function(){
		$('#agendaMenu li a').removeClass('subMenuSelected');
		$(this).addClass('subMenuSelected');
		agendaTarget = $(this).data('agenda');
		$('#carouselAgenda.cycle-slideshow').cycle('goto', agendaTarget);
   	});
   	
   	
   	$('#carouselVenueMap.cycle-slideshow').on('cycle-after', function() {
    	checkLevel();
	});
	
	
	
	
	
	// MODAL WINDOW
	
	function triggerModal() {
	   	$("#number").html(15);
	   	$('#modal').fadeIn("slow", function() {
			$('#dialog').fadeIn("slow", function() {
				
				var counter = 15;
				interval = setInterval(function() {
				    counter--;
				    $("#number").html(counter);
				    if (counter == 0) {
				    	resetUI();
				        clearInterval(interval);
				    }
				}, 1000);
				
			});
	   	});
   	}
   	
   	function closeModal() {
	    $('#modal').fadeOut("slow");
		$('#modal').fadeOut("slow");
		clearInterval(interval);
	}
   	
   	$('#okbutton, #modal').click(function(){
	   	closeModal();
	});
	
	$('#resetbutton').click(function(){
	   	resetUI();
	});
	
	
	
	//VENUE MAP FUNCTIONS
	
	//place the marker based on coordinates storred in localstorage
	placeYouAreHereMarker();
	
	//set map to appropriate level based on touch screen
	setMapLevel();

	
	//check to see which level the marker is on
	function checkLevel() {
   		//$('#youAreHere').css({'visibility' : 'hidden'});
   		
   	$('#youAreHere').stop().velocity({opacity: 0.0}, 50);
   		var currentLevel = storage.get('defLevel');
   		var currentMapSlide = $('#carouselVenueMap.cycle-slideshow').data("cycle.opts").currSlide;
	   	if(currentLevel ===  currentMapSlide) {
		   //$('#youAreHere').css({'visibility' : 'visible'});
		   $('#youAreHere').stop().velocity({opacity: 1.0}, 200);
	   	}
   	}
   	
   	//function to set map level on initialize
	function setMapLevel() {
		var storeLevel = storage.get('defLevel'); 
		$('#carouselVenueMap.cycle-slideshow').cycle('goto', storeLevel);
		$("#venueMapMenu li a span.indicatorIcon").removeClass('levelMarker');
		$("#venueMapMenu li").find("[data-map='" + storeLevel + "']").children().addClass('levelMarker');
	}
		
	//store the default level for the touchscreen
	$('#level0 a, #level2 a, #levelMMag a, #levelMPres a, #levelAll a').on("taphold", {duration: 5000}, function(){
	    var defaultLevel = $(this).data('map');
	    $("#venueMapMenu li a span.indicatorIcon").removeClass('levelMarker');
	    $("#venueMapMenu li").find("[data-map='" + defaultLevel + "']").children().addClass('levelMarker');
	    storage.set('defLevel',defaultLevel);
	    $(this).velocity({opacity: 0.25}, 200, function() {
		    $(this).velocity({opacity: 1.0}, 200);
	    });
	});
	
	//You Are Here marker drag functions
   	$('#youAreHere').draggable({ 
   		delay: 5000,
   		stop: function(event, ui) {
   			var Stoppos = $(this).position();
   			var stopLeft = Stoppos.left;
   			var stopTop = Stoppos.top;
	   		writeCoord(stopLeft, stopTop);
   		}
   	});
   	
   	//You are here click functions
   	//$('#youAreHere').click(function() {
	//   	$('#youAreHere .message').velocity({opacity: 1.0, translateY: -15}, 200, function() {
	//	    $(this).delay(1100).stop().velocity({opacity: 0.0, translateY: 15}, 200);
	//    });
   	//});
   	
   	//writes the coordinates to HTML5 localstorage
   	function writeCoord(x,y) {
	   	storage.set('hereX',x);
	   	storage.set('hereY',y);
   	}
   	
   	function placeYouAreHereMarker() {
   		var storeLCoord = storage.get('hereX');
	   	var storeTCoord = storage.get('hereY');
		$('#youAreHere').css({top: storeTCoord, left: storeLCoord});
   	}
   	
   	
   	
   	////////////////////////////////////////////////////////////////////////
	//EXPO MAP FUNCTIONS + COORDINATES
	////////////////////////////////////////////////////////////////////////
   	
   	//initiate custom scrollbars for EXPO section
   	
   	$('#otPods').mCustomScrollbar({
	   	contentTouchScroll:		50,
	   	mouseWheel:{ enable: false }
   	});
   	
   	$('#partnerPods').mCustomScrollbar({
	   	contentTouchScroll:		50,
	   	mouseWheel:{ enable: false }
	});   
   	
   	//LOOP TO POPULAR TABLE ROWS
   	
	$('.expoList .expoRow').each( function() {
		var boothNumber = $(this).data('number');
		var suiteType = $(this).data('suite');
		$(this).append('<td class="rowNumber '+suiteType+'">'+boothNumber+'</td>');
	});

   	
   //MAP LOCATIONS
   var maplocation102 = "170,460";
   var maplocation103 = "163,479";
   var maplocation104 = "170,426";
   var maplocation105 = "163,442";
   var maplocation106 = "170,391";
   var maplocation107 = "163,408";
   var maplocation108 = "170,357";
   var maplocation109 = "163,374";
   var maplocation110 = "170,324";
   var maplocation111 = "163,339";
   var maplocation114 = "170,287";
   var maplocation115 = "163,306";
   var maplocation116 = "170,254";
   var maplocation117 = "163,272";
   var maplocation118 = "166,233";
   
   var maplocation201 = "234,450";
   var maplocation202 = "271,450";
   var maplocation203 = "234,389";
   var maplocation204 = "271,389";
   var maplocation205 = "234,327";
   var maplocation206 = "271,327";
   var maplocation207 = "234,264";
   var maplocation208 = "271,264";
   
   var maplocation302 = "348,236";
   var maplocation303 = "341,255";
   var maplocation304 = "348,203";
   var maplocation305 = "341,218";
   var maplocation306 = "348,167";
   var maplocation307 = "341,184";
   
   var maplocation402 = "453,283";
   var maplocation403 = "417,283";
   var maplocation404 = "453,219";
   var maplocation405 = "417,219";
   
   var maplocation501 = "527,253";
   var maplocation502 = "533,237";
   var maplocation503 = "527,220";
   var maplocation504 = "533,202";
   var maplocation505 = "527,184";
   var maplocation506 = "533,168";
   
   var maplocation601 = "581,450";
   var maplocation602 = "618,450";
   var maplocation603 = "581,389";
   var maplocation604 = "618,389";
   var maplocation605 = "581,324";
   var maplocation606 = "618,324";
   	
   var maplocation701 = "682,530";
   var maplocation702 = "690,512";
   var maplocation703 = "682,494";
   var maplocation704 = "690,479";
   var maplocation705 = "682,462";
   var maplocation706 = "690,444";
   var maplocation707 = "682,427";
   var maplocation708 = "690,408";
   var maplocation709 = "682,392";
   var maplocation710 = "690,375";
   var maplocation711 = "682,359";
   var maplocation712 = "690,341";
   var maplocation713 = "682,324";
   var maplocation714 = "690,308";
   var maplocation715 = "682,290";
   var maplocation716 = "690,273";
   var maplocation717 = "682,256";
   var maplocation718 = "690,235";

    
   	
   	$('.expoRow').click(function(){
   		$('.expoRow').removeClass('rowSelected');
   		$(this).addClass('rowSelected');
   		
   		$("#marker").css({'visibility': 'hidden'});
   		
   		num = 'maplocation' + $(this).data('number');
   		tableNumString = eval(num);
   		tableNumArray = tableNumString.split(",");
   		dropMarker(tableNumArray[0],tableNumArray[1]);
   	});
   	
   	function dropMarker(coordX,coordY) {

		newX = parseInt(coordX) - 26;
		newY = parseInt(coordY) + 60;
   		//animation functions
   		$('#marker').stop().velocity({translateY: '-92px', translateX: newX +'px' }, 0, function(){
	   		$("#marker").css({'visibility': 'visible'});
	   		$('#marker').stop().velocity({translateY: (10 + newY) +'px'}, 500);
   		});
   	}


   	//AGENDA FUNCTIONS
   	
	$(".agendaTable tr.agendaRow:odd, .breakoutTable tr.agendaRow:even").css("background-color", "rgba(255, 255, 255, 0.2)");
	
	 $('.agendaSlide').not('.noScroll').mCustomScrollbar({
	   	contentTouchScroll:		10,
	   	mouseWheel:{ enable: false }
	});  
	
	$('.sideMenuAgenda, #homemenu-agenda a, #agendaMenu li a.updates').click(function() {
		$('#updateFrame').attr('src', 'http://otew.io/touch/updates.php');
	});
	
	//TEAM TWEET FUNCTIONS
	
	$('.tweetMenu li a.leaderboard, .sideMenuTeamTweet, #homemenu-teamtweet a').click(function() {
		//$('#twitterFrame').attr('src', 'http://ew2015.negativespace.ca/team-tweet/comingsoon.html');
		$('#twitterFrame').attr('src', 'http://ew2015.devshopsc.com/index.php/teamtweet/scoreboard');
	});
		
});