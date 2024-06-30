import type { StoryObj, Meta } from "@storybook/html";
import Ripple from "../ripple/ripple";
import TabsInstance from "./Tabs";
import { $$ } from "../../util/dom";

type Options = {
	type: "horizontal" | "vertical";
	variant: "filled" | "normal" | "light" | "dark";
	icon: "stacked" | "" | "normal";
};

const meta = {
	title: "Tabs",
	render: (args) => {
		const div = document.createElement("div");

		div.innerHTML = `
			<div class="tabs tabs-${args.icon} tabs-${args.variant} tabs-${args.type}">
                <a href="#" class="tabs-item ripple-e tabs-item-active">
                    ${
											args.icon !== ""
												? `
                            <i class="mdi mdi-home icon display-h5"></i>
                        `
												: ``
										}
                Home</a>
                <a href="#" class="tabs-item ripple-e">
                    ${
											args.icon !== ""
												? `
                            <i class="mdi mdi-home icon display-h5"></i>
                        `
												: ``
										}
                A long text tab to test the width</a>
                <a href="#" class="tabs-item ripple-e">
                    ${
											args.icon !== ""
												? `
                            <i class="mdi mdi-home icon display-h5"></i>
                        `
												: ``
										}
                About</a>

                <span class="tabs-indicator"></span>
            </div>

            ${
							args.variant == "light"
								? `
                
                    <style>body{background-color: black;}</style>
                `
								: ``
						}
        `;

		Ripple().initialize(div);
		let tabInstance = TabsInstance(div.querySelector(".tabs") as HTMLElement);
		$$(".tabs-item", div)!.forEach((tab, i) => {
			tab.addEventListener("click", (e) => {
				e.preventDefault();
				tabInstance.setActive(i);
			});
		});

		return div;
	},
	argTypes: {
		type: {
			control: {
				type: "select",
			},
			options: ["horizontal", "vertical"],
		},
		variant: {
			control: {
				type: "select",
			},
			options: ["filled", "normal", "light", "dark"],
		},
		icon: {
			control: {
				type: "select",
			},
			options: ["stacked", "", "normal"],
		},
	},
	args: {
		type: "horizontal",
		variant: "filled",
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Tabs: Story = {};
