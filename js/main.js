
$(document).ready(function() {
	console.log('Why you looking at my log boi?');
	if(window.location.hash === '#work/details'){
		window.location = '#work';
	}
    
	jQuery('#status').delay(500).fadeOut(500);
	jQuery('#preloader').delay(1000).fadeOut('slow');
	var initRight = 0;
	$('#fullpage').fullpage(
		{
			anchors:['main','work', 'about'],
			lockAnchors: false,
			scrollOverflow: true,
			slidesNavigation: false,
			controlArrows: false,
			slidesNavPosition: 'bottom',
			loopHorizontal: false,
			scrollOverflowReset: true,
			scrollOverflowOptions: {
				'fadeScrollbars' : true
			},
			onLeave: function(index, nextIndex){
				$('.navbar-nav li a').removeClass('active');
				$('.navbar-nav li a.'+nextIndex).addClass('active');
				if(index===1 || index === 3){
					$('.navbar-nav').removeClass('white');
					// $('.bar').css('background-color','#ED2');
					$('.menu-mob-btn').css('color', '#111');
					$('.flickity-viewport').focus();
				}
				if(nextIndex === 1 || nextIndex === 3){

					$('.navbar-nav').addClass('white');
					// $('.bar').css('background-color','#ED2');
				}
				if(nextIndex === 1){
					$('.menu-mob-btn').css('color', '#fff');
				}
				initRight = (nextIndex - index)*72 + initRight;

				$('.bar').animate({
					right:initRight,
					width:$('.'+nextIndex + ' span').width()
				},400);
			},
			onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
				// console.log(slideIndex);
				if(slideIndex === 1){
					$.fn.fullpage.setAllowScrolling(true, 'up, down');
					$.fn.fullpage.setKeyboardScrolling(true, 'up, down');
					$('.menu-mob').fadeIn();
				}
				if(nextSlideIndex === 1){

					$.fn.fullpage.setAllowScrolling(false, 'up, down');
					$('.menu-mob').fadeOut();
					$.fn.fullpage.setKeyboardScrolling(false, 'up, down');
				}

			}
		});
	// $.fn.fullpage.setAllowScrolling(false);
	$.fn.fullpage.setAllowScrolling(false, 'right');
	$.fn.fullpage.setKeyboardScrolling(false, 'left, right');
	$(function(){
		setTimeout(function(){
			$('.typed-text').fadeIn(300);
			// $('.typed-text').addClass('animated fadeIn');
			setTimeout(function(){
				$('#element').typed({
					strings: ['<strong>Frontend Engineer</strong>','<strong>UI/UX Designer</strong>','<strong>Memer</strong>'],
					contentType:'html',
					typeSpeed: 100,
					showCursor: true,
					backSpeed: 0,
					backDelay: 1000,
					loop:true,
				});
			},500);
		},1000);
	});
    
	$('.navbar').width($(window).height());
	$('.bar').css({
		right:(parseInt($('.navbar-nav li a.active').attr('class').split(' ')[1]) - 1)*72,
		width:$('.navbar-nav li a.active span').width(),
		display: 'block'
	});
	if($('.main').hasClass('active')){
		$('.navbar-nav').addClass('white');
		$('.bar').css({'right': '0', 'width':'37px'});
	}

	$('.card-header').on('click',
		function(){
			if($(this).parent().hasClass('is-selected')){
				var id = $(this).attr('data');
				$('.details-hidden').hide();
				$('#' + id).show();
				setTimeout(function(){
					window.location = '#work/details';
					if($('.showreel') && !$('.showreel.sr' + id).hasClass('flickity-enabled')){
						$('.showreel.sr' + $(this).attr('data')).flickity({
							imagesLoaded: true,
							percentPosition: false,
							cellAlign: 'left' 
						});
					}
					$('.back').css({'-webkit-transform':'translate(0)'});
					$.fn.fullpage.setAllowScrolling(false, 'up, down');
					$('.menu-mob').fadeOut();
					$.fn.fullpage.setKeyboardScrolling(false, 'up, down');
				}, 10);
				$.fn.fullpage.reBuild();
				// $('.details').css('height', $('.details').find('#' + id).height());
			}
		}
	);
	$('.view-gallery').on('click',function(){

		if(!$('.image-bg.img-' + $(this).attr('data') + ' .full-img').hasClass('flickity-enabled')){
			$('.image-bg.img-' + $(this).attr('data') + ' .full-img').flickity({
				imagesLoaded: true,
				percentPosition: false,
				cellAlign: 'left' 
			});
		}
		$('.image-bg.img-' + $(this).attr('data')).fadeIn();
		$(document).keyup(function(e) {
			if (e.keyCode === 27) {
				$('.image-bg').fadeOut();
			}
		});
	});
	$('.full-img-rep').click(function(){
		$('.image-bg').fadeOut();
	});
	$('.skills-sub > div').css('margin-left', $('.container').css('margin-left'));
	$('.about-sub > div').css('padding-right', $('.container').css('margin-left'));
	$('.back a').on('click', function(){
		$.fn.fullpage.moveSlideLeft();
		$('.back').css({'-webkit-transform':'translate(100px)'});
	});
});
