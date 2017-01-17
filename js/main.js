$(document).ready(function() {


    jQuery("#status").delay(500).fadeOut(500);
    jQuery("#preloader").delay(1000).fadeOut("slow");
    $('#preloader').css('height',$(window).height()+'px');
    var initRight = 0;
    $('#fullpage').fullpage(
    	{
            anchors:['main','about', 'work', 'contact'],
            lockAnchors: false,
            scrollOverflow:true,
            slidesNavigation: true,
            slidesNavPosition: 'bottom',
            loopHorizontal: false,
            controlArrows:true,
            onLeave: function(index, nextIndex, direction){
                var loadedSlide = $(this);
                $('.navbar-nav li a').removeClass('active');
                $('.navbar-nav li a.'+nextIndex).addClass('active');
                if(index===1){
                    $('.navbar-nav').removeClass('white');
                    $('.bar').css('background-color','#333');
                }
                if(nextIndex === 1){
                    $('.navbar-nav').addClass('white');
                    $('.bar').css('background-color','#fff');
                }
                initRight = (nextIndex - index)*72 + initRight;

                $('.bar').animate({
                    right:initRight,
                    width:$('.'+nextIndex + ' span').width()
                },400);
            }
    	});

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
        $('.bar').css({'background-color':'#fff', 'right': '0', 'width':'37px'});
    }
});
