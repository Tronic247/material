import { $$, $addClass, $removeClass } from "../element";

/**
 * Appbar
 */
function Appbar() {
	const shortingAppbars = $$(".appbar.short");

	shortingAppbars.forEach((appbar) => {
		const offset = appbar.dataset.offset || 100;

		window.addEventListener("scroll", () => {
			if (window.scrollY > offset) {
				$addClass(appbar, "short--active");
			} else {
				$removeClass(appbar, "short--active");
			}
		});
	});

    const elevatingAppbars = $$(".appbar.elevated-anim");

    elevatingAppbars.forEach((appbar) => {
        const offset = appbar.dataset.offset || 100;

        window.addEventListener("scroll", () => {
            if (window.scrollY > offset) {
                $addClass(appbar, "elevated");
            } else {
                $removeClass(appbar, "elevated");
            }
        });
    })
}

Appbar();

export default Appbar;
