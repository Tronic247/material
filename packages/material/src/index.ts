import Ripple from "./components/ripple/ripple";
import Dialog from "./components/dialog/Dialog";
import Snackbar from "./components/snackbar/Snackbar";
import Tooltip from "./components/tooltip/Tooltip";
import Tabs from "./components/tabs/Tabs";
import Menu from "./components/menu/Menu";
import TextField from "./components/textfield/Textfield";
import Drawer from "./components/drawer/Drawer";

const Init = () => {
	Ripple().initialize();
	TextField().initialize();
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
			Menu: typeof Menu;
			TextField: typeof TextField;
			Drawer: typeof Drawer;
		};
	}
}

window.Material = {
	Ripple,
	Dialog,
	Init,
	Snackbar,
	Tooltip,
	Tabs,
	Menu,
	TextField,
	Drawer,
};

export {
	Ripple,
	Dialog,
	Init,
	Snackbar,
	Tooltip,
	Tabs,
	Menu,
	TextField,
	Drawer,
};
