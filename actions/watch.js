import chokidar from "chokidar";
import fs from "fs";
import { build } from "esbuild";
import { c } from "tcol";
import sass from "sass";
const { compileAsync } = sass;

import { config } from "./config.js";

console.log(c.Blue("Watching *.js and *.scss files... \n"));

function bundleJS() {
	build({
		entryPoints: [config.jsMain],
		outfile: config.dev + "material.js",
		bundle: true,
		sourcemap: true,
	}).then(() => {
		console.log(c.Green("-> Bundling... unminified version done"));
	});
}

function bundleCSS() {
	compileAsync(config.scssMain).then((result) => {
		fs.writeFileSync(config.dev + "material.css", result.css);

		console.log(c.Green("-> Generating CSS... unminified version done"));
	});
}

function onChanged() {
	console.log(c.Cyan("-> File changed, rebuilding..."));

	bundleJS();
	bundleCSS();
}

chokidar.watch(config.src + "**/*.{js,scss}").on("change", onChanged);

onChanged();