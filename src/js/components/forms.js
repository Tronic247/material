import noUiSlider from 'nouislider';

const Forms = {
    init: function (element = document.body) {
        const forms = element.querySelectorAll(".textbox");
        for (let i = 0; i < forms.length; i++) {
            let parent = forms[i];
            let input = parent.querySelector(".input");

            if (input.value) {
                parent.classList.add("floating");
            }
            else {
                parent.classList.remove("floating");
            }

            parent.addEventListener("click", function () {
                parent.classList.add("floating");
                input.focus();
            });

            input.addEventListener("focus", function () {
                parent.classList.add("focus");
                parent.classList.add("floating");
            });

            input.addEventListener("blur", function () {
                parent.classList.remove("focus");
                if (input.value) {
                    parent.classList.add("floating");
                }
                else {
                    parent.classList.remove("floating");
                }
            });

            input.addEventListener("input", function () {
                if (input.value) {
                    parent.classList.add("floating");
                }
                else {
                    parent.classList.remove("floating");
                }
            });
        }
    },
    initRangeSlider: function (element,options) {
        noUiSlider.create(element, options);
    }
};
export default Forms;