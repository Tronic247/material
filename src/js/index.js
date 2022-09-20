import { exportGlobal } from "./exportGlobal.js";

/**
 *
 * Import Modules
 *
 */

/**
 * Dependencies
 */
import Ripple from "./components/ripple.js";
import Forms from "./components/forms.js";
import Accordion from "./components/accordion.js";
import Tabs from "./components/tabs.js";
import Appbar from "./components/appbar.js";
import Menu from "./components/menu.js";
import Tooltip from "./components/tooltip.js";
import Snackbar from "./components/snackbar.js";
import Dialog from "./components/dialog.js";
import Picker from "./components/picker.js";
import Drawer from "./components/drawer.js";

exportGlobal("Ripple", Ripple);
exportGlobal("Forms", Forms);
exportGlobal("Accordion", Accordion);
exportGlobal("Tabs", Tabs);
exportGlobal("Appbar", Appbar);
exportGlobal("Menu", Menu);
exportGlobal("Tooltip", Tooltip);
exportGlobal("Snackbar", Snackbar);
exportGlobal("Dialog", Dialog);
exportGlobal("Picker", Picker);
exportGlobal("Drawer", Drawer);