import { computePosition, flip, offset, shift } from "@floating-ui/dom";
import { $$ } from "../../util/dom";

const showEvents = ["mouseover", "focus"];
const hideEvents = ["mouseout", "mouseleave", "blur"];

function Tooltip() {
	function initialize(el: HTMLElement = document.body as HTMLElement) {
		const tooltip = $$("[data-tooltip]", el);

		tooltip?.forEach((el) => {
			const content: string = el.getAttribute("data-tooltip") ?? "";
			const placement: string =
				el.getAttribute("data-tooltip-placement") || "top";
			const delay = parseInt(el.getAttribute("data-tooltip-delay") || "0");
			const html = el.getAttribute("data-tooltip-allow-html") !== null;

			showEvents.forEach((event) => {
				el.addEventListener(event, () => {
					const tooltipDiv = document.createElement("div");
					tooltipDiv.className = "tooltip";

					if (html) {
						tooltipDiv.innerHTML = content;
					} else {
						tooltipDiv.textContent = content;
					}

					computePosition(el, tooltipDiv, {
						placement: placement as any,
						middleware: [
							flip(),
							shift(),
							offset({
								mainAxis: 10,
							}),
						],
					}).then(({ x, y }) => {
						Object.assign(tooltipDiv.style, {
							left: `${x}px`,
							top: `${y}px`,
						});
					});

					document.body.appendChild(tooltipDiv);

					requestAnimationFrame(() => {
						if (delay) {
							setTimeout(() => {
								tooltipDiv.classList.add("tooltip-show");
							}, delay);
						} else {
							tooltipDiv.classList.add("tooltip-show");
						}
					});

					hideEvents.forEach((event) => {
						el.addEventListener(event, () => {
							tooltipDiv.classList.remove("tooltip-show");

							setTimeout(() => {
								tooltipDiv.remove();
							}, 300);
						});
					});
				});
			});
		});
	}

	return { initialize };
}

export default Tooltip;
