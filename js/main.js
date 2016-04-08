$(document).ready(function() {
    $('#fullpage').fullpage(
    	{
    		navigation:true,

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
    },300);
  	});
});
