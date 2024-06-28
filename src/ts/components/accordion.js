const Accordion = {
    init: function () {
        const accordions = document.querySelectorAll('.accordion');
        if (accordions) {
            accordions.forEach(function (i) {
                const _this = i;
                const items = _this.querySelectorAll('.item');

                if (items) {
                    items.forEach(function (i) {
                        const children = i.querySelectorAll('.content , .content *');
                        if (children) {
                            const focus = () => {
                                if (i.classList.contains('open')) {
                                    children.forEach(function (i) {
                                        i.setAttribute("tabIndex", "-1");
                                    });
                                }
                                else {
                                    children.forEach(function (i) {
                                        i.removeAttribute("tabIndex");
                                    });
                                }
                            };
                            focus();

                            const ih = i.offsetHeight;
                            i.style.setProperty("--max-height", `${ih + 20}px`);

                            i.querySelector("[data-toggle]").addEventListener("click", () => {
                                focus();
                                i.classList.toggle("open");
                            });
                        }
                    });
                }
            });
        }
    }
};
Accordion.init();
export default Accordion;