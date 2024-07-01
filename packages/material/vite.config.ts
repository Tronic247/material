import { defineConfig } from "vite";
import stylelint from "vite-plugin-stylelint";
import fs from "fs";
import banner from "vite-plugin-banner";
import dts from "vite-plugin-dts";
import autoprefixer from "autoprefixer";

const PACKAGE_JSON = JSON.parse(
	fs.readFileSync(process.cwd() + "/package.json", "utf-8")
);

const license = `/**
 * Tronic247 Material - https://material.tronic247.com
 * 
 * @license MIT
 * @version ${PACKAGE_JSON.version}
 * @package tronic247/material
 */`;

export default defineConfig({
	plugins: [
		banner(license),
		dts({
			rollupTypes: true,
			exclude: ["*.story.ts"],
		}),
		stylelint({
			fix: true,
			lintInWorker: true,
			lintOnStart: true,
		}),
	],
	build: {
		lib: {
			entry: ["src/index.ts"],
			formats: ["es", "cjs"],
			fileName: (format) =>
				format === "es" ? "material.js" : "material.min.js",
		},
		rollupOptions: {
			input: {
				index: "src/index.ts",
				material: "src/index.scss",
			},
		},
	},
	css: {
		postcss: {
			plugins: [autoprefixer()],
		},
	},
});
