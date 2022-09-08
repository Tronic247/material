import { createFocusTrap } from "focus-trap";
import { $addClass, $hasClass, $removeClass } from "../element";
import anime from "animejs";

function Dialog(element) {
	/**
	 * Check if already initialized
	 */
	if (typeof element.Material != "undefined") {
		console.warn("Dialog component already initialized", element);

		return element.Material.Dialog;
	}

	const trap = createFocusTrap(element, {
		escapeDeactivates: false,
	});
	const openClass = "dialog--open";

	element.Material = {
		Dialog: {},
	};

	/**
	 * Open the dialog
	 */
	function open() {
		element.style.display = "flex";

		anime({
			targets: element,
			duration: 100,
			opacity: [0, 1],
			complete: () => {
				$addClass(element, openClass);
			},
		});

		element.focus();
		trap.activate();
	}

	/**
	 * Hide the dialog
	 */
	function hide() {
		$removeClass(element, openClass);

		anime({
			targets: element,
			duration: 100,
			opacity: [1, 0],
			complete: () => {
				element.style.display = "none";
			},
		});

		trap.deactivate();
	}

	/**
	 * Toggle the dialog
	 */
	function toggle() {
		if ($hasClass(element, openClass)) hide();
		else open();
	}

	/**
	 * Set properties
	 */
	const props = { open, hide, toggle };
	element.Material.Dialog = props;

	return props;
}

export default Dialog;
