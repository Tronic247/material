import Ripple from "./ripple";
const Snackbar = {
    show: (message, button = "Got It", action = "", duration = 3000) => {
        let randomId;
        let _action;
        if (action === "") {
            _action = () => {
                // do something
            }
        }
        else {
            _action = action;
        }
        const show_snackbar = () => {
            const snackbar = document.createElement("div");
            snackbar.classList.add("snackbar");
            randomId = "__" + (Math.random() + 1).toString(36).substring(7) + '-' + (Math.random() + 1).toString(36).substring(7);
            snackbar.innerHTML = `
                <p>${message}</p>
                <button class="btn small text primary ripple-e" id="${randomId}">${button}</button>
            `;
            document.body.appendChild(snackbar);
            document.getElementById(randomId).addEventListener("click", _action);
            document.getElementById(randomId).addEventListener("click", () => {
                snackbar.classList.remove("show");
                setTimeout(() => {
                    snackbar.remove();
                }, 300);
            });

            setTimeout(() => {
                snackbar.classList.add("show");
            }, 300);

            Ripple.init();

            setTimeout(() => {
                snackbar.classList.remove("show");
                setTimeout(() => {
                    snackbar.remove();
                }, 300);
            }, duration);
        };

        const snackbar_there = document.querySelector(".snackbar");
        if (snackbar_there) {
            document.querySelector(".snackbar").classList.remove("show");
            setTimeout(() => {
                document.querySelector(".snackbar").remove();
                setTimeout(() => {
                    show_snackbar();
                }, 300);
            }, 300);
        }
        else {
            show_snackbar();
        }
    },
};
export default Snackbar;
