export const $ = (selector, parent = document) =>
	parent.querySelector(selector);
export const $$ = (selector, parent = document) =>
	parent.querySelectorAll(selector);

export const $addClass = (el, className) => el.classList.add(className);
export const $removeClass = (el, className) => el.classList.remove(className);
export const $hasClass = (el, className) => el.classList.contains(className);
export const $toggleClass = (el, className) => el.classList.toggle(className);

export const $addEvents = (el, events, handler) => {
	events.split(",").forEach((event) => {
		el.addEventListener(event, handler);
	});
};

export const $element = (tag) => document.createElement(tag);
