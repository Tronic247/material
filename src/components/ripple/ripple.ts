import { $$ } from "../../util/dom";

function findFurthestPoint(
	clickPointX: number,
	elementWidth: number,
	offsetX: number,
	clickPointY: number,
	elementHeight: number,
	offsetY: number
) {
	let x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;
	let y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;
	let d = Math.hypot(x - (clickPointX - offsetX), y - (clickPointY - offsetY));

	return d;
}

function Ripple() {
	const startEvents = ["pointerdown"];
	const stopEvents = [
		"pointerup",
		"mouseleave",
		"dragleave",
		"touchmove",
		"touchend",
		"touchcancel",
	];
	const selector =
		".ripple-e:not([data-ripple-ready]) , .btn:not([data-ripple-ready]), .icon:not([data-ripple-ready])";

	function startRipple(el: HTMLElement, event: PointerEvent) {
		const rect = el.getBoundingClientRect();
		const radius = findFurthestPoint(
			event.clientX,
			el.offsetWidth,
			rect.left,
			event.clientY,
			el.offsetHeight,
			rect.top
		);

		const circle = document.createElement("div");
		circle.classList.add("ripple");

		circle.style.left = `${event.clientX - rect.left - radius}px`;
		circle.style.top = `${event.clientY - rect.top - radius}px`;
		circle.style.width = circle.style.height = `${radius * 2}px`;

		el.appendChild(circle);

		const stop = () => {
			circle.style.opacity = "0";

			setTimeout(() => {
				circle.remove();
			}, 600);
		};

		stopEvents.forEach((event) => {
			el.addEventListener(event, stop);
		});
	}

	function onRippleStart(e: any, el: HTMLElement) {
		startRipple(el, e as PointerEvent);
	}

	/**
	 * Attach ripple effect to element
	 */
	function attachToElement(el: HTMLElement) {
		el.dataset.rippleReady = "true";

		startEvents.forEach((event) => {
			el.addEventListener(event, (e) => onRippleStart(e, el));
		});
	}

	/**
	 * Detach ripple effect from element
	 */
	function detachFromElement(el: HTMLElement) {
		delete el.dataset.rippleReady;

		startEvents.forEach((event) => {
			el.removeEventListener(event, (e) => onRippleStart(e, el));
		});
	}

	/**
	 * Attach ripple effect to elements
	 */
	function initialize(parent: HTMLElement | Document = document) {
		const elements = $$(selector, parent as HTMLElement);

		if (!elements) return;

		elements.forEach((el) => attachToElement(el));
	}

	return {
		initialize,
		attachToElement,
		detachFromElement,
	};
}

export default Ripple;
