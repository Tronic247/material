import type { StoryObj, Meta } from "@storybook/html";

type Options = {
	variant: "primary" | "secondary" | "success" | "danger" | "warning";
	withAction: boolean;
};

const meta = {
	title: "Table",
	render: () => {
		const div = document.createElement("div");

		div.innerHTML = `
            <div class="table-container">
                <table>
        <caption>Sample Table: Employee Information</caption>
        <colgroup>
            <col class="col-name">
            <col class="col-age">
            <col span="2">
        </colgroup>
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Position</th>
                <th>Department</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>John Doe</td>
                <td>30</td>
                <td>Manager</td>
                <td rowspan="2">Sales</td>
            </tr>
            <tr>
                <td>Jane Smith</td>
                <td>28</td>
                <td>Associate</td>
            </tr>
            <tr>
                <td colspan="2" class="highlight">Mike Johnson</td>
                <td>Senior Developer</td>
                <td>IT</td>
            </tr>
            <tr>
                <td>Emily Brown</td>
                <td>35</td>
                <td>Director</td>
                <td>Marketing</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4">Total Employees: 4</td>
            </tr>
        </tfoot>
    </table>
    </div>
        `;

		return div;
	},
} satisfies Meta<Options>;

export default meta;
type Story = StoryObj<Options>;

export const Table: Story = {};
