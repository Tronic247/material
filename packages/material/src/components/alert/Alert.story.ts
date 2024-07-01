import type { StoryObj, Meta } from "@storybook/html";
import { Ripple } from "../../index";

type Options = {
	variant: "" | "primary" | "secondary" | "success" | "danger" | "warning";
	withAction: boolean;
	withTitle: boolean;
};

const meta = {
	title: "Alert",
	render: (args) => {
		const div = document.createElement("div");

		div.innerHTML = `
            <div class="alert ${args.variant ? "alert-" + args.variant : ""}" role="alert">
    		    	<div class="alert-content">
						${args.withTitle ? `<h4 class="alert-title">Did you know?</h4>` : ""}
				
						<p class="alert-message">
							Youtube is the second largest search engine in the world.
						</p>
					</div>



                ${
									args.withAction
										? `
                    <div class="alert-action">
                        <button class="btn btn-unelevated ${args.variant == "warning" ? "btn-dark" : "btn-light"}">
							Got it
						</button>
				
                        <button class="
							btn 
							btn-icon
							${args.variant == "warning" ? "btn-dark" : "btn-light"} 
							${args.variant ? "btn-" + args.variant : ""} 
							btn-unelevated
						">
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
			options: ["", "primary", "secondary", "success", "danger", "warning"],
		},
		withAction: {
			control: { type: "boolean" },
		},
		withTitle: {
			control: { type: "boolean" },
		},
	},
	args: {
		withAction: false,
		withTitle: false,
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Alert: Story = {};
