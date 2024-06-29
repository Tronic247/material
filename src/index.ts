import Ripple from "./components/ripple/ripple";
import Dialog from "./components/dialog/Dialog";
import Snackbar from "./components/snackbar/Snackbar";
import Tooltip from "./components/tooltip/Tooltip";

const Init = () => {
	Ripple().initialize();
};

Init();

declare global {
	interface Window {
		Material: {
			Ripple: typeof Ripple;
			Dialog: typeof Dialog;
			Init: typeof Init;
			Snackbar: typeof Snackbar;
			Tooltip: typeof Tooltip;
		};
	}
}

window.Material = { Ripple, Dialog, Init, Snackbar, Tooltip };

export { Ripple, Dialog, Init, Snackbar };
