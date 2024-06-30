const $ = (selector: string, parent?: HTMLElement): HTMLElement | undefined => {
	return (
		((parent || document).querySelector(selector) as HTMLElement) ?? undefined
	);
};

const $$ = (
	selector: string,
	parent?: HTMLElement
): NodeListOf<HTMLElement> | undefined => {
	return (parent || document).querySelectorAll(selector);
};

export { $, $$ };
