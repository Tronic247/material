import Ripple from "../ripple/ripple";
import { SnackBar, SnackbarQueue } from "./SnackbarQueue";

function Snackbar(options: SnackBar) {
	const {
		message,
		actionText = undefined,
		actionHandler = undefined,
	} = options;

	const textNode = document.createTextNode(message);

	const snackbar = document.createElement("div");

	snackbar.classList.add("snackbar");
	snackbar.appendChild(textNode);

	/**
	 *
	 */
	const actions = document.createElement("div");
	actions.classList.add("snackbar-actions");

	if (actionText && actionHandler) {
		const actionBtn = document.createElement("button");
		actionBtn.classList.add("btn", "btn-secondary", "btn-text");

		actionBtn.textContent = actionText;

		actionBtn.addEventListener("click", () => {
			actionHandler(destroy);
		});

		actions.appendChild(actionBtn);
	}

	const closeBtn = document.createElement("button");
	closeBtn.classList.add("btn", "btn-icon", "btn-light");

	closeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>
    `;

	closeBtn.addEventListener("click", destroy);
	actions.appendChild(closeBtn);
	/**
	 *
	 */

	snackbar.appendChild(actions);

	Ripple().initialize(snackbar);

	let onFinishFn: () => any;

	function create(finishCallback: () => any) {
		onFinishFn = finishCallback;

		document.body.appendChild(snackbar);

		requestAnimationFrame(() => {
			setTimeout(() => {
				snackbar.classList.add("snackbar-show");
			}, 100);
		});

		setTimeout(() => {
			destroy();
		}, 4000);
	}

	function destroy() {
		snackbar.classList.remove("snackbar-show");
		snackbar.addEventListener("transitionend", () => {
			snackbar.remove();

			setTimeout(() => {
				onFinishFn();
			}, 200);
		});
	}

	SnackbarQueue.push({ create, destroy });

	return { destroy };
}

export default Snackbar;
