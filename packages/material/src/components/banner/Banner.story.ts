import type { StoryObj, Meta } from "@storybook/html";
import { Ripple } from "../../index";

type Options = {
	withIcon: boolean;
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Banner",
	render: (args) => {
		const div = document.createElement("div");

		div.innerHTML = `
           <div class="banner">
				<div class="banner-top">
					${
						args.withIcon
							? `
                    <div class="banner-left">
						<iconify-icon icon="mdi:home" class="display-h2"></iconify-icon>
					</div>
                    `
							: ``
					}
					<div class="banner-right">
						<p>
							Global warming is the long-term heating of Earth’s climate system observed since the pre-industrial period (between 1850 and 1900) due to human activities and primarily fossil fuel burning
						</p>
					</div>
				</div>

				<div class="banner-actions">
					<button class="btn btn-text btn-primary">Button</button>
					<button class="btn btn-text">Button</button>
				</div>
			</div>
        `;

		Ripple().initialize(div);

		return div;
	},
	argTypes: {
		withIcon: {
			control: {
				type: "boolean",
			},
		},
	},
	args: {
		withIcon: false,
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Banner: Story = {};
