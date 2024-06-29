import type { StoryObj, Meta } from "@storybook/html";

type Options = {
	type: "bar" | "circle";
	percent: number;
	buffer: number;
	intermediate: boolean;
};

const meta = {
	title: "Progress",
	render: (args) => {
		const div = document.createElement("div");

		div.innerHTML = `
            <div class="progress 

                        ${
													args.intermediate
														? "progress-intermediate"
														: `${
																args.type === "circle" ? "progress-circle" : ""
															}
                        
                        ${args.buffer > 0 ? "progress-buffering" : ""}`
												}

                        " ${args.intermediate ? "" : `style="--value: ${args.percent}%; --buffer: ${args.buffer}%">`}
            </div>
        `;

		return div;
	},
	argTypes: {
		type: {
			control: {
				type: "select",
			},
			options: ["bar", "circle"],
		},
		percent: {
			control: {
				type: "range",
				min: 0,
				max: 100,
			},
		},
		buffer: {
			control: {
				type: "range",
				min: 0,
				max: 100,
			},
		},
		intermediate: {
			control: {
				type: "boolean",
			},
		},
	},
	args: {
		type: "bar",
		percent: 50,
		buffer: 0,
		intermediate: false,
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Progress: Story = {};
