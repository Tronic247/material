import type { StoryObj, Meta } from "@storybook/html";
import TextFieldInstance from "./Textfield";

type Options = {
	error: boolean;
	disabled: boolean;
	type: "normal" | "minimal" | "bordered";
	iconBefore: boolean;
	iconAfter: boolean;
	inputType: "input" | "textarea";
	value: string;
};

const meta = {
	title: "Texfield",
	render: (args) => {
		const div = document.createElement("div");

		const html = `
		<div class="textfield textfield-${args.type} ${args.error ? "textfield-error" : ""} ${args.disabled ? "textfield-disabled" : ""}">
			${
				args.iconBefore
					? `
			<div class="textfield-left">
				<iconify-icon icon="mdi:account" class="icon"></iconify-icon>
			</div>
			`
					: ""
			}

    		<div class="textfield-middle">
    		    <label for="name" class="textfield-label">Name</label>
    		    <${args.inputType} type="text" id="name" class="textfield-input" value="${args.value}" placeholder="Enter your name" ${args.disabled ? "disabled" : ""}>${args.inputType === "textarea" ? args.value + "</textarea>" : ""}
    		</div>

			${
				args.iconAfter
					? `
			<div class="textfield-right">
				<iconify-icon icon="mdi:account" class="icon"></iconify-icon>
			</div>
			`
					: ""
			}
		</div>
			


			`;

		div.innerHTML = html;

		TextFieldInstance().initialize(div);

		return div;
	},
	argTypes: {
		type: {
			options: ["normal", "minimal", "bordered"],
			control: {
				type: "select",
			},
		},
		error: {
			control: {
				type: "boolean",
			},
		},
		disabled: {
			control: {
				type: "boolean",
			},
		},
		iconBefore: {
			control: {
				type: "boolean",
			},
		},
		iconAfter: {
			control: {
				type: "boolean",
			},
		},
		inputType: {
			options: ["input", "textarea"],
			control: {
				type: "select",
			},
		},
		value: {
			control: {
				type: "text",
			},
		},
	},
	args: {
		error: false,
		disabled: false,
		type: "normal",
		iconBefore: false,
		iconAfter: false,
		inputType: "input",
		value: "",
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Texfield: Story = {};
