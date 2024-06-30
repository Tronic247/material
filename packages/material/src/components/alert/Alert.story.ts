import type { StoryObj, Meta } from "@storybook/html";
import { Ripple } from "../../index";

type Options = {
	variant: "primary" | "secondary" | "success" | "danger" | "warning";
	withAction: boolean;
};

const meta = {
	title: "Alert",
	render: (args) => {
		const div = document.createElement("div");

		div.innerHTML = `
            <div class="alert alert-${args.variant}" role="alert">
    		    Lorem ipsum, dolor sit, amet consectetur adipisicing elit.

                ${
									args.withAction
										? `
                    <div class="alert-action">
                        <button class="btn btn-${args.variant} btn-unelevated">Action</button>

                        <button class="btn btn-light btn-icon btn-${args.variant} btn-unelevated">
                            <iconify-icon icon="mdi:close" class="icon"></iconify-icon>
                        </button>
                    </div>
                `
										: ""
								}
    	    </div>
        `;

		Ripple().initialize(div);

		return div;
	},
	argTypes: {
		variant: {
			control: { type: "select" },
			options: ["primary", "secondary", "success", "danger", "warning"],
		},
		withAction: {
			control: { type: "boolean" },
		},
	},
	args: {
		withAction: false,
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Alert: Story = {};
