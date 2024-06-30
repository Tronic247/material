import type { StoryObj, Meta } from "@storybook/html";
import Ripple from "../ripple/ripple";
import SnackbarInstance from "./Snackbar";

const meta = {
	title: "Snackbar",
	render: () => {
		const div = document.createElement("div");

		div.innerHTML = `
			<button class="btn btn-primary" id="open">Open Snackbar</button>
        `;

		Ripple().initialize(div);

		const button = div.querySelector("#open");
		let i = 1;
		button?.addEventListener("click", () => {
			SnackbarInstance({
				message: "This is a snackbar message " + i++,
				actionText: "Dismiss",
				actionHandler: (dismiss) => {
					dismiss();
				},
			});
		});

		return div;
	},
	argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Snackbar: Story = {};
