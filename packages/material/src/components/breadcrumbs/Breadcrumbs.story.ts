import type { StoryObj, Meta } from "@storybook/html";

const meta = {
	title: "Breadcrumb",
	render: () => {
		const div = document.createElement("div");

		div.innerHTML = `
            <nav class="breadcrumbs">
                <a href="#" class="breadcrumb-item">Home</a>
                <a href="#" class="breadcrumb-item">Library</a>
                <a href="#" class="breadcrumb-item">Data</a>
                <span class="breadcrumb-item breadcrumb-item-active">Backups</span>
            </nav>
        `;

		return div;
	},
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Breadcrumb: Story = {};
