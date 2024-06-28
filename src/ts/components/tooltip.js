import { createPopper } from '@popperjs/core';

let tooltip_id;
const Tooltip = {
    init: () => {
        const trigger = document.querySelectorAll('[data-tooltip]');

        trigger.forEach(el => {
            const show = () => Tooltip.show(el);
            const hide = () => Tooltip.hide(tooltip_id);
            const mouseshowevents = ['mouseenter', 'touchstart'];
            const mousehideevents = ['mouseleave', 'touchend'];

            mouseshowevents.forEach(event => el.addEventListener(event, show));
            mousehideevents.forEach(event => el.addEventListener(event, hide));
        });
    },

    show: (el) => {
        const target = el.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip_id = "__" + (Math.random() + 1).toString(36).substring(7) + "__" + (Math.random() + 1).toString(36).substring(7);
        tooltip.id = tooltip_id;
        tooltip.innerHTML = target;
        createPopper(el, tooltip);
        setTimeout(() => {
            tooltip.classList.add('show');
        }, 100);
        document.body.appendChild(tooltip);
    },

    hide: (id) => {
        const tooltip = document.getElementById(id);
        tooltip.classList.remove('show');
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }
};
Tooltip.init();
export default Tooltip;