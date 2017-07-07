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
	var maplocation112 = '220,796';
	var maplocation114 = '220,580';
	var maplocation116 = '220,906';
	var maplocation118 = '220,1064';
	var maplocation120 = '220,1120';
	var maplocation122 = '220,1176';
	
	var maplocation213 = '278,796';
	var maplocation215 = '278,580';
	var maplocation217 = '278,906';
	var maplocation219 = '278,1064';
	var maplocation221 = '278,1120';
	var maplocation223 = '278,1176';
	
	var maplocation200 = '382,524';
	var maplocation202 = '382,580';
	var maplocation204 = '382,634';
	var maplocation212 = '382,796';
	var maplocation214 = '382,580';
	var maplocation216 = '382,906';
	var maplocation218 = '382,1064';
	var maplocation222 = '382,1120';
	
	var maplocation301 = '442,524';
	var maplocation303 = '442,580';
	var maplocation305 = '442,634';
	var maplocation313 = '442,796';
	var maplocation315 = '442,580';
	var maplocation317 = '442,906';
	var maplocation319 = '442,1064';
	var maplocation323 = '442,1120';
	
	var maplocation412 = '718,796';
	var maplocation414 = '718,580';
	var maplocation416 = '718,906';
	
	var maplocation513 = '778,796';
	var maplocation515 = '778,580';
	var maplocation517 = '778,906';
	
	var maplocation512 = '878,718';
	var maplocation514 = '878,812';
	var maplocation516 = '878,898';
	
	var maplocation518 = '914,1070';
	
	var maplocation521 = '786,1190';
	
	var maplocation613 = '946,718';
	var maplocation615 = '946,812';
	var maplocation617 = '946,898';
	
	var maplocation602 = '1058,462';
	var maplocation604 = '1058,556'; 
	var maplocation606 = '1058,646';
	var maplocation612 = '1046,796';
	var maplocation614 = '1046,580';
	var maplocation616 = '1046,906';
	var maplocation618 = '1058,1072';
	
	var maplocation701 = '1128,462';
	var maplocation703 = '1128,556';
	var maplocation705 = '1128,646';
	
	var maplocation713 = '1104,796';
	var maplocation715 = '1104,580';
	var maplocation717 = '1104,906';
	var maplocation719 = '1126,1072';
	
	var maplocation802 = '1400,500';
	var maplocation804 = '1400,554';
	var maplocation806 = '1400,610';
	var maplocation818 = '1400,1086';
	var maplocation820 = '1400,1142';
	
	var maplocation901 = '1458,500';
	var maplocation903 = '1458,554';
	var maplocation905 = '1458,610';
	var maplocation919 = '1458,1086';
	var maplocation921 = '1458,1142';
	
	var maplocation902 = '1562,462';
	var maplocation904 = '1562,556';
	var maplocation906 = '1562,646';
	
	var maplocation1001 = '1630,462';
	var maplocation1003 = '1630,556';
	var maplocation1005 = '1630,646';
	
	var maplocation1102 = '1908,500';
	var maplocation1104 = '1908,554';
	var maplocation1106 = '1908,610';
	var maplocation1112 = '1908,796';
	var maplocation1114 = '1908,580';
	var maplocation1116 = '1908,906';
	
	var maplocation1201 = '1966,500';
	var maplocation1203 = '1966,554';
	var maplocation1205 = '1966,610';
	var maplocation1213 = '1966,796';
	var maplocation1215 = '1966,580';
	var maplocation1217 = '1966,906';
	
	var maplocation1202 = '2074,500';
	var maplocation1204 = '2074,554';
	
	var maplocation1301 = '2132,500';
	var maplocation1303 = '2132,554';
    
   	
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

		newX = (parseInt(coordX) / 2) - 30;
		newY = (parseInt(coordY) / 2) + 60;
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
		$('#updateFrame').attr('src', 'http://otew.io/touch/updates.php');
		console.log('update frame call');
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