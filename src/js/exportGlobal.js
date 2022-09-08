export function exportGlobal(name, value) {
	/**
	 * Create "Material" global object if it doesn't exist
	 */
	if (typeof window["Material"] === "undefined") {
		window["Material"] = {};
	}

	/**
	 * Set the value to the Material object
	 */
	if (typeof window !== "undefined") {
		window["Material"][name] = value;
	} else {
		throw new Error("Material - Cannot export global variable.");
	}
}
