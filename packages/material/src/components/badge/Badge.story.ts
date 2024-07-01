import type { StoryObj, Meta } from "@storybook/html";

type Options = {
	variant: "" | "primary" | "secondary" | "success" | "danger" | "warning";
	isCircle: boolean;
	number: number;
	hidden: boolean;
};

const meta = {
	title: "Badge",
	render: (args) => {
		const div = document.createElement("div");

		div.innerHTML = args.isCircle
			? `
			<span class="badge badge-${args.hidden && "hidden"} badge-circle badge-${args.variant}">${args.number}</span>
        `
			: `
			<span class="badge badge-${args.hidden && "hidden"} badge-${args.variant}">Vite</span>
		`;

		return div;
	},
	argTypes: {
		variant: {
			control: { type: "select" },
			options: ["", "primary", "secondary", "success", "danger", "warning"],
		},
		isCircle: {
			control: { type: "boolean" },
		},
		number: {
			control: { type: "number" },
		},
		hidden: {
			control: { type: "boolean" },
		},
	},
	args: {
		variant: "",
		isCircle: false,
		number: 7,
		hidden: false,
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Badge: Story = {};
