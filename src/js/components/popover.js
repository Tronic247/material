import { createPopper } from "@popperjs/core";
import { $, $addClass, $removeClass, $hasClass } from "../element";

class Popover {
	init(element) {
		const popover = $(element);
		const popoverOpenClass = "popover--open";

		if (popover.Material?.Popover) return;

		if (!popover.Material) popover.Material = {};

		popover.Material.Popover = {};

		const targetElement = $(popover.getAttribute("data-element"));
		let placement = popover.getAttribute("data-placement") || "bottom";

		if (!targetElement) {
			console.error(
				"Popover: Target element not found",
				popover.getAttribute("data-element"),
				popover
			);
		}

		createPopper(targetElement, popover, {
			placement,
			modifiers: [
				{
					name: "offset",
					options: {
						offset: [10, 20],
					},
				},
			],
		});

		function open() {
			popover.setAttribute("tabindex", "1");
			$addClass(popover, popoverOpenClass);
		}

		function close() {
			popover.setAttribute("tabindex", "-1");
			$removeClass(popover, popoverOpenClass);
		}

		function toggle() {
			if ($hasClass(popover, popoverOpenClass)) {
				close();
			} else {
				open();
			}
		}

		if ($hasClass(popover, popoverOpenClass)) {
			open();
		} else {
			close();
		}

		popover.Material.Popover = {
			open,
			close,
			toggle,
		};
	}
}

const instance = new Popover();
export default instance;
