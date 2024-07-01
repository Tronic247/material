import { $ } from "../../util/dom";

type Options = {
	prominent?: boolean;
};

function Drawer(el: HTMLElement, options: Options = {}) {
	const overlay = $(".drawer-overlay", el);
	const content = $(".drawer", el);

	if (!overlay) throw new Error("Drawer: Overlay not found");
	if (!content) throw new Error("Drawer: Content not found");

	function open() {
		overlay.style.display = "block";
		content.style.display = "block";

		requestAnimationFrame(() => {
			overlay.style.opacity = "1";

			content.classList.add("drawer-in");
		});
	}

	function close() {
		overlay.style.opacity = "0";

		content.classList.remove("drawer-in");
		content.classList.add("drawer-out");

		setTimeout(() => {
			overlay.style.display = "none";
			content.style.display = "none";

			content.classList.remove("drawer-out");
		}, 300);
	}

	if (!options.prominent) {
		overlay.addEventListener("click", close);
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				close();
			}
		});
	}

	return {
		open,
		close,
	};
}

export default Drawer;
