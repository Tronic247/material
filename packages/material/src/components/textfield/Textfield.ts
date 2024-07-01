import { $, $$ } from "../../util/dom";

const FLOATING_CLASS = "textfield-floating";
const FOCUSED_CLASS = "textfield-focused";

function TextField() {
	function attach(textfield: HTMLElement) {
		const label = $(".textfield-label", textfield);
		const input = $(".textfield-input", textfield) as HTMLInputElement;

		if (!label) throw new Error("Label not found");
		if (!input) throw new Error("Input not found");

		if (input.value !== "") textfield.classList.add(FLOATING_CLASS);

		textfield.addEventListener("click", () => {
			input.focus();
		});

		input.addEventListener("focus", () => {
			textfield.classList.add(FLOATING_CLASS);
			textfield.classList.add(FOCUSED_CLASS);
		});

		input.addEventListener("blur", () => {
			if (input.value === "") {
				textfield.classList.remove(FLOATING_CLASS);
			}

			textfield.classList.remove(FOCUSED_CLASS);
		});
	}
	function detach() {}
	function initialize(parent: HTMLElement = document.body) {
		const textfields = $$(".textfield", parent);

		for (const textfield of textfields) {
			attach(textfield);
		}
	}

	return {
		attach,
		detach,
		initialize,
	};
}

export default TextField;
