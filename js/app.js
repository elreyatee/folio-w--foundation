var $button = $('button');
var $wrap = $('#wrap');
var index = 0;
var $menu = $('#header span');
var $nav = $('nav');
var p;

new WOW().init();

var loadPortfolio = function() {
	$.getJSON('json/portfolio.json', function(data){
		//console.log('success', data.length, index); 
		if(index > data.length-1) {
			index = 0;
		}
		$('#wrap').addClass('animated flipInY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass();
		});
		$('#wrap a:first-child').attr('href', data[index].link).css({"background-image":"url('" + data[index].image + "')"});
		$('#wrap p').text(data[index].description);
	});
};

loadPortfolio(index);

$button.on('click', function(e){
	console.log(index);
	e.preventDefault();
    index+=1;
    loadPortfolio();
});

/********* Smooth scroll effect when clicking nav links **********/

$('a[href*=#]').click(function(e){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    e.preventDefault();
});

$menu.on('click', function(e){
	e.preventDefault();
	if($nav.css('display') === 'none') {
		$nav.slideDown('slow');
		$('html').css({'overflow':'hidden'});
	} else {
		$nav.slideUp('slow');
	}
});

$('nav a').on('click', function(e){
	e.preventDefault();
	$nav.slideUp('slow');
	$('html').css({'overflow':'scroll'});
});

$wrap.hover(function() {
	$(this).children('p').css({'display':'none'}).slideDown('fast');
	$(this).children('a').css({'opacity': '0.6'});
}, function() {
	$(this).children('p').css({'display':'block'}).slideUp('fast');
	$(this).children('a').css({'opacity': '1.0'});
});




