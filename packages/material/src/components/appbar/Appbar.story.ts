import type { StoryObj, Meta } from "@storybook/html";
import Ripple from "../ripple/ripple";

type Options = {
	active: boolean;
	withIcon: boolean;
};

const meta = {
	title: "Appbar",
	render: (args) => {
		const div = document.createElement("div");

		div.innerHTML = `
            <header class="appbar appbar-elevated">
                <div class="appbar-start">
                    <button class="btn btn-icon btn-transparent btn-light">
                        <iconify-icon icon="mdi:menu" class="icon"></iconify-icon>
                    </button>

                    <h1 class="appbar-title">Appbar</h1>
                </div>

                <div class="appbar-end">
                    <button class="btn btn-icon btn-transparent btn-light">
                        <iconify-icon icon="mdi:account" class="icon"></iconify-icon>
                    </button>

                    <button class="btn btn-primary btn-unelevated">
                        Click me
                    </button>
                </div>
            </header>
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

export const Appbar: Story = {};
