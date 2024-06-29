function hideBodyScrollbar() {
	const scrollBarWidth =
		window.innerWidth - document.documentElement.clientWidth;

	document.body.style.overflow = "hidden";
	document.body.style.paddingRight = `${scrollBarWidth}px`;
}

function showBodyScrollbar() {
	document.body.style.overflow = "";
	document.body.style.paddingRight = "";
}

export { hideBodyScrollbar, showBodyScrollbar };
