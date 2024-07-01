import type { StoryObj, Meta } from "@storybook/html";
import Ripple from "../ripple/ripple";
import TooltipInstance from "./Tooltip";

const meta = {
	title: "Tooltip",
	render: () => {
		const div = document.createElement("div");

		div.innerHTML = `
			<button
					class="btn btn-primary"
					data-tooltip="This is a tooltip"
			>
				Hover me
			</button>


			<button
					class="btn btn-primary"
					data-tooltip="This is a tooltip"
					data-tooltip-placement="right"
			>
				My tooltip is on the right
			</button>

			<button
					class="btn btn-primary"
					data-tooltip="<i>Fancy</i> <strong>tooltip</strong> <iconify-icon icon='mdi:home'></iconify-icon>"
					data-tooltip-placement="right"
					data-tooltip-allow-html
			>
				With <strong>HTML</strong>
			</button>

			<button
					class="btn btn-primary"
					data-tooltip="This is a tooltip"
					data-tooltip-delay="1000"
			>
				1 second delay
			</button>
        `;

		Ripple().initialize(div);
		TooltipInstance().initialize(div);

		return div;
	},
	argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Tooltip: Story = {};
