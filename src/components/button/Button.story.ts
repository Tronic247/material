import type { StoryObj, Meta } from "@storybook/html";
import { Ripple } from "../../index";

type Options = {
	size: "xs" | "sm" | "" | "lg" | "xl";
	variant: "primary" | "secondary" | "success" | "danger" | "warning";
	type: "" | "unelevated" | "outlined" | "text";
	iconBefore: boolean;
	iconAfter: boolean;
	label: string;
	disabled: boolean;
};

const meta = {
	title: "Buttons",
	render: (args) => {
		const size = args.size;
		const variant = args.variant;

		const btn = document.createElement("button");
		btn.className = `btn btn-${variant} ${size && `btn-${size}`} btn-${args.type}`;
		btn.disabled = args.disabled;

		Ripple().attachToElement(btn);

		btn.innerHTML = `
			${args.iconBefore ? '<i class="mdi mdi-thumb-up"></i>' : ""}

			${args.label}

			${args.iconAfter ? '<i class="mdi mdi-thumb-up"></i>' : ""}
		`;

		return btn;
	},
	argTypes: {
		label: { control: "text" },
		size: {
			control: { type: "select" },
			options: ["xs", "sm", "", "lg", "xl"],
		},
		variant: {
			control: { type: "select" },
			options: ["primary", "secondary", "success", "danger", "warning"],
		},
		type: {
			control: { type: "select" },
			options: ["", "unelevated", "outlined", "text"],
		},
		iconBefore: { control: "boolean" },
		iconAfter: { control: "boolean" },
	},
	args: {
		size: "",
		variant: "primary",
		type: "",
		iconBefore: false,
		iconAfter: false,
		disabled: false,
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Normal: Story = {
	args: {
		label: "Button",
	},
};
