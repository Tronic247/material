import type { StorybookConfig } from "@storybook/html-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.story.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/html-vite",
		options: {},
	},
};
export default config;
