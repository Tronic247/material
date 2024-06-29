import Ripple from "./components/ripple/ripple";
import Dialog from "./components/dialog/Dialog";

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
		};
	}
}

window.Material = { Ripple, Dialog, Init };

export { Ripple, Dialog, Init };
