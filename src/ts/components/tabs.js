function Tabs(options) {
    const elem = document.getElementById(options.elem)
    const open = options.open || 0
    const titleClass = 'item'
    const activeClass = 'active'
    const contentClass = 'content'
    const tabsNum = elem.querySelectorAll('.' + titleClass).length
    const uniqId = (Date.now()+Math.random()).toString(36);

    render();


    function render(n) {
        elem.addEventListener('click', onClick);

        let init = (n == null) ? checkTab(open) : checkTab(n);

        for (let i = 0; i < tabsNum; i++) {
            elem.querySelectorAll('.' + titleClass)[i].setAttribute('data-'+uniqId, i);
            if (i === init)
                openTab(i);
        }
    }


    function onClick(e) {
        if (e.target.className.indexOf(titleClass) === -1)
            return;
        e.preventDefault();
        openTab(e.target.getAttribute('data-'+uniqId));
    }


    function reset() {
        [].forEach.call(elem.querySelectorAll('.' + contentClass), function (item) {
            item.classList.remove("active");
        });

        [].forEach.call(elem.querySelectorAll('.' + titleClass), function (item) {
            item.className = removeClass(item.className, activeClass);
        });
    }


    function removeClass(str, cls) {
        let reg = new RegExp('(\ )' + cls + '(\)', 'g');
        return str.replace(reg, '');
    }


    function checkTab(n) {
        return (n < 0 || isNaN(n) || n > tabsNum) ? 0 : n;
    }


    function openTab(n) {
        reset();

        let i = checkTab(n);
        elem.querySelectorAll('.' + titleClass)[i].className += ' ' + activeClass;
        elem.querySelectorAll('.' + contentClass)[i].classList.add("active");
    }


    function update(n) {
        destroy();
        reset();
        render(n);
    }


    function destroy() {
        elem.removeEventListener('click', onClick);
    }

    return {
        open: openTab,
        update: update,
        destroy: destroy
    };
}
export default Tabs;

