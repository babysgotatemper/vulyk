$(function () {
	$('.slider').slick({
		dots: true,
		autoplay: true,
		fade: true,
	});
	//
	$(".nav__link").on("click", function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({
			scrollTop: top
		}, 1500);
	});
});
