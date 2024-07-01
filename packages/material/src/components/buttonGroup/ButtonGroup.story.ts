import type { StoryObj, Meta } from "@storybook/html";
import { Ripple } from "../../index";

type Options = {
	size: "xs" | "sm" | "" | "lg" | "xl";
	type: "" | "unelevated" | "outlined" | "text";
	variant: "primary" | "secondary" | "success" | "danger" | "warning";
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Buttons/Group",
	render: (args) => {
		const div = document.createElement("div");
		div.className = `btn-group btn-group-${args.variant} ${!args.variant && `elevation-2`}`;

		div.innerHTML = `
            <button class="btn btn-unelevated btn-${args.variant} btn-${args.size} btn-${args.type}">Button 1</button>
            <button class="btn btn-unelevated btn-${args.variant} btn-${args.size} btn-${args.type}">Button 2</button>
            <button class="btn btn-unelevated btn-${args.variant} btn-${args.size} btn-${args.type}">Button 3</button>
        `;

		Ripple().initialize(div);

		return div;
	},
	argTypes: {
		size: {
			control: { type: "select" },
			options: ["xs", "sm", "", "lg", "xl"],
		},
		type: {
			control: { type: "select" },
			options: ["", "unelevated", "outlined", "text"],
		},
		variant: {
			control: { type: "select" },
			options: ["primary", "secondary", "success", "danger", "warning"],
		},
	},
	args: {
		size: "",
		type: "",
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Group: Story = {};
