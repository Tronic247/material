import type { StoryObj, Meta } from "@storybook/html";
import Ripple from "../ripple/ripple";
import MenuInstance from "./Menu";
import { $$ } from "../../util/dom";

const meta = {
	title: "Menu",
	render: () => {
		const div = document.createElement("div");

		div.innerHTML = `
			<button id="open" class="btn">Open</button>

            <div class="menu">
                <div class="list">
                    <a href="#" class="ripple-e list-item">Item 1</a>
                    <a href="#" class="ripple-e list-item">Item 2</a>
                    <a href="#" class="ripple-e list-item">Item 3</a>
                    <a href="#" class="ripple-e list-item">Item 4</a>
                </div>
            </div>
        `;

		const open = div.querySelector("#open") as HTMLElement;
		const menu = div.querySelector(".menu") as HTMLElement;

		Ripple().initialize(div);

		let menuInst = MenuInstance(menu, { trigger: open });

		open.addEventListener("click", () => {
			menuInst.toggleMenu();
		});

		$$(".list-item", menu).forEach((item) => {
			item.addEventListener("click", () => {
				menuInst.closeMenu();
			});
		});

		return div;
	},
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Menu: Story = {};
