jQuery(function($) {
	if (window.innerWidth > 768) {
		new WOW().init();
	}

	let $forms = $("form");
	$forms.on("submit", function(event) {
		let $form = $(this);

		let $inputs = $form.find("input");
		let inputsNotEmpty = true;

		$inputs.each(function() {
			inputsNotEmpty = inputsNotEmpty ? $(this).val().length > 0 : inputsNotEmpty;
		});

		if (inputsNotEmpty) {
			let $btn = $form.find("button");
			$form.find(".form__spinner").removeClass("d-none");
			$btn.prop("disabled", true);

			let $msg = $form.find(".form__message");
			let msgTxt = "&#10006; Возникла ошибка при отправке. Попробуйте повторить позднее.";

			$.ajax({
				type: $form.attr("method"),
				url: $form.attr("action"),
				data: $form.serialize()
			}).done(function(data) {
				msgTxt = data ? "&#10004; Благодарим за обращение. Ваша заявка отправленна." : msgTxt;
				setTimeout(function() {
					$().add($inputs).add($btn).addClass("d-none");
				}, 1500);
			}).always(function() {
				setTimeout(function() {
					$form.find(".form__spinner").addClass("d-none");
					$btn.prop("disabled", false);

					$msg.html(msgTxt);
				}, 1500);
			});
		}

		event.preventDefault();
	});
});