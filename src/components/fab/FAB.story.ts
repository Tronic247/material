import type { StoryObj, Meta } from "@storybook/html";
import { Ripple } from "../../index";

type Options = {
	variant: "primary" | "secondary" | "success" | "danger" | "warning";
	icon: boolean;
	label: boolean;
};

const meta = {
	title: "Buttons/FAB",
	render: (args) => {
		const btn = document.createElement("button");
		btn.className = `btn btn-${args.variant} btn-fab ${args.label ? "btn-fab-text" : ""}`;

		Ripple().attachToElement(btn);

		btn.innerHTML = `
            ${args.icon ? `<i class="mdi mdi-heart"></i>` : ""}

            ${args.label ? `Delete` : ""}
		`;

		return btn;
	},
	argTypes: {
		label: { control: "boolean" },
		variant: {
			control: { type: "select" },
			options: ["primary", "secondary", "success", "danger", "warning"],
		},
		icon: { control: "boolean" },
	},
	args: {
		variant: "primary",
		label: false,
		icon: true,
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const FAB: Story = {};
