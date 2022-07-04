import fs from "fs";
import { build } from "esbuild";
import { c } from "tcol";
import sass from "sass";
const { compileAsync } = sass;

import { config } from "./config.js";

/**
 *
 * Bundle JavaScript
 *
 */
console.log(c.Cyan("-> Bundling JavaScript..."));

fs.rmSync(config.dist, { recursive: true });

build({
	entryPoints: [config.jsMain],
	outfile: config.dist + "material.js",
	bundle: true,
	sourcemap: true,
}).then(() => {
	console.log(c.Green("-> Bundling... unminified version done"));
});

build({
	entryPoints: [config.jsMain],
	outfile: config.dist + "material.min.js",
	bundle: true,
	minify: true,
	sourcemap: true,
}).then(() => {
	console.log(c.Green("-> Bundling... minified version done"));
});

/**
 *
 * Generate CSS from SCSS
 *
 */
console.log(c.Cyan("-> Building CSS... \n"));

compileAsync(config.scssMain).then((result) => {
	fs.writeFileSync(config.dist + "material.css", result.css);

	console.log(c.Green("-> Generating CSS... unminified version done"));
});

compileAsync(config.scssMain, {
	style: "compressed",
}).then((result) => {
	fs.writeFileSync(config.dist + "material.min.css", result.css);

	console.log(c.Green("-> Generating CSS... minified version done"));
});
