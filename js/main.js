$(document).ready(function() {
    jQuery("#status").delay(500).fadeOut(500);
    jQuery("#preloader").delay(1000).fadeOut("slow");

    $('#fullpage').fullpage(
    	{
            anchors:['main','about', 'work', 'contact'],
            lockAnchors: false,
            scrollOverflow:true,
            slidesNavigation: true,
            slidesNavPosition: 'bottom',
            loopHorizontal: true,
            controlArrows:true,
    	});

    $(function(){
      	setTimeout(function(){
    	$('.typed-text').fadeIn(300);
    	// $('.typed-text').addClass('animated fadeIn');
    	setTimeout(function(){
    		$("#element").typed({
        	strings: ["<strong>UI/UX Designer</strong>","<strong>Frontend Developer</strong>","<strong>Graphic Designer</strong>"],
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
});
