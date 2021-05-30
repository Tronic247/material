jQuery(function ($) {
    "use strict";

    //
    //Material by Tronic247
    //

    function findFurthestPoint(clickPointX, elementWidth, offsetX, clickPointY, elementHeight, offsetY) {
        let x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;
        let y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;
        let d = Math.hypot(x - (clickPointX - offsetX), y - (clickPointY - offsetY));
        return d;
    }

    $(".ripple-e , .btn , button").on("pointerdown", function (e) {
        let rect = this.getBoundingClientRect();
        let radius = findFurthestPoint(e.clientX, this.offsetWidth, rect.left, e.clientY, this.offsetHeight, rect.top);
        let circle = document.createElement("div");
        circle.classList.add("ripple");
        circle.style.left = e.clientX - rect.left - radius + "px";
        circle.style.borderRadius = e.clientY + radius + "%";
        circle.style.top = e.clientY - rect.top - radius + "px";
        circle.style.width = circle.style.height = radius * 2 + "px";
        $(this).append(circle);
    });

    $(".ripple-e , .btn , button").on("pointerup mouseleave dragleave touchmove touchend touchcancel", function () {
        let ripple = $(this).find(".ripple");
        setTimeout(() => {
            ripple.css("opacity", "0");
            setTimeout(function () {
                ripple.remove();
            }, 600);
        }, 200);
    });

    $("body").append('<div class="overlay"></div>');

    $('[data-toggle="dialog"]').click(function (e) {
        e.preventDefault();
        var t = $(this).attr("data-dialog");
        $(t).toggleClass("open");
        $(".overlay").fadeToggle(200);
        $("body").toggleClass("dialog-open");
    });

    $('[data-toggle="dialog"][data-action="close"]').click(function (e) {
        e.preventDefault();
        var t = $(this).attr("data-dialog");
        $(t).removeClass("open");
        $(".overlay").fadeOut(200);
        $("body").removeClass("dialog-open");
    });

    $('[data-toggle="dialog"][data-action="open"]').click(function (e) {
        e.preventDefault();
        var t = $(this).attr("data-dialog");
        $(t).addClass("open");
        $(".overlay").fadeIn(200);
        $("body").addClass("dialog-open");
    });

    $('[data-toggle="drawer"]:not([data-drawer-modal])[data-action="toggle"][data-drawer]').click(function (e) {
        e.preventDefault();
        var d = $(this);
        $($(d).attr("data-drawer")).animate({ width: "toggle" }, 0);
    });

    $('[data-toggle="drawer"]:not([data-drawer-modal])[data-action="open"][data-drawer]').click(function (e) {
        e.preventDefault();
        var d = $(this);
        $($(d).attr("data-drawer")).animate({ width: "auto", opacity: "1" }, 0).delay(200).css({
            display: "",
        });
    });

    $('[data-toggle="drawer"]:not([data-drawer-modal])[data-action="close"][data-drawer]').click(function (e) {
        e.preventDefault();
        var d = $(this);
        $($(d).attr("data-drawer")).animate({ width: "0%", opacity: "0" }, 0).delay(200).css({
            display: "none",
        });
    });

    $("body").append('<div class="drawer-overlay"></div>');

    $(".drawer-overlay").click(function (e) {
        $(this).fadeOut(200);
        $(".drawer.modal").removeClass("open");
    });

    $('[data-toggle="drawer"][data-drawer-modal][data-action="toggle"][data-drawer]').click(function (e) {
        e.preventDefault();
        var d = $(this);
        $(".drawer-overlay").fadeToggle(200);
        $(d.attr("data-drawer")).toggleClass("open");
    });

    $('[data-toggle="drawer"][data-drawer-modal][data-action="open"][data-drawer]').click(function (e) {
        e.preventDefault();
        var d = $(this);
        $(".drawer-overlay").fadeIn(200);
        $(d.attr("data-drawer")).addClass("open");
    });

    $('[data-toggle="drawer"][data-drawer-modal][data-action="close"][data-drawer]').click(function (e) {
        e.preventDefault();
        var d = $(this);
        $(".drawer-overlay").fadeOut(200);
        $(d.attr("data-drawer")).removeClass("open");
    });

    $(".overlay").click(function () {
        $(".dialog").removeClass("open");
        $(".overlay").fadeOut(200);
        $("body").removeClass("dialog-open");
    });

    $.fn.Mdialog = function (action) {
        var y = this;
        if (!$(this).hasClass("dialog")) {
            console.error("Material dialog must have the .dialog class.");
        } else {
            if (action === "show") {
                var t = y;
                $(t).addClass("open");
                $(".overlay").fadeIn(200);
                $("body").addClass("dialog-open");
            }

            if (action === "hide") {
                var t = y;
                $(t).removeClass("open");
                $(".overlay").fadeOut(200);
                $("body").removeClass("dialog-open");
            }

            if (action === "toggle") {
                var t = y;
                $(t).toggleClass("open");
                $(".overlay").fadeToggle(200);
                $("body").toggleClass("dialog-open");
            }
        }

        return this;
    };

    $(window).scroll(function () {
        if ($(window).scrollTop() > 20) {
            $(".appbar.elevating").addClass("elevation-6");
        } else {
            $(".appbar.elevating").removeClass("elevation-6");
        }
    });

    var prev = 20;

    $(window).on("scroll", function () {
        var scrollTop = $(window).scrollTop();
        $(".appbar.hide").toggleClass("up", scrollTop > prev);
        prev = scrollTop;
    });

    $(".textfield").find("input , textarea").prop("placeholder", " ").attr("placeholder", " ");

    $(".select-container.outlined select")
        .select2({
            theme: "outlined",
            width: "100%",
            multiple: false,
            minimumResultsForSearch: Infinity /* Hide search on single select */,
        })
        .on("select2:open", (element) => {
            const targetLabel = $(element.target).prev("label");
            targetLabel.addClass("selected");
        })
        .on("select2:close", (element) => {
            const target = $(element.target);
            const targetLabel = target.prev("label");
            const targetOptions = $(element.target.selectedOptions);
            console.log(element.target.selectedOptions);
            if (undefined === element.target.selectedOptions[0]) {
                console.error("Material Select Error.");
            } else {
                if (element.target.selectedOptions[0].value === "") {
                    targetLabel.removeAttr("class");
                }
            }
        });

    $(".select-container.filled select")
        .select2({
            theme: "filled",
            width: "100%",
            minimumResultsForSearch: Infinity /* Hide search on single select */,
        })
        .on("select2:open", (element) => {
            const targetLabel = $(element.target).prev("label");
            targetLabel.addClass("selected");
        })
        .on("select2:close", (element) => {
            const target = $(element.target);
            const targetLabel = target.prev("label");
            const targetOptions = $(element.target.selectedOptions);
            console.log(element.target.selectedOptions);
            if (undefined === element.target.selectedOptions[0]) {
                console.error("Material Select Error.");
            } else {
                if (element.target.selectedOptions[0].value === "") {
                    targetLabel.removeAttr("class");
                }
            }
        });

    $(".select-container.border-bottom select")
        .select2({
            theme: "standard",
            width: "100%",
            multiple: false,
            minimumResultsForSearch: Infinity /* Hide search on single select */,
        })
        .on("select2:open", (element) => {
            const targetLabel = $(element.target).prev("label");
            targetLabel.addClass("selected");
        })
        .on("select2:close", (element) => {
            const target = $(element.target);
            const targetLabel = target.prev("label");
            const targetOptions = $(element.target.selectedOptions);
            console.log(element.target.selectedOptions);
            if (undefined === element.target.selectedOptions[0]) {
                console.error("Material Select Error.");
            } else {
                if (element.target.selectedOptions[0].value === "") {
                    targetLabel.removeAttr("class");
                }
            }
        });

    $(".select-container").each(function () {
        var t = $(this);
        if (t.find("select").val() === "") {
        } else {
            t.find("label").addClass("selected");
        }
        t.on("select2:open", function () {
            t.find("label").addClass("focus");
        }).on("select2:close", function () {
            t.find("label").removeClass("focus");
        });
    });

    $('[data-toggle="menu"][data-menu]').each(function () {
        var t = $(this);
        t.click(function (e) {
            e.preventDefault();
            if ($(t.attr("data-menu")).hasClass("menu")) {
                $(t.attr("data-menu"))
                    .css({
                        top: t.offset().top,
                        left: t.offset().left,
                    })
                    .toggleClass("open");
                $(t.attr("data-menu")).click(function (e) {
                    $(this).removeClass("open");
                });
            }
        });
    });
});

