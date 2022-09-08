import { $, $element, $addClass, $removeClass } from "../element";
import { uid, noop } from "../utils";
import Ripple from "./ripple";
import anime from "animejs";

const defaultOptions = {
	action: "",
	duration: 3000,
	onClose: noop,
	onOpen: noop,
	onDestroy: noop,
	actionHandler: noop,
};

let snackbarContainer = $element("div");
if ($(".snackbar_container")) snackbarContainer = $(".snackbar_container");
else {
	$addClass(snackbarContainer, "snackbar_container");
	document.body.appendChild(snackbarContainer);
}

/**
 * Create span
 */
const span = document.createElement("span");
span.style.display = "none";
snackbarContainer.appendChild(span);

/**
 * Snackbar
 * @param {String} message
 * @param {defaultOptions} options
 */
function Snackbar(message, options = {}) {
	options = { ...defaultOptions, ...options };

	const snackBarParent = $element("div");
	$addClass(snackBarParent, "snackbar");

	function open() {
		const actionId = uid();

		snackBarParent.innerHTML = `
            <div class="snackbar_message">${message}</div>

            ${
							options.action
								? `<button class="btn text primary" id="${actionId}">${options.action}</button>`
								: ``
						}
        `;

		setTimeout(() => {
			const actionButton = $(`#${actionId}`);

			Ripple.init();

			actionButton?.addEventListener("click", () => {
				options.actionHandler();
				close();
			});
		}, 100);

		snackbarContainer.insertBefore(
			snackBarParent,
			snackbarContainer.firstChild
		);

		setTimeout(() => {
			$addClass(snackBarParent, "snackbar--open");
			options.onOpen();
		}, 100);
	}

	open();

	function close() {
		$removeClass(snackBarParent, "snackbar--open");
		anime({
			targets: snackBarParent,
			height: 0,
			duration: 200,
			easing: "easeInOutQuad",
			complete() {
				options.onClose();

				destroy();
			},
		});
	}

	setTimeout(close, options.duration);

	function destroy() {
		snackBarParent.remove();

		options.onDestroy();
	}
}

export default Snackbar;
