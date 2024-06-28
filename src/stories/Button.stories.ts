import type { StoryObj, Meta } from "@storybook/html";
import "../index.scss";
import { Ripple } from "../index";

type Options = {
	size: "sm" | "md" | "lg";
	label: string;
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Example/Button",
	tags: ["autodocs"],
	render: (args) => {
		// You can either use a function to create DOM elements or use a plain html string!
		// return `<div>${label}</div>`;
		return `
      <button class="btn">${args.label}</button>
    `;
	},
	argTypes: {
		label: { control: "text" },
		size: {
			control: { type: "select" },
			options: ["sm", "md", "lg"],
		},
	},
	play: () => {
		Ripple.init();
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		label: "Button",
	},
};
