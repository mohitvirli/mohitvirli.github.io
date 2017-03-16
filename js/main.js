$(document).ready(function() {

    if(window.location.hash == '#work/details'){
        window.location = '#work';
    }
    jQuery("#status").delay(500).fadeOut(500);
    jQuery("#preloader").delay(1000).fadeOut("slow");
    $('#preloader').css('height',$(window).height()+'px');
    var initRight = 0;
    $('#fullpage').fullpage(
    	{
            anchors:['main','work', 'about'],
            lockAnchors: false,
            scrollOverflow:true,
            slidesNavigation: false,
            controlArrows: false,
            slidesNavPosition: 'bottom',
            loopHorizontal: false,
            scrollOverflow: true,
            onLeave: function(index, nextIndex, direction){
                var loadedSlide = $(this);
                $('.navbar-nav li a').removeClass('active');
                $('.navbar-nav li a.'+nextIndex).addClass('active');
                if(index===1 || index === 3){
                    $('.navbar-nav').removeClass('white');
                    // $('.bar').css('background-color','#ED2');
                    $('.menu-mob-btn').css('color', '#111');
                    $(".flickity-viewport").focus();
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
                var loadedSlide = $(this);
                // console.log(slideIndex);
                if(slideIndex === 1){
                    $.fn.fullpage.setAllowScrolling(true, 'up, down');
                    $.fn.fullpage.setKeyboardScrolling(true, 'up, down');
                }

                if(nextSlideIndex === 1){
                    $.fn.fullpage.setAllowScrolling(false, 'up, down');
                    $.fn.fullpage.setKeyboardScrolling(false, 'up, down');
                }

            }

    	});
    $.fn.fullpage.setAllowScrolling(false, 'right');
    $.fn.fullpage.setKeyboardScrolling(false, 'left, right');
    $(function(){
      	setTimeout(function(){
    	$('.typed-text').fadeIn(300);
    	// $('.typed-text').addClass('animated fadeIn');
    	setTimeout(function(){
    		$("#element").typed({
        	strings: ["<strong>UI/UX Designer</strong>","<strong>Frontend Developer</strong>","<strong>Full Stack Designer</strong>"],
        	contentType:'html',
        	typeSpeed: 100,
        	showCursor: true,
        	backSpeed: 0,
            // time before backspacing
            backDelay: 1000,
            loop:true,
      	});
    	},500);
    },1000);
  	});
    $('.work-div').hover(function(){$(this).children('.overlay').fadeIn()},function(){$(this).children('.overlay').fadeOut()})
    $('.fp-prev').append('<i class="fa fa-angle-left fa-3x"></i>');
    $('.fp-next').append('<i class="fa fa-angle-right fa-3x"></i>');
    $('.work-div').click(function(e){
        if( $(e.target).closest(".center").length > 0 ) {
            return;
        }
         var win=window.open($(this).find('.behance').attr('href'),'_blank');
         win.focus();
    });
    $('.navbar').width($(window).height());
    $('.bar').css({
        right:(parseInt($('.navbar-nav li a.active').attr('class').split(' ')[1]) - 1)*72,
        width:$('.navbar-nav li a.active span').width(),
        display: 'block'
    })
    if($('.main').hasClass('active')){
        $('.navbar-nav').addClass('white');
        $('.bar').css({'right': '0', 'width':'37px'});
    }

    $('.card-header').on("click",
        function(event){
            window.location = '#work/details';
            if($('.showreel') && !$('.showreel.sr' + $(this).attr('data')).hasClass('flickity-enabled')){
                $('.showreel.sr' + $(this).attr('data')).flickity({
                    imagesLoaded: true,
                    percentPosition: false,
                    cellAlign: 'left' 
                });
            }
            $('.details-hidden').hide();
            $('#' + $(this).attr('data')).show();
        }
    )

   

    $('.skills-sub > div').css('margin-left', $('.container').css('margin-left'))
    $('.about-sub > div').css('padding-right', $('.container').css('margin-left'))
});
