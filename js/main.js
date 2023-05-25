
$(document).ready(function() {
	console.log('Why you looking at my logs 👀');
	if(window.location.hash === '#work/details'){
		window.location = '#work';
	}

	jQuery('#status').delay(500).fadeOut(500);
	jQuery('#preloader').delay(1000).fadeOut('slow');

	$.getJSON('../assets/data.json', function(json) {
		json.data.forEach(function (res, index) {
			if (res.hidden) return;
			$('#gallery-main')
				.append(`<div class="gallery-cell" data='${index}'>
				<div class="card-header">
					${res.title}
				</div>
				<div class="card-sub-header">
						<span class='small-text-cap'>
							${res.subtitle}
						</span>
				</div>
				<div class="card-text">
					${res.shortDesc}
				</div>
			</div>`);

			$('#more-details-container')
				.append(`<div class="container details-hidden" id='${index}'>
					<div class="details-container">
						<div class="details-header">
							<div class="back">
								<a href="#work">
										<span class="arrow left">
											<img src='img/arrow-left.svg'>
										</span>
									back
								</a>
							</div>
							<a class='details-title' href='${res.externalLink}' target="_blank">${res.title}</a>
						</div>
						<div class="row">
							<div class="col-sm-8">
								<div class="details-sub">
									<div class="details-sub-d">
										${res.shortDescAlt || res.shortDesc}
										<br><br>
										${(res.details || []).map(function (d) {
											return `<div class="details-sub-h small-text-cap">${d.title}</div>
												<br>${d.description}<br><br>`;
										}).join('')}
									</div>
								</div>
							</div>
							<div class="col-sm-4 tools">
								${Object.keys(res.tools || {}).map(function (tool) {
									return `<div class="details-sub">
										<div class="details-sub-h small-text-cap">${tool}</div>
										<div class="details-sub-d">${res.tools[tool]}</div>
									</div>`;
								}).join('')}
							</div>
						</div>
					</div>
				</div>`);
		});

		$('#gallery-main').flickity({
			contain: true,
			wrapAround: true,
		});

		initClickListeners();
	});

	var initRight = 0;
	var anchors = [];
	if ($(window).width() > 768) {
		anchors = ['main','work', 'about'];
		$('.section.skills').remove();
		$('.bg-lines').remove();
	} else {
		anchors = ['main','work', 'skills', 'about'];
		$('.animation-container').remove();
	}
	$('#fullpage').fullpage(
		{
			anchors: anchors,
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
				if ($(document).width() < 768) {

					if(nextIndex === 3){
						$('.menu-mob-btn').css('color', '#fff');
					}
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
					if ($(window).width() < 768) $('.menu-mob').fadeIn();
				}
				if(nextSlideIndex === 1){

					$.fn.fullpage.setAllowScrolling(false, 'up, down');
					if ($(window).width() < 768) $('.menu-mob').fadeOut();
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
			setTimeout(function(){
				var strings = ['Frontend Engineer', 'Designer', 'JavaScript conois', 'JavaScript connosier', 'JavaScript connoissie', 'JavaScript ^1500Developer'];
				// var strings = ['frontedn', 'Human being']
				var options = {
					typeSpeed: 120,
					showCursor: true,
					backSpeed: 50,
					backDelay: 1000,
					startDelay: 0,
					loop: true,
					smartBackspace: true,
				};
				var typed = new Typed('#element', {
					strings: strings,
					...options,
					onStringTyped: (index) => {
						if (index === 2) {
							typed.startDelay = 0;
							typed.backDelay = 0;
							return;
						}
						if (index === 0 || index === strings.length - 1) {
							typed.typeSpeed = options.typeSpeed;
							typed.backSpeed = options.backSpeed;
							typed.backDelay = options.backDelay;
							return;
						}
					}
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

	function initClickListeners() {
		$('.gallery-cell').on('click',
			function(){
				if($(this).hasClass('is-selected')){
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

		function onBackClick() {
			$.fn.fullpage.moveSlideLeft();
			$('.back').css({'-webkit-transform':'translate(100px)'});
			$.fn.fullpage.setAllowScrolling(true, 'up, down');
			$.fn.fullpage.setKeyboardScrolling(true, 'up, down');
		}

		$('.navbar-nav li a').on('click', onBackClick)
		$('.back a').on('click', onBackClick);

		$(window).on('hashchange', (e) => {
			if (e.target.location.hash === '#work') {
				onBackClick();
			}
		});
	}

});

/**
 * Animation for the dots.
 */
const container = document.querySelector(".animation-container");
const dots = [];
for (let i = 0; i < 200; i++) {
	const dot = document.createElement("div");
	dot.classList.add("dot");
	container.appendChild(dot);
	dots.push(dot);
}

const util = (x1, y1, x2, y2) => {
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  const degree = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

  return { distance, degree };
};

container.onmousemove = function (event) {
  const { clientX: x1, clientY: y1 } = event;
  dots.forEach((dot) => {
    const { x, y, width, height } = dot.getBoundingClientRect();
    const { distance, degree } = util(x + width / 2, y + height / 2, x1, y1);
    const scaleX = `scaleX(${Math.max(1, Math.min(10, distance / 60))})`;
    const rotate = `rotate(${degree}deg)`;
    dot.style.transform = `${rotate} ${scaleX}`;
  });
};

container.onmouseout = function () {
  dots.forEach((dot) => {
    dot.style.transform = ``;
  });
};
