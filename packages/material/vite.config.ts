import { defineConfig } from "vite";
import stylelint from "vite-plugin-stylelint";
import fs from "fs";
import banner from "vite-plugin-banner";

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
		stylelint({
			fix: true,
			lintInWorker: true,
			lintOnStart: true,
		}),
	],
	build: {
		lib: {
			entry: ["src/index.ts", "src/index.scss"],
			formats: ["es", "cjs"],
			fileName: (format) =>
				format === "es" ? "material.js" : "material.min.js",
		},
		minify: "terser",
		sourcemap: false,
	},
});
