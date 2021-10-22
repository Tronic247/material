(function($) {

    const ripplein = "pointerdown";
    const rippleout = "pointerup mouseleave dragleave touchmove touchend touchcancel";
    const rippleel = ".ripple-e , .btn , button";

    $("body")
        .on(ripplein, rippleel, function(e) {
            let rect = this.getBoundingClientRect();
            let radius = findFurthestPoint(e.clientX, this.offsetWidth, rect.left, e.clientY, this.offsetHeight, rect.top);
            let ripple = document.createElement("div");
            /**
             * Add Class
             */
            ripple.classList.add("ripple");
            /**
             * Set top & left
             */
            ripple.style.setProperty("--x", e.clientX - rect.left - radius);
            ripple.style.setProperty("--y", e.clientY - rect.top - radius);
            /**
             * Set border-radius
             */
            ripple.style.borderRadius = e.clientY + radius + "%";
            /**
             * Set width and height
             */
            ripple.style.width = ripple.style.height = radius * 2 + "px";
            /**
             * Finally, append
             */
            $(this).append(ripple);
        })
        .on(rippleout, rippleel, function() {
            let ripple = $(this).find(".ripple");
            /**
             * Fade out
             */
            setTimeout(() => {
                ripple.css("opacity", "0");
                /**
                 * Remove
                 */
                setTimeout(function() {
                    ripple.remove();
                }, 600);
            }, 300);
        });

    function findFurthestPoint(clickPointX, elementWidth, offsetX, clickPointY, elementHeight, offsetY) {
        let x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;
        let y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;
        let d = Math.hypot(x - (clickPointX - offsetX), y - (clickPointY - offsetY));
        return d;
    }

})(cash);