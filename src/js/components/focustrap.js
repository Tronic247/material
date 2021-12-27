/**
 * 
 * Focus Trap
 *  
 */

/*!
 * tabbable 5.2.1
 * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
 */
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self, function() {
        var n = e.tabbable,
            r = e.tabbable = {};
        t(r), r.noConflict = function() { return e.tabbable = n, r }
    }())
}(this, (function(e) {
    "use strict";
    var t = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"],
        n = t.join(","),
        r = "undefined" == typeof Element ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector,
        o = function(e, t, o) { var i = Array.prototype.slice.apply(e.querySelectorAll(n)); return t && r.call(e, n) && i.unshift(e), i = i.filter(o) },
        i = function(e) { var t = parseInt(e.getAttribute("tabindex"), 10); return isNaN(t) ? function(e) { return "true" === e.contentEditable }(e) ? 0 : "AUDIO" !== e.nodeName && "VIDEO" !== e.nodeName && "DETAILS" !== e.nodeName || null !== e.getAttribute("tabindex") ? e.tabIndex : 0 : t },
        a = function(e, t) { return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex },
        u = function(e) { return "INPUT" === e.tagName },
        l = function(e) {
            return function(e) { return u(e) && "radio" === e.type }(e) && ! function(e) {
                if (!e.name) return !0;
                var t, n = e.form || e.ownerDocument,
                    r = function(e) { return n.querySelectorAll('input[type="radio"][name="' + e + '"]') };
                if ("undefined" != typeof window && void 0 !== window.CSS && "function" == typeof window.CSS.escape) t = r(window.CSS.escape(e.name));
                else try { t = r(e.name) } catch (e) { return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", e.message), !1 }
                var o = function(e, t) {
                    for (var n = 0; n < e.length; n++)
                        if (e[n].checked && e[n].form === t) return e[n]
                }(t, e.form);
                return !o || o === e
            }(e)
        },
        c = function(e, t) {
            return !(t.disabled || function(e) { return u(e) && "hidden" === e.type }(t) || function(e, t) {
                if ("hidden" === getComputedStyle(e).visibility) return !0;
                var n = r.call(e, "details>summary:first-of-type") ? e.parentElement : e;
                if (r.call(n, "details:not([open]) *")) return !0;
                if (t && "full" !== t) {
                    if ("non-zero-area" === t) {
                        var o = e.getBoundingClientRect(),
                            i = o.width,
                            a = o.height;
                        return 0 === i && 0 === a
                    }
                } else
                    for (; e;) {
                        if ("none" === getComputedStyle(e).display) return !0;
                        e = e.parentElement
                    }
                return !1
            }(t, e.displayCheck) || function(e) { return "DETAILS" === e.tagName && Array.prototype.slice.apply(e.children).some((function(e) { return "SUMMARY" === e.tagName })) }(t) || function(e) {
                if (u(e) || "SELECT" === e.tagName || "TEXTAREA" === e.tagName || "BUTTON" === e.tagName)
                    for (var t = e.parentElement; t;) {
                        if ("FIELDSET" === t.tagName && t.disabled) { for (var n = 0; n < t.children.length; n++) { var r = t.children.item(n); if ("LEGEND" === r.tagName) return !r.contains(e) } return !0 }
                        t = t.parentElement
                    }
                return !1
            }(t))
        },
        d = function(e, t) { return !(!c(e, t) || l(t) || i(t) < 0) },
        f = t.concat("iframe").join(",");
    e.focusable = function(e, t) { return o(e, (t = t || {}).includeContainer, c.bind(null, t)) }, e.isFocusable = function(e, t) { if (t = t || {}, !e) throw new Error("No node provided"); return !1 !== r.call(e, f) && c(t, e) }, e.isTabbable = function(e, t) { if (t = t || {}, !e) throw new Error("No node provided"); return !1 !== r.call(e, n) && d(t, e) }, e.tabbable = function(e, t) {
        var n = [],
            r = [];
        return o(e, (t = t || {}).includeContainer, d.bind(null, t)).forEach((function(e, t) {
            var o = i(e);
            0 === o ? n.push(e) : r.push({ documentOrder: t, tabIndex: o, node: e })
        })), r.sort(a).map((function(e) { return e.node })).concat(n)
    }, Object.defineProperty(e, "__esModule", { value: !0 })
}));


/*!
 * focus-trap 6.7.1
 * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
 */
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("tabbable")) : "function" == typeof define && define.amd ? define(["exports", "tabbable"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self, function() {
        var n = e.focusTrap,
            a = e.focusTrap = {};
        t(a, e.tabbable), a.noConflict = function() { return e.focusTrap = n, a }
    }())
}(this, (function(e, t) {
    "use strict";

    function n(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var a = Object.getOwnPropertySymbols(e);
            t && (a = a.filter((function(t) { return Object.getOwnPropertyDescriptor(e, t).enumerable }))), n.push.apply(n, a)
        }
        return n
    }

    function a(e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e }
    var r, o = (r = [], {
            activateTrap: function(e) {
                if (r.length > 0) {
                    var t = r[r.length - 1];
                    t !== e && t.pause()
                }
                var n = r.indexOf(e); - 1 === n || r.splice(n, 1), r.push(e)
            },
            deactivateTrap: function(e) { var t = r.indexOf(e); - 1 !== t && r.splice(t, 1), r.length > 0 && r[r.length - 1].unpause() }
        }),
        i = function(e) { return setTimeout(e, 0) },
        c = function(e, t) { var n = -1; return e.every((function(e, a) { return !t(e) || (n = a, !1) })), n },
        u = function(e) { for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) n[a - 1] = arguments[a]; return "function" == typeof e ? e.apply(void 0, n) : e },
        s = function(e) { return e.target.shadowRoot && "function" == typeof e.composedPath ? e.composedPath()[0] : e.target };
    e.createFocusTrap = function(e, r) {
        var l, f = (null == r ? void 0 : r.document) || document,
            b = function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? n(Object(r), !0).forEach((function(t) { a(e, t, r[t]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach((function(t) { Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t)) }))
                }
                return e
            }({ returnFocusOnDeactivate: !0, escapeDeactivates: !0, delayInitialFocus: !0 }, r),
            v = { containers: [], tabbableGroups: [], nodeFocusedBeforeActivation: null, mostRecentlyFocusedNode: null, active: !1, paused: !1, delayInitialFocusTimer: void 0 },
            d = function(e, t, n) { return e && void 0 !== e[t] ? e[t] : b[n || t] },
            p = function(e) { return !(!e || !v.containers.some((function(t) { return t.contains(e) }))) },
            h = function(e) {
                var t = b[e];
                if ("function" == typeof t) {
                    for (var n = arguments.length, a = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) a[r - 1] = arguments[r];
                    t = t.apply(void 0, a)
                }
                if (!t) { if (void 0 === t || !1 === t) return t; throw new Error("`".concat(e, "` was specified but was not a node, or did not return a node")) }
                var o = t;
                if ("string" == typeof t && !(o = f.querySelector(t))) throw new Error("`".concat(e, "` as selector refers to no known node"));
                return o
            },
            y = function() {
                var e = h("initialFocus");
                if (!1 === e) return !1;
                if (void 0 === e)
                    if (p(f.activeElement)) e = f.activeElement;
                    else {
                        var t = v.tabbableGroups[0];
                        e = t && t.firstTabbableNode || h("fallbackFocus")
                    }
                if (!e) throw new Error("Your focus-trap needs to have at least one focusable element");
                return e
            },
            m = function() { if (v.tabbableGroups = v.containers.map((function(e) { var n = t.tabbable(e); if (n.length > 0) return { container: e, firstTabbableNode: n[0], lastTabbableNode: n[n.length - 1] } })).filter((function(e) { return !!e })), v.tabbableGroups.length <= 0 && !h("fallbackFocus")) throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times") },
            g = function e(t) {!1 !== t && t !== f.activeElement && (t && t.focus ? (t.focus({ preventScroll: !!b.preventScroll }), v.mostRecentlyFocusedNode = t, function(e) { return e.tagName && "input" === e.tagName.toLowerCase() && "function" == typeof e.select }(t) && t.select()) : e(y())) },
            w = function(e) { var t = h("setReturnFocus", e); return t || !1 !== t && e },
            F = function(e) {
                var n = s(e);
                p(n) || (u(b.clickOutsideDeactivates, e) ? l.deactivate({ returnFocus: b.returnFocusOnDeactivate && !t.isFocusable(n) }) : u(b.allowOutsideClick, e) || e.preventDefault())
            },
            O = function(e) {
                var t = s(e),
                    n = p(t);
                n || t instanceof Document ? n && (v.mostRecentlyFocusedNode = t) : (e.stopImmediatePropagation(), g(v.mostRecentlyFocusedNode || y()))
            },
            T = function(e) {
                if (function(e) { return "Escape" === e.key || "Esc" === e.key || 27 === e.keyCode }(e) && !1 !== u(b.escapeDeactivates, e)) return e.preventDefault(), void l.deactivate();
                (function(e) { return "Tab" === e.key || 9 === e.keyCode })(e) && function(e) {
                    var t = s(e);
                    m();
                    var n = null;
                    if (v.tabbableGroups.length > 0) {
                        var a = c(v.tabbableGroups, (function(e) { return e.container.contains(t) }));
                        if (a < 0) n = e.shiftKey ? v.tabbableGroups[v.tabbableGroups.length - 1].lastTabbableNode : v.tabbableGroups[0].firstTabbableNode;
                        else if (e.shiftKey) {
                            var r = c(v.tabbableGroups, (function(e) { var n = e.firstTabbableNode; return t === n }));
                            if (r < 0 && v.tabbableGroups[a].container === t && (r = a), r >= 0) {
                                var o = 0 === r ? v.tabbableGroups.length - 1 : r - 1;
                                n = v.tabbableGroups[o].lastTabbableNode
                            }
                        } else {
                            var i = c(v.tabbableGroups, (function(e) { var n = e.lastTabbableNode; return t === n }));
                            if (i < 0 && v.tabbableGroups[a].container === t && (i = a), i >= 0) {
                                var u = i === v.tabbableGroups.length - 1 ? 0 : i + 1;
                                n = v.tabbableGroups[u].firstTabbableNode
                            }
                        }
                    } else n = h("fallbackFocus");
                    n && (e.preventDefault(), g(n))
                }(e)
            },
            E = function(e) {
                if (!u(b.clickOutsideDeactivates, e)) {
                    var t = s(e);
                    p(t) || u(b.allowOutsideClick, e) || (e.preventDefault(), e.stopImmediatePropagation())
                }
            },
            k = function() { if (v.active) return o.activateTrap(l), v.delayInitialFocusTimer = b.delayInitialFocus ? i((function() { g(y()) })) : g(y()), f.addEventListener("focusin", O, !0), f.addEventListener("mousedown", F, { capture: !0, passive: !1 }), f.addEventListener("touchstart", F, { capture: !0, passive: !1 }), f.addEventListener("click", E, { capture: !0, passive: !1 }), f.addEventListener("keydown", T, { capture: !0, passive: !1 }), l },
            D = function() { if (v.active) return f.removeEventListener("focusin", O, !0), f.removeEventListener("mousedown", F, !0), f.removeEventListener("touchstart", F, !0), f.removeEventListener("click", E, !0), f.removeEventListener("keydown", T, !0), l };
        return (l = {
            activate: function(e) {
                if (v.active) return this;
                var t = d(e, "onActivate"),
                    n = d(e, "onPostActivate"),
                    a = d(e, "checkCanFocusTrap");
                a || m(), v.active = !0, v.paused = !1, v.nodeFocusedBeforeActivation = f.activeElement, t && t();
                var r = function() { a && m(), k(), n && n() };
                return a ? (a(v.containers.concat()).then(r, r), this) : (r(), this)
            },
            deactivate: function(e) {
                if (!v.active) return this;
                clearTimeout(v.delayInitialFocusTimer), v.delayInitialFocusTimer = void 0, D(), v.active = !1, v.paused = !1, o.deactivateTrap(l);
                var t = d(e, "onDeactivate"),
                    n = d(e, "onPostDeactivate"),
                    a = d(e, "checkCanReturnFocus");
                t && t();
                var r = d(e, "returnFocus", "returnFocusOnDeactivate"),
                    c = function() { i((function() { r && g(w(v.nodeFocusedBeforeActivation)), n && n() })) };
                return r && a ? (a(w(v.nodeFocusedBeforeActivation)).then(c, c), this) : (c(), this)
            },
            pause: function() { return v.paused || !v.active || (v.paused = !0, D()), this },
            unpause: function() { return v.paused && v.active ? (v.paused = !1, m(), k(), this) : this },
            updateContainerElements: function(e) { var t = [].concat(e).filter(Boolean); return v.containers = t.map((function(e) { return "string" == typeof e ? f.querySelector(e) : e })), v.active && m(), this }
        }).updateContainerElements(e), l
    }, Object.defineProperty(e, "__esModule", { value: !0 })
}));

export default FocusTrap