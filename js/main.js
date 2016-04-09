$(document).ready(function() {

    var firstcall=false;
    $('#fullpage').fullpage(
    	{
            anchors:['main','about', 'work', 'contact'],
    		navigation:true,
            lockAnchors: false,
            scrollOverflow:true,
            afterLoad: function(anchorLink, index){
                            var loadedSection = $(this);
                            //using anchorLink
                            if(anchorLink == 'about'){
                                firstcall=true;
                            }
                        }
    	});

    if(firstcall){
        console.log('first call');
    }

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
    
    particlesJS.load('particles-js', 'assets/particles.json', function() {
        console.log('callback - particles.js config loaded');
    });
});
