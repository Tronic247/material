import type { StoryObj, Meta } from "@storybook/html";
import Ripple from "../ripple/ripple";

type Options = {
	active: boolean;
	withIcon: boolean;
};

const meta = {
	title: "Chip",
	render: (args) => {
		const div = document.createElement("div");

		div.innerHTML = `
            <div class="chip ripple-e ${args.active ? "chip-active" : ""}">
               ${args.withIcon ? `<iconify-icon icon="mdi:home" class="icon"></iconify-icon>` : ``}

               Chip
            </div>
        `;

		Ripple().initialize(div);

		return div;
	},
	argTypes: {
		active: {
			control: { type: "boolean" },
		},
		withIcon: {
			control: { type: "boolean" },
		},
	},
	args: {
		active: false,
		withIcon: false,
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Chip: Story = {};
