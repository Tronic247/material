import * as focusTrap from 'focus-trap';
import { createPopper } from '@popperjs/core';
let trap;
let element;
const Menu = {
    init: () => {
        const trigger = document.querySelectorAll('[data-toggle-menu]');

        trigger.forEach(el => {
            const target = el.getAttribute('data-toggle-menu');
            const menu = document.querySelector(`[data-menu-id="${target}"]`);
            const children = menu.querySelectorAll('*');
            element = el;

            const toggle = () => {
                Menu.toggle(menu);
            };

            el.addEventListener('pointerdown', toggle);
            el.addEventListener('click', (e) => {
                if (e.clientX == 0 || e.clientY == 0) {
                    toggle();
                }
            });

            children.forEach(child => {
                child.addEventListener('click', () => {
                    const target = element.getAttribute('data-toggle-menu');
                    const menu = document.querySelector(`[data-menu-id="${target}"]`);
                    Menu.close(menu);
                });
            });
        });
    },

    toggle: (menu) => {
        if (menu.classList.contains('open')) {
            Menu.close(menu);
        }
        else {
            Menu.open(menu);
        }
    },

    open: (menu) => {
        trap = focusTrap.createFocusTrap(menu, {
            onActivate: () => {
                menu.classList.add('open');
            },
            onDeactivate: () => {
                menu.classList.remove('open');
            }
        });
        trap.activate();
        createPopper(element, menu);
        menu.removeAttribute('tabindex');
    },

    close: (menu) => {
        menu.classList.remove('open');
        trap.deactivate();
        menu.setAttribute('tabindex', '-1');
    }
};
Menu.init();
export default Menu;