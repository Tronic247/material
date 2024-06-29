import type { StoryObj, Meta } from "@storybook/html";
import { Ripple } from "../../index";

type Options = {
	light: boolean;
	disabled: boolean;
};

const meta = {
	title: "Buttons/Icon",
	render: (args) => {
		const div = document.createElement("div");

		div.innerHTML = `
            ${
							args.light
								? `
                
            <div style="background-color: black; padding: 40px; margin-top: 20px; display: inline-block;">
                <button class="btn btn-icon btn-light btn-${args.disabled ? `disabled` : ``}">
                    <i class="mdi mdi-thumb-up"></i>
                </button>

                <button class="btn btn-icon btn-light btn-${args.disabled ? `disabled` : ``}">
                    <i class="mdi mdi-thumb-down"></i>
                </button>
            </div>
            
            
            `
								: `
            
            <button class="btn btn-icon btn-${args.disabled ? `disabled` : ``}">
                <i class="mdi mdi-thumb-up"></i>
            </button>

            <button class="btn btn-icon btn-${args.disabled ? `disabled` : ``}">
                <i class="mdi mdi-thumb-down"></i>
            </button> 


            `
						}
        `;

		Ripple().initialize(div);

		return div;
	},
	argTypes: {
		light: {
			control: { type: "boolean" },
		},
		disabled: {
			control: { type: "boolean" },
		},
	},
	args: {
		light: false,
		disabled: false,
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Icon: Story = {};
