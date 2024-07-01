import type { StoryObj, Meta } from "@storybook/html";
import { Ripple } from "../../index";

type Options = {
	disabled: boolean;
	error: boolean;
};

const meta = {
	title: "Slider",
	render: (args) => {
		const div = document.createElement("div");

		div.innerHTML = `
           <label class="slider ${args.error ? "slider-error" : ""}">
    <input type="range" min="0" max="100" ${args.disabled ? "disabled" : ""}>
    <span>Slider</span>
</label>
        `;

		Ripple().initialize(div);

		return div;
	},
	argTypes: {
		disabled: {
			control: "boolean",
		},
		error: {
			control: "boolean",
		},
	},
	args: {
		disabled: false,
		error: false,
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Slider: Story = {};
