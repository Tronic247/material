import Ripple from "./components/ripple/ripple";
import Dialog from "./components/dialog/Dialog";
import Snackbar from "./components/snackbar/Snackbar";

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
		};
	}
}

window.Material = { Ripple, Dialog, Init, Snackbar };

export { Ripple, Dialog, Init, Snackbar };
