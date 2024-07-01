import type { StoryObj, Meta } from "@storybook/html";
import { Ripple as RippleAction } from "../../index";

type Options = {
	center: boolean;
	variant: "" | "primary" | "secondary" | "success" | "danger" | "warning";
};

const meta = {
	title: "Ripple",
	render: (args) => {
		const div = document.createElement("div");

		div.setAttribute(
			"style",
			"width: 200px; height: 200px; border: 1px solid black;display:block"
		);

		div.classList.add(
			`ripple-e`,
			`ripple-${args.variant}`,
            `ripple-${args.center ? "center" : ""}`
		);

		RippleAction().attachToElement(div);

		return div;
	},
	argTypes: {
		variant: {
			control: { type: "select" },
			options: ["", "primary", "secondary", "success", "danger", "warning"],
		},
		center: { control: "boolean" },
	},
	args: {
        center: false,
    },
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Ripple: Story = {};