(function (root, factory) {
    "use strict";

    if (typeof define === "function" && define.amd) {
        define([], function () {
            return (root.Snackbar = factory());
        });
    } else if (typeof module === "object" && module.exports) {
        module.exports = root.Snackbar = factory();
    } else {
        root.Snackbar = factory();
    }
})(this, function () {
    var Snackbar = {};

    Snackbar.current = null;
    var $defaults = {
        text: "Default Text",
        textColor: "inherit",
        width: "auto",
        showAction: true,
        actionText: "Dismiss",
        actionTextAria: "Dismiss, Description for Screen Readers",
        alertScreenReader: false,
        actionTextColor: "#4CAF50",
        showSecondButton: false,
        secondButtonText: "",
        secondButtonAria: "Description for Screen Readers",
        secondButtonTextColor: "#4CAF50",
        backgroundColor: "#323232",
        pos: "bottom-center",
        duration: 5000,
        customClass: "",
        onActionClick: function (element) {
            element.style.opacity = 0;
        },
        onSecondButtonClick: function (element) {},
        onClose: function (element) {},
    };

    Snackbar.show = function ($options) {
        var options = Extend(true, $defaults, $options);

        if (Snackbar.current) {
            Snackbar.current.style.opacity = 0;
            setTimeout(
                function () {
                    var $parent = this.parentElement;
                    if ($parent) $parent.removeChild(this);
                }.bind(Snackbar.current),
                500
            );
        }

        Snackbar.snackbar = document.createElement("div");
        Snackbar.snackbar.className = "snackbar-container " + options.customClass;
        Snackbar.snackbar.style.width = options.width;
        var $p = document.createElement("p");
        $p.style.margin = 0;
        $p.style.padding = 0;
        $p.style.color = options.textColor;
        $p.style.fontSize = "14px";
        $p.style.lineHeight = "1em";
        $p.innerHTML = options.text;
        Snackbar.snackbar.appendChild($p);
        Snackbar.snackbar.style.background = options.backgroundColor;

        if (options.showSecondButton) {
            var secondButton = document.createElement("button");
            secondButton.className = "action";
            secondButton.innerHTML = options.secondButtonText;
            secondButton.setAttribute("aria-label", options.secondButtonAria);
            secondButton.style.color = options.secondButtonTextColor;
            secondButton.addEventListener("click", function () {
                options.onSecondButtonClick(Snackbar.snackbar);
            });
            Snackbar.snackbar.appendChild(secondButton);
        }

        if (options.showAction) {
            var actionButton = document.createElement("button");
            actionButton.className = "action";
            actionButton.innerHTML = options.actionText;
            actionButton.setAttribute("aria-label", options.actionTextAria);
            actionButton.style.color = options.actionTextColor;
            actionButton.addEventListener("click", function () {
                options.onActionClick(Snackbar.snackbar);
            });
            Snackbar.snackbar.appendChild(actionButton);
        }

        if (options.duration) {
            setTimeout(
                function () {
                    if (Snackbar.current === this) {
                        Snackbar.current.style.opacity = 0;
                        Snackbar.current.style.top = "-100px";
                        Snackbar.current.style.bottom = "-100px";
                    }
                }.bind(Snackbar.snackbar),
                options.duration
            );
        }

        if (options.alertScreenReader) {
            Snackbar.snackbar.setAttribute("role", "alert");
        }

        Snackbar.snackbar.addEventListener(
            "transitionend",
            function (event, elapsed) {
                if (event.propertyName === "opacity" && this.style.opacity === "0") {
                    if (typeof options.onClose === "function") options.onClose(this);

                    this.parentElement.removeChild(this);
                    if (Snackbar.current === this) {
                        Snackbar.current = null;
                    }
                }
            }.bind(Snackbar.snackbar)
        );

        Snackbar.current = Snackbar.snackbar;

        document.body.appendChild(Snackbar.snackbar);
        var $bottom = getComputedStyle(Snackbar.snackbar).bottom;
        var $top = getComputedStyle(Snackbar.snackbar).top;
        Snackbar.snackbar.style.opacity = 1;
        Snackbar.snackbar.className = "snackbar-container " + options.customClass + " snackbar-pos " + options.pos;
    };

    Snackbar.close = function () {
        if (Snackbar.current) {
            Snackbar.current.style.opacity = 0;
        }
    };

    var Extend = function () {
        var extended = {};
        var deep = false;
        var i = 0;
        var length = arguments.length;

        if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
            deep = arguments[0];
            i++;
        }

        var merge = function (obj) {
            for (var prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
                        extended[prop] = Extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        for (; i < length; i++) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;
    };

    return Snackbar;
});
