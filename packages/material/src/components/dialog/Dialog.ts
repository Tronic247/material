import * as focusTrap from "focus-trap";
import { $ } from "../../util/dom";
import { hideBodyScrollbar, showBodyScrollbar } from "../../util/scroll";

interface Options {
	prominent?: boolean;
	trigger?: HTMLElement | Element | any;
}

function Dialog(dialog: HTMLElement, options: Options = {}) {
	type InstanceReturn = {
		openDialog: typeof openDialog;
		closeDialog: typeof closeDialog;
	};

	let focusTrapInstance: focusTrap.FocusTrap;

	let { prominent = false, trigger = undefined } = options;

	const getIsOpen = () => dialog.style.display === "flex";

	function checkIfContentExits() {
		const content = $(".dialog-content", dialog);

		if (!content) {
			throw new Error(
				"Dialog component must have a child with the class 'dialog-content'"
			);
		}

		return content;
	}

	const content = checkIfContentExits();

	focusTrapInstance = focusTrap.createFocusTrap(content, {
		escapeDeactivates: !prominent,
		clickOutsideDeactivates: !prominent,
		onDeactivate: () => {
			hide();
		},
		onPostActivate: () => {
			dialog.style.pointerEvents = "auto";
		},
		returnFocusOnDeactivate: true,
		preventScroll: true,
		setReturnFocus: () => {
			return trigger;
		},
	});

	function openDialog() {
		if (getIsOpen()) return;

		hideBodyScrollbar();

		dialog.style.display = "flex";
		dialog.style.opacity = "0";
		dialog.style.pointerEvents = "none";

		requestAnimationFrame(() => {
			dialog.style.opacity = "1";
			dialog.classList.add("dialog-open-enter");

			focusTrapInstance.activate();
		});
	}

	function closeDialog(newTrigger?: HTMLElement) {
		if (!getIsOpen()) return;

		if (newTrigger) {
			trigger = newTrigger;
		}

		focusTrapInstance.deactivate();
	}

	function hide() {
		if (!getIsOpen()) return;

		showBodyScrollbar();
		checkIfContentExits();

		dialog.classList.add("dialog-open-exit");

		setTimeout(() => {
			dialog.style.opacity = "0";

			setTimeout(() => {
				dialog.style.display = "none";
				dialog.classList.remove("dialog-open-enter");
				dialog.classList.remove("dialog-open-exit");

				if (trigger) {
					trigger.focus();
				}
			}, 100);
		}, 200);
	}

	const out: InstanceReturn = { openDialog, closeDialog };

	return out;
}

export default Dialog;
