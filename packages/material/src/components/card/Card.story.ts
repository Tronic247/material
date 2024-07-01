import type { StoryObj, Meta } from "@storybook/html";
import { Ripple } from "../../index";

type Options = {
	withActions: boolean;
	withImage: boolean;
	withSubtitle: boolean;
	withText: boolean;
	withTitle: boolean;
	hoverAble: boolean;
};

const meta = {
	title: "Card",
	render: (args) => {
		const div = document.createElement("div");

		div.innerHTML = `
           <div style="margin-top: 20px; max-width: 400px">
			<div class="card card-${args.hoverAble ? "hoverable" : ""}">
				<${args.hoverAble ? "a" : "div"} class="${args.hoverAble ? "ripple-e card-hover-item" : ""} " href="#!">
                    ${
											args.withImage
												? `
					<img src="https://via.placeholder.com/800x400" style="margin:0" alt="" srcset="" />
                    `
												: ""
										}

					<div class="card-content">
										${args.withTitle || args.withSubtitle ? `
						<div class="card-header">
                        	${
														args.withTitle
															? `
							<h1 class="card-title">Card Title</h1>
                        	`
															: ""
													}

                        	${
													args.withSubtitle
														? `
							<h2 class="card-subtitle">Card Subtitle</h2>
                        `
														: ""
												}
						</div>
						` : ""}

                        ${
													args.withText
														? `

						<p class="card-text">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
							quibusdam, voluptates, quod, quos quas quia quae quidem quibusdam
							quod, quos quas quia quae quidem quibusdam quod, quos quas quia
							quae quidem quibusdam.
						</p>

                        `
														: ""
												}
					</div>
				</${args.hoverAble ? "a" : "div"}>

                ${
									args.withActions
										? `

				<div class="card-actions">
					<button class="btn btn-text btn-primary ripple-e">Action 1</button>
					<button class="btn btn-text btn-secondary ripple-e">Action 2</button>

					<button class="btn btn-icon" style="margin-left: auto">
						<iconify-icon icon="mdi:heart" class="icon"></iconify-icon>
					</button>
				</div>

                `
										: ""
								}
			</div>
		</div>
        `;

		div.style.maxWidth = "400px";

		Ripple().initialize(div);

		return div;
	},
	argTypes: {
		withActions: {
			control: "boolean",
		},
		withImage: {
			control: "boolean",
		},
		withSubtitle: {
			control: "boolean",
		},
		withText: {
			control: "boolean",
		},
		withTitle: {
			control: "boolean",
		},
		hoverAble: {
			control: "boolean",
		},
	},
	args: {
		withActions: true,
		withImage: true,
		withSubtitle: true,
		withText: true,
		withTitle: true,
		hoverAble: true,
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Card: Story = {};
