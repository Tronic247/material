import {
	$$,
	$addClass,
	$addEvents,
	$element,
	$hasClass,
	$removeClass,
} from "../element";
import { createPopper } from "@popperjs/core";

/**
 * Tooltips
 */
function Tooltip() {
	const tooltipEls = $$("[data-tooltip]");
	const tooltipActiveClass = "tooltip--open";

	tooltipEls.forEach((el) => {
		if ($hasClass(el, "tooltip-init")) return;

		const tooltipEl = $element("div");
		$addClass(tooltipEl, "tooltip");
		$addClass(el, "tooltip-init");

		const tooltipText = el.getAttribute("data-tooltip");
		tooltipEl.innerHTML = tooltipText;

		function show() {
			document.body.appendChild(tooltipEl);

			createPopper(el, tooltipEl, {
				placement: el.getAttribute("data-placement") || "bottom",
				modifiers: [
					{
						name: "offset",
						options: {
							offset: [4, 4],
						},
					},
				],
			});

			$addClass(tooltipEl, tooltipActiveClass);
		}

		function hide() {
			$removeClass(tooltipEl, tooltipActiveClass);
			setTimeout(() => {
				tooltipEl.remove();
			}, 300);
		}

		$addEvents(el, "mouseenter, touchstart", show);
		$addEvents(el, "mouseleave, touchend", hide);
	});
}

Tooltip();

export default Tooltip;
