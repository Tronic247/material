import { $, $$ } from "../../util/dom";

function Tabs(el: HTMLElement) {
	const tabItems = $$(".tabs-item", el);

	if (!tabItems) throw new Error("Element not found");

	const indicator = $(".tabs-indicator", el);

	if (!indicator)
		throw new Error(
			"Indicator not found. Please add a <span class='tabs-indicator'></span> element to your tabs."
		);

	const isVertical = el.classList.contains("tabs-vertical");
	const updateIndicator = (activeItem: HTMLElement) => {
		if (isVertical) {
			indicator.style.height = `${activeItem.clientHeight}px`;
			indicator.style.top = `${activeItem.offsetTop}px`;
		} else {
			indicator.style.width = `${activeItem.offsetWidth}px`;
			indicator.style.left = `${activeItem.offsetLeft}px`;
		}
	};

	const activeItem = $(".tabs-item-active", el);
	requestAnimationFrame(() => {
		if (activeItem) updateIndicator(activeItem);

		el.classList.add("tabs-loaded");
	});

	const setActive = (index: number) => {
		tabItems.forEach((tabItem, i) => {
			if (i === index) {
				tabItem.classList.add("tabs-item-active");

				requestAnimationFrame(() => {
					updateIndicator(tabItem);
				});
			} else {
				tabItem.classList.remove("tabs-item-active");
			}
		});
	};

	return {
		setActive,
	};
}

export default Tabs;
