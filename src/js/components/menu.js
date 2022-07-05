import { createFocusTrap } from "focus-trap";
import { createPopper } from "@popperjs/core";
import { $addClass, $removeClass, $addEvents, $hasClass } from "../element";

class Menu {
	init(element) {
		if (!element.Material) element.Material = {};
		if (element.Material.Menu) return;

		const trap = createFocusTrap(element, {
			allowOutsideClick: true,
		});
		const openClass = "menu--open";

		let trigger = null;

		element.Material.Menu = {
			open,
			close,
			toggle,
			popperCreated: false,
		};

		function create_popper(trigger) {
			if (element.Material.Menu.popperCreated) return;
			element.Material.Menu.popperCreated = true;

			const popper = createPopper(trigger, element, {
				placement: "bottom",
			});
		}

		element.setAttribute("tabindex", -1);

		function open(el) {
			trigger = el;
			create_popper(trigger);

			trap.activate();
			$addClass(element, openClass);
		}

		function close(el) {
			trigger = el;
			create_popper(trigger);

			trap.deactivate();
			$removeClass(element, openClass);
		}

		function toggle(el) {
			trigger = el;
			create_popper(trigger);

			if ($hasClass(element, openClass)) {
				close(el);
			} else {
				open(el);
			}
		}

		$addEvents(document, "keydown", (e) => {
			if (e.key === "Escape") {
				close();
			}
		});

		/**
		 * Close the menu when the user clicks inside of it.
		 */
		$addEvents(document, "click", (e) => {
			if (!$hasClass(element, openClass)) return;
			if (!element.contains(e.target)) return;
			close();
		});
	}
}
const instance = new Menu();
export default instance;
