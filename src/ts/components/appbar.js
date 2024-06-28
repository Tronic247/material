const Appbar = {
    init: () => {
        const elements = document.querySelectorAll('.appbar.elevating');
        elements.forEach(element => {
            document.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    element.classList.add('elevated');
                } else {
                    element.classList.remove('elevated');
                }
            });
        })
    }
};
Appbar.init();
export default Appbar;