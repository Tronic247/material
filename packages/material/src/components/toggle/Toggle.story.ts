import type { StoryObj, Meta } from "@storybook/html";

type Options = {
	error: boolean;
	label: string;
	disabled: boolean;
	checked: boolean;
};

const meta = {
	title: "Toggle",
	render: (args) => {
		const div = document.createElement("div");

		div.innerHTML = `
            <div class="toggle-container ${args.error ? "toggle-error" : ""} ${args.disabled ? "toggle-disabled" : ""}">
				<label
					class="toggle-label"
					for="toggle"
				>
					${args.label}
				</label>

				<label class="toggle">
    				<input type="checkbox" id="toggle" ${args.disabled ? "disabled" : ""} />
    				<span></span>
				</label>
			</div>
        `;

		if (args.checked) {
			div.querySelector("input")!.setAttribute("checked", "");
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
	},
	args: {
		error: false,
		label: "Remind me every day",
		disabled: false,
		checked: false,
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Toggle: Story = {};
