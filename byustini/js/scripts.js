jQuery(function($) {
	if (window.innerWidth > 768) {
		new WOW().init();
	}

	$('a[href*="#"]').on('click', function (e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 500, 'linear');
	});
});