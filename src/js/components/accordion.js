import { $$, $addClass, $addEvents, $hasClass, $removeClass } from "../element";
import anime from "animejs";

/**
 * Accordion component
 * @param {HTMLElement} element DOM element
 */
function Accordion(element) {
	let accordion_parents = $$(".accordion_parent");

	if (element) accordion_parents = [element];

	const accordionClass = "accordion";
	const openClass = "accordion--open";
	const headClass = "accordion_head";
	const bodyClass = "accordion_body";

	accordion_parents.forEach((accordion_parent) => {
		if (typeof accordion_parent.Material != "undefined")
			return console.warn(
				"Accordion component already initialized",
				accordion_parent
			);

		/**
		 * Get all the accordions
		 */
		const accordions = accordion_parent.querySelectorAll(`.${accordionClass}`);

		/**
		 * Animate down the accordion
		 */
		function animateDown(el) {
			Object.assign(el.style, {
				height: 0,
				overflow: "hidden",
				padding: 0,
				margin: 0,
				border: 0,
			});

			const height = el.scrollHeight;

			anime({
				targets: el,
				duration: 600,
				easing: "easeOutQuint",
				height: height,
				opacity: [0, 1],
				complete: () => {
					/**
					 * Revert the style back to normal
					 */
					Object.assign(el.style, {
						height: "",
						overflow: "",
						padding: "",
						margin: "",
						border: "",
					});
				},
			});
		}

		/**
		 * Animate up the accordion
		 */
		function animateUp(el, after) {
			anime({
				targets: el,
				duration: 600,
				easing: "easeOutQuint",
				height: 0,
				opacity: [0.2, 0],
				complete: () => {
					after();
				},
			});
		}

		/**
		 * Set the active accordion
		 * @param {Number} index The index of the accordion
		 * @returns null
		 */
		const setActive = (index) => {
			const thisAccordion = accordions[index];
			const thisAccordionContent = thisAccordion.querySelector(`.${bodyClass}`);

			if ($hasClass(thisAccordion, openClass)) {
				animateUp(thisAccordionContent, () => {
					$removeClass(thisAccordion, openClass);
				});

				return;
			}

			accordions.forEach((_accordion) => {
				if ($hasClass(_accordion, openClass)) {
					const accordionContent = _accordion.querySelector(`.${bodyClass}`);

					animateUp(accordionContent, () => {
						$removeClass(_accordion, openClass);
					});
				}
			});

			$addClass(thisAccordion, openClass);
			animateDown(thisAccordionContent);
		};

		accordions.forEach((accordion, index) => {
			const accordion_head = accordion.querySelector(`.${headClass}`);

			$addEvents(accordion_head, "click", (e) => {
				e.preventDefault();
				e.stopPropagation();

				setActive(index);
			});
		});

		/**
		 * Set API
		 */
		accordion_parent.Material = {
			setActive,
		};
	});
}

Accordion();

export default Accordion;
