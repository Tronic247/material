import type { StoryObj, Meta } from "@storybook/html";
import { Ripple } from "../../index";

type Options = {
	shaped: boolean;
	nonHoverable: boolean;
	small: boolean;
};

const meta = {
	title: "List",
	render: (args) => {
		const div = document.createElement("div");

		div.style.maxWidth = "300px";

		div.innerHTML = `
            <div class="list ${args.shaped && "list-shaped"} ${args.small && "list-small"} ${args.nonHoverable && "list-non-hoverable"}">
	            <a class="list-item ripple-e" href="#!"> Home </a>
	            <a class="list-item ripple-e" href="#!"> Home </a>

	            <label for="checkbox-1" class="list-item ripple-e" href="#!">
	            	<div class="list-item-left">Default</div>

	            	<div class="list-item-right">
	            		<div class="checkbox">
	            			<input type="checkbox" id="checkbox-1" />
	            			<span></span>
	            		</div>
	            	</div>
	            </label>

	            <div class="list-divider"></div>

	            <a class="list-item ripple-e" href="#!"> Home </a>

	            <a class="list-item ripple-e list-item-active" href="#!">
	            	<div class="list-item-left">
	            		<iconify-icon icon="mingcute:down-fill" class="icon"></iconify-icon>
	            	</div>

	            	<div class="list-item-center">Your Profile</div>

	            	<div class="list-item-right">
	            		<iconify-icon icon="mingcute:down-fill" class="icon"></iconify-icon>
	            	</div>
	            </a>
	            <a class="list-item ripple-e" href="#!">
	            	<div class="list-item-center">
	            		<p>Hello</p>
	            		<p class="list-item-subtitle">Subtitle</p>
	            	</div>
	            </a>
            </div>

        `;

		Ripple().initialize(div);

		return div;
	},
	argTypes: {
		shaped: {
			control: "boolean",
		},
		nonHoverable: {
			control: "boolean",
		},
		small: {
			control: "boolean",
		},
	},
	args: {
		shaped: false,
		nonHoverable: false,
		small: false,
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const List: Story = {};
