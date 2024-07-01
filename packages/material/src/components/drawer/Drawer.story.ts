import type { StoryObj, Meta } from "@storybook/html";
import Ripple from "../ripple/ripple";
import DrawerInstance from "./Drawer";

type Options = {
	type: "normal" | "dialog";
	prominent: boolean;
	open: boolean;
};

const meta = {
	title: "Drawer",
	render: (args) => {
		const div = document.createElement("div");

		const NORMAL = `
            ${
							args.type === "dialog"
								? `
            <button id="open-drawer" class="btn">Open Drawer</button>
            `
								: ""
						}

            <div class="drawer-container  ${args.type === "dialog" ? `drawer-dialog` : ""}">
                <div class="drawer">                
                    <div class="drawer-header">
                        <h1 class="drawer-title">Drawer</h1>
                        <p class="drawer-subtitle">This is a drawer</p>
                    </div>

                    <div class="drawer-content">
                       <div class="list">
                            <div class="list-item ripple-e">
                                <div class="list-item-left">
                                    <iconify-icon icon="mdi:home" class="icon"></iconify-icon>
                                </div>

                                <div class="list-item-center">
                                    Home
                                </div>
                            </div>
                            <div class="list-item ripple-e">
                                <div class="list-item-left">
                                    <iconify-icon icon="mdi:account" class="icon"></iconify-icon>
                                </div>

                                <div class="list-item-center">
                                    Account
                                </div>
                            </div>
                            <div class="list-item ripple-e list-item-active">
                                <div class="list-item-left">
                                    <iconify-icon icon="mdi:settings" class="icon"></iconify-icon>
                                </div>

                                <div class="list-item-center">
                                    Settings
                                </div>
                            </div>
                            <div class="list-item ripple-e">
                                <div class="list-item-left">
                                    <iconify-icon icon="mdi:help" class="icon"></iconify-icon>
                                </div>

                                <div class="list-item-center">
                                    Help
                                </div>
                            </div>
                            <div class="list-item ripple-e">
                                <div class="list-item-left">
                                    <iconify-icon icon="mdi:logout" class="icon"></iconify-icon>
                                </div>

                                <div class="list-item-center">
                                    Logout
                                </div>
                            </div>
                            <div class="list-item ripple-e">
                                <div class="list-item-left">
                                    <iconify-icon icon="mdi:close" class="icon"></iconify-icon>
                                </div>

                                <div class="list-item-center">
                                    Close
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="drawer-overlay"></div>
            </div>
        `;

		div.innerHTML = NORMAL;

		Ripple().initialize(div);

		if (args.type === "dialog") {
			const openDrawer = div.querySelector("#open-drawer");

			let drawerInstance = DrawerInstance(
				div.querySelector(".drawer-container")
			);

			openDrawer?.addEventListener("click", () => {
				drawerInstance.open();
			});

			if (args.open) {
				drawerInstance.open();
			}
		}

		return div;
	},
	argTypes: {
		prominent: {
			control: "boolean",
		},
		open: {
			control: "boolean",
		},
		type: {
			control: {
				type: "select",
			},
			options: ["normal", "dialog"],
		},
	},
	args: {
		prominent: false,
		open: false,
		type: "normal",
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Drawer: Story = {};
