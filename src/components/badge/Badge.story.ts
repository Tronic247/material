import type { StoryObj, Meta } from "@storybook/html";

type Options = {
	variant: "primary" | "secondary" | "success" | "danger" | "warning";
};

const meta = {
	title: "Badge",
	render: (args) => {
		const div = document.createElement("div");

		div.innerHTML = `
			<span class="badge badge-${args.variant}">Vite</span>
        `;

		return div;
	},
	argTypes: {
		variant: {
			control: { type: "select" },
			options: ["", "primary", "secondary", "success", "danger", "warning"],
		},
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Badge: Story = {};
