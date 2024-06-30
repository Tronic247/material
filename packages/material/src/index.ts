import Ripple from "./components/ripple/ripple";
import Dialog from "./components/dialog/Dialog";
import Snackbar from "./components/snackbar/Snackbar";
import Tooltip from "./components/tooltip/Tooltip";
import Tabs from "./components/tabs/Tabs";

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
			Tabs: typeof Tabs;
		};
	}
}

window.Material = { Ripple, Dialog, Init, Snackbar, Tooltip, Tabs };

export { Ripple, Dialog, Init, Snackbar, Tooltip, Tabs };
