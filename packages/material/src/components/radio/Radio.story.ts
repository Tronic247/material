import type { StoryObj, Meta } from "@storybook/html";

type Options = {
	error: boolean;
	labels: number;
	disabled: boolean;
	checkedIndex: number;
	vertical: boolean;
};

const meta = {
	title: "Radio",
	render: (args) => {
		const div = document.createElement("div");

		div.classList.add("radio-group");
		if (args.vertical) div.classList.add("radio-group-vertical");

		new Array(args.labels).fill(0).forEach((_, i) => {
			const html = `
			<label class="radio ${args.error ? "radio-error" : ""}">
                <input type="radio" ${args.disabled ? "disabled" : ""} name="test" ${args.checkedIndex === i ? "checked" : ""} />
                <span>Option</span>
            </label>
			`;

			div.innerHTML += html;
		});

		return div;
	},
	argTypes: {
		error: {
			control: {
				type: "boolean",
			},
		},
		labels: {
			control: {
				type: "range",
				min: 2,
				max: 5,
			},
		},
		disabled: {
			control: {
				type: "boolean",
			},
		},
		vertical: {
			control: {
				type: "boolean",
			},
		},
		checkedIndex: {
			control: {
				type: "range",
				min: 0,
				max: 4,
			},
		},
	},
	args: {
		error: false,
		labels: 3,
		disabled: false,
		vertical: false,
		checkedIndex: 2,
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Radio: Story = {};
