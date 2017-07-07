$(document).ready(function() {
	
	
	//DISABLING FUNCTIONS FOR TOUCHSCREEN
	////////////////////////////////////////////
	
	//Prevent right click context menu
	
	/*
	$("body").bind("contextmenu",function(){
       return false;
    }); 
    
    */
    
	//Disable Touch Scroll
    $(document).bind('touchmove', function(e) {
		e.preventDefault();
	});
	
	//set current section (home) to be visible + margin
	$('.currentSection').css('display', 'block');
	$('.currentSection').css('margin-top', '-30px');

	
	//reset all tabs
	resetTabs();	
	
	//INITIALIZING
	////////////////////////////////////////////
	
	//hide home and menu buttons 
	hideTopButtons();
	
	//initiate local storage
	storage=$.localStorage;

	// reveal main menu on home
	revealHome();
	
	//set map carousel to default level
	
	var currentLevel = storage.get('defLevel');
	$('#section-maps .cycle-slideshow').cycle('goto', currentLevel);




	//Notifications
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
	
	
	
	
	
	
	
	
	
	
	//RESETS
	////////////////////////////////////////////
	
	//Start the Idle Timer, when timer runs out the reset function is executes
    $.idleTimer(120000);
    $(document).bind("idle.idleTimer", function() {
	    if($('body').hasClass('section-home') == false) {
			triggerModal();
		}
    });
    
    //goes home, and resets entire session (mainly used for session timeout)
    function resetUI() {
		goHome();
	    closeModal();
    }
    
    
    //reset all carousels, and tabs
    function masterReset() {

	    //reset carousels
	    resetAllCarousels();
	    
	    //reset all scroll panes
	    $('#agendaCarousel div').not('.noScroll').mCustomScrollbar("scrollTo","top"); 
	    $('#otPods, #partnerPods').mCustomScrollbar("scrollTo","top");
	    
	    //reset expo 
	    $("#marker").css({'visibility': 'hidden'});
	    $('.expoRow').removeClass('rowSelected');
	    
    }
    
    
    
    //resets all of the carousels and sets maps carousel to the default level
    function resetAllCarousels() {
	    
	    //sets all carousels to the first slide
	    $('#agendaCarousel, #sponsorCarousel, #eventCarousel, #ewGamesCarousel').cycle('goto', 0);
	   
		//sets the map carousel to the default level
	    var currentLevel = storage.get('defLevel');
	    var currentMapSlide = $('#mapsCarousel.cycle-slideshow').data("cycle.opts").currSlide;
	   	
	   	if(currentLevel != currentMapSlide) {
	    	$('#section-maps .cycle-slideshow').cycle('goto', currentLevel);
	    }
	    
    }
	
	
	
	
	
	
	
	
	
	
	
	//NAVIGATION
	////////////////////////////////////////////
    
    //Home menu click functions
	$('.mainmenu li').click(function(){
		
	   //get section from data-id for the button clicked
	   var nextSection = $(this).data('id');
	   
	   //get section number from data-index for the button clicked
	   var headerSwitch = $(this).data('index');
	   
	   changePages(nextSection, headerSwitch);
	   
	   resetTabs();
	   
   	});
	
	//Open the slide menu
	$('#menuButton').click(function(){
		$(this).toggleClass('open');
		slideMenu();
	});
    
    //goes back to the home pahe
    function goHome() {
	    
	   //navigate to home page
	   changePages("section-home", 0);
	   
	   //track visit
	   ga_storage._trackPageview('/Home', 'Home(reset)');
	}
	
	// change pages
	
	function changePages(pageTarget, sectionID) {
		
		window.nextSection = pageTarget;
		window.nextHeader = sectionID;

		$('.currentSection').stop().velocity({ 
			marginTop: "30px",
			opacity: 0,
			duration: 2000
		}, { 
			display: "none", 
			complete: function() { 
				
				$('.sectionNames').cycle('goto', window.nextHeader);
				
				$('#' + window.nextSection).addClass('currentSection');
				
				//remove section indicator classes
			    $('body').removeClass('section-home');
			    $('body').removeClass('section-agenda');
			    $('body').removeClass('section-maps');
			    $('body').removeClass('section-expo');
			    $('body').removeClass('section-events');
			    $('body').removeClass('section-social');
			    $('body').removeClass('section-ewgames');
			    $('body').removeClass('section-sponsors');
			   
			    //add new class name
			    $('body').addClass(window.nextSection);
			   
			    //if page is home, hide elements, if not, show nav
			    if(window.nextSection == "section-home") {
				   hideTopButtons();
			    } else {
				   showTopButtons();
			    }
			    
			    //close SlideMenu   		
		   		setTimeout(function () {
					 closeSlideMenu();
				}, 200);
				
				//reset all carousels and tabs
				masterReset();
				
			   	$('#' + window.nextSection).stop().velocity({
				   	marginTop: "0px",
					opacity: 1,
					duration: 2000
				}, {
					display: "block",
					complete: function() { 
					
						if (window.nextSection == "section-maps") {
							setMapLevel();
						} else {
							resetTabs();
						}
						
					}
				});
				
			}
		});
	}
	
	//click home button or header to go home
	$('#logo, #homeButton').click(function(){
		goHome();
	});
	
		// hide the menu button
	function hideTopButtons() {
		$('#menuButton').stop().delay(100).velocity({
			properties: { opacity: 0 },
			options: { duration: 200 },
			easing: "ease-out"
		});
		$('#homeButton').stop().velocity({
			properties: { opacity: 0 },
			options: { duration: 200 },
			easing: "ease-out"
		});
		$('#backgroundImage').delay(300).removeClass('blurBg');
		$('#logo').addClass('logoHome');
	}	
	
	// show the menu button
	function showTopButtons() {
		$('#menuButton').stop().delay(100).velocity({
			properties: { opacity: 1 },
			options: { duration: 200 },
			easing: "ease-out"
		});
		$('#homeButton').stop().velocity({
			properties: { opacity: 1 },
			options: { duration: 200 },
			easing: "ease-out"
		});
		$('#backgroundImage').delay(300).addClass('blurBg');
		$('#logo').removeClass('logoHome');
	}	
	
	
	function slideMenu() {
		if($('#slideMenu').hasClass('closed')) {
			
			//add classes to menu div
			$('#slideMenu').removeClass('closed');
			$('#slideMenu').addClass('expanded');
			
			//turn off home button
			$('#homeButton').fadeOut("fast");
				
		} else {
			
			//add classes to menu div
			$('#slideMenu').removeClass('expanded');
			$('#slideMenu').addClass('closed');
			
			//turn on home button
			$('#homeButton').fadeIn("fast");
		}
	}
	
	function closeSlideMenu() {
		if($('#slideMenu').hasClass('expanded')) { 
			$('#menuButton').toggleClass('open');
			$('#slideMenu').removeClass('expanded');
			$('#slideMenu').addClass('closed');
			$('#homeButton').delay(200).fadeIn("fast");
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	//TABBED NAVIGATION
	////////////////////////////////////////////
	
	//init tabs
	function resetTabs() {
		
		$(".materialTabs").each(function() {
			$(this).find('li.active').removeClass('active');
			$(this).find('li:first-child').addClass('active');
			var testButton = $(this).find('li:first-child').outerWidth();
			
			$(this).find('.slider').css({
			    left: 0,
			    width: testButton + "px"
			  });
	  
		});
	}
	
	$(".materialTabs li").click(function(e) {
	
	  //control tabs		
	  var parentContainer = "#" + $(this).closest('.outer').attr('id');
	  var prevButtonWidth = $(parentContainer + ' .materialTabs li.active').width();
	  var buttonWidth = $(this).outerWidth();
	  var howFar = $(this).position();
	
	  $(parentContainer + ' .materialTabs li.slider').css({
	    left: howFar.left + "px",
	    width: buttonWidth + "px"
	  });
	
	  $(".ripple").remove();
	
	  var posX = $(this).offset().left,
	      posY = $(this).offset().top,
	      buttonWidth = $(this).width(),
	      buttonHeight = $(this).height();
	
	  $(this).prepend("<span class='ripple'></span>");
	
	  if (buttonWidth >= buttonHeight) {
	    buttonHeight = buttonWidth;
	  } else {
	    buttonWidth = buttonHeight;
	  }
	
	  var x = e.pageX - posX - buttonWidth / 2;
	  var y = e.pageY - posY - buttonHeight / 2;
	
	  $(parentContainer + ' .materialTabs .ripple').css({
	    width: buttonWidth,
	    height: buttonHeight,
	    top: y + 'px',
	    left: x + 'px'
	  }).addClass("rippleEffect");
	  
	  var slideIndex = $(this).data('id');
	  
	  //control carousel
	  $(parentContainer + " .cycle-slideshow").cycle('goto',slideIndex);
	  
	});
		
	
	
	
	
	
	
	
	
	
	
	
	//ANIMATION
	////////////////////////////////////////////

	//Sequences for home screen icons
	function revealHome() {
		
		setTimeout(function () {
			$('#section-home .inner .mainmenu li.menuItem-agenda').stop().velocity({
				properties: { opacity: 1 },
				options: { duration: 200 },
				easing: "ease-out"
			});
		}, 200);					
		setTimeout(function () {
			$('#section-home .inner .mainmenu li.menuItem-maps').stop().velocity({
				properties: { opacity: 1 },
				options: { duration: 200 },
				easing: "ease-out"
			});
		}, 300);
		setTimeout(function () {
			$('#section-home .inner .mainmenu li.menuItem-expo').stop().velocity({
				properties: { opacity: 1 },
				options: { duration: 200 },
				easing: "ease-out"
			});
		}, 400);
		setTimeout(function () {
			$('#section-home .inner .mainmenu li.menuItem-events').stop().velocity({
				properties: { opacity: 1 },
				options: { duration: 200 },
				easing: "ease-out"
			});
		}, 500);
		setTimeout(function () {
			$('#section-home .inner .mainmenu li.menuItem-social').stop().velocity({
				properties: { opacity: 1 },
				options: { duration: 200 },
				easing: "ease-out"
			});
		}, 600);
		setTimeout(function () {
			$('#section-home .inner .mainmenu li.menuItem-ewgames').stop().velocity({
				properties: { opacity: 1 },
				options: { duration: 200 },
				easing: "ease-out"
			});
		}, 700);
		setTimeout(function () {
			$('#section-home .inner .mainmenu li.menuItem-sponsors').stop().velocity({
				properties: { opacity: 1 },
				options: { duration: 200 },
				easing: "ease-out"
			});
		}, 800);
	}
	
	
	//Highlight buttons on home screen
    function highlightButtons() {   
	    $('#section-home .inner .mainmenu li.menuItem-agenda').animate({backgroundColor: "rgba(255,255,255,0.7)"}, 500, function(){
		   $(this).animate({backgroundColor: "rgba(255,255,255,0.15)"}, 500, function(){
		   		$('#section-home .inner .mainmenu li.menuItem-maps').animate({backgroundColor: "rgba(255,255,255,0.7)"}, 500, function(){
		   			$(this).animate({backgroundColor: "rgba(255,255,255,0.15)"}, 500, function(){
		   				$('#section-home .inner .mainmenu li.menuItem-expo').animate({backgroundColor: "rgba(255,255,255,0.7)"}, 500, function(){
		   					$(this).animate({backgroundColor: "rgba(255,255,255,0.15)"}, 500, function(){
		   						$('#section-home .inner .mainmenu li.menuItem-events').animate({backgroundColor: "rgba(255,255,255,0.7)"}, 500, function(){
		   							$(this).animate({backgroundColor: "rgba(255,255,255,0.15)"}, 500, function(){
		   								$('#section-home .inner .mainmenu li.menuItem-social').animate({backgroundColor: "rgba(255,255,255,0.7)"}, 500, function(){
		   									$(this).animate({backgroundColor: "rgba(255,255,255,0.15)"}, 500, function(){
		   										$('#section-home .inner .mainmenu li.menuItem-ewgames').animate({backgroundColor: "rgba(255,255,255,0.7)"}, 500, function(){
		   											$(this).animate({backgroundColor: "rgba(255,255,255,0.15)"}, 500, function(){
		   												$('#section-home .inner .mainmenu li.menuItem-sponsors').animate({backgroundColor: "rgba(255,255,255,0.7)"}, 500, function(){
		   													$(this).animate({backgroundColor: "rgba(255,255,255,0.15)"}, 200, function(){
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
    // loop button highlighting
   	window.setInterval(function(){
	   	if($('body').hasClass('section-home')) {
			highlightButtons();
		}
   	}, 12000);
	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	
	
	
	
	
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
	
	
	
	
	
	
	
	
	
	
	//VENUE MAP FUNCTIONS
	
	//place the marker based on coordinates storred in localstorage
	placeYouAreHereMarker();
	
	//check to see which level the marker is on
	function checkLevel() {
   		
   	$('#youAreHere').stop().velocity({opacity: 0.0}, 50);
   		var currentLevel = storage.get('defLevel');
   		var currentMapSlide = $('#mapsCarousel.cycle-slideshow').data("cycle.opts").currSlide;
	   	if(currentLevel ===  currentMapSlide) {
		   //$('#youAreHere').css({'visibility' : 'visible'});
		   $('#youAreHere').stop().velocity({opacity: 1.0}, 200);
	   	}
   	}
   	
   	//function to set map level on initialize
	function setMapLevel() {
		var storeLevel = storage.get('defLevel');
		$("#section-maps .materialTabs li").removeClass('currentLevel');
		var tabTarget = $("#section-maps .materialTabs li[data-id='" + storeLevel + "']");
		$(tabTarget).addClass('currentLevel');
		
		var tabWidth = $(tabTarget).outerWidth();
		var tabDistance = $(tabTarget).position();
	
		$('#section-maps .materialTabs .slider').css({
	 	   left: tabDistance.left + "px",
	 	   width: tabWidth + "px"
	 	});
		
	}
		
	//store the default level for the touchscreen
	$('#section-maps .materialTabs li').on("taphold", {duration: 5000}, function(){
	    var defaultLevel = $(this).data('id');
	    $("#section-maps .materialTabs li").removeClass('currentLevel');
	    $(this).addClass('currentLevel');
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
   	
   	$('#mapsCarousel.cycle-slideshow').on('cycle-after', function() {
    	checkLevel();
	});
   	
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
   	
   	$('#otPods, #partnerPods').mCustomScrollbar({
	   	contentTouchScroll:		50,
	   	mouseWheel:{ enable: false }
   	});
	
   	
   	//LOOP TO POPULAR TABLE ROWS
   	
	$('.expoList .expoRow').each( function() {
		var boothNumber = $(this).data('number');
		$(this).append('<td class="rowNumber">'+boothNumber+'</td>');
	});

   	
   //MAP LOCATIONS
   var maplocation201 = "200,584";
   var maplocation202 = "200,566";
   var maplocation203 = "319,604";
   var maplocation204 = "360,604";
   var maplocation205 = "541,604";
   var maplocation206 = "583,604";
   var maplocation207 = "652,604";
   var maplocation208 = "693,604";
   var maplocation209 = "241,119";
   var maplocation210 = "282,119";
   var maplocation211 = "432,228";
   var maplocation212 = "473,228";
   var maplocation215 = "620,119";
   var maplocation216 = "662,119";
   
   var maplocation301 = "200,485";
   var maplocation302 = "200,465";
   var maplocation303 = "251,531";
   var maplocation304 = "251,510";
   var maplocation305 = "301,485";
   var maplocation306 = "301,465";
   var maplocation307 = "362,530";
   var maplocation308 = "362,510";
   var maplocation309 = "540,530";
   var maplocation310 = "540,510";
   var maplocation311 = "599,485";
   var maplocation312 = "599,465";
   var maplocation313 = "651,531";
   var maplocation314 = "651,511";
   var maplocation315 = "701,485";
   var maplocation316 = "701,465";
   
   var maplocation401 = "200,270";
   var maplocation402 = "200,250";
   var maplocation403 = "251,219";
   var maplocation404 = "251,199";
   var maplocation405 = "301,270";
   var maplocation406 = "301,250";
   var maplocation409 = "540,219";
   var maplocation410 = "540,199";
   var maplocation411 = "599,270";
   var maplocation412 = "599,250";
   var maplocation413 = "651,219";
   var maplocation414 = "651,199";
   var maplocation415 = "701,270";
   var maplocation416 = "701,250";
   var maplocation417 = "362,219";
    
   	
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

		newX = parseInt(coordX) - 30;
		newY = parseInt(coordY) + 60;
   		//animation functions
   		$('#marker').stop().velocity({translateY: '-92px', translateX: newX +'px' }, 0, function(){
	   		$("#marker").css({'visibility': 'visible'});
	   		$('#marker').stop().velocity({translateY: (10 + newY) +'px'}, 500);
   		});
   	}











   	//AGENDA FUNCTIONS
   	
	$(".agendaTable tr.agendaRow:odd, .breakoutTable tr.agendaRow:even").css("background-color", "rgba(255, 255, 255, 0.1)");

	$('#agendaCarousel div').not('.noScroll').mCustomScrollbar({
	   	contentTouchScroll:		10,
	   	mouseWheel:{ enable: false }
	});  
	
	$('.updateButton').click(function() {
		$('#updatesFrame').attr('src', 'http://otew.io/touch/updates.php');
	});
	
	
	
	
	
	
	
	
	
	
	
	//TEAM TWEET FUNCTIONS
	$('.menuItem-ewgames').click(function() {
		$('#leaderboardFrame').attr('src', 'http://otew.io/leaderboard/mobile?dev=true');
		console.log('leader board frame call');
	});
	
	
	
	
	
	//GOOGLE ANALYTICS
	////////////////////////////////////////////
   	
    ga_storage._setAccount('UA-56000503-8'); //Replace with your own
    ga_storage._trackPageview('/home', 'Home');
    ga_storage._setDomain('none');
	
			
   	// Home Screen and Slide Menu button tracking
   	
   	/*
   	
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
		ga_storage._trackPageview('/EWGames', 'Team Tweet');
		var EWGamesTotal = storage.get('EWGamesClicks') + 1;
		storage.set('EWGamesClicks',EWGamesTotal);
	});
	
	//track sponsor clicks
	$('#diamond').on('click', function() {
		ga_storage._trackEvent('sponsors', 'click', 'diamond');
	});
	$('#emerald').on('click', function() {
		ga_storage._trackEvent('sponsors', 'click', 'emerald');
	});
	$('#sapphire').on('click', function() {
		ga_storage._trackEvent('sponsors', 'click', 'sapphire');
	});
	$('#pod').on('click', function() {
		ga_storage._trackEvent('sponsors', 'click', 'pod');
	});
	$('#promotional').on('click', function() {
		ga_storage._trackEvent('sponsors', 'click', 'promotional');
	});
	
	//track venue clicks
	$('#level0 a').on('click', function() {
		ga_storage._trackEvent('venuemap', 'click', 'Level0');
	});
	$('#level2 a').on('click', function() {
		ga_storage._trackEvent('venuemap', 'click', 'Level2');
	});
	$('#levelMPres a').on('click', function() {
		ga_storage._trackEvent('venuemap', 'click', 'Level M Presidential');
	});
	$('#levelMMag a').on('click', function() {
		ga_storage._trackEvent('venuemap', 'click', 'Level M Magnolia');
	});
	$('#levelAll a').on('click', function() {
		ga_storage._trackEvent('venuemap', 'click', 'All Levels');
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
	$('#agendaSaturday').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'Saturday');
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
	$('#agendaInnovationLab').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'InnovationLab');
	});
	$('#agendaDeveloper').on('click', function() {
		ga_storage._trackEvent('agenda', 'click', 'DeveloperLab');
	});
	
	//track team tweet clicks
	$('#leaderboard').on('click', function() {
		ga_storage._trackEvent('ewgames', 'click', 'Leaderboard');
	});
	$('#teams').on('click', function() {
		ga_storage._trackEvent('ewgames', 'click', 'Teams');
	});
	$('#howtoscore').on('click', function() {
		ga_storage._trackEvent('ewgames', 'click', 'HowToScore');
	});
	$('#prizes').on('click', function() {
		ga_storage._trackEvent('ewgames', 'click', 'Prizes');
	});
	$('#rules').on('click', function() {
		ga_storage._trackEvent('ewgames', 'click', 'Rules');
	});
	
	*/
	
});