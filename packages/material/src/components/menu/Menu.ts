import {
	computePosition,
	flip,
	offset,
	shift,
	autoUpdate,
} from "@floating-ui/dom";
import { hideBodyScrollbar } from "../../util/scroll";
import * as focusTrap from "focus-trap";

type Options = {
	prominent?: boolean;
	trigger: HTMLElement;
};

function Menu(menu: HTMLElement, options: Options) {
	if (!menu) throw new Error("Element not found");
	if (!options.trigger) throw new Error("Trigger element must be provided");

	const { trigger, prominent = false } = options;

	let focusTrapInstance: focusTrap.FocusTrap;
	let cleanUpFn: () => void;

	const isOpen = () => menu.classList.contains("menu-active");
	const setIsOpen = (val: boolean) => {
		if (val) menu.classList.add("menu-active");
		else menu.classList.remove("menu-active");
	};

	focusTrapInstance = focusTrap.createFocusTrap(menu, {
		escapeDeactivates: !prominent,
		clickOutsideDeactivates: !prominent,
		onDeactivate: () => {
			requestAnimationFrame(hide);
		},
		returnFocusOnDeactivate: true,
		preventScroll: true,
		setReturnFocus: () => {
			return trigger;
		},
	});

	function hide() {
		if (!isOpen())
			return console.warn("hide() called when menu is not showing", menu);

		menu.classList.add("menu-exit");
		if (cleanUpFn) cleanUpFn();

		setTimeout(() => {
			menu.style.display = "none";
			menu.classList.remove("menu-enter", "menu-exit");
			setIsOpen(false);
		}, 200);
	}

	function openMenu() {
		if (isOpen())
			return console.warn(
				"openMenu() called when menu is already showing",
				menu
			);

		menu.style.display = "block";
		hideBodyScrollbar();

		requestAnimationFrame(() => {
			menu.classList.add("menu-enter");

			const updatePos = () => {
				computePosition(trigger, menu, {
					placement: "bottom-start",
					middleware: [
						flip(),
						offset(10),
						shift({
							padding: 10,
						}),
					],
				}).then(({ x, y }) => {
					Object.assign(menu.style, {
						left: `${x}px`,
						top: `${y}px`,
					});
				});
			};

			cleanUpFn = autoUpdate(trigger, menu, updatePos);

			focusTrapInstance.activate();

			setIsOpen(true);
		});
	}

	function closeMenu() {
		if (!isOpen())
			return console.warn(
				"closeMenu() called when menu is already hidden",
				menu
			);

		focusTrapInstance.deactivate();
	}

	function toggleMenu() {
		if (isOpen()) closeMenu();
		else openMenu();
	}

	return {
		openMenu,
		closeMenu,
		toggleMenu,
	};
}

export default Menu;
