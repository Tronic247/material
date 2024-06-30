import type { StoryObj, Meta } from "@storybook/html";

type Options = {
	error: boolean;
	label: string;
	disabled: boolean;
	checked: boolean;
	indeterminate: boolean;
};

const meta = {
	title: "Check Box",
	render: (args) => {
		const div = document.createElement("div");

		div.innerHTML = `
            <label class="checkbox ${args.error ? "checkbox-error" : ""}">
                <input type="checkbox" ${args.disabled ? "disabled" : ""} />
                <span>${args.label}</span>
            </label>
        `;

		if (args.checked) {
			div.querySelector("input")!.setAttribute("checked", "");
		}

		if (args.indeterminate) {
			div.querySelector("input")!.indeterminate = true;
		}

		return div;
	},
	argTypes: {
		error: {
			control: {
				type: "boolean",
			},
		},
		label: {
			control: {
				type: "text",
			},
		},
		disabled: {
			control: {
				type: "boolean",
			},
		},
		checked: {
			control: {
				type: "boolean",
			},
		},
		indeterminate: {
			control: {
				type: "boolean",
			},
		},
	},
	args: {
		error: false,
		label: "I agree to sell my soul",
		disabled: false,
		checked: false,
		indeterminate: false,
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const CheckBox: Story = {};
