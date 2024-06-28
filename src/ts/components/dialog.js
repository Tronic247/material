import * as focusTrap from "focus-trap";
let trap;

const getScrollbarWidth = () => {
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar";
    outer.style.overflow = "scroll";
    document.body.appendChild(outer);
    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = "scroll";
    const inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);
    const widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
};

const ToggleOverflow = (overflow) => {
    if (overflow) {
        document.body.style.setProperty("--scrollbar-width", `${getScrollbarWidth()}px`);
        document.body.classList.add("overflow-hidden");
    } else {
        document.body.style.removeProperty("--scrollbar-width");
        document.body.classList.remove("overflow-hidden");
    }
};
const Dialog = {
    toggle: (el) => {
        const dialog = el;
        if (dialog.classList.contains("open")) {
            Dialog.close(el);
        }
        else {
            Dialog.open(el);
        }
    },
    open: (el) => {
        const dialog = el;
        dialog.classList.add("open");
        dialog.removeAttribute("tabindex");
        ToggleOverflow(true);
        trap = focusTrap.createFocusTrap(dialog, {
            onDeactivate: () => {
                Dialog.close(el);
            }
        });
        trap.activate();
        el.addEventListener("pointerdown", (e) => {
            if (e.target !== e.currentTarget)
                return;
            Dialog.close(el);
        });
    },
    close: (el) => {
        const dialog = el;
        dialog.setAttribute("tabindex", "-1");
        dialog.classList.remove("open");
        document.body.classList.remove("modal-open");
        trap.deactivate();
        ToggleOverflow(false);
    }
};
export default Dialog;