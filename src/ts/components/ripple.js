const Ripple = {
    init: () => {
        const buttons = document.querySelectorAll('.ripple-e:not(.ripple-ready) , .btn:not(.ripple-ready), .icon:not(.ripple-ready)')
        const stopEvents = ["pointerup", "mouseleave", "dragleave", "touchmove", "touchend", "touchcancel"];
        let id;

        function findFurthestPoint(clickPointX, elementWidth, offsetX, clickPointY, elementHeight, offsetY) {
            let x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;
            let y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;
            let d = Math.hypot(x - (clickPointX - offsetX), y - (clickPointY - offsetY));
            return d;
        }

        buttons.forEach(button => {
            button.classList.add('ripple-ready');
            button.addEventListener('pointerdown', e => {
                const rect = button.getBoundingClientRect()
                const radius = findFurthestPoint(e.clientX, button.offsetWidth, rect.left, e.clientY, button.offsetHeight, rect.top)

                id = "__" + (Math.random() + 1).toString(36).substring(7) + '-' + (Math.random() + 1).toString(36).substring(7);

                const circle = document.createElement('div')
                circle.classList.add('ripple')
                circle.id = id

                circle.style.left = `${e.clientX - rect.left - radius}px`
                circle.style.top = `${e.clientY - rect.top - radius}px`
                circle.style.width = circle.style.height = `${radius * 2}px`

                button.appendChild(circle)
            })

            stopEvents.forEach(event => {
                button.addEventListener(event, () => {
                    const ripple = button.querySelector('.ripple#' + id)
                    if (ripple) {
                        ripple.style.opacity = '0'
                        setTimeout(() => {
                            ripple.remove()
                        }, 600)
                    }
                })
            })
        });
    }
};
Ripple.init();

export default Ripple
