import {
	$,
	$$,
	$addClass,
	$addEvents,
	$element,
	$hasClass,
	$removeClass,
} from "../element";

class Forms {
	init() {
		const forms = $$(".textbox");

		forms.forEach((form) => {
			const input = $(".input", form);

			if (input.value) {
				$addClass(form, "floating");
			} else {
				$removeClass(form, "floating");
			}

			$addEvents(form, "click", () => {
				$addClass(form, "floating");
				input.focus();
			});

			$addEvents(input, "focus", () => {
				$addClass(form, "focus");
				$addClass(form, "floating");
			});

			$addEvents(input, "blur", () => {
				$removeClass(form, "focus");

				if (input.value) {
					$addClass(form, "floating");
				} else {
					$removeClass(form, "floating");
				}
			});

			$addEvents(input, "input", () => {
				if (input.value) {
					$addClass(form, "floating");
				} else {
					$removeClass(form, "floating");
				}
			});
		});
	}
}
new Forms().init();

export default Forms;
