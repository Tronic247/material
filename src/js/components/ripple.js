import { $, $$, $addClass, $addEvents, $element } from "../element";
import { uid } from "../utils";

/**
 * Ripple utility
 */
function Ripple() {
	const rippleEls = $$(
		".ripple-e:not(.ripple-ready) , .btn:not(.ripple-ready), .icon:not(.ripple-ready)"
	);

	const stopEvents = [
		"pointerup",
		"mouseleave",
		"dragleave",
		"touchmove",
		"touchend",
		"touchcancel",
	];

	let id;

	function findFurthestPoint(
		clickPointX,
		elementWidth,
		offsetX,
		clickPointY,
		elementHeight,
		offsetY
	) {
		const x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;
		const y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;
		const d = Math.hypot(
			x - (clickPointX - offsetX),
			y - (clickPointY - offsetY)
		);
		return d;
	}

	rippleEls.forEach((element) => {
		$addClass(element, "ripple-ready");

		const ripple = (e) => {
			const rect = element.getBoundingClientRect();
			const radius = findFurthestPoint(
				e.clientX,
				element.offsetWidth,
				rect.left,
				e.clientY,
				element.offsetHeight,
				rect.top
			);

			id = uid();

			const circle = $element("div");
			$addClass(circle, "ripple");

			circle.setAttribute("__data-material-ripple", id);

			Object.assign(circle.style, {
				left: `${e.clientX - rect.left - radius}px`,
				top: `${e.clientY - rect.top - radius}px`,
				width: `${radius * 2}px`,
				height: `${radius * 2}px`,
			});

			element.appendChild(circle);
		};

		$addEvents(element, "pointerdown", ripple);

		$addEvents(element, stopEvents.join(","), () => {
			const ripple = $(`[__data-material-ripple="${id}"]`);

			if (ripple) {
				ripple.style.opacity = "0";

				$addEvents(ripple, "transitionend, animationend", () => {
					ripple.remove();
				});
			}
		});
	});
}

Ripple();

export default Ripple;
