(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/nouislider/dist/nouislider.js
  var require_nouislider = __commonJS({
    "node_modules/nouislider/dist/nouislider.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.noUiSlider = {}));
      })(exports, function(exports2) {
        "use strict";
        exports2.PipsMode = void 0;
        (function(PipsMode) {
          PipsMode["Range"] = "range";
          PipsMode["Steps"] = "steps";
          PipsMode["Positions"] = "positions";
          PipsMode["Count"] = "count";
          PipsMode["Values"] = "values";
        })(exports2.PipsMode || (exports2.PipsMode = {}));
        exports2.PipsType = void 0;
        (function(PipsType) {
          PipsType[PipsType["None"] = -1] = "None";
          PipsType[PipsType["NoValue"] = 0] = "NoValue";
          PipsType[PipsType["LargeValue"] = 1] = "LargeValue";
          PipsType[PipsType["SmallValue"] = 2] = "SmallValue";
        })(exports2.PipsType || (exports2.PipsType = {}));
        function isValidFormatter(entry) {
          return isValidPartialFormatter(entry) && typeof entry.from === "function";
        }
        function isValidPartialFormatter(entry) {
          return typeof entry === "object" && typeof entry.to === "function";
        }
        function removeElement(el) {
          el.parentElement.removeChild(el);
        }
        function isSet(value) {
          return value !== null && value !== void 0;
        }
        function preventDefault(e) {
          e.preventDefault();
        }
        function unique(array) {
          return array.filter(function(a) {
            return !this[a] ? this[a] = true : false;
          }, {});
        }
        function closest(value, to) {
          return Math.round(value / to) * to;
        }
        function offset2(elem, orientation) {
          var rect = elem.getBoundingClientRect();
          var doc = elem.ownerDocument;
          var docElem = doc.documentElement;
          var pageOffset = getPageOffset(doc);
          if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
            pageOffset.x = 0;
          }
          return orientation ? rect.top + pageOffset.y - docElem.clientTop : rect.left + pageOffset.x - docElem.clientLeft;
        }
        function isNumeric(a) {
          return typeof a === "number" && !isNaN(a) && isFinite(a);
        }
        function addClassFor(element2, className, duration2) {
          if (duration2 > 0) {
            addClass(element2, className);
            setTimeout(function() {
              removeClass(element2, className);
            }, duration2);
          }
        }
        function limit(a) {
          return Math.max(Math.min(a, 100), 0);
        }
        function asArray(a) {
          return Array.isArray(a) ? a : [a];
        }
        function countDecimals(numStr) {
          numStr = String(numStr);
          var pieces = numStr.split(".");
          return pieces.length > 1 ? pieces[1].length : 0;
        }
        function addClass(el, className) {
          if (el.classList && !/\s/.test(className)) {
            el.classList.add(className);
          } else {
            el.className += " " + className;
          }
        }
        function removeClass(el, className) {
          if (el.classList && !/\s/.test(className)) {
            el.classList.remove(className);
          } else {
            el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
          }
        }
        function hasClass(el, className) {
          return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
        }
        function getPageOffset(doc) {
          var supportPageOffset = window.pageXOffset !== void 0;
          var isCSS1Compat = (doc.compatMode || "") === "CSS1Compat";
          var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
          var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;
          return {
            x,
            y
          };
        }
        function getActions() {
          return window.navigator.pointerEnabled ? {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
          } : window.navigator.msPointerEnabled ? {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
          } : {
            start: "mousedown touchstart",
            move: "mousemove touchmove",
            end: "mouseup touchend"
          };
        }
        function getSupportsPassive() {
          var supportsPassive = false;
          try {
            var opts = Object.defineProperty({}, "passive", {
              get: function() {
                supportsPassive = true;
              }
            });
            window.addEventListener("test", null, opts);
          } catch (e) {
          }
          return supportsPassive;
        }
        function getSupportsTouchActionNone() {
          return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
        }
        function subRangeRatio(pa, pb) {
          return 100 / (pb - pa);
        }
        function fromPercentage(range, value, startRange) {
          return value * 100 / (range[startRange + 1] - range[startRange]);
        }
        function toPercentage(range, value) {
          return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0], 0);
        }
        function isPercentage(range, value) {
          return value * (range[1] - range[0]) / 100 + range[0];
        }
        function getJ(value, arr) {
          var j = 1;
          while (value >= arr[j]) {
            j += 1;
          }
          return j;
        }
        function toStepping(xVal, xPct, value) {
          if (value >= xVal.slice(-1)[0]) {
            return 100;
          }
          var j = getJ(value, xVal);
          var va = xVal[j - 1];
          var vb = xVal[j];
          var pa = xPct[j - 1];
          var pb = xPct[j];
          return pa + toPercentage([va, vb], value) / subRangeRatio(pa, pb);
        }
        function fromStepping(xVal, xPct, value) {
          if (value >= 100) {
            return xVal.slice(-1)[0];
          }
          var j = getJ(value, xPct);
          var va = xVal[j - 1];
          var vb = xVal[j];
          var pa = xPct[j - 1];
          var pb = xPct[j];
          return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb));
        }
        function getStep(xPct, xSteps, snap, value) {
          if (value === 100) {
            return value;
          }
          var j = getJ(value, xPct);
          var a = xPct[j - 1];
          var b = xPct[j];
          if (snap) {
            if (value - a > (b - a) / 2) {
              return b;
            }
            return a;
          }
          if (!xSteps[j - 1]) {
            return value;
          }
          return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
        }
        var Spectrum = function() {
          function Spectrum2(entry, snap, singleStep) {
            this.xPct = [];
            this.xVal = [];
            this.xSteps = [];
            this.xNumSteps = [];
            this.xHighestCompleteStep = [];
            this.xSteps = [singleStep || false];
            this.xNumSteps = [false];
            this.snap = snap;
            var index;
            var ordered = [];
            Object.keys(entry).forEach(function(index2) {
              ordered.push([asArray(entry[index2]), index2]);
            });
            ordered.sort(function(a, b) {
              return a[0][0] - b[0][0];
            });
            for (index = 0; index < ordered.length; index++) {
              this.handleEntryPoint(ordered[index][1], ordered[index][0]);
            }
            this.xNumSteps = this.xSteps.slice(0);
            for (index = 0; index < this.xNumSteps.length; index++) {
              this.handleStepPoint(index, this.xNumSteps[index]);
            }
          }
          Spectrum2.prototype.getDistance = function(value) {
            var distances = [];
            for (var index = 0; index < this.xNumSteps.length - 1; index++) {
              distances[index] = fromPercentage(this.xVal, value, index);
            }
            return distances;
          };
          Spectrum2.prototype.getAbsoluteDistance = function(value, distances, direction) {
            var xPct_index = 0;
            if (value < this.xPct[this.xPct.length - 1]) {
              while (value > this.xPct[xPct_index + 1]) {
                xPct_index++;
              }
            } else if (value === this.xPct[this.xPct.length - 1]) {
              xPct_index = this.xPct.length - 2;
            }
            if (!direction && value === this.xPct[xPct_index + 1]) {
              xPct_index++;
            }
            if (distances === null) {
              distances = [];
            }
            var start_factor;
            var rest_factor = 1;
            var rest_rel_distance = distances[xPct_index];
            var range_pct = 0;
            var rel_range_distance = 0;
            var abs_distance_counter = 0;
            var range_counter = 0;
            if (direction) {
              start_factor = (value - this.xPct[xPct_index]) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
            } else {
              start_factor = (this.xPct[xPct_index + 1] - value) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
            }
            while (rest_rel_distance > 0) {
              range_pct = this.xPct[xPct_index + 1 + range_counter] - this.xPct[xPct_index + range_counter];
              if (distances[xPct_index + range_counter] * rest_factor + 100 - start_factor * 100 > 100) {
                rel_range_distance = range_pct * start_factor;
                rest_factor = (rest_rel_distance - 100 * start_factor) / distances[xPct_index + range_counter];
                start_factor = 1;
              } else {
                rel_range_distance = distances[xPct_index + range_counter] * range_pct / 100 * rest_factor;
                rest_factor = 0;
              }
              if (direction) {
                abs_distance_counter = abs_distance_counter - rel_range_distance;
                if (this.xPct.length + range_counter >= 1) {
                  range_counter--;
                }
              } else {
                abs_distance_counter = abs_distance_counter + rel_range_distance;
                if (this.xPct.length - range_counter >= 1) {
                  range_counter++;
                }
              }
              rest_rel_distance = distances[xPct_index + range_counter] * rest_factor;
            }
            return value + abs_distance_counter;
          };
          Spectrum2.prototype.toStepping = function(value) {
            value = toStepping(this.xVal, this.xPct, value);
            return value;
          };
          Spectrum2.prototype.fromStepping = function(value) {
            return fromStepping(this.xVal, this.xPct, value);
          };
          Spectrum2.prototype.getStep = function(value) {
            value = getStep(this.xPct, this.xSteps, this.snap, value);
            return value;
          };
          Spectrum2.prototype.getDefaultStep = function(value, isDown, size) {
            var j = getJ(value, this.xPct);
            if (value === 100 || isDown && value === this.xPct[j - 1]) {
              j = Math.max(j - 1, 1);
            }
            return (this.xVal[j] - this.xVal[j - 1]) / size;
          };
          Spectrum2.prototype.getNearbySteps = function(value) {
            var j = getJ(value, this.xPct);
            return {
              stepBefore: {
                startValue: this.xVal[j - 2],
                step: this.xNumSteps[j - 2],
                highestStep: this.xHighestCompleteStep[j - 2]
              },
              thisStep: {
                startValue: this.xVal[j - 1],
                step: this.xNumSteps[j - 1],
                highestStep: this.xHighestCompleteStep[j - 1]
              },
              stepAfter: {
                startValue: this.xVal[j],
                step: this.xNumSteps[j],
                highestStep: this.xHighestCompleteStep[j]
              }
            };
          };
          Spectrum2.prototype.countStepDecimals = function() {
            var stepDecimals = this.xNumSteps.map(countDecimals);
            return Math.max.apply(null, stepDecimals);
          };
          Spectrum2.prototype.hasNoSize = function() {
            return this.xVal[0] === this.xVal[this.xVal.length - 1];
          };
          Spectrum2.prototype.convert = function(value) {
            return this.getStep(this.toStepping(value));
          };
          Spectrum2.prototype.handleEntryPoint = function(index, value) {
            var percentage;
            if (index === "min") {
              percentage = 0;
            } else if (index === "max") {
              percentage = 100;
            } else {
              percentage = parseFloat(index);
            }
            if (!isNumeric(percentage) || !isNumeric(value[0])) {
              throw new Error("noUiSlider: 'range' value isn't numeric.");
            }
            this.xPct.push(percentage);
            this.xVal.push(value[0]);
            var value1 = Number(value[1]);
            if (!percentage) {
              if (!isNaN(value1)) {
                this.xSteps[0] = value1;
              }
            } else {
              this.xSteps.push(isNaN(value1) ? false : value1);
            }
            this.xHighestCompleteStep.push(0);
          };
          Spectrum2.prototype.handleStepPoint = function(i, n) {
            if (!n) {
              return;
            }
            if (this.xVal[i] === this.xVal[i + 1]) {
              this.xSteps[i] = this.xHighestCompleteStep[i] = this.xVal[i];
              return;
            }
            this.xSteps[i] = fromPercentage([this.xVal[i], this.xVal[i + 1]], n, 0) / subRangeRatio(this.xPct[i], this.xPct[i + 1]);
            var totalSteps = (this.xVal[i + 1] - this.xVal[i]) / this.xNumSteps[i];
            var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
            var step = this.xVal[i] + this.xNumSteps[i] * highestStep;
            this.xHighestCompleteStep[i] = step;
          };
          return Spectrum2;
        }();
        var defaultFormatter = {
          to: function(value) {
            return value === void 0 ? "" : value.toFixed(2);
          },
          from: Number
        };
        var cssClasses = {
          target: "target",
          base: "base",
          origin: "origin",
          handle: "handle",
          handleLower: "handle-lower",
          handleUpper: "handle-upper",
          touchArea: "touch-area",
          horizontal: "horizontal",
          vertical: "vertical",
          background: "background",
          connect: "connect",
          connects: "connects",
          ltr: "ltr",
          rtl: "rtl",
          textDirectionLtr: "txt-dir-ltr",
          textDirectionRtl: "txt-dir-rtl",
          draggable: "draggable",
          drag: "state-drag",
          tap: "state-tap",
          active: "active",
          tooltip: "tooltip",
          pips: "pips",
          pipsHorizontal: "pips-horizontal",
          pipsVertical: "pips-vertical",
          marker: "marker",
          markerHorizontal: "marker-horizontal",
          markerVertical: "marker-vertical",
          markerNormal: "marker-normal",
          markerLarge: "marker-large",
          markerSub: "marker-sub",
          value: "value",
          valueHorizontal: "value-horizontal",
          valueVertical: "value-vertical",
          valueNormal: "value-normal",
          valueLarge: "value-large",
          valueSub: "value-sub"
        };
        var INTERNAL_EVENT_NS = {
          tooltips: ".__tooltips",
          aria: ".__aria"
        };
        function testStep(parsed, entry) {
          if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'step' is not numeric.");
          }
          parsed.singleStep = entry;
        }
        function testKeyboardPageMultiplier(parsed, entry) {
          if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
          }
          parsed.keyboardPageMultiplier = entry;
        }
        function testKeyboardMultiplier(parsed, entry) {
          if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
          }
          parsed.keyboardMultiplier = entry;
        }
        function testKeyboardDefaultStep(parsed, entry) {
          if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
          }
          parsed.keyboardDefaultStep = entry;
        }
        function testRange(parsed, entry) {
          if (typeof entry !== "object" || Array.isArray(entry)) {
            throw new Error("noUiSlider: 'range' is not an object.");
          }
          if (entry.min === void 0 || entry.max === void 0) {
            throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
          }
          parsed.spectrum = new Spectrum(entry, parsed.snap || false, parsed.singleStep);
        }
        function testStart(parsed, entry) {
          entry = asArray(entry);
          if (!Array.isArray(entry) || !entry.length) {
            throw new Error("noUiSlider: 'start' option is incorrect.");
          }
          parsed.handles = entry.length;
          parsed.start = entry;
        }
        function testSnap(parsed, entry) {
          if (typeof entry !== "boolean") {
            throw new Error("noUiSlider: 'snap' option must be a boolean.");
          }
          parsed.snap = entry;
        }
        function testAnimate(parsed, entry) {
          if (typeof entry !== "boolean") {
            throw new Error("noUiSlider: 'animate' option must be a boolean.");
          }
          parsed.animate = entry;
        }
        function testAnimationDuration(parsed, entry) {
          if (typeof entry !== "number") {
            throw new Error("noUiSlider: 'animationDuration' option must be a number.");
          }
          parsed.animationDuration = entry;
        }
        function testConnect(parsed, entry) {
          var connect = [false];
          var i;
          if (entry === "lower") {
            entry = [true, false];
          } else if (entry === "upper") {
            entry = [false, true];
          }
          if (entry === true || entry === false) {
            for (i = 1; i < parsed.handles; i++) {
              connect.push(entry);
            }
            connect.push(false);
          } else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) {
            throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
          } else {
            connect = entry;
          }
          parsed.connect = connect;
        }
        function testOrientation(parsed, entry) {
          switch (entry) {
            case "horizontal":
              parsed.ort = 0;
              break;
            case "vertical":
              parsed.ort = 1;
              break;
            default:
              throw new Error("noUiSlider: 'orientation' option is invalid.");
          }
        }
        function testMargin(parsed, entry) {
          if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'margin' option must be numeric.");
          }
          if (entry === 0) {
            return;
          }
          parsed.margin = parsed.spectrum.getDistance(entry);
        }
        function testLimit(parsed, entry) {
          if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'limit' option must be numeric.");
          }
          parsed.limit = parsed.spectrum.getDistance(entry);
          if (!parsed.limit || parsed.handles < 2) {
            throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
          }
        }
        function testPadding(parsed, entry) {
          var index;
          if (!isNumeric(entry) && !Array.isArray(entry)) {
            throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
          }
          if (Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1]))) {
            throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
          }
          if (entry === 0) {
            return;
          }
          if (!Array.isArray(entry)) {
            entry = [entry, entry];
          }
          parsed.padding = [parsed.spectrum.getDistance(entry[0]), parsed.spectrum.getDistance(entry[1])];
          for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) {
            if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) {
              throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
            }
          }
          var totalPadding = entry[0] + entry[1];
          var firstValue = parsed.spectrum.xVal[0];
          var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1];
          if (totalPadding / (lastValue - firstValue) > 1) {
            throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
          }
        }
        function testDirection(parsed, entry) {
          switch (entry) {
            case "ltr":
              parsed.dir = 0;
              break;
            case "rtl":
              parsed.dir = 1;
              break;
            default:
              throw new Error("noUiSlider: 'direction' option was not recognized.");
          }
        }
        function testBehaviour(parsed, entry) {
          if (typeof entry !== "string") {
            throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
          }
          var tap = entry.indexOf("tap") >= 0;
          var drag = entry.indexOf("drag") >= 0;
          var fixed = entry.indexOf("fixed") >= 0;
          var snap = entry.indexOf("snap") >= 0;
          var hover = entry.indexOf("hover") >= 0;
          var unconstrained = entry.indexOf("unconstrained") >= 0;
          var dragAll = entry.indexOf("drag-all") >= 0;
          var smoothSteps = entry.indexOf("smooth-steps") >= 0;
          if (fixed) {
            if (parsed.handles !== 2) {
              throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
            }
            testMargin(parsed, parsed.start[1] - parsed.start[0]);
          }
          if (unconstrained && (parsed.margin || parsed.limit)) {
            throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
          }
          parsed.events = {
            tap: tap || snap,
            drag,
            dragAll,
            smoothSteps,
            fixed,
            snap,
            hover,
            unconstrained
          };
        }
        function testTooltips(parsed, entry) {
          if (entry === false) {
            return;
          }
          if (entry === true || isValidPartialFormatter(entry)) {
            parsed.tooltips = [];
            for (var i = 0; i < parsed.handles; i++) {
              parsed.tooltips.push(entry);
            }
          } else {
            entry = asArray(entry);
            if (entry.length !== parsed.handles) {
              throw new Error("noUiSlider: must pass a formatter for all handles.");
            }
            entry.forEach(function(formatter) {
              if (typeof formatter !== "boolean" && !isValidPartialFormatter(formatter)) {
                throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
              }
            });
            parsed.tooltips = entry;
          }
        }
        function testHandleAttributes(parsed, entry) {
          if (entry.length !== parsed.handles) {
            throw new Error("noUiSlider: must pass a attributes for all handles.");
          }
          parsed.handleAttributes = entry;
        }
        function testAriaFormat(parsed, entry) {
          if (!isValidPartialFormatter(entry)) {
            throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
          }
          parsed.ariaFormat = entry;
        }
        function testFormat(parsed, entry) {
          if (!isValidFormatter(entry)) {
            throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
          }
          parsed.format = entry;
        }
        function testKeyboardSupport(parsed, entry) {
          if (typeof entry !== "boolean") {
            throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
          }
          parsed.keyboardSupport = entry;
        }
        function testDocumentElement(parsed, entry) {
          parsed.documentElement = entry;
        }
        function testCssPrefix(parsed, entry) {
          if (typeof entry !== "string" && entry !== false) {
            throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
          }
          parsed.cssPrefix = entry;
        }
        function testCssClasses(parsed, entry) {
          if (typeof entry !== "object") {
            throw new Error("noUiSlider: 'cssClasses' must be an object.");
          }
          if (typeof parsed.cssPrefix === "string") {
            parsed.cssClasses = {};
            Object.keys(entry).forEach(function(key) {
              parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
            });
          } else {
            parsed.cssClasses = entry;
          }
        }
        function testOptions(options) {
          var parsed = {
            margin: null,
            limit: null,
            padding: null,
            animate: true,
            animationDuration: 300,
            ariaFormat: defaultFormatter,
            format: defaultFormatter
          };
          var tests = {
            step: { r: false, t: testStep },
            keyboardPageMultiplier: { r: false, t: testKeyboardPageMultiplier },
            keyboardMultiplier: { r: false, t: testKeyboardMultiplier },
            keyboardDefaultStep: { r: false, t: testKeyboardDefaultStep },
            start: { r: true, t: testStart },
            connect: { r: true, t: testConnect },
            direction: { r: true, t: testDirection },
            snap: { r: false, t: testSnap },
            animate: { r: false, t: testAnimate },
            animationDuration: { r: false, t: testAnimationDuration },
            range: { r: true, t: testRange },
            orientation: { r: false, t: testOrientation },
            margin: { r: false, t: testMargin },
            limit: { r: false, t: testLimit },
            padding: { r: false, t: testPadding },
            behaviour: { r: true, t: testBehaviour },
            ariaFormat: { r: false, t: testAriaFormat },
            format: { r: false, t: testFormat },
            tooltips: { r: false, t: testTooltips },
            keyboardSupport: { r: true, t: testKeyboardSupport },
            documentElement: { r: false, t: testDocumentElement },
            cssPrefix: { r: true, t: testCssPrefix },
            cssClasses: { r: true, t: testCssClasses },
            handleAttributes: { r: false, t: testHandleAttributes }
          };
          var defaults2 = {
            connect: false,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal",
            keyboardSupport: true,
            cssPrefix: "noUi-",
            cssClasses,
            keyboardPageMultiplier: 5,
            keyboardMultiplier: 1,
            keyboardDefaultStep: 10
          };
          if (options.format && !options.ariaFormat) {
            options.ariaFormat = options.format;
          }
          Object.keys(tests).forEach(function(name) {
            if (!isSet(options[name]) && defaults2[name] === void 0) {
              if (tests[name].r) {
                throw new Error("noUiSlider: '" + name + "' is required.");
              }
              return;
            }
            tests[name].t(parsed, !isSet(options[name]) ? defaults2[name] : options[name]);
          });
          parsed.pips = options.pips;
          var d = document.createElement("div");
          var msPrefix = d.style.msTransform !== void 0;
          var noPrefix = d.style.transform !== void 0;
          parsed.transformRule = noPrefix ? "transform" : msPrefix ? "msTransform" : "webkitTransform";
          var styles = [
            ["left", "top"],
            ["right", "bottom"]
          ];
          parsed.style = styles[parsed.dir][parsed.ort];
          return parsed;
        }
        function scope(target, options, originalOptions) {
          var actions = getActions();
          var supportsTouchActionNone = getSupportsTouchActionNone();
          var supportsPassive = supportsTouchActionNone && getSupportsPassive();
          var scope_Target = target;
          var scope_Base;
          var scope_Handles;
          var scope_Connects;
          var scope_Pips;
          var scope_Tooltips;
          var scope_Spectrum = options.spectrum;
          var scope_Values = [];
          var scope_Locations = [];
          var scope_HandleNumbers = [];
          var scope_ActiveHandlesCount = 0;
          var scope_Events = {};
          var scope_Document = target.ownerDocument;
          var scope_DocumentElement = options.documentElement || scope_Document.documentElement;
          var scope_Body = scope_Document.body;
          var scope_DirOffset = scope_Document.dir === "rtl" || options.ort === 1 ? 0 : 100;
          function addNodeTo(addTarget, className) {
            var div = scope_Document.createElement("div");
            if (className) {
              addClass(div, className);
            }
            addTarget.appendChild(div);
            return div;
          }
          function addOrigin(base, handleNumber) {
            var origin = addNodeTo(base, options.cssClasses.origin);
            var handle = addNodeTo(origin, options.cssClasses.handle);
            addNodeTo(handle, options.cssClasses.touchArea);
            handle.setAttribute("data-handle", String(handleNumber));
            if (options.keyboardSupport) {
              handle.setAttribute("tabindex", "0");
              handle.addEventListener("keydown", function(event) {
                return eventKeydown(event, handleNumber);
              });
            }
            if (options.handleAttributes !== void 0) {
              var attributes_1 = options.handleAttributes[handleNumber];
              Object.keys(attributes_1).forEach(function(attribute) {
                handle.setAttribute(attribute, attributes_1[attribute]);
              });
            }
            handle.setAttribute("role", "slider");
            handle.setAttribute("aria-orientation", options.ort ? "vertical" : "horizontal");
            if (handleNumber === 0) {
              addClass(handle, options.cssClasses.handleLower);
            } else if (handleNumber === options.handles - 1) {
              addClass(handle, options.cssClasses.handleUpper);
            }
            return origin;
          }
          function addConnect(base, add) {
            if (!add) {
              return false;
            }
            return addNodeTo(base, options.cssClasses.connect);
          }
          function addElements(connectOptions, base) {
            var connectBase = addNodeTo(base, options.cssClasses.connects);
            scope_Handles = [];
            scope_Connects = [];
            scope_Connects.push(addConnect(connectBase, connectOptions[0]));
            for (var i = 0; i < options.handles; i++) {
              scope_Handles.push(addOrigin(base, i));
              scope_HandleNumbers[i] = i;
              scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
            }
          }
          function addSlider(addTarget) {
            addClass(addTarget, options.cssClasses.target);
            if (options.dir === 0) {
              addClass(addTarget, options.cssClasses.ltr);
            } else {
              addClass(addTarget, options.cssClasses.rtl);
            }
            if (options.ort === 0) {
              addClass(addTarget, options.cssClasses.horizontal);
            } else {
              addClass(addTarget, options.cssClasses.vertical);
            }
            var textDirection = getComputedStyle(addTarget).direction;
            if (textDirection === "rtl") {
              addClass(addTarget, options.cssClasses.textDirectionRtl);
            } else {
              addClass(addTarget, options.cssClasses.textDirectionLtr);
            }
            return addNodeTo(addTarget, options.cssClasses.base);
          }
          function addTooltip(handle, handleNumber) {
            if (!options.tooltips || !options.tooltips[handleNumber]) {
              return false;
            }
            return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
          }
          function isSliderDisabled() {
            return scope_Target.hasAttribute("disabled");
          }
          function isHandleDisabled(handleNumber) {
            var handleOrigin = scope_Handles[handleNumber];
            return handleOrigin.hasAttribute("disabled");
          }
          function removeTooltips() {
            if (scope_Tooltips) {
              removeEvent("update" + INTERNAL_EVENT_NS.tooltips);
              scope_Tooltips.forEach(function(tooltip) {
                if (tooltip) {
                  removeElement(tooltip);
                }
              });
              scope_Tooltips = null;
            }
          }
          function tooltips() {
            removeTooltips();
            scope_Tooltips = scope_Handles.map(addTooltip);
            bindEvent("update" + INTERNAL_EVENT_NS.tooltips, function(values, handleNumber, unencoded) {
              if (!scope_Tooltips || !options.tooltips) {
                return;
              }
              if (scope_Tooltips[handleNumber] === false) {
                return;
              }
              var formattedValue = values[handleNumber];
              if (options.tooltips[handleNumber] !== true) {
                formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
              }
              scope_Tooltips[handleNumber].innerHTML = formattedValue;
            });
          }
          function aria() {
            removeEvent("update" + INTERNAL_EVENT_NS.aria);
            bindEvent("update" + INTERNAL_EVENT_NS.aria, function(values, handleNumber, unencoded, tap, positions) {
              scope_HandleNumbers.forEach(function(index) {
                var handle = scope_Handles[index];
                var min2 = checkHandlePosition(scope_Locations, index, 0, true, true, true);
                var max2 = checkHandlePosition(scope_Locations, index, 100, true, true, true);
                var now = positions[index];
                var text = String(options.ariaFormat.to(unencoded[index]));
                min2 = scope_Spectrum.fromStepping(min2).toFixed(1);
                max2 = scope_Spectrum.fromStepping(max2).toFixed(1);
                now = scope_Spectrum.fromStepping(now).toFixed(1);
                handle.children[0].setAttribute("aria-valuemin", min2);
                handle.children[0].setAttribute("aria-valuemax", max2);
                handle.children[0].setAttribute("aria-valuenow", now);
                handle.children[0].setAttribute("aria-valuetext", text);
              });
            });
          }
          function getGroup(pips2) {
            if (pips2.mode === exports2.PipsMode.Range || pips2.mode === exports2.PipsMode.Steps) {
              return scope_Spectrum.xVal;
            }
            if (pips2.mode === exports2.PipsMode.Count) {
              if (pips2.values < 2) {
                throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
              }
              var interval = pips2.values - 1;
              var spread = 100 / interval;
              var values = [];
              while (interval--) {
                values[interval] = interval * spread;
              }
              values.push(100);
              return mapToRange(values, pips2.stepped);
            }
            if (pips2.mode === exports2.PipsMode.Positions) {
              return mapToRange(pips2.values, pips2.stepped);
            }
            if (pips2.mode === exports2.PipsMode.Values) {
              if (pips2.stepped) {
                return pips2.values.map(function(value) {
                  return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                });
              }
              return pips2.values;
            }
            return [];
          }
          function mapToRange(values, stepped) {
            return values.map(function(value) {
              return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
            });
          }
          function generateSpread(pips2) {
            function safeIncrement(value, increment) {
              return Number((value + increment).toFixed(7));
            }
            var group = getGroup(pips2);
            var indexes = {};
            var firstInRange = scope_Spectrum.xVal[0];
            var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
            var ignoreFirst = false;
            var ignoreLast = false;
            var prevPct = 0;
            group = unique(group.slice().sort(function(a, b) {
              return a - b;
            }));
            if (group[0] !== firstInRange) {
              group.unshift(firstInRange);
              ignoreFirst = true;
            }
            if (group[group.length - 1] !== lastInRange) {
              group.push(lastInRange);
              ignoreLast = true;
            }
            group.forEach(function(current, index) {
              var step;
              var i;
              var q;
              var low = current;
              var high = group[index + 1];
              var newPct;
              var pctDifference;
              var pctPos;
              var type;
              var steps;
              var realSteps;
              var stepSize;
              var isSteps = pips2.mode === exports2.PipsMode.Steps;
              if (isSteps) {
                step = scope_Spectrum.xNumSteps[index];
              }
              if (!step) {
                step = high - low;
              }
              if (high === void 0) {
                high = low;
              }
              step = Math.max(step, 1e-7);
              for (i = low; i <= high; i = safeIncrement(i, step)) {
                newPct = scope_Spectrum.toStepping(i);
                pctDifference = newPct - prevPct;
                steps = pctDifference / (pips2.density || 1);
                realSteps = Math.round(steps);
                stepSize = pctDifference / realSteps;
                for (q = 1; q <= realSteps; q += 1) {
                  pctPos = prevPct + q * stepSize;
                  indexes[pctPos.toFixed(5)] = [scope_Spectrum.fromStepping(pctPos), 0];
                }
                type = group.indexOf(i) > -1 ? exports2.PipsType.LargeValue : isSteps ? exports2.PipsType.SmallValue : exports2.PipsType.NoValue;
                if (!index && ignoreFirst && i !== high) {
                  type = 0;
                }
                if (!(i === high && ignoreLast)) {
                  indexes[newPct.toFixed(5)] = [i, type];
                }
                prevPct = newPct;
              }
            });
            return indexes;
          }
          function addMarking(spread, filterFunc, formatter) {
            var _a, _b;
            var element2 = scope_Document.createElement("div");
            var valueSizeClasses = (_a = {}, _a[exports2.PipsType.None] = "", _a[exports2.PipsType.NoValue] = options.cssClasses.valueNormal, _a[exports2.PipsType.LargeValue] = options.cssClasses.valueLarge, _a[exports2.PipsType.SmallValue] = options.cssClasses.valueSub, _a);
            var markerSizeClasses = (_b = {}, _b[exports2.PipsType.None] = "", _b[exports2.PipsType.NoValue] = options.cssClasses.markerNormal, _b[exports2.PipsType.LargeValue] = options.cssClasses.markerLarge, _b[exports2.PipsType.SmallValue] = options.cssClasses.markerSub, _b);
            var valueOrientationClasses = [options.cssClasses.valueHorizontal, options.cssClasses.valueVertical];
            var markerOrientationClasses = [options.cssClasses.markerHorizontal, options.cssClasses.markerVertical];
            addClass(element2, options.cssClasses.pips);
            addClass(element2, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);
            function getClasses(type, source) {
              var a = source === options.cssClasses.value;
              var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
              var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
              return source + " " + orientationClasses[options.ort] + " " + sizeClasses[type];
            }
            function addSpread(offset3, value, type) {
              type = filterFunc ? filterFunc(value, type) : type;
              if (type === exports2.PipsType.None) {
                return;
              }
              var node = addNodeTo(element2, false);
              node.className = getClasses(type, options.cssClasses.marker);
              node.style[options.style] = offset3 + "%";
              if (type > exports2.PipsType.NoValue) {
                node = addNodeTo(element2, false);
                node.className = getClasses(type, options.cssClasses.value);
                node.setAttribute("data-value", String(value));
                node.style[options.style] = offset3 + "%";
                node.innerHTML = String(formatter.to(value));
              }
            }
            Object.keys(spread).forEach(function(offset3) {
              addSpread(offset3, spread[offset3][0], spread[offset3][1]);
            });
            return element2;
          }
          function removePips() {
            if (scope_Pips) {
              removeElement(scope_Pips);
              scope_Pips = null;
            }
          }
          function pips(pips2) {
            removePips();
            var spread = generateSpread(pips2);
            var filter = pips2.filter;
            var format2 = pips2.format || {
              to: function(value) {
                return String(Math.round(value));
              }
            };
            scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format2));
            return scope_Pips;
          }
          function baseSize() {
            var rect = scope_Base.getBoundingClientRect();
            var alt = "offset" + ["Width", "Height"][options.ort];
            return options.ort === 0 ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
          }
          function attachEvent(events, element2, callback, data) {
            var method = function(event) {
              var e = fixEvent(event, data.pageOffset, data.target || element2);
              if (!e) {
                return false;
              }
              if (isSliderDisabled() && !data.doNotReject) {
                return false;
              }
              if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) {
                return false;
              }
              if (events === actions.start && e.buttons !== void 0 && e.buttons > 1) {
                return false;
              }
              if (data.hover && e.buttons) {
                return false;
              }
              if (!supportsPassive) {
                e.preventDefault();
              }
              e.calcPoint = e.points[options.ort];
              callback(e, data);
              return;
            };
            var methods = [];
            events.split(" ").forEach(function(eventName) {
              element2.addEventListener(eventName, method, supportsPassive ? { passive: true } : false);
              methods.push([eventName, method]);
            });
            return methods;
          }
          function fixEvent(e, pageOffset, eventTarget) {
            var touch = e.type.indexOf("touch") === 0;
            var mouse = e.type.indexOf("mouse") === 0;
            var pointer = e.type.indexOf("pointer") === 0;
            var x = 0;
            var y = 0;
            if (e.type.indexOf("MSPointer") === 0) {
              pointer = true;
            }
            if (e.type === "mousedown" && !e.buttons && !e.touches) {
              return false;
            }
            if (touch) {
              var isTouchOnTarget = function(checkTouch) {
                var target2 = checkTouch.target;
                return target2 === eventTarget || eventTarget.contains(target2) || e.composed && e.composedPath().shift() === eventTarget;
              };
              if (e.type === "touchstart") {
                var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);
                if (targetTouches.length > 1) {
                  return false;
                }
                x = targetTouches[0].pageX;
                y = targetTouches[0].pageY;
              } else {
                var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);
                if (!targetTouch) {
                  return false;
                }
                x = targetTouch.pageX;
                y = targetTouch.pageY;
              }
            }
            pageOffset = pageOffset || getPageOffset(scope_Document);
            if (mouse || pointer) {
              x = e.clientX + pageOffset.x;
              y = e.clientY + pageOffset.y;
            }
            e.pageOffset = pageOffset;
            e.points = [x, y];
            e.cursor = mouse || pointer;
            return e;
          }
          function calcPointToPercentage(calcPoint) {
            var location = calcPoint - offset2(scope_Base, options.ort);
            var proposal = location * 100 / baseSize();
            proposal = limit(proposal);
            return options.dir ? 100 - proposal : proposal;
          }
          function getClosestHandle(clickedPosition) {
            var smallestDifference = 100;
            var handleNumber = false;
            scope_Handles.forEach(function(handle, index) {
              if (isHandleDisabled(index)) {
                return;
              }
              var handlePosition = scope_Locations[index];
              var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition);
              var clickAtEdge = differenceWithThisHandle === 100 && smallestDifference === 100;
              var isCloser = differenceWithThisHandle < smallestDifference;
              var isCloserAfter = differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition;
              if (isCloser || isCloserAfter || clickAtEdge) {
                handleNumber = index;
                smallestDifference = differenceWithThisHandle;
              }
            });
            return handleNumber;
          }
          function documentLeave(event, data) {
            if (event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null) {
              eventEnd(event, data);
            }
          }
          function eventMove(event, data) {
            if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) {
              return eventEnd(event, data);
            }
            var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
            var proposal = movement * 100 / data.baseSize;
            moveHandles(movement > 0, proposal, data.locations, data.handleNumbers, data.connect);
          }
          function eventEnd(event, data) {
            if (data.handle) {
              removeClass(data.handle, options.cssClasses.active);
              scope_ActiveHandlesCount -= 1;
            }
            data.listeners.forEach(function(c) {
              scope_DocumentElement.removeEventListener(c[0], c[1]);
            });
            if (scope_ActiveHandlesCount === 0) {
              removeClass(scope_Target, options.cssClasses.drag);
              setZindex();
              if (event.cursor) {
                scope_Body.style.cursor = "";
                scope_Body.removeEventListener("selectstart", preventDefault);
              }
            }
            if (options.events.smoothSteps) {
              data.handleNumbers.forEach(function(handleNumber) {
                setHandle(handleNumber, scope_Locations[handleNumber], true, true, false, false);
              });
              data.handleNumbers.forEach(function(handleNumber) {
                fireEvent("update", handleNumber);
              });
            }
            data.handleNumbers.forEach(function(handleNumber) {
              fireEvent("change", handleNumber);
              fireEvent("set", handleNumber);
              fireEvent("end", handleNumber);
            });
          }
          function eventStart(event, data) {
            if (data.handleNumbers.some(isHandleDisabled)) {
              return;
            }
            var handle;
            if (data.handleNumbers.length === 1) {
              var handleOrigin = scope_Handles[data.handleNumbers[0]];
              handle = handleOrigin.children[0];
              scope_ActiveHandlesCount += 1;
              addClass(handle, options.cssClasses.active);
            }
            event.stopPropagation();
            var listeners = [];
            var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
              target: event.target,
              handle,
              connect: data.connect,
              listeners,
              startCalcPoint: event.calcPoint,
              baseSize: baseSize(),
              pageOffset: event.pageOffset,
              handleNumbers: data.handleNumbers,
              buttonsProperty: event.buttons,
              locations: scope_Locations.slice()
            });
            var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
              target: event.target,
              handle,
              listeners,
              doNotReject: true,
              handleNumbers: data.handleNumbers
            });
            var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
              target: event.target,
              handle,
              listeners,
              doNotReject: true,
              handleNumbers: data.handleNumbers
            });
            listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
            if (event.cursor) {
              scope_Body.style.cursor = getComputedStyle(event.target).cursor;
              if (scope_Handles.length > 1) {
                addClass(scope_Target, options.cssClasses.drag);
              }
              scope_Body.addEventListener("selectstart", preventDefault, false);
            }
            data.handleNumbers.forEach(function(handleNumber) {
              fireEvent("start", handleNumber);
            });
          }
          function eventTap(event) {
            event.stopPropagation();
            var proposal = calcPointToPercentage(event.calcPoint);
            var handleNumber = getClosestHandle(proposal);
            if (handleNumber === false) {
              return;
            }
            if (!options.events.snap) {
              addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            }
            setHandle(handleNumber, proposal, true, true);
            setZindex();
            fireEvent("slide", handleNumber, true);
            fireEvent("update", handleNumber, true);
            if (!options.events.snap) {
              fireEvent("change", handleNumber, true);
              fireEvent("set", handleNumber, true);
            } else {
              eventStart(event, { handleNumbers: [handleNumber] });
            }
          }
          function eventHover(event) {
            var proposal = calcPointToPercentage(event.calcPoint);
            var to = scope_Spectrum.getStep(proposal);
            var value = scope_Spectrum.fromStepping(to);
            Object.keys(scope_Events).forEach(function(targetEvent) {
              if (targetEvent.split(".")[0] === "hover") {
                scope_Events[targetEvent].forEach(function(callback) {
                  callback.call(scope_Self, value);
                });
              }
            });
          }
          function eventKeydown(event, handleNumber) {
            if (isSliderDisabled() || isHandleDisabled(handleNumber)) {
              return false;
            }
            var horizontalKeys = ["Left", "Right"];
            var verticalKeys = ["Down", "Up"];
            var largeStepKeys = ["PageDown", "PageUp"];
            var edgeKeys = ["Home", "End"];
            if (options.dir && !options.ort) {
              horizontalKeys.reverse();
            } else if (options.ort && !options.dir) {
              verticalKeys.reverse();
              largeStepKeys.reverse();
            }
            var key = event.key.replace("Arrow", "");
            var isLargeDown = key === largeStepKeys[0];
            var isLargeUp = key === largeStepKeys[1];
            var isDown = key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown;
            var isUp = key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp;
            var isMin = key === edgeKeys[0];
            var isMax = key === edgeKeys[1];
            if (!isDown && !isUp && !isMin && !isMax) {
              return true;
            }
            event.preventDefault();
            var to;
            if (isUp || isDown) {
              var direction = isDown ? 0 : 1;
              var steps = getNextStepsForHandle(handleNumber);
              var step = steps[direction];
              if (step === null) {
                return false;
              }
              if (step === false) {
                step = scope_Spectrum.getDefaultStep(scope_Locations[handleNumber], isDown, options.keyboardDefaultStep);
              }
              if (isLargeUp || isLargeDown) {
                step *= options.keyboardPageMultiplier;
              } else {
                step *= options.keyboardMultiplier;
              }
              step = Math.max(step, 1e-7);
              step = (isDown ? -1 : 1) * step;
              to = scope_Values[handleNumber] + step;
            } else if (isMax) {
              to = options.spectrum.xVal[options.spectrum.xVal.length - 1];
            } else {
              to = options.spectrum.xVal[0];
            }
            setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true);
            fireEvent("slide", handleNumber);
            fireEvent("update", handleNumber);
            fireEvent("change", handleNumber);
            fireEvent("set", handleNumber);
            return false;
          }
          function bindSliderEvents(behaviour) {
            if (!behaviour.fixed) {
              scope_Handles.forEach(function(handle, index) {
                attachEvent(actions.start, handle.children[0], eventStart, {
                  handleNumbers: [index]
                });
              });
            }
            if (behaviour.tap) {
              attachEvent(actions.start, scope_Base, eventTap, {});
            }
            if (behaviour.hover) {
              attachEvent(actions.move, scope_Base, eventHover, {
                hover: true
              });
            }
            if (behaviour.drag) {
              scope_Connects.forEach(function(connect, index) {
                if (connect === false || index === 0 || index === scope_Connects.length - 1) {
                  return;
                }
                var handleBefore = scope_Handles[index - 1];
                var handleAfter = scope_Handles[index];
                var eventHolders = [connect];
                var handlesToDrag = [handleBefore, handleAfter];
                var handleNumbersToDrag = [index - 1, index];
                addClass(connect, options.cssClasses.draggable);
                if (behaviour.fixed) {
                  eventHolders.push(handleBefore.children[0]);
                  eventHolders.push(handleAfter.children[0]);
                }
                if (behaviour.dragAll) {
                  handlesToDrag = scope_Handles;
                  handleNumbersToDrag = scope_HandleNumbers;
                }
                eventHolders.forEach(function(eventHolder) {
                  attachEvent(actions.start, eventHolder, eventStart, {
                    handles: handlesToDrag,
                    handleNumbers: handleNumbersToDrag,
                    connect
                  });
                });
              });
            }
          }
          function bindEvent(namespacedEvent, callback) {
            scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
            scope_Events[namespacedEvent].push(callback);
            if (namespacedEvent.split(".")[0] === "update") {
              scope_Handles.forEach(function(a, index) {
                fireEvent("update", index);
              });
            }
          }
          function isInternalNamespace(namespace) {
            return namespace === INTERNAL_EVENT_NS.aria || namespace === INTERNAL_EVENT_NS.tooltips;
          }
          function removeEvent(namespacedEvent) {
            var event = namespacedEvent && namespacedEvent.split(".")[0];
            var namespace = event ? namespacedEvent.substring(event.length) : namespacedEvent;
            Object.keys(scope_Events).forEach(function(bind) {
              var tEvent = bind.split(".")[0];
              var tNamespace = bind.substring(tEvent.length);
              if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) {
                if (!isInternalNamespace(tNamespace) || namespace === tNamespace) {
                  delete scope_Events[bind];
                }
              }
            });
          }
          function fireEvent(eventName, handleNumber, tap) {
            Object.keys(scope_Events).forEach(function(targetEvent) {
              var eventType = targetEvent.split(".")[0];
              if (eventName === eventType) {
                scope_Events[targetEvent].forEach(function(callback) {
                  callback.call(scope_Self, scope_Values.map(options.format.to), handleNumber, scope_Values.slice(), tap || false, scope_Locations.slice(), scope_Self);
                });
              }
            });
          }
          function checkHandlePosition(reference2, handleNumber, to, lookBackward, lookForward, getValue, smoothSteps) {
            var distance;
            if (scope_Handles.length > 1 && !options.events.unconstrained) {
              if (lookBackward && handleNumber > 0) {
                distance = scope_Spectrum.getAbsoluteDistance(reference2[handleNumber - 1], options.margin, false);
                to = Math.max(to, distance);
              }
              if (lookForward && handleNumber < scope_Handles.length - 1) {
                distance = scope_Spectrum.getAbsoluteDistance(reference2[handleNumber + 1], options.margin, true);
                to = Math.min(to, distance);
              }
            }
            if (scope_Handles.length > 1 && options.limit) {
              if (lookBackward && handleNumber > 0) {
                distance = scope_Spectrum.getAbsoluteDistance(reference2[handleNumber - 1], options.limit, false);
                to = Math.min(to, distance);
              }
              if (lookForward && handleNumber < scope_Handles.length - 1) {
                distance = scope_Spectrum.getAbsoluteDistance(reference2[handleNumber + 1], options.limit, true);
                to = Math.max(to, distance);
              }
            }
            if (options.padding) {
              if (handleNumber === 0) {
                distance = scope_Spectrum.getAbsoluteDistance(0, options.padding[0], false);
                to = Math.max(to, distance);
              }
              if (handleNumber === scope_Handles.length - 1) {
                distance = scope_Spectrum.getAbsoluteDistance(100, options.padding[1], true);
                to = Math.min(to, distance);
              }
            }
            if (!smoothSteps) {
              to = scope_Spectrum.getStep(to);
            }
            to = limit(to);
            if (to === reference2[handleNumber] && !getValue) {
              return false;
            }
            return to;
          }
          function inRuleOrder(v, a) {
            var o = options.ort;
            return (o ? a : v) + ", " + (o ? v : a);
          }
          function moveHandles(upward, proposal, locations, handleNumbers, connect) {
            var proposals = locations.slice();
            var firstHandle = handleNumbers[0];
            var smoothSteps = options.events.smoothSteps;
            var b = [!upward, upward];
            var f = [upward, !upward];
            handleNumbers = handleNumbers.slice();
            if (upward) {
              handleNumbers.reverse();
            }
            if (handleNumbers.length > 1) {
              handleNumbers.forEach(function(handleNumber, o) {
                var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false, smoothSteps);
                if (to === false) {
                  proposal = 0;
                } else {
                  proposal = to - proposals[handleNumber];
                  proposals[handleNumber] = to;
                }
              });
            } else {
              b = f = [true];
            }
            var state = false;
            handleNumbers.forEach(function(handleNumber, o) {
              state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o], false, smoothSteps) || state;
            });
            if (state) {
              handleNumbers.forEach(function(handleNumber) {
                fireEvent("update", handleNumber);
                fireEvent("slide", handleNumber);
              });
              if (connect != void 0) {
                fireEvent("drag", firstHandle);
              }
            }
          }
          function transformDirection(a, b) {
            return options.dir ? 100 - a - b : a;
          }
          function updateHandlePosition(handleNumber, to) {
            scope_Locations[handleNumber] = to;
            scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
            var translation = transformDirection(to, 0) - scope_DirOffset;
            var translateRule = "translate(" + inRuleOrder(translation + "%", "0") + ")";
            scope_Handles[handleNumber].style[options.transformRule] = translateRule;
            updateConnect(handleNumber);
            updateConnect(handleNumber + 1);
          }
          function setZindex() {
            scope_HandleNumbers.forEach(function(handleNumber) {
              var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
              var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
              scope_Handles[handleNumber].style.zIndex = String(zIndex);
            });
          }
          function setHandle(handleNumber, to, lookBackward, lookForward, exactInput, smoothSteps) {
            if (!exactInput) {
              to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false, smoothSteps);
            }
            if (to === false) {
              return false;
            }
            updateHandlePosition(handleNumber, to);
            return true;
          }
          function updateConnect(index) {
            if (!scope_Connects[index]) {
              return;
            }
            var l = 0;
            var h = 100;
            if (index !== 0) {
              l = scope_Locations[index - 1];
            }
            if (index !== scope_Connects.length - 1) {
              h = scope_Locations[index];
            }
            var connectWidth = h - l;
            var translateRule = "translate(" + inRuleOrder(transformDirection(l, connectWidth) + "%", "0") + ")";
            var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";
            scope_Connects[index].style[options.transformRule] = translateRule + " " + scaleRule;
          }
          function resolveToValue(to, handleNumber) {
            if (to === null || to === false || to === void 0) {
              return scope_Locations[handleNumber];
            }
            if (typeof to === "number") {
              to = String(to);
            }
            to = options.format.from(to);
            if (to !== false) {
              to = scope_Spectrum.toStepping(to);
            }
            if (to === false || isNaN(to)) {
              return scope_Locations[handleNumber];
            }
            return to;
          }
          function valueSet(input, fireSetEvent, exactInput) {
            var values = asArray(input);
            var isInit = scope_Locations[0] === void 0;
            fireSetEvent = fireSetEvent === void 0 ? true : fireSetEvent;
            if (options.animate && !isInit) {
              addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            }
            scope_HandleNumbers.forEach(function(handleNumber) {
              setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false, exactInput);
            });
            var i = scope_HandleNumbers.length === 1 ? 0 : 1;
            if (isInit && scope_Spectrum.hasNoSize()) {
              exactInput = true;
              scope_Locations[0] = 0;
              if (scope_HandleNumbers.length > 1) {
                var space_1 = 100 / (scope_HandleNumbers.length - 1);
                scope_HandleNumbers.forEach(function(handleNumber) {
                  scope_Locations[handleNumber] = handleNumber * space_1;
                });
              }
            }
            for (; i < scope_HandleNumbers.length; ++i) {
              scope_HandleNumbers.forEach(function(handleNumber) {
                setHandle(handleNumber, scope_Locations[handleNumber], true, true, exactInput);
              });
            }
            setZindex();
            scope_HandleNumbers.forEach(function(handleNumber) {
              fireEvent("update", handleNumber);
              if (values[handleNumber] !== null && fireSetEvent) {
                fireEvent("set", handleNumber);
              }
            });
          }
          function valueReset(fireSetEvent) {
            valueSet(options.start, fireSetEvent);
          }
          function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
            handleNumber = Number(handleNumber);
            if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) {
              throw new Error("noUiSlider: invalid handle number, got: " + handleNumber);
            }
            setHandle(handleNumber, resolveToValue(value, handleNumber), true, true, exactInput);
            fireEvent("update", handleNumber);
            if (fireSetEvent) {
              fireEvent("set", handleNumber);
            }
          }
          function valueGet(unencoded) {
            if (unencoded === void 0) {
              unencoded = false;
            }
            if (unencoded) {
              return scope_Values.length === 1 ? scope_Values[0] : scope_Values.slice(0);
            }
            var values = scope_Values.map(options.format.to);
            if (values.length === 1) {
              return values[0];
            }
            return values;
          }
          function destroy() {
            removeEvent(INTERNAL_EVENT_NS.aria);
            removeEvent(INTERNAL_EVENT_NS.tooltips);
            Object.keys(options.cssClasses).forEach(function(key) {
              removeClass(scope_Target, options.cssClasses[key]);
            });
            while (scope_Target.firstChild) {
              scope_Target.removeChild(scope_Target.firstChild);
            }
            delete scope_Target.noUiSlider;
          }
          function getNextStepsForHandle(handleNumber) {
            var location = scope_Locations[handleNumber];
            var nearbySteps = scope_Spectrum.getNearbySteps(location);
            var value = scope_Values[handleNumber];
            var increment = nearbySteps.thisStep.step;
            var decrement = null;
            if (options.snap) {
              return [
                value - nearbySteps.stepBefore.startValue || null,
                nearbySteps.stepAfter.startValue - value || null
              ];
            }
            if (increment !== false) {
              if (value + increment > nearbySteps.stepAfter.startValue) {
                increment = nearbySteps.stepAfter.startValue - value;
              }
            }
            if (value > nearbySteps.thisStep.startValue) {
              decrement = nearbySteps.thisStep.step;
            } else if (nearbySteps.stepBefore.step === false) {
              decrement = false;
            } else {
              decrement = value - nearbySteps.stepBefore.highestStep;
            }
            if (location === 100) {
              increment = null;
            } else if (location === 0) {
              decrement = null;
            }
            var stepDecimals = scope_Spectrum.countStepDecimals();
            if (increment !== null && increment !== false) {
              increment = Number(increment.toFixed(stepDecimals));
            }
            if (decrement !== null && decrement !== false) {
              decrement = Number(decrement.toFixed(stepDecimals));
            }
            return [decrement, increment];
          }
          function getNextSteps() {
            return scope_HandleNumbers.map(getNextStepsForHandle);
          }
          function updateOptions(optionsToUpdate, fireSetEvent) {
            var v = valueGet();
            var updateAble = [
              "margin",
              "limit",
              "padding",
              "range",
              "animate",
              "snap",
              "step",
              "format",
              "pips",
              "tooltips"
            ];
            updateAble.forEach(function(name) {
              if (optionsToUpdate[name] !== void 0) {
                originalOptions[name] = optionsToUpdate[name];
              }
            });
            var newOptions = testOptions(originalOptions);
            updateAble.forEach(function(name) {
              if (optionsToUpdate[name] !== void 0) {
                options[name] = newOptions[name];
              }
            });
            scope_Spectrum = newOptions.spectrum;
            options.margin = newOptions.margin;
            options.limit = newOptions.limit;
            options.padding = newOptions.padding;
            if (options.pips) {
              pips(options.pips);
            } else {
              removePips();
            }
            if (options.tooltips) {
              tooltips();
            } else {
              removeTooltips();
            }
            scope_Locations = [];
            valueSet(isSet(optionsToUpdate.start) ? optionsToUpdate.start : v, fireSetEvent);
          }
          function setupSlider() {
            scope_Base = addSlider(scope_Target);
            addElements(options.connect, scope_Base);
            bindSliderEvents(options.events);
            valueSet(options.start);
            if (options.pips) {
              pips(options.pips);
            }
            if (options.tooltips) {
              tooltips();
            }
            aria();
          }
          setupSlider();
          var scope_Self = {
            destroy,
            steps: getNextSteps,
            on: bindEvent,
            off: removeEvent,
            get: valueGet,
            set: valueSet,
            setHandle: valueSetHandle,
            reset: valueReset,
            __moveHandles: function(upward, proposal, handleNumbers) {
              moveHandles(upward, proposal, scope_Locations, handleNumbers);
            },
            options: originalOptions,
            updateOptions,
            target: scope_Target,
            removePips,
            removeTooltips,
            getPositions: function() {
              return scope_Locations.slice();
            },
            getTooltips: function() {
              return scope_Tooltips;
            },
            getOrigins: function() {
              return scope_Handles;
            },
            pips
          };
          return scope_Self;
        }
        function initialize(target, originalOptions) {
          if (!target || !target.nodeName) {
            throw new Error("noUiSlider: create requires a single element, got: " + target);
          }
          if (target.noUiSlider) {
            throw new Error("noUiSlider: Slider was already initialized.");
          }
          var options = testOptions(originalOptions);
          var api = scope(target, options, originalOptions);
          target.noUiSlider = api;
          return api;
        }
        var nouislider = {
          __spectrum: Spectrum,
          cssClasses,
          create: initialize
        };
        exports2.create = initialize;
        exports2.cssClasses = cssClasses;
        exports2["default"] = nouislider;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    }
  });

  // src/js/exportGlobal.js
  function exportGlobal(name, value) {
    if (typeof window["Material"] === "undefined") {
      window["Material"] = {};
    }
    if (typeof window !== "undefined") {
      window["Material"][name] = value;
    } else {
      throw new Error(`Material - Cannot export global variable.`);
    }
  }

  // src/js/components/ripple.js
  var Ripple = {
    init: () => {
      const buttons = document.querySelectorAll(".ripple-e:not(.ripple-ready) , .btn:not(.ripple-ready), .icon:not(.ripple-ready)");
      const stopEvents = ["pointerup", "mouseleave", "dragleave", "touchmove", "touchend", "touchcancel"];
      let id;
      function findFurthestPoint(clickPointX, elementWidth, offsetX, clickPointY, elementHeight, offsetY) {
        let x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;
        let y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;
        let d = Math.hypot(x - (clickPointX - offsetX), y - (clickPointY - offsetY));
        return d;
      }
      buttons.forEach((button) => {
        button.classList.add("ripple-ready");
        button.addEventListener("pointerdown", (e) => {
          const rect = button.getBoundingClientRect();
          const radius = findFurthestPoint(e.clientX, button.offsetWidth, rect.left, e.clientY, button.offsetHeight, rect.top);
          id = "__" + (Math.random() + 1).toString(36).substring(7) + "-" + (Math.random() + 1).toString(36).substring(7);
          const circle = document.createElement("div");
          circle.classList.add("ripple");
          circle.id = id;
          circle.style.left = `${e.clientX - rect.left - radius}px`;
          circle.style.top = `${e.clientY - rect.top - radius}px`;
          circle.style.width = circle.style.height = `${radius * 2}px`;
          button.appendChild(circle);
        });
        stopEvents.forEach((event) => {
          button.addEventListener(event, () => {
            const ripple = button.querySelector(".ripple#" + id);
            if (ripple) {
              ripple.style.opacity = "0";
              setTimeout(() => {
                ripple.remove();
              }, 600);
            }
          });
        });
      });
    }
  };
  Ripple.init();
  var ripple_default = Ripple;

  // src/js/components/forms.js
  var import_nouislider = __toESM(require_nouislider(), 1);
  var Forms = {
    init: function(element2) {
      element2 = element2 || document;
      const forms = element2.querySelectorAll(".textbox");
      if (!forms)
        return;
      for (let i = 0; i < forms.length; i++) {
        let parent = forms[i];
        let input = parent.querySelector(".input");
        if (input.value) {
          parent.classList.add("floating");
        } else {
          parent.classList.remove("floating");
        }
        parent.addEventListener("click", function() {
          parent.classList.add("floating");
          input.focus();
        });
        input.addEventListener("focus", function() {
          parent.classList.add("focus");
          parent.classList.add("floating");
        });
        input.addEventListener("blur", function() {
          parent.classList.remove("focus");
          if (input.value) {
            parent.classList.add("floating");
          } else {
            parent.classList.remove("floating");
          }
        });
        input.addEventListener("input", function() {
          if (input.value) {
            parent.classList.add("floating");
          } else {
            parent.classList.remove("floating");
          }
        });
      }
    },
    initRangeSlider: import_nouislider.default
  };
  Forms.init();
  var forms_default = Forms;

  // src/js/components/accordion.js
  var Accordion = {
    init: function() {
      const accordions = document.querySelectorAll(".accordion");
      if (accordions) {
        accordions.forEach(function(i) {
          const _this = i;
          const items = _this.querySelectorAll(".item");
          if (items) {
            items.forEach(function(i2) {
              const children = i2.querySelectorAll(".content , .content *");
              if (children) {
                const focus = () => {
                  if (i2.classList.contains("open")) {
                    children.forEach(function(i3) {
                      i3.setAttribute("tabIndex", "-1");
                    });
                  } else {
                    children.forEach(function(i3) {
                      i3.removeAttribute("tabIndex");
                    });
                  }
                };
                focus();
                const ih = i2.offsetHeight;
                i2.style.setProperty("--max-height", `${ih + 20}px`);
                i2.querySelector("[data-toggle]").addEventListener("click", () => {
                  focus();
                  i2.classList.toggle("open");
                });
              }
            });
          }
        });
      }
    }
  };
  Accordion.init();
  var accordion_default = Accordion;

  // src/js/components/tabs.js
  function Tabs(options) {
    const elem = document.getElementById(options.elem);
    const open = options.open || 0;
    const titleClass = "item";
    const activeClass = "active";
    const contentClass = "content";
    const tabsNum = elem.querySelectorAll("." + titleClass).length;
    const uniqId = (Date.now() + Math.random()).toString(36);
    render();
    function render(n) {
      elem.addEventListener("click", onClick);
      let init = n == null ? checkTab(open) : checkTab(n);
      for (let i = 0; i < tabsNum; i++) {
        elem.querySelectorAll("." + titleClass)[i].setAttribute("data-" + uniqId, i);
        if (i === init)
          openTab(i);
      }
    }
    function onClick(e) {
      if (e.target.className.indexOf(titleClass) === -1)
        return;
      e.preventDefault();
      openTab(e.target.getAttribute("data-" + uniqId));
    }
    function reset() {
      [].forEach.call(elem.querySelectorAll("." + contentClass), function(item) {
        item.classList.remove("active");
      });
      [].forEach.call(elem.querySelectorAll("." + titleClass), function(item) {
        item.className = removeClass(item.className, activeClass);
      });
    }
    function removeClass(str, cls) {
      let reg = new RegExp("( )" + cls + "()", "g");
      return str.replace(reg, "");
    }
    function checkTab(n) {
      return n < 0 || isNaN(n) || n > tabsNum ? 0 : n;
    }
    function openTab(n) {
      reset();
      let i = checkTab(n);
      elem.querySelectorAll("." + titleClass)[i].className += " " + activeClass;
      elem.querySelectorAll("." + contentClass)[i].classList.add("active");
    }
    function update(n) {
      destroy();
      reset();
      render(n);
    }
    function destroy() {
      elem.removeEventListener("click", onClick);
    }
    return {
      open: openTab,
      update,
      destroy
    };
  }
  var tabs_default = Tabs;

  // src/js/components/appbar.js
  var Appbar = {
    init: () => {
      const elements = document.querySelectorAll(".appbar.elevating");
      elements.forEach((element2) => {
        document.addEventListener("scroll", () => {
          if (window.scrollY > 100) {
            element2.classList.add("elevated");
          } else {
            element2.classList.remove("elevated");
          }
        });
      });
    }
  };
  Appbar.init();
  var appbar_default = Appbar;

  // node_modules/tabbable/dist/index.esm.js
  var candidateSelectors = ["input", "select", "textarea", "a[href]", "button", "[tabindex]:not(slot)", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"];
  var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
  var NoElement = typeof Element === "undefined";
  var matches = NoElement ? function() {
  } : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element2) {
    return element2.getRootNode();
  } : function(element2) {
    return element2.ownerDocument;
  };
  var getCandidates = function getCandidates2(el, includeContainer, filter) {
    var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
    if (includeContainer && matches.call(el, candidateSelector)) {
      candidates.unshift(el);
    }
    candidates = candidates.filter(filter);
    return candidates;
  };
  var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
    var candidates = [];
    var elementsToCheck = Array.from(elements);
    while (elementsToCheck.length) {
      var element2 = elementsToCheck.shift();
      if (element2.tagName === "SLOT") {
        var assigned = element2.assignedElements();
        var content = assigned.length ? assigned : element2.children;
        var nestedCandidates = getCandidatesIteratively2(content, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, nestedCandidates);
        } else {
          candidates.push({
            scope: element2,
            candidates: nestedCandidates
          });
        }
      } else {
        var validCandidate = matches.call(element2, candidateSelector);
        if (validCandidate && options.filter(element2) && (includeContainer || !elements.includes(element2))) {
          candidates.push(element2);
        }
        var shadowRoot = element2.shadowRoot || typeof options.getShadowRoot === "function" && options.getShadowRoot(element2);
        var validShadowRoot = !options.shadowRootFilter || options.shadowRootFilter(element2);
        if (shadowRoot && validShadowRoot) {
          var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element2.children : shadowRoot.children, true, options);
          if (options.flatten) {
            candidates.push.apply(candidates, _nestedCandidates);
          } else {
            candidates.push({
              scope: element2,
              candidates: _nestedCandidates
            });
          }
        } else {
          elementsToCheck.unshift.apply(elementsToCheck, element2.children);
        }
      }
    }
    return candidates;
  };
  var getTabindex = function getTabindex2(node, isScope) {
    if (node.tabIndex < 0) {
      if ((isScope || /^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || node.isContentEditable) && isNaN(parseInt(node.getAttribute("tabindex"), 10))) {
        return 0;
      }
    }
    return node.tabIndex;
  };
  var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
    return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
  };
  var isInput = function isInput2(node) {
    return node.tagName === "INPUT";
  };
  var isHiddenInput = function isHiddenInput2(node) {
    return isInput(node) && node.type === "hidden";
  };
  var isDetailsWithSummary = function isDetailsWithSummary2(node) {
    var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
      return child.tagName === "SUMMARY";
    });
    return r;
  };
  var getCheckedRadio = function getCheckedRadio2(nodes, form) {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].checked && nodes[i].form === form) {
        return nodes[i];
      }
    }
  };
  var isTabbableRadio = function isTabbableRadio2(node) {
    if (!node.name) {
      return true;
    }
    var radioScope = node.form || getRootNode(node);
    var queryRadios = function queryRadios2(name) {
      return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
    };
    var radioSet;
    if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
      radioSet = queryRadios(window.CSS.escape(node.name));
    } else {
      try {
        radioSet = queryRadios(node.name);
      } catch (err) {
        console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
        return false;
      }
    }
    var checked = getCheckedRadio(radioSet, node.form);
    return !checked || checked === node;
  };
  var isRadio = function isRadio2(node) {
    return isInput(node) && node.type === "radio";
  };
  var isNonTabbableRadio = function isNonTabbableRadio2(node) {
    return isRadio(node) && !isTabbableRadio(node);
  };
  var isZeroArea = function isZeroArea2(node) {
    var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
    return width === 0 && height === 0;
  };
  var isHidden = function isHidden2(node, _ref) {
    var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
    if (getComputedStyle(node).visibility === "hidden") {
      return true;
    }
    var isDirectSummary = matches.call(node, "details>summary:first-of-type");
    var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
    if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
      return true;
    }
    var nodeRootHost = getRootNode(node).host;
    var nodeIsAttached = (nodeRootHost === null || nodeRootHost === void 0 ? void 0 : nodeRootHost.ownerDocument.contains(nodeRootHost)) || node.ownerDocument.contains(node);
    if (!displayCheck || displayCheck === "full") {
      if (typeof getShadowRoot === "function") {
        var originalNode = node;
        while (node) {
          var parentElement = node.parentElement;
          var rootNode = getRootNode(node);
          if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
            return isZeroArea(node);
          } else if (node.assignedSlot) {
            node = node.assignedSlot;
          } else if (!parentElement && rootNode !== node.ownerDocument) {
            node = rootNode.host;
          } else {
            node = parentElement;
          }
        }
        node = originalNode;
      }
      if (nodeIsAttached) {
        return !node.getClientRects().length;
      }
    } else if (displayCheck === "non-zero-area") {
      return isZeroArea(node);
    }
    return false;
  };
  var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
    if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
      var parentNode = node.parentElement;
      while (parentNode) {
        if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
          for (var i = 0; i < parentNode.children.length; i++) {
            var child = parentNode.children.item(i);
            if (child.tagName === "LEGEND") {
              return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
            }
          }
          return true;
        }
        parentNode = parentNode.parentElement;
      }
    }
    return false;
  };
  var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
    if (node.disabled || isHiddenInput(node) || isHidden(node, options) || isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
      return false;
    }
    return true;
  };
  var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
    if (isNonTabbableRadio(node) || getTabindex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
      return false;
    }
    return true;
  };
  var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
    var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
    if (isNaN(tabIndex) || tabIndex >= 0) {
      return true;
    }
    return false;
  };
  var sortByOrder = function sortByOrder2(candidates) {
    var regularTabbables = [];
    var orderedTabbables = [];
    candidates.forEach(function(item, i) {
      var isScope = !!item.scope;
      var element2 = isScope ? item.scope : item;
      var candidateTabindex = getTabindex(element2, isScope);
      var elements = isScope ? sortByOrder2(item.candidates) : element2;
      if (candidateTabindex === 0) {
        isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element2);
      } else {
        orderedTabbables.push({
          documentOrder: i,
          tabIndex: candidateTabindex,
          item,
          isScope,
          content: elements
        });
      }
    });
    return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
      sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
      return acc;
    }, []).concat(regularTabbables);
  };
  var tabbable = function tabbable2(el, options) {
    options = options || {};
    var candidates;
    if (options.getShadowRoot) {
      candidates = getCandidatesIteratively([el], options.includeContainer, {
        filter: isNodeMatchingSelectorTabbable.bind(null, options),
        flatten: false,
        getShadowRoot: options.getShadowRoot,
        shadowRootFilter: isValidShadowRootTabbable
      });
    } else {
      candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
    }
    return sortByOrder(candidates);
  };
  var focusable = function focusable2(el, options) {
    options = options || {};
    var candidates;
    if (options.getShadowRoot) {
      candidates = getCandidatesIteratively([el], options.includeContainer, {
        filter: isNodeMatchingSelectorFocusable.bind(null, options),
        flatten: true,
        getShadowRoot: options.getShadowRoot
      });
    } else {
      candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
    }
    return candidates;
  };
  var isTabbable = function isTabbable2(node, options) {
    options = options || {};
    if (!node) {
      throw new Error("No node provided");
    }
    if (matches.call(node, candidateSelector) === false) {
      return false;
    }
    return isNodeMatchingSelectorTabbable(options, node);
  };
  var focusableCandidateSelector = /* @__PURE__ */ candidateSelectors.concat("iframe").join(",");
  var isFocusable = function isFocusable2(node, options) {
    options = options || {};
    if (!node) {
      throw new Error("No node provided");
    }
    if (matches.call(node, focusableCandidateSelector) === false) {
      return false;
    }
    return isNodeMatchingSelectorFocusable(options, node);
  };

  // node_modules/focus-trap/dist/focus-trap.esm.js
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var activeFocusTraps = function() {
    var trapQueue = [];
    return {
      activateTrap: function activateTrap(trap3) {
        if (trapQueue.length > 0) {
          var activeTrap = trapQueue[trapQueue.length - 1];
          if (activeTrap !== trap3) {
            activeTrap.pause();
          }
        }
        var trapIndex = trapQueue.indexOf(trap3);
        if (trapIndex === -1) {
          trapQueue.push(trap3);
        } else {
          trapQueue.splice(trapIndex, 1);
          trapQueue.push(trap3);
        }
      },
      deactivateTrap: function deactivateTrap(trap3) {
        var trapIndex = trapQueue.indexOf(trap3);
        if (trapIndex !== -1) {
          trapQueue.splice(trapIndex, 1);
        }
        if (trapQueue.length > 0) {
          trapQueue[trapQueue.length - 1].unpause();
        }
      }
    };
  }();
  var isSelectableInput = function isSelectableInput2(node) {
    return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
  };
  var isEscapeEvent = function isEscapeEvent2(e) {
    return e.key === "Escape" || e.key === "Esc" || e.keyCode === 27;
  };
  var isTabEvent = function isTabEvent2(e) {
    return e.key === "Tab" || e.keyCode === 9;
  };
  var delay = function delay2(fn2) {
    return setTimeout(fn2, 0);
  };
  var findIndex = function findIndex2(arr, fn2) {
    var idx = -1;
    arr.every(function(value, i) {
      if (fn2(value)) {
        idx = i;
        return false;
      }
      return true;
    });
    return idx;
  };
  var valueOrHandler = function valueOrHandler2(value) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    return typeof value === "function" ? value.apply(void 0, params) : value;
  };
  var getActualTarget = function getActualTarget2(event) {
    return event.target.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
  };
  var createFocusTrap = function createFocusTrap2(elements, userOptions) {
    var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
    var config = _objectSpread2({
      returnFocusOnDeactivate: true,
      escapeDeactivates: true,
      delayInitialFocus: true
    }, userOptions);
    var state = {
      containers: [],
      containerGroups: [],
      tabbableGroups: [],
      nodeFocusedBeforeActivation: null,
      mostRecentlyFocusedNode: null,
      active: false,
      paused: false,
      delayInitialFocusTimer: void 0
    };
    var trap3;
    var getOption = function getOption2(configOverrideOptions, optionName, configOptionName) {
      return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName];
    };
    var findContainerIndex = function findContainerIndex2(element2) {
      return state.containerGroups.findIndex(function(_ref) {
        var container = _ref.container, tabbableNodes = _ref.tabbableNodes;
        return container.contains(element2) || tabbableNodes.find(function(node) {
          return node === element2;
        });
      });
    };
    var getNodeForOption = function getNodeForOption2(optionName) {
      var optionValue = config[optionName];
      if (typeof optionValue === "function") {
        for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          params[_key2 - 1] = arguments[_key2];
        }
        optionValue = optionValue.apply(void 0, params);
      }
      if (optionValue === true) {
        optionValue = void 0;
      }
      if (!optionValue) {
        if (optionValue === void 0 || optionValue === false) {
          return optionValue;
        }
        throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
      }
      var node = optionValue;
      if (typeof optionValue === "string") {
        node = doc.querySelector(optionValue);
        if (!node) {
          throw new Error("`".concat(optionName, "` as selector refers to no known node"));
        }
      }
      return node;
    };
    var getInitialFocusNode = function getInitialFocusNode2() {
      var node = getNodeForOption("initialFocus");
      if (node === false) {
        return false;
      }
      if (node === void 0) {
        if (findContainerIndex(doc.activeElement) >= 0) {
          node = doc.activeElement;
        } else {
          var firstTabbableGroup = state.tabbableGroups[0];
          var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
          node = firstTabbableNode || getNodeForOption("fallbackFocus");
        }
      }
      if (!node) {
        throw new Error("Your focus-trap needs to have at least one focusable element");
      }
      return node;
    };
    var updateTabbableNodes = function updateTabbableNodes2() {
      state.containerGroups = state.containers.map(function(container) {
        var tabbableNodes = tabbable(container, config.tabbableOptions);
        var focusableNodes = focusable(container, config.tabbableOptions);
        return {
          container,
          tabbableNodes,
          focusableNodes,
          firstTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[0] : null,
          lastTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : null,
          nextTabbableNode: function nextTabbableNode(node) {
            var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
            var nodeIdx = focusableNodes.findIndex(function(n) {
              return n === node;
            });
            if (nodeIdx < 0) {
              return void 0;
            }
            if (forward) {
              return focusableNodes.slice(nodeIdx + 1).find(function(n) {
                return isTabbable(n, config.tabbableOptions);
              });
            }
            return focusableNodes.slice(0, nodeIdx).reverse().find(function(n) {
              return isTabbable(n, config.tabbableOptions);
            });
          }
        };
      });
      state.tabbableGroups = state.containerGroups.filter(function(group) {
        return group.tabbableNodes.length > 0;
      });
      if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) {
        throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
      }
    };
    var tryFocus = function tryFocus2(node) {
      if (node === false) {
        return;
      }
      if (node === doc.activeElement) {
        return;
      }
      if (!node || !node.focus) {
        tryFocus2(getInitialFocusNode());
        return;
      }
      node.focus({
        preventScroll: !!config.preventScroll
      });
      state.mostRecentlyFocusedNode = node;
      if (isSelectableInput(node)) {
        node.select();
      }
    };
    var getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
      var node = getNodeForOption("setReturnFocus", previousActiveElement);
      return node ? node : node === false ? false : previousActiveElement;
    };
    var checkPointerDown = function checkPointerDown2(e) {
      var target = getActualTarget(e);
      if (findContainerIndex(target) >= 0) {
        return;
      }
      if (valueOrHandler(config.clickOutsideDeactivates, e)) {
        trap3.deactivate({
          returnFocus: config.returnFocusOnDeactivate && !isFocusable(target, config.tabbableOptions)
        });
        return;
      }
      if (valueOrHandler(config.allowOutsideClick, e)) {
        return;
      }
      e.preventDefault();
    };
    var checkFocusIn = function checkFocusIn2(e) {
      var target = getActualTarget(e);
      var targetContained = findContainerIndex(target) >= 0;
      if (targetContained || target instanceof Document) {
        if (targetContained) {
          state.mostRecentlyFocusedNode = target;
        }
      } else {
        e.stopImmediatePropagation();
        tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
      }
    };
    var checkTab = function checkTab2(e) {
      var target = getActualTarget(e);
      updateTabbableNodes();
      var destinationNode = null;
      if (state.tabbableGroups.length > 0) {
        var containerIndex = findContainerIndex(target);
        var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
        if (containerIndex < 0) {
          if (e.shiftKey) {
            destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
          } else {
            destinationNode = state.tabbableGroups[0].firstTabbableNode;
          }
        } else if (e.shiftKey) {
          var startOfGroupIndex = findIndex(state.tabbableGroups, function(_ref2) {
            var firstTabbableNode = _ref2.firstTabbableNode;
            return target === firstTabbableNode;
          });
          if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
            startOfGroupIndex = containerIndex;
          }
          if (startOfGroupIndex >= 0) {
            var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
            var destinationGroup = state.tabbableGroups[destinationGroupIndex];
            destinationNode = destinationGroup.lastTabbableNode;
          }
        } else {
          var lastOfGroupIndex = findIndex(state.tabbableGroups, function(_ref3) {
            var lastTabbableNode = _ref3.lastTabbableNode;
            return target === lastTabbableNode;
          });
          if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
            lastOfGroupIndex = containerIndex;
          }
          if (lastOfGroupIndex >= 0) {
            var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
            var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
            destinationNode = _destinationGroup.firstTabbableNode;
          }
        }
      } else {
        destinationNode = getNodeForOption("fallbackFocus");
      }
      if (destinationNode) {
        e.preventDefault();
        tryFocus(destinationNode);
      }
    };
    var checkKey = function checkKey2(e) {
      if (isEscapeEvent(e) && valueOrHandler(config.escapeDeactivates, e) !== false) {
        e.preventDefault();
        trap3.deactivate();
        return;
      }
      if (isTabEvent(e)) {
        checkTab(e);
        return;
      }
    };
    var checkClick = function checkClick2(e) {
      var target = getActualTarget(e);
      if (findContainerIndex(target) >= 0) {
        return;
      }
      if (valueOrHandler(config.clickOutsideDeactivates, e)) {
        return;
      }
      if (valueOrHandler(config.allowOutsideClick, e)) {
        return;
      }
      e.preventDefault();
      e.stopImmediatePropagation();
    };
    var addListeners = function addListeners2() {
      if (!state.active) {
        return;
      }
      activeFocusTraps.activateTrap(trap3);
      state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function() {
        tryFocus(getInitialFocusNode());
      }) : tryFocus(getInitialFocusNode());
      doc.addEventListener("focusin", checkFocusIn, true);
      doc.addEventListener("mousedown", checkPointerDown, {
        capture: true,
        passive: false
      });
      doc.addEventListener("touchstart", checkPointerDown, {
        capture: true,
        passive: false
      });
      doc.addEventListener("click", checkClick, {
        capture: true,
        passive: false
      });
      doc.addEventListener("keydown", checkKey, {
        capture: true,
        passive: false
      });
      return trap3;
    };
    var removeListeners = function removeListeners2() {
      if (!state.active) {
        return;
      }
      doc.removeEventListener("focusin", checkFocusIn, true);
      doc.removeEventListener("mousedown", checkPointerDown, true);
      doc.removeEventListener("touchstart", checkPointerDown, true);
      doc.removeEventListener("click", checkClick, true);
      doc.removeEventListener("keydown", checkKey, true);
      return trap3;
    };
    trap3 = {
      get active() {
        return state.active;
      },
      get paused() {
        return state.paused;
      },
      activate: function activate(activateOptions) {
        if (state.active) {
          return this;
        }
        var onActivate = getOption(activateOptions, "onActivate");
        var onPostActivate = getOption(activateOptions, "onPostActivate");
        var checkCanFocusTrap = getOption(activateOptions, "checkCanFocusTrap");
        if (!checkCanFocusTrap) {
          updateTabbableNodes();
        }
        state.active = true;
        state.paused = false;
        state.nodeFocusedBeforeActivation = doc.activeElement;
        if (onActivate) {
          onActivate();
        }
        var finishActivation = function finishActivation2() {
          if (checkCanFocusTrap) {
            updateTabbableNodes();
          }
          addListeners();
          if (onPostActivate) {
            onPostActivate();
          }
        };
        if (checkCanFocusTrap) {
          checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
          return this;
        }
        finishActivation();
        return this;
      },
      deactivate: function deactivate(deactivateOptions) {
        if (!state.active) {
          return this;
        }
        var options = _objectSpread2({
          onDeactivate: config.onDeactivate,
          onPostDeactivate: config.onPostDeactivate,
          checkCanReturnFocus: config.checkCanReturnFocus
        }, deactivateOptions);
        clearTimeout(state.delayInitialFocusTimer);
        state.delayInitialFocusTimer = void 0;
        removeListeners();
        state.active = false;
        state.paused = false;
        activeFocusTraps.deactivateTrap(trap3);
        var onDeactivate = getOption(options, "onDeactivate");
        var onPostDeactivate = getOption(options, "onPostDeactivate");
        var checkCanReturnFocus = getOption(options, "checkCanReturnFocus");
        var returnFocus = getOption(options, "returnFocus", "returnFocusOnDeactivate");
        if (onDeactivate) {
          onDeactivate();
        }
        var finishDeactivation = function finishDeactivation2() {
          delay(function() {
            if (returnFocus) {
              tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
            }
            if (onPostDeactivate) {
              onPostDeactivate();
            }
          });
        };
        if (returnFocus && checkCanReturnFocus) {
          checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
          return this;
        }
        finishDeactivation();
        return this;
      },
      pause: function pause() {
        if (state.paused || !state.active) {
          return this;
        }
        state.paused = true;
        removeListeners();
        return this;
      },
      unpause: function unpause() {
        if (!state.paused || !state.active) {
          return this;
        }
        state.paused = false;
        updateTabbableNodes();
        addListeners();
        return this;
      },
      updateContainerElements: function updateContainerElements(containerElements) {
        var elementsAsArray = [].concat(containerElements).filter(Boolean);
        state.containers = elementsAsArray.map(function(element2) {
          return typeof element2 === "string" ? doc.querySelector(element2) : element2;
        });
        if (state.active) {
          updateTabbableNodes();
        }
        return this;
      }
    };
    trap3.updateContainerElements(elements);
    return trap3;
  };

  // node_modules/@popperjs/core/lib/enums.js
  var top = "top";
  var bottom = "bottom";
  var right = "right";
  var left = "left";
  var auto = "auto";
  var basePlacements = [top, bottom, right, left];
  var start = "start";
  var end = "end";
  var clippingParents = "clippingParents";
  var viewport = "viewport";
  var popper = "popper";
  var reference = "reference";
  var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
    return acc.concat([placement + "-" + start, placement + "-" + end]);
  }, []);
  var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
  }, []);
  var beforeRead = "beforeRead";
  var read = "read";
  var afterRead = "afterRead";
  var beforeMain = "beforeMain";
  var main = "main";
  var afterMain = "afterMain";
  var beforeWrite = "beforeWrite";
  var write = "write";
  var afterWrite = "afterWrite";
  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

  // node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
  function getNodeName(element2) {
    return element2 ? (element2.nodeName || "").toLowerCase() : null;
  }

  // node_modules/@popperjs/core/lib/dom-utils/getWindow.js
  function getWindow(node) {
    if (node == null) {
      return window;
    }
    if (node.toString() !== "[object Window]") {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }
    return node;
  }

  // node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
  function isElement(node) {
    var OwnElement = getWindow(node).Element;
    return node instanceof OwnElement || node instanceof Element;
  }
  function isHTMLElement(node) {
    var OwnElement = getWindow(node).HTMLElement;
    return node instanceof OwnElement || node instanceof HTMLElement;
  }
  function isShadowRoot(node) {
    if (typeof ShadowRoot === "undefined") {
      return false;
    }
    var OwnElement = getWindow(node).ShadowRoot;
    return node instanceof OwnElement || node instanceof ShadowRoot;
  }

  // node_modules/@popperjs/core/lib/modifiers/applyStyles.js
  function applyStyles(_ref) {
    var state = _ref.state;
    Object.keys(state.elements).forEach(function(name) {
      var style = state.styles[name] || {};
      var attributes = state.attributes[name] || {};
      var element2 = state.elements[name];
      if (!isHTMLElement(element2) || !getNodeName(element2)) {
        return;
      }
      Object.assign(element2.style, style);
      Object.keys(attributes).forEach(function(name2) {
        var value = attributes[name2];
        if (value === false) {
          element2.removeAttribute(name2);
        } else {
          element2.setAttribute(name2, value === true ? "" : value);
        }
      });
    });
  }
  function effect(_ref2) {
    var state = _ref2.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;
    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    }
    return function() {
      Object.keys(state.elements).forEach(function(name) {
        var element2 = state.elements[name];
        var attributes = state.attributes[name] || {};
        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
        var style = styleProperties.reduce(function(style2, property) {
          style2[property] = "";
          return style2;
        }, {});
        if (!isHTMLElement(element2) || !getNodeName(element2)) {
          return;
        }
        Object.assign(element2.style, style);
        Object.keys(attributes).forEach(function(attribute) {
          element2.removeAttribute(attribute);
        });
      });
    };
  }
  var applyStyles_default = {
    name: "applyStyles",
    enabled: true,
    phase: "write",
    fn: applyStyles,
    effect,
    requires: ["computeStyles"]
  };

  // node_modules/@popperjs/core/lib/utils/getBasePlacement.js
  function getBasePlacement(placement) {
    return placement.split("-")[0];
  }

  // node_modules/@popperjs/core/lib/utils/math.js
  var max = Math.max;
  var min = Math.min;
  var round = Math.round;

  // node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
  function getBoundingClientRect(element2, includeScale) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    var rect = element2.getBoundingClientRect();
    var scaleX = 1;
    var scaleY = 1;
    if (isHTMLElement(element2) && includeScale) {
      var offsetHeight = element2.offsetHeight;
      var offsetWidth = element2.offsetWidth;
      if (offsetWidth > 0) {
        scaleX = round(rect.width) / offsetWidth || 1;
      }
      if (offsetHeight > 0) {
        scaleY = round(rect.height) / offsetHeight || 1;
      }
    }
    return {
      width: rect.width / scaleX,
      height: rect.height / scaleY,
      top: rect.top / scaleY,
      right: rect.right / scaleX,
      bottom: rect.bottom / scaleY,
      left: rect.left / scaleX,
      x: rect.left / scaleX,
      y: rect.top / scaleY
    };
  }

  // node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
  function getLayoutRect(element2) {
    var clientRect = getBoundingClientRect(element2);
    var width = element2.offsetWidth;
    var height = element2.offsetHeight;
    if (Math.abs(clientRect.width - width) <= 1) {
      width = clientRect.width;
    }
    if (Math.abs(clientRect.height - height) <= 1) {
      height = clientRect.height;
    }
    return {
      x: element2.offsetLeft,
      y: element2.offsetTop,
      width,
      height
    };
  }

  // node_modules/@popperjs/core/lib/dom-utils/contains.js
  function contains(parent, child) {
    var rootNode = child.getRootNode && child.getRootNode();
    if (parent.contains(child)) {
      return true;
    } else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;
      do {
        if (next && parent.isSameNode(next)) {
          return true;
        }
        next = next.parentNode || next.host;
      } while (next);
    }
    return false;
  }

  // node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
  function getComputedStyle2(element2) {
    return getWindow(element2).getComputedStyle(element2);
  }

  // node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
  function isTableElement(element2) {
    return ["table", "td", "th"].indexOf(getNodeName(element2)) >= 0;
  }

  // node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
  function getDocumentElement(element2) {
    return ((isElement(element2) ? element2.ownerDocument : element2.document) || window.document).documentElement;
  }

  // node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
  function getParentNode(element2) {
    if (getNodeName(element2) === "html") {
      return element2;
    }
    return element2.assignedSlot || element2.parentNode || (isShadowRoot(element2) ? element2.host : null) || getDocumentElement(element2);
  }

  // node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
  function getTrueOffsetParent(element2) {
    if (!isHTMLElement(element2) || getComputedStyle2(element2).position === "fixed") {
      return null;
    }
    return element2.offsetParent;
  }
  function getContainingBlock(element2) {
    var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
    var isIE = navigator.userAgent.indexOf("Trident") !== -1;
    if (isIE && isHTMLElement(element2)) {
      var elementCss = getComputedStyle2(element2);
      if (elementCss.position === "fixed") {
        return null;
      }
    }
    var currentNode = getParentNode(element2);
    if (isShadowRoot(currentNode)) {
      currentNode = currentNode.host;
    }
    while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
      var css = getComputedStyle2(currentNode);
      if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
        return currentNode;
      } else {
        currentNode = currentNode.parentNode;
      }
    }
    return null;
  }
  function getOffsetParent(element2) {
    var window2 = getWindow(element2);
    var offsetParent = getTrueOffsetParent(element2);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
      offsetParent = getTrueOffsetParent(offsetParent);
    }
    if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
      return window2;
    }
    return offsetParent || getContainingBlock(element2) || window2;
  }

  // node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
  function getMainAxisFromPlacement(placement) {
    return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
  }

  // node_modules/@popperjs/core/lib/utils/within.js
  function within(min2, value, max2) {
    return max(min2, min(value, max2));
  }
  function withinMaxClamp(min2, value, max2) {
    var v = within(min2, value, max2);
    return v > max2 ? max2 : v;
  }

  // node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
  function getFreshSideObject() {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
  }

  // node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
  function mergePaddingObject(paddingObject) {
    return Object.assign({}, getFreshSideObject(), paddingObject);
  }

  // node_modules/@popperjs/core/lib/utils/expandToHashMap.js
  function expandToHashMap(value, keys) {
    return keys.reduce(function(hashMap, key) {
      hashMap[key] = value;
      return hashMap;
    }, {});
  }

  // node_modules/@popperjs/core/lib/modifiers/arrow.js
  var toPaddingObject = function toPaddingObject2(padding, state) {
    padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
      placement: state.placement
    })) : padding;
    return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  };
  function arrow(_ref) {
    var _state$modifiersData$;
    var state = _ref.state, name = _ref.name, options = _ref.options;
    var arrowElement = state.elements.arrow;
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var basePlacement = getBasePlacement(state.placement);
    var axis = getMainAxisFromPlacement(basePlacement);
    var isVertical = [left, right].indexOf(basePlacement) >= 0;
    var len = isVertical ? "height" : "width";
    if (!arrowElement || !popperOffsets2) {
      return;
    }
    var paddingObject = toPaddingObject(options.padding, state);
    var arrowRect = getLayoutRect(arrowElement);
    var minProp = axis === "y" ? top : left;
    var maxProp = axis === "y" ? bottom : right;
    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
    var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
    var arrowOffsetParent = getOffsetParent(arrowElement);
    var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    var centerToReference = endDiff / 2 - startDiff / 2;
    var min2 = paddingObject[minProp];
    var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
    var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
    var offset2 = within(min2, center, max2);
    var axisProp = axis;
    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
  }
  function effect2(_ref2) {
    var state = _ref2.state, options = _ref2.options;
    var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
    if (arrowElement == null) {
      return;
    }
    if (typeof arrowElement === "string") {
      arrowElement = state.elements.popper.querySelector(arrowElement);
      if (!arrowElement) {
        return;
      }
    }
    if (true) {
      if (!isHTMLElement(arrowElement)) {
        console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
      }
    }
    if (!contains(state.elements.popper, arrowElement)) {
      if (true) {
        console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
      }
      return;
    }
    state.elements.arrow = arrowElement;
  }
  var arrow_default = {
    name: "arrow",
    enabled: true,
    phase: "main",
    fn: arrow,
    effect: effect2,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
  };

  // node_modules/@popperjs/core/lib/utils/getVariation.js
  function getVariation(placement) {
    return placement.split("-")[1];
  }

  // node_modules/@popperjs/core/lib/modifiers/computeStyles.js
  var unsetSides = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };
  function roundOffsetsByDPR(_ref) {
    var x = _ref.x, y = _ref.y;
    var win = window;
    var dpr = win.devicePixelRatio || 1;
    return {
      x: round(x * dpr) / dpr || 0,
      y: round(y * dpr) / dpr || 0
    };
  }
  function mapToStyles(_ref2) {
    var _Object$assign2;
    var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
    var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
    var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
      x,
      y
    }) : {
      x,
      y
    };
    x = _ref3.x;
    y = _ref3.y;
    var hasX = offsets.hasOwnProperty("x");
    var hasY = offsets.hasOwnProperty("y");
    var sideX = left;
    var sideY = top;
    var win = window;
    if (adaptive) {
      var offsetParent = getOffsetParent(popper2);
      var heightProp = "clientHeight";
      var widthProp = "clientWidth";
      if (offsetParent === getWindow(popper2)) {
        offsetParent = getDocumentElement(popper2);
        if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
          heightProp = "scrollHeight";
          widthProp = "scrollWidth";
        }
      }
      offsetParent = offsetParent;
      if (placement === top || (placement === left || placement === right) && variation === end) {
        sideY = bottom;
        var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
        y -= offsetY - popperRect.height;
        y *= gpuAcceleration ? 1 : -1;
      }
      if (placement === left || (placement === top || placement === bottom) && variation === end) {
        sideX = right;
        var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
        x -= offsetX - popperRect.width;
        x *= gpuAcceleration ? 1 : -1;
      }
    }
    var commonStyles = Object.assign({
      position
    }, adaptive && unsetSides);
    var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
      x,
      y
    }) : {
      x,
      y
    };
    x = _ref4.x;
    y = _ref4.y;
    if (gpuAcceleration) {
      var _Object$assign;
      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
    }
    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
  }
  function computeStyles(_ref5) {
    var state = _ref5.state, options = _ref5.options;
    var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
    if (true) {
      var transitionProperty = getComputedStyle2(state.elements.popper).transitionProperty || "";
      if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
        return transitionProperty.indexOf(property) >= 0;
      })) {
        console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
      }
    }
    var commonStyles = {
      placement: getBasePlacement(state.placement),
      variation: getVariation(state.placement),
      popper: state.elements.popper,
      popperRect: state.rects.popper,
      gpuAcceleration,
      isFixed: state.options.strategy === "fixed"
    };
    if (state.modifiersData.popperOffsets != null) {
      state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.popperOffsets,
        position: state.options.strategy,
        adaptive,
        roundOffsets
      })));
    }
    if (state.modifiersData.arrow != null) {
      state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
        offsets: state.modifiersData.arrow,
        position: "absolute",
        adaptive: false,
        roundOffsets
      })));
    }
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-placement": state.placement
    });
  }
  var computeStyles_default = {
    name: "computeStyles",
    enabled: true,
    phase: "beforeWrite",
    fn: computeStyles,
    data: {}
  };

  // node_modules/@popperjs/core/lib/modifiers/eventListeners.js
  var passive = {
    passive: true
  };
  function effect3(_ref) {
    var state = _ref.state, instance = _ref.instance, options = _ref.options;
    var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
    var window2 = getWindow(state.elements.popper);
    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.addEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.addEventListener("resize", instance.update, passive);
    }
    return function() {
      if (scroll) {
        scrollParents.forEach(function(scrollParent) {
          scrollParent.removeEventListener("scroll", instance.update, passive);
        });
      }
      if (resize) {
        window2.removeEventListener("resize", instance.update, passive);
      }
    };
  }
  var eventListeners_default = {
    name: "eventListeners",
    enabled: true,
    phase: "write",
    fn: function fn() {
    },
    effect: effect3,
    data: {}
  };

  // node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
  var hash = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, function(matched) {
      return hash[matched];
    });
  }

  // node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
  var hash2 = {
    start: "end",
    end: "start"
  };
  function getOppositeVariationPlacement(placement) {
    return placement.replace(/start|end/g, function(matched) {
      return hash2[matched];
    });
  }

  // node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
  function getWindowScroll(node) {
    var win = getWindow(node);
    var scrollLeft = win.pageXOffset;
    var scrollTop = win.pageYOffset;
    return {
      scrollLeft,
      scrollTop
    };
  }

  // node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
  function getWindowScrollBarX(element2) {
    return getBoundingClientRect(getDocumentElement(element2)).left + getWindowScroll(element2).scrollLeft;
  }

  // node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
  function getViewportRect(element2) {
    var win = getWindow(element2);
    var html = getDocumentElement(element2);
    var visualViewport = win.visualViewport;
    var width = html.clientWidth;
    var height = html.clientHeight;
    var x = 0;
    var y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x: x + getWindowScrollBarX(element2),
      y
    };
  }

  // node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
  function getDocumentRect(element2) {
    var _element$ownerDocumen;
    var html = getDocumentElement(element2);
    var winScroll = getWindowScroll(element2);
    var body = (_element$ownerDocumen = element2.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
    var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
    var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
    var x = -winScroll.scrollLeft + getWindowScrollBarX(element2);
    var y = -winScroll.scrollTop;
    if (getComputedStyle2(body || html).direction === "rtl") {
      x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  // node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
  function isScrollParent(element2) {
    var _getComputedStyle = getComputedStyle2(element2), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
    return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
  }

  // node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
  function getScrollParent(node) {
    if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
      return node.ownerDocument.body;
    }
    if (isHTMLElement(node) && isScrollParent(node)) {
      return node;
    }
    return getScrollParent(getParentNode(node));
  }

  // node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
  function listScrollParents(element2, list) {
    var _element$ownerDocumen;
    if (list === void 0) {
      list = [];
    }
    var scrollParent = getScrollParent(element2);
    var isBody = scrollParent === ((_element$ownerDocumen = element2.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
    var win = getWindow(scrollParent);
    var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
    var updatedList = list.concat(target);
    return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
  }

  // node_modules/@popperjs/core/lib/utils/rectToClientRect.js
  function rectToClientRect(rect) {
    return Object.assign({}, rect, {
      left: rect.x,
      top: rect.y,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    });
  }

  // node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
  function getInnerBoundingClientRect(element2) {
    var rect = getBoundingClientRect(element2);
    rect.top = rect.top + element2.clientTop;
    rect.left = rect.left + element2.clientLeft;
    rect.bottom = rect.top + element2.clientHeight;
    rect.right = rect.left + element2.clientWidth;
    rect.width = element2.clientWidth;
    rect.height = element2.clientHeight;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }
  function getClientRectFromMixedType(element2, clippingParent) {
    return clippingParent === viewport ? rectToClientRect(getViewportRect(element2)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element2)));
  }
  function getClippingParents(element2) {
    var clippingParents2 = listScrollParents(getParentNode(element2));
    var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element2).position) >= 0;
    var clipperElement = canEscapeClipping && isHTMLElement(element2) ? getOffsetParent(element2) : element2;
    if (!isElement(clipperElement)) {
      return [];
    }
    return clippingParents2.filter(function(clippingParent) {
      return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
    });
  }
  function getClippingRect(element2, boundary, rootBoundary) {
    var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element2) : [].concat(boundary);
    var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
    var firstClippingParent = clippingParents2[0];
    var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
      var rect = getClientRectFromMixedType(element2, clippingParent);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromMixedType(element2, firstClippingParent));
    clippingRect.width = clippingRect.right - clippingRect.left;
    clippingRect.height = clippingRect.bottom - clippingRect.top;
    clippingRect.x = clippingRect.left;
    clippingRect.y = clippingRect.top;
    return clippingRect;
  }

  // node_modules/@popperjs/core/lib/utils/computeOffsets.js
  function computeOffsets(_ref) {
    var reference2 = _ref.reference, element2 = _ref.element, placement = _ref.placement;
    var basePlacement = placement ? getBasePlacement(placement) : null;
    var variation = placement ? getVariation(placement) : null;
    var commonX = reference2.x + reference2.width / 2 - element2.width / 2;
    var commonY = reference2.y + reference2.height / 2 - element2.height / 2;
    var offsets;
    switch (basePlacement) {
      case top:
        offsets = {
          x: commonX,
          y: reference2.y - element2.height
        };
        break;
      case bottom:
        offsets = {
          x: commonX,
          y: reference2.y + reference2.height
        };
        break;
      case right:
        offsets = {
          x: reference2.x + reference2.width,
          y: commonY
        };
        break;
      case left:
        offsets = {
          x: reference2.x - element2.width,
          y: commonY
        };
        break;
      default:
        offsets = {
          x: reference2.x,
          y: reference2.y
        };
    }
    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
    if (mainAxis != null) {
      var len = mainAxis === "y" ? "height" : "width";
      switch (variation) {
        case start:
          offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element2[len] / 2);
          break;
        case end:
          offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element2[len] / 2);
          break;
        default:
      }
    }
    return offsets;
  }

  // node_modules/@popperjs/core/lib/utils/detectOverflow.js
  function detectOverflow(state, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
    var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
    var altContext = elementContext === popper ? reference : popper;
    var popperRect = state.rects.popper;
    var element2 = state.elements[altBoundary ? altContext : elementContext];
    var clippingClientRect = getClippingRect(isElement(element2) ? element2 : element2.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
    var referenceClientRect = getBoundingClientRect(state.elements.reference);
    var popperOffsets2 = computeOffsets({
      reference: referenceClientRect,
      element: popperRect,
      strategy: "absolute",
      placement
    });
    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
    var overflowOffsets = {
      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
    };
    var offsetData = state.modifiersData.offset;
    if (elementContext === popper && offsetData) {
      var offset2 = offsetData[placement];
      Object.keys(overflowOffsets).forEach(function(key) {
        var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
        overflowOffsets[key] += offset2[axis] * multiply;
      });
    }
    return overflowOffsets;
  }

  // node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
  function computeAutoPlacement(state, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
    var variation = getVariation(placement);
    var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
      return getVariation(placement2) === variation;
    }) : basePlacements;
    var allowedPlacements = placements2.filter(function(placement2) {
      return allowedAutoPlacements.indexOf(placement2) >= 0;
    });
    if (allowedPlacements.length === 0) {
      allowedPlacements = placements2;
      if (true) {
        console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
      }
    }
    var overflows = allowedPlacements.reduce(function(acc, placement2) {
      acc[placement2] = detectOverflow(state, {
        placement: placement2,
        boundary,
        rootBoundary,
        padding
      })[getBasePlacement(placement2)];
      return acc;
    }, {});
    return Object.keys(overflows).sort(function(a, b) {
      return overflows[a] - overflows[b];
    });
  }

  // node_modules/@popperjs/core/lib/modifiers/flip.js
  function getExpandedFallbackPlacements(placement) {
    if (getBasePlacement(placement) === auto) {
      return [];
    }
    var oppositePlacement = getOppositePlacement(placement);
    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
  }
  function flip(_ref) {
    var state = _ref.state, options = _ref.options, name = _ref.name;
    if (state.modifiersData[name]._skip) {
      return;
    }
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
    var preferredPlacement = state.options.placement;
    var basePlacement = getBasePlacement(preferredPlacement);
    var isBasePlacement = basePlacement === preferredPlacement;
    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
    var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
      return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
        placement: placement2,
        boundary,
        rootBoundary,
        padding,
        flipVariations,
        allowedAutoPlacements
      }) : placement2);
    }, []);
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var checksMap = /* @__PURE__ */ new Map();
    var makeFallbackChecks = true;
    var firstFittingPlacement = placements2[0];
    for (var i = 0; i < placements2.length; i++) {
      var placement = placements2[i];
      var _basePlacement = getBasePlacement(placement);
      var isStartVariation = getVariation(placement) === start;
      var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
      var len = isVertical ? "width" : "height";
      var overflow = detectOverflow(state, {
        placement,
        boundary,
        rootBoundary,
        altBoundary,
        padding
      });
      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
      if (referenceRect[len] > popperRect[len]) {
        mainVariationSide = getOppositePlacement(mainVariationSide);
      }
      var altVariationSide = getOppositePlacement(mainVariationSide);
      var checks = [];
      if (checkMainAxis) {
        checks.push(overflow[_basePlacement] <= 0);
      }
      if (checkAltAxis) {
        checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
      }
      if (checks.every(function(check) {
        return check;
      })) {
        firstFittingPlacement = placement;
        makeFallbackChecks = false;
        break;
      }
      checksMap.set(placement, checks);
    }
    if (makeFallbackChecks) {
      var numberOfChecks = flipVariations ? 3 : 1;
      var _loop = function _loop2(_i2) {
        var fittingPlacement = placements2.find(function(placement2) {
          var checks2 = checksMap.get(placement2);
          if (checks2) {
            return checks2.slice(0, _i2).every(function(check) {
              return check;
            });
          }
        });
        if (fittingPlacement) {
          firstFittingPlacement = fittingPlacement;
          return "break";
        }
      };
      for (var _i = numberOfChecks; _i > 0; _i--) {
        var _ret = _loop(_i);
        if (_ret === "break")
          break;
      }
    }
    if (state.placement !== firstFittingPlacement) {
      state.modifiersData[name]._skip = true;
      state.placement = firstFittingPlacement;
      state.reset = true;
    }
  }
  var flip_default = {
    name: "flip",
    enabled: true,
    phase: "main",
    fn: flip,
    requiresIfExists: ["offset"],
    data: {
      _skip: false
    }
  };

  // node_modules/@popperjs/core/lib/modifiers/hide.js
  function getSideOffsets(overflow, rect, preventedOffsets) {
    if (preventedOffsets === void 0) {
      preventedOffsets = {
        x: 0,
        y: 0
      };
    }
    return {
      top: overflow.top - rect.height - preventedOffsets.y,
      right: overflow.right - rect.width + preventedOffsets.x,
      bottom: overflow.bottom - rect.height + preventedOffsets.y,
      left: overflow.left - rect.width - preventedOffsets.x
    };
  }
  function isAnySideFullyClipped(overflow) {
    return [top, right, bottom, left].some(function(side) {
      return overflow[side] >= 0;
    });
  }
  function hide(_ref) {
    var state = _ref.state, name = _ref.name;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var preventedOffsets = state.modifiersData.preventOverflow;
    var referenceOverflow = detectOverflow(state, {
      elementContext: "reference"
    });
    var popperAltOverflow = detectOverflow(state, {
      altBoundary: true
    });
    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
    state.modifiersData[name] = {
      referenceClippingOffsets,
      popperEscapeOffsets,
      isReferenceHidden,
      hasPopperEscaped
    };
    state.attributes.popper = Object.assign({}, state.attributes.popper, {
      "data-popper-reference-hidden": isReferenceHidden,
      "data-popper-escaped": hasPopperEscaped
    });
  }
  var hide_default = {
    name: "hide",
    enabled: true,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: hide
  };

  // node_modules/@popperjs/core/lib/modifiers/offset.js
  function distanceAndSkiddingToXY(placement, rects, offset2) {
    var basePlacement = getBasePlacement(placement);
    var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
    var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
      placement
    })) : offset2, skidding = _ref[0], distance = _ref[1];
    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
    return [left, right].indexOf(basePlacement) >= 0 ? {
      x: distance,
      y: skidding
    } : {
      x: skidding,
      y: distance
    };
  }
  function offset(_ref2) {
    var state = _ref2.state, options = _ref2.options, name = _ref2.name;
    var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
    var data = placements.reduce(function(acc, placement) {
      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
      return acc;
    }, {});
    var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
    if (state.modifiersData.popperOffsets != null) {
      state.modifiersData.popperOffsets.x += x;
      state.modifiersData.popperOffsets.y += y;
    }
    state.modifiersData[name] = data;
  }
  var offset_default = {
    name: "offset",
    enabled: true,
    phase: "main",
    requires: ["popperOffsets"],
    fn: offset
  };

  // node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
  function popperOffsets(_ref) {
    var state = _ref.state, name = _ref.name;
    state.modifiersData[name] = computeOffsets({
      reference: state.rects.reference,
      element: state.rects.popper,
      strategy: "absolute",
      placement: state.placement
    });
  }
  var popperOffsets_default = {
    name: "popperOffsets",
    enabled: true,
    phase: "read",
    fn: popperOffsets,
    data: {}
  };

  // node_modules/@popperjs/core/lib/utils/getAltAxis.js
  function getAltAxis(axis) {
    return axis === "x" ? "y" : "x";
  }

  // node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
  function preventOverflow(_ref) {
    var state = _ref.state, options = _ref.options, name = _ref.name;
    var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
    var overflow = detectOverflow(state, {
      boundary,
      rootBoundary,
      padding,
      altBoundary
    });
    var basePlacement = getBasePlacement(state.placement);
    var variation = getVariation(state.placement);
    var isBasePlacement = !variation;
    var mainAxis = getMainAxisFromPlacement(basePlacement);
    var altAxis = getAltAxis(mainAxis);
    var popperOffsets2 = state.modifiersData.popperOffsets;
    var referenceRect = state.rects.reference;
    var popperRect = state.rects.popper;
    var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
      placement: state.placement
    })) : tetherOffset;
    var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
      mainAxis: tetherOffsetValue,
      altAxis: tetherOffsetValue
    } : Object.assign({
      mainAxis: 0,
      altAxis: 0
    }, tetherOffsetValue);
    var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
    var data = {
      x: 0,
      y: 0
    };
    if (!popperOffsets2) {
      return;
    }
    if (checkMainAxis) {
      var _offsetModifierState$;
      var mainSide = mainAxis === "y" ? top : left;
      var altSide = mainAxis === "y" ? bottom : right;
      var len = mainAxis === "y" ? "height" : "width";
      var offset2 = popperOffsets2[mainAxis];
      var min2 = offset2 + overflow[mainSide];
      var max2 = offset2 - overflow[altSide];
      var additive = tether ? -popperRect[len] / 2 : 0;
      var minLen = variation === start ? referenceRect[len] : popperRect[len];
      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
      var arrowElement = state.elements.arrow;
      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
        width: 0,
        height: 0
      };
      var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
      var arrowPaddingMin = arrowPaddingObject[mainSide];
      var arrowPaddingMax = arrowPaddingObject[altSide];
      var arrowLen = within(0, referenceRect[len], arrowRect[len]);
      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
      var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
      var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
      var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
      var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
      var tetherMax = offset2 + maxOffset - offsetModifierValue;
      var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
      popperOffsets2[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset2;
    }
    if (checkAltAxis) {
      var _offsetModifierState$2;
      var _mainSide = mainAxis === "x" ? top : left;
      var _altSide = mainAxis === "x" ? bottom : right;
      var _offset = popperOffsets2[altAxis];
      var _len = altAxis === "y" ? "height" : "width";
      var _min = _offset + overflow[_mainSide];
      var _max = _offset - overflow[_altSide];
      var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
      var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
      var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
      var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
      var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
      popperOffsets2[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
    state.modifiersData[name] = data;
  }
  var preventOverflow_default = {
    name: "preventOverflow",
    enabled: true,
    phase: "main",
    fn: preventOverflow,
    requiresIfExists: ["offset"]
  };

  // node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
  function getHTMLElementScroll(element2) {
    return {
      scrollLeft: element2.scrollLeft,
      scrollTop: element2.scrollTop
    };
  }

  // node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
  function getNodeScroll(node) {
    if (node === getWindow(node) || !isHTMLElement(node)) {
      return getWindowScroll(node);
    } else {
      return getHTMLElementScroll(node);
    }
  }

  // node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
  function isElementScaled(element2) {
    var rect = element2.getBoundingClientRect();
    var scaleX = round(rect.width) / element2.offsetWidth || 1;
    var scaleY = round(rect.height) / element2.offsetHeight || 1;
    return scaleX !== 1 || scaleY !== 1;
  }
  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    var isOffsetParentAnElement = isHTMLElement(offsetParent);
    var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
    var documentElement = getDocumentElement(offsetParent);
    var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
    var scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    var offsets = {
      x: 0,
      y: 0
    };
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        offsets = getBoundingClientRect(offsetParent, true);
        offsets.x += offsetParent.clientLeft;
        offsets.y += offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  // node_modules/@popperjs/core/lib/utils/orderModifiers.js
  function order(modifiers) {
    var map = /* @__PURE__ */ new Map();
    var visited = /* @__PURE__ */ new Set();
    var result = [];
    modifiers.forEach(function(modifier) {
      map.set(modifier.name, modifier);
    });
    function sort(modifier) {
      visited.add(modifier.name);
      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
      requires.forEach(function(dep) {
        if (!visited.has(dep)) {
          var depModifier = map.get(dep);
          if (depModifier) {
            sort(depModifier);
          }
        }
      });
      result.push(modifier);
    }
    modifiers.forEach(function(modifier) {
      if (!visited.has(modifier.name)) {
        sort(modifier);
      }
    });
    return result;
  }
  function orderModifiers(modifiers) {
    var orderedModifiers = order(modifiers);
    return modifierPhases.reduce(function(acc, phase) {
      return acc.concat(orderedModifiers.filter(function(modifier) {
        return modifier.phase === phase;
      }));
    }, []);
  }

  // node_modules/@popperjs/core/lib/utils/debounce.js
  function debounce(fn2) {
    var pending;
    return function() {
      if (!pending) {
        pending = new Promise(function(resolve) {
          Promise.resolve().then(function() {
            pending = void 0;
            resolve(fn2());
          });
        });
      }
      return pending;
    };
  }

  // node_modules/@popperjs/core/lib/utils/format.js
  function format(str) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return [].concat(args).reduce(function(p, c) {
      return p.replace(/%s/, c);
    }, str);
  }

  // node_modules/@popperjs/core/lib/utils/validateModifiers.js
  var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
  var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
  var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
  function validateModifiers(modifiers) {
    modifiers.forEach(function(modifier) {
      [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self2) {
        return self2.indexOf(value) === index;
      }).forEach(function(key) {
        switch (key) {
          case "name":
            if (typeof modifier.name !== "string") {
              console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
            }
            break;
          case "enabled":
            if (typeof modifier.enabled !== "boolean") {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
            }
            break;
          case "phase":
            if (modifierPhases.indexOf(modifier.phase) < 0) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
            }
            break;
          case "fn":
            if (typeof modifier.fn !== "function") {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
            }
            break;
          case "effect":
            if (modifier.effect != null && typeof modifier.effect !== "function") {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
            }
            break;
          case "requires":
            if (modifier.requires != null && !Array.isArray(modifier.requires)) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
            }
            break;
          case "requiresIfExists":
            if (!Array.isArray(modifier.requiresIfExists)) {
              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
            }
            break;
          case "options":
          case "data":
            break;
          default:
            console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
              return '"' + s + '"';
            }).join(", ") + '; but "' + key + '" was provided.');
        }
        modifier.requires && modifier.requires.forEach(function(requirement) {
          if (modifiers.find(function(mod) {
            return mod.name === requirement;
          }) == null) {
            console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
          }
        });
      });
    });
  }

  // node_modules/@popperjs/core/lib/utils/uniqueBy.js
  function uniqueBy(arr, fn2) {
    var identifiers = /* @__PURE__ */ new Set();
    return arr.filter(function(item) {
      var identifier = fn2(item);
      if (!identifiers.has(identifier)) {
        identifiers.add(identifier);
        return true;
      }
    });
  }

  // node_modules/@popperjs/core/lib/utils/mergeByName.js
  function mergeByName(modifiers) {
    var merged = modifiers.reduce(function(merged2, current) {
      var existing = merged2[current.name];
      merged2[current.name] = existing ? Object.assign({}, existing, current, {
        options: Object.assign({}, existing.options, current.options),
        data: Object.assign({}, existing.data, current.data)
      }) : current;
      return merged2;
    }, {});
    return Object.keys(merged).map(function(key) {
      return merged[key];
    });
  }

  // node_modules/@popperjs/core/lib/createPopper.js
  var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
  var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
  var DEFAULT_OPTIONS = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };
  function areValidElements() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return !args.some(function(element2) {
      return !(element2 && typeof element2.getBoundingClientRect === "function");
    });
  }
  function popperGenerator(generatorOptions) {
    if (generatorOptions === void 0) {
      generatorOptions = {};
    }
    var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
    return function createPopper2(reference2, popper2, options) {
      if (options === void 0) {
        options = defaultOptions;
      }
      var state = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
        modifiersData: {},
        elements: {
          reference: reference2,
          popper: popper2
        },
        attributes: {},
        styles: {}
      };
      var effectCleanupFns = [];
      var isDestroyed = false;
      var instance = {
        state,
        setOptions: function setOptions(setOptionsAction) {
          var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
          cleanupModifierEffects();
          state.options = Object.assign({}, defaultOptions, state.options, options2);
          state.scrollParents = {
            reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
            popper: listScrollParents(popper2)
          };
          var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
          state.orderedModifiers = orderedModifiers.filter(function(m) {
            return m.enabled;
          });
          if (true) {
            var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
              var name = _ref.name;
              return name;
            });
            validateModifiers(modifiers);
            if (getBasePlacement(state.options.placement) === auto) {
              var flipModifier = state.orderedModifiers.find(function(_ref2) {
                var name = _ref2.name;
                return name === "flip";
              });
              if (!flipModifier) {
                console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
              }
            }
            var _getComputedStyle = getComputedStyle2(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
            if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
              return parseFloat(margin);
            })) {
              console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
            }
          }
          runModifierEffects();
          return instance.update();
        },
        forceUpdate: function forceUpdate() {
          if (isDestroyed) {
            return;
          }
          var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
          if (!areValidElements(reference3, popper3)) {
            if (true) {
              console.error(INVALID_ELEMENT_ERROR);
            }
            return;
          }
          state.rects = {
            reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
            popper: getLayoutRect(popper3)
          };
          state.reset = false;
          state.placement = state.options.placement;
          state.orderedModifiers.forEach(function(modifier) {
            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
          });
          var __debug_loops__ = 0;
          for (var index = 0; index < state.orderedModifiers.length; index++) {
            if (true) {
              __debug_loops__ += 1;
              if (__debug_loops__ > 100) {
                console.error(INFINITE_LOOP_ERROR);
                break;
              }
            }
            if (state.reset === true) {
              state.reset = false;
              index = -1;
              continue;
            }
            var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
            if (typeof fn2 === "function") {
              state = fn2({
                state,
                options: _options,
                name,
                instance
              }) || state;
            }
          }
        },
        update: debounce(function() {
          return new Promise(function(resolve) {
            instance.forceUpdate();
            resolve(state);
          });
        }),
        destroy: function destroy() {
          cleanupModifierEffects();
          isDestroyed = true;
        }
      };
      if (!areValidElements(reference2, popper2)) {
        if (true) {
          console.error(INVALID_ELEMENT_ERROR);
        }
        return instance;
      }
      instance.setOptions(options).then(function(state2) {
        if (!isDestroyed && options.onFirstUpdate) {
          options.onFirstUpdate(state2);
        }
      });
      function runModifierEffects() {
        state.orderedModifiers.forEach(function(_ref3) {
          var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect4 = _ref3.effect;
          if (typeof effect4 === "function") {
            var cleanupFn = effect4({
              state,
              name,
              instance,
              options: options2
            });
            var noopFn = function noopFn2() {
            };
            effectCleanupFns.push(cleanupFn || noopFn);
          }
        });
      }
      function cleanupModifierEffects() {
        effectCleanupFns.forEach(function(fn2) {
          return fn2();
        });
        effectCleanupFns = [];
      }
      return instance;
    };
  }

  // node_modules/@popperjs/core/lib/popper.js
  var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
  var createPopper = /* @__PURE__ */ popperGenerator({
    defaultModifiers
  });

  // src/js/components/menu.js
  var trap;
  var element;
  var Menu = {
    init: () => {
      const trigger = document.querySelectorAll("[data-toggle-menu]");
      trigger.forEach((el) => {
        const target = el.getAttribute("data-toggle-menu");
        const menu = document.querySelector(`[data-menu-id="${target}"]`);
        const children = menu.querySelectorAll("*");
        element = el;
        const toggle = () => {
          Menu.toggle(menu);
        };
        el.addEventListener("pointerdown", toggle);
        el.addEventListener("click", (e) => {
          if (e.clientX == 0 || e.clientY == 0) {
            toggle();
          }
        });
        children.forEach((child) => {
          child.addEventListener("click", () => {
            const target2 = element.getAttribute("data-toggle-menu");
            const menu2 = document.querySelector(`[data-menu-id="${target2}"]`);
            Menu.close(menu2);
          });
        });
      });
    },
    toggle: (menu) => {
      if (menu.classList.contains("open")) {
        Menu.close(menu);
      } else {
        Menu.open(menu);
      }
    },
    open: (menu) => {
      trap = createFocusTrap(menu, {
        onActivate: () => {
          menu.classList.add("open");
        },
        onDeactivate: () => {
          menu.classList.remove("open");
        }
      });
      trap.activate();
      createPopper(element, menu);
      menu.removeAttribute("tabindex");
    },
    close: (menu) => {
      menu.classList.remove("open");
      trap.deactivate();
      menu.setAttribute("tabindex", "-1");
    }
  };
  Menu.init();
  var menu_default = Menu;

  // src/js/components/tooltip.js
  var tooltip_id;
  var Tooltip = {
    init: () => {
      const trigger = document.querySelectorAll("[data-tooltip]");
      trigger.forEach((el) => {
        const show = () => Tooltip.show(el);
        const hide2 = () => Tooltip.hide(tooltip_id);
        const mouseshowevents = ["mouseenter", "touchstart"];
        const mousehideevents = ["mouseleave", "touchend"];
        mouseshowevents.forEach((event) => el.addEventListener(event, show));
        mousehideevents.forEach((event) => el.addEventListener(event, hide2));
      });
    },
    show: (el) => {
      const target = el.getAttribute("data-tooltip");
      const tooltip = document.createElement("div");
      tooltip.classList.add("tooltip");
      tooltip_id = "__" + (Math.random() + 1).toString(36).substring(7) + "__" + (Math.random() + 1).toString(36).substring(7);
      tooltip.id = tooltip_id;
      tooltip.innerHTML = target;
      createPopper(el, tooltip);
      setTimeout(() => {
        tooltip.classList.add("show");
      }, 100);
      document.body.appendChild(tooltip);
    },
    hide: (id) => {
      const tooltip = document.getElementById(id);
      tooltip.classList.remove("show");
      setTimeout(() => {
        tooltip.remove();
      }, 300);
    }
  };
  Tooltip.init();
  var tooltip_default = Tooltip;

  // src/js/components/snackbar.js
  var Snackbar = {
    show: (message, button = "Got It", action = "", duration2 = 3e3) => {
      let randomId;
      let _action;
      if (action === "") {
        _action = () => {
        };
      } else {
        _action = action;
      }
      const show_snackbar = () => {
        const snackbar = document.createElement("div");
        snackbar.classList.add("snackbar");
        randomId = "__" + (Math.random() + 1).toString(36).substring(7) + "-" + (Math.random() + 1).toString(36).substring(7);
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
        ripple_default.init();
        setTimeout(() => {
          snackbar.classList.remove("show");
          setTimeout(() => {
            snackbar.remove();
          }, 300);
        }, duration2);
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
      } else {
        show_snackbar();
      }
    }
  };
  var snackbar_default = Snackbar;

  // src/js/components/dialog.js
  var trap2;
  var getScrollbarWidth = () => {
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar";
    outer.style.overflow = "scroll";
    document.body.appendChild(outer);
    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = "scroll";
    const inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);
    const widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
  };
  var ToggleOverflow = (overflow) => {
    if (overflow) {
      document.body.style.setProperty("--scrollbar-width", `${getScrollbarWidth()}px`);
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.style.removeProperty("--scrollbar-width");
      document.body.classList.remove("overflow-hidden");
    }
  };
  var Dialog = {
    toggle: (el) => {
      const dialog = el;
      if (dialog.classList.contains("open")) {
        Dialog.close(el);
      } else {
        Dialog.open(el);
      }
    },
    open: (el) => {
      const dialog = el;
      dialog.classList.add("open");
      dialog.removeAttribute("tabindex");
      ToggleOverflow(true);
      trap2 = createFocusTrap(dialog, {
        onDeactivate: () => {
          Dialog.close(el);
        }
      });
      trap2.activate();
      el.addEventListener("pointerdown", (e) => {
        if (e.target !== e.currentTarget)
          return;
        Dialog.close(el);
      });
    },
    close: (el) => {
      const dialog = el;
      dialog.setAttribute("tabindex", "-1");
      dialog.classList.remove("open");
      document.body.classList.remove("modal-open");
      trap2.deactivate();
      ToggleOverflow(false);
    }
  };
  var dialog_default = Dialog;

  // node_modules/flatpickr/dist/esm/types/options.js
  var HOOKS = [
    "onChange",
    "onClose",
    "onDayCreate",
    "onDestroy",
    "onKeyDown",
    "onMonthChange",
    "onOpen",
    "onParseConfig",
    "onReady",
    "onValueUpdate",
    "onYearChange",
    "onPreCalendarPosition"
  ];
  var defaults = {
    _disable: [],
    allowInput: false,
    allowInvalidPreload: false,
    altFormat: "F j, Y",
    altInput: false,
    altInputClass: "form-control input",
    animate: typeof window === "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
    ariaDateFormat: "F j, Y",
    autoFillDefaultTime: true,
    clickOpens: true,
    closeOnSelect: true,
    conjunction: ", ",
    dateFormat: "Y-m-d",
    defaultHour: 12,
    defaultMinute: 0,
    defaultSeconds: 0,
    disable: [],
    disableMobile: false,
    enableSeconds: false,
    enableTime: false,
    errorHandler: function(err) {
      return typeof console !== "undefined" && console.warn(err);
    },
    getWeek: function(givenDate) {
      var date = new Date(givenDate.getTime());
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      var week1 = new Date(date.getFullYear(), 0, 4);
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 864e5 - 3 + (week1.getDay() + 6) % 7) / 7);
    },
    hourIncrement: 1,
    ignoredFocusElements: [],
    inline: false,
    locale: "default",
    minuteIncrement: 5,
    mode: "single",
    monthSelectorType: "dropdown",
    nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
    noCalendar: false,
    now: new Date(),
    onChange: [],
    onClose: [],
    onDayCreate: [],
    onDestroy: [],
    onKeyDown: [],
    onMonthChange: [],
    onOpen: [],
    onParseConfig: [],
    onReady: [],
    onValueUpdate: [],
    onYearChange: [],
    onPreCalendarPosition: [],
    plugins: [],
    position: "auto",
    positionElement: void 0,
    prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
    shorthandCurrentMonth: false,
    showMonths: 1,
    static: false,
    time_24hr: false,
    weekNumbers: false,
    wrap: false
  };

  // node_modules/flatpickr/dist/esm/l10n/default.js
  var english = {
    weekdays: {
      shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      longhand: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ]
    },
    months: {
      shorthand: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      longhand: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 0,
    ordinal: function(nth) {
      var s = nth % 100;
      if (s > 3 && s < 21)
        return "th";
      switch (s % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    },
    rangeSeparator: " to ",
    weekAbbreviation: "Wk",
    scrollTitle: "Scroll to increment",
    toggleTitle: "Click to toggle",
    amPM: ["AM", "PM"],
    yearAriaLabel: "Year",
    monthAriaLabel: "Month",
    hourAriaLabel: "Hour",
    minuteAriaLabel: "Minute",
    time_24hr: false
  };
  var default_default = english;

  // node_modules/flatpickr/dist/esm/utils/index.js
  var pad = function(number, length) {
    if (length === void 0) {
      length = 2;
    }
    return ("000" + number).slice(length * -1);
  };
  var int = function(bool) {
    return bool === true ? 1 : 0;
  };
  function debounce2(fn2, wait) {
    var t;
    return function() {
      var _this = this;
      var args = arguments;
      clearTimeout(t);
      t = setTimeout(function() {
        return fn2.apply(_this, args);
      }, wait);
    };
  }
  var arrayify = function(obj) {
    return obj instanceof Array ? obj : [obj];
  };

  // node_modules/flatpickr/dist/esm/utils/dom.js
  function toggleClass(elem, className, bool) {
    if (bool === true)
      return elem.classList.add(className);
    elem.classList.remove(className);
  }
  function createElement(tag, className, content) {
    var e = window.document.createElement(tag);
    className = className || "";
    content = content || "";
    e.className = className;
    if (content !== void 0)
      e.textContent = content;
    return e;
  }
  function clearNode(node) {
    while (node.firstChild)
      node.removeChild(node.firstChild);
  }
  function findParent(node, condition) {
    if (condition(node))
      return node;
    else if (node.parentNode)
      return findParent(node.parentNode, condition);
    return void 0;
  }
  function createNumberInput(inputClassName, opts) {
    var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
    if (navigator.userAgent.indexOf("MSIE 9.0") === -1) {
      numInput.type = "number";
    } else {
      numInput.type = "text";
      numInput.pattern = "\\d*";
    }
    if (opts !== void 0)
      for (var key in opts)
        numInput.setAttribute(key, opts[key]);
    wrapper.appendChild(numInput);
    wrapper.appendChild(arrowUp);
    wrapper.appendChild(arrowDown);
    return wrapper;
  }
  function getEventTarget(event) {
    try {
      if (typeof event.composedPath === "function") {
        var path = event.composedPath();
        return path[0];
      }
      return event.target;
    } catch (error) {
      return event.target;
    }
  }

  // node_modules/flatpickr/dist/esm/utils/formatting.js
  var doNothing = function() {
    return void 0;
  };
  var monthToStr = function(monthNumber, shorthand, locale) {
    return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];
  };
  var revFormat = {
    D: doNothing,
    F: function(dateObj, monthName, locale) {
      dateObj.setMonth(locale.months.longhand.indexOf(monthName));
    },
    G: function(dateObj, hour) {
      dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
    },
    H: function(dateObj, hour) {
      dateObj.setHours(parseFloat(hour));
    },
    J: function(dateObj, day) {
      dateObj.setDate(parseFloat(day));
    },
    K: function(dateObj, amPM, locale) {
      dateObj.setHours(dateObj.getHours() % 12 + 12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
    },
    M: function(dateObj, shortMonth, locale) {
      dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
    },
    S: function(dateObj, seconds) {
      dateObj.setSeconds(parseFloat(seconds));
    },
    U: function(_, unixSeconds) {
      return new Date(parseFloat(unixSeconds) * 1e3);
    },
    W: function(dateObj, weekNum, locale) {
      var weekNumber = parseInt(weekNum);
      var date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
      date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
      return date;
    },
    Y: function(dateObj, year) {
      dateObj.setFullYear(parseFloat(year));
    },
    Z: function(_, ISODate) {
      return new Date(ISODate);
    },
    d: function(dateObj, day) {
      dateObj.setDate(parseFloat(day));
    },
    h: function(dateObj, hour) {
      dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
    },
    i: function(dateObj, minutes) {
      dateObj.setMinutes(parseFloat(minutes));
    },
    j: function(dateObj, day) {
      dateObj.setDate(parseFloat(day));
    },
    l: doNothing,
    m: function(dateObj, month) {
      dateObj.setMonth(parseFloat(month) - 1);
    },
    n: function(dateObj, month) {
      dateObj.setMonth(parseFloat(month) - 1);
    },
    s: function(dateObj, seconds) {
      dateObj.setSeconds(parseFloat(seconds));
    },
    u: function(_, unixMillSeconds) {
      return new Date(parseFloat(unixMillSeconds));
    },
    w: doNothing,
    y: function(dateObj, year) {
      dateObj.setFullYear(2e3 + parseFloat(year));
    }
  };
  var tokenRegex = {
    D: "",
    F: "",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "",
    M: "",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    u: "(.+)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})"
  };
  var formats = {
    Z: function(date) {
      return date.toISOString();
    },
    D: function(date, locale, options) {
      return locale.weekdays.shorthand[formats.w(date, locale, options)];
    },
    F: function(date, locale, options) {
      return monthToStr(formats.n(date, locale, options) - 1, false, locale);
    },
    G: function(date, locale, options) {
      return pad(formats.h(date, locale, options));
    },
    H: function(date) {
      return pad(date.getHours());
    },
    J: function(date, locale) {
      return locale.ordinal !== void 0 ? date.getDate() + locale.ordinal(date.getDate()) : date.getDate();
    },
    K: function(date, locale) {
      return locale.amPM[int(date.getHours() > 11)];
    },
    M: function(date, locale) {
      return monthToStr(date.getMonth(), true, locale);
    },
    S: function(date) {
      return pad(date.getSeconds());
    },
    U: function(date) {
      return date.getTime() / 1e3;
    },
    W: function(date, _, options) {
      return options.getWeek(date);
    },
    Y: function(date) {
      return pad(date.getFullYear(), 4);
    },
    d: function(date) {
      return pad(date.getDate());
    },
    h: function(date) {
      return date.getHours() % 12 ? date.getHours() % 12 : 12;
    },
    i: function(date) {
      return pad(date.getMinutes());
    },
    j: function(date) {
      return date.getDate();
    },
    l: function(date, locale) {
      return locale.weekdays.longhand[date.getDay()];
    },
    m: function(date) {
      return pad(date.getMonth() + 1);
    },
    n: function(date) {
      return date.getMonth() + 1;
    },
    s: function(date) {
      return date.getSeconds();
    },
    u: function(date) {
      return date.getTime();
    },
    w: function(date) {
      return date.getDay();
    },
    y: function(date) {
      return String(date.getFullYear()).substring(2);
    }
  };

  // node_modules/flatpickr/dist/esm/utils/dates.js
  var createDateFormatter = function(_a) {
    var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c, _d = _a.isMobile, isMobile = _d === void 0 ? false : _d;
    return function(dateObj, frmt, overrideLocale) {
      var locale = overrideLocale || l10n;
      if (config.formatDate !== void 0 && !isMobile) {
        return config.formatDate(dateObj, frmt, locale);
      }
      return frmt.split("").map(function(c, i, arr) {
        return formats[c] && arr[i - 1] !== "\\" ? formats[c](dateObj, locale, config) : c !== "\\" ? c : "";
      }).join("");
    };
  };
  var createDateParser = function(_a) {
    var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
    return function(date, givenFormat, timeless, customLocale) {
      if (date !== 0 && !date)
        return void 0;
      var locale = customLocale || l10n;
      var parsedDate;
      var dateOrig = date;
      if (date instanceof Date)
        parsedDate = new Date(date.getTime());
      else if (typeof date !== "string" && date.toFixed !== void 0)
        parsedDate = new Date(date);
      else if (typeof date === "string") {
        var format2 = givenFormat || (config || defaults).dateFormat;
        var datestr = String(date).trim();
        if (datestr === "today") {
          parsedDate = new Date();
          timeless = true;
        } else if (config && config.parseDate) {
          parsedDate = config.parseDate(date, format2);
        } else if (/Z$/.test(datestr) || /GMT$/.test(datestr)) {
          parsedDate = new Date(date);
        } else {
          var matched = void 0, ops = [];
          for (var i = 0, matchIndex = 0, regexStr = ""; i < format2.length; i++) {
            var token = format2[i];
            var isBackSlash = token === "\\";
            var escaped = format2[i - 1] === "\\" || isBackSlash;
            if (tokenRegex[token] && !escaped) {
              regexStr += tokenRegex[token];
              var match = new RegExp(regexStr).exec(date);
              if (match && (matched = true)) {
                ops[token !== "Y" ? "push" : "unshift"]({
                  fn: revFormat[token],
                  val: match[++matchIndex]
                });
              }
            } else if (!isBackSlash)
              regexStr += ".";
          }
          parsedDate = !config || !config.noCalendar ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0) : new Date(new Date().setHours(0, 0, 0, 0));
          ops.forEach(function(_a2) {
            var fn2 = _a2.fn, val = _a2.val;
            return parsedDate = fn2(parsedDate, val, locale) || parsedDate;
          });
          parsedDate = matched ? parsedDate : void 0;
        }
      }
      if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
        config.errorHandler(new Error("Invalid date provided: " + dateOrig));
        return void 0;
      }
      if (timeless === true)
        parsedDate.setHours(0, 0, 0, 0);
      return parsedDate;
    };
  };
  function compareDates(date1, date2, timeless) {
    if (timeless === void 0) {
      timeless = true;
    }
    if (timeless !== false) {
      return new Date(date1.getTime()).setHours(0, 0, 0, 0) - new Date(date2.getTime()).setHours(0, 0, 0, 0);
    }
    return date1.getTime() - date2.getTime();
  }
  var isBetween = function(ts, ts1, ts2) {
    return ts > Math.min(ts1, ts2) && ts < Math.max(ts1, ts2);
  };
  var calculateSecondsSinceMidnight = function(hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds;
  };
  var parseSeconds = function(secondsSinceMidnight) {
    var hours = Math.floor(secondsSinceMidnight / 3600), minutes = (secondsSinceMidnight - hours * 3600) / 60;
    return [hours, minutes, secondsSinceMidnight - hours * 3600 - minutes * 60];
  };
  var duration = {
    DAY: 864e5
  };
  function getDefaultHours(config) {
    var hours = config.defaultHour;
    var minutes = config.defaultMinute;
    var seconds = config.defaultSeconds;
    if (config.minDate !== void 0) {
      var minHour = config.minDate.getHours();
      var minMinutes = config.minDate.getMinutes();
      var minSeconds = config.minDate.getSeconds();
      if (hours < minHour) {
        hours = minHour;
      }
      if (hours === minHour && minutes < minMinutes) {
        minutes = minMinutes;
      }
      if (hours === minHour && minutes === minMinutes && seconds < minSeconds)
        seconds = config.minDate.getSeconds();
    }
    if (config.maxDate !== void 0) {
      var maxHr = config.maxDate.getHours();
      var maxMinutes = config.maxDate.getMinutes();
      hours = Math.min(hours, maxHr);
      if (hours === maxHr)
        minutes = Math.min(maxMinutes, minutes);
      if (hours === maxHr && minutes === maxMinutes)
        seconds = config.maxDate.getSeconds();
    }
    return { hours, minutes, seconds };
  }

  // node_modules/flatpickr/dist/esm/utils/polyfills.js
  if (typeof Object.assign !== "function") {
    Object.assign = function(target) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      if (!target) {
        throw TypeError("Cannot convert undefined or null to object");
      }
      var _loop_1 = function(source2) {
        if (source2) {
          Object.keys(source2).forEach(function(key) {
            return target[key] = source2[key];
          });
        }
      };
      for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var source = args_1[_a];
        _loop_1(source);
      }
      return target;
    };
  }

  // node_modules/flatpickr/dist/esm/index.js
  var __assign = function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var __spreadArrays = function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
  var DEBOUNCED_CHANGE_MS = 300;
  function FlatpickrInstance(element2, instanceConfig) {
    var self2 = {
      config: __assign(__assign({}, defaults), flatpickr.defaultConfig),
      l10n: default_default
    };
    self2.parseDate = createDateParser({ config: self2.config, l10n: self2.l10n });
    self2._handlers = [];
    self2.pluginElements = [];
    self2.loadedPlugins = [];
    self2._bind = bind;
    self2._setHoursFromDate = setHoursFromDate;
    self2._positionCalendar = positionCalendar;
    self2.changeMonth = changeMonth;
    self2.changeYear = changeYear;
    self2.clear = clear;
    self2.close = close;
    self2.onMouseOver = onMouseOver;
    self2._createElement = createElement;
    self2.createDay = createDay;
    self2.destroy = destroy;
    self2.isEnabled = isEnabled;
    self2.jumpToDate = jumpToDate;
    self2.updateValue = updateValue;
    self2.open = open;
    self2.redraw = redraw;
    self2.set = set;
    self2.setDate = setDate;
    self2.toggle = toggle;
    function setupHelperFunctions() {
      self2.utils = {
        getDaysInMonth: function(month, yr) {
          if (month === void 0) {
            month = self2.currentMonth;
          }
          if (yr === void 0) {
            yr = self2.currentYear;
          }
          if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0))
            return 29;
          return self2.l10n.daysInMonth[month];
        }
      };
    }
    function init() {
      self2.element = self2.input = element2;
      self2.isOpen = false;
      parseConfig();
      setupLocale();
      setupInputs();
      setupDates();
      setupHelperFunctions();
      if (!self2.isMobile)
        build();
      bindEvents();
      if (self2.selectedDates.length || self2.config.noCalendar) {
        if (self2.config.enableTime) {
          setHoursFromDate(self2.config.noCalendar ? self2.latestSelectedDateObj : void 0);
        }
        updateValue(false);
      }
      setCalendarWidth();
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (!self2.isMobile && isSafari) {
        positionCalendar();
      }
      triggerEvent("onReady");
    }
    function getClosestActiveElement() {
      var _a;
      return ((_a = self2.calendarContainer) === null || _a === void 0 ? void 0 : _a.getRootNode()).activeElement || document.activeElement;
    }
    function bindToInstance(fn2) {
      return fn2.bind(self2);
    }
    function setCalendarWidth() {
      var config = self2.config;
      if (config.weekNumbers === false && config.showMonths === 1) {
        return;
      } else if (config.noCalendar !== true) {
        window.requestAnimationFrame(function() {
          if (self2.calendarContainer !== void 0) {
            self2.calendarContainer.style.visibility = "hidden";
            self2.calendarContainer.style.display = "block";
          }
          if (self2.daysContainer !== void 0) {
            var daysWidth = (self2.days.offsetWidth + 1) * config.showMonths;
            self2.daysContainer.style.width = daysWidth + "px";
            self2.calendarContainer.style.width = daysWidth + (self2.weekWrapper !== void 0 ? self2.weekWrapper.offsetWidth : 0) + "px";
            self2.calendarContainer.style.removeProperty("visibility");
            self2.calendarContainer.style.removeProperty("display");
          }
        });
      }
    }
    function updateTime(e) {
      if (self2.selectedDates.length === 0) {
        var defaultDate = self2.config.minDate === void 0 || compareDates(new Date(), self2.config.minDate) >= 0 ? new Date() : new Date(self2.config.minDate.getTime());
        var defaults2 = getDefaultHours(self2.config);
        defaultDate.setHours(defaults2.hours, defaults2.minutes, defaults2.seconds, defaultDate.getMilliseconds());
        self2.selectedDates = [defaultDate];
        self2.latestSelectedDateObj = defaultDate;
      }
      if (e !== void 0 && e.type !== "blur") {
        timeWrapper(e);
      }
      var prevValue = self2._input.value;
      setHoursFromInputs();
      updateValue();
      if (self2._input.value !== prevValue) {
        self2._debouncedChange();
      }
    }
    function ampm2military(hour, amPM) {
      return hour % 12 + 12 * int(amPM === self2.l10n.amPM[1]);
    }
    function military2ampm(hour) {
      switch (hour % 24) {
        case 0:
        case 12:
          return 12;
        default:
          return hour % 12;
      }
    }
    function setHoursFromInputs() {
      if (self2.hourElement === void 0 || self2.minuteElement === void 0)
        return;
      var hours = (parseInt(self2.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self2.minuteElement.value, 10) || 0) % 60, seconds = self2.secondElement !== void 0 ? (parseInt(self2.secondElement.value, 10) || 0) % 60 : 0;
      if (self2.amPM !== void 0) {
        hours = ampm2military(hours, self2.amPM.textContent);
      }
      var limitMinHours = self2.config.minTime !== void 0 || self2.config.minDate && self2.minDateHasTime && self2.latestSelectedDateObj && compareDates(self2.latestSelectedDateObj, self2.config.minDate, true) === 0;
      var limitMaxHours = self2.config.maxTime !== void 0 || self2.config.maxDate && self2.maxDateHasTime && self2.latestSelectedDateObj && compareDates(self2.latestSelectedDateObj, self2.config.maxDate, true) === 0;
      if (self2.config.maxTime !== void 0 && self2.config.minTime !== void 0 && self2.config.minTime > self2.config.maxTime) {
        var minBound = calculateSecondsSinceMidnight(self2.config.minTime.getHours(), self2.config.minTime.getMinutes(), self2.config.minTime.getSeconds());
        var maxBound = calculateSecondsSinceMidnight(self2.config.maxTime.getHours(), self2.config.maxTime.getMinutes(), self2.config.maxTime.getSeconds());
        var currentTime = calculateSecondsSinceMidnight(hours, minutes, seconds);
        if (currentTime > maxBound && currentTime < minBound) {
          var result = parseSeconds(minBound);
          hours = result[0];
          minutes = result[1];
          seconds = result[2];
        }
      } else {
        if (limitMaxHours) {
          var maxTime = self2.config.maxTime !== void 0 ? self2.config.maxTime : self2.config.maxDate;
          hours = Math.min(hours, maxTime.getHours());
          if (hours === maxTime.getHours())
            minutes = Math.min(minutes, maxTime.getMinutes());
          if (minutes === maxTime.getMinutes())
            seconds = Math.min(seconds, maxTime.getSeconds());
        }
        if (limitMinHours) {
          var minTime = self2.config.minTime !== void 0 ? self2.config.minTime : self2.config.minDate;
          hours = Math.max(hours, minTime.getHours());
          if (hours === minTime.getHours() && minutes < minTime.getMinutes())
            minutes = minTime.getMinutes();
          if (minutes === minTime.getMinutes())
            seconds = Math.max(seconds, minTime.getSeconds());
        }
      }
      setHours(hours, minutes, seconds);
    }
    function setHoursFromDate(dateObj) {
      var date = dateObj || self2.latestSelectedDateObj;
      if (date && date instanceof Date) {
        setHours(date.getHours(), date.getMinutes(), date.getSeconds());
      }
    }
    function setHours(hours, minutes, seconds) {
      if (self2.latestSelectedDateObj !== void 0) {
        self2.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
      }
      if (!self2.hourElement || !self2.minuteElement || self2.isMobile)
        return;
      self2.hourElement.value = pad(!self2.config.time_24hr ? (12 + hours) % 12 + 12 * int(hours % 12 === 0) : hours);
      self2.minuteElement.value = pad(minutes);
      if (self2.amPM !== void 0)
        self2.amPM.textContent = self2.l10n.amPM[int(hours >= 12)];
      if (self2.secondElement !== void 0)
        self2.secondElement.value = pad(seconds);
    }
    function onYearInput(event) {
      var eventTarget = getEventTarget(event);
      var year = parseInt(eventTarget.value) + (event.delta || 0);
      if (year / 1e3 > 1 || event.key === "Enter" && !/[^\d]/.test(year.toString())) {
        changeYear(year);
      }
    }
    function bind(element3, event, handler, options) {
      if (event instanceof Array)
        return event.forEach(function(ev) {
          return bind(element3, ev, handler, options);
        });
      if (element3 instanceof Array)
        return element3.forEach(function(el) {
          return bind(el, event, handler, options);
        });
      element3.addEventListener(event, handler, options);
      self2._handlers.push({
        remove: function() {
          return element3.removeEventListener(event, handler, options);
        }
      });
    }
    function triggerChange() {
      triggerEvent("onChange");
    }
    function bindEvents() {
      if (self2.config.wrap) {
        ["open", "close", "toggle", "clear"].forEach(function(evt) {
          Array.prototype.forEach.call(self2.element.querySelectorAll("[data-" + evt + "]"), function(el) {
            return bind(el, "click", self2[evt]);
          });
        });
      }
      if (self2.isMobile) {
        setupMobile();
        return;
      }
      var debouncedResize = debounce2(onResize, 50);
      self2._debouncedChange = debounce2(triggerChange, DEBOUNCED_CHANGE_MS);
      if (self2.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
        bind(self2.daysContainer, "mouseover", function(e) {
          if (self2.config.mode === "range")
            onMouseOver(getEventTarget(e));
        });
      bind(self2._input, "keydown", onKeyDown);
      if (self2.calendarContainer !== void 0) {
        bind(self2.calendarContainer, "keydown", onKeyDown);
      }
      if (!self2.config.inline && !self2.config.static)
        bind(window, "resize", debouncedResize);
      if (window.ontouchstart !== void 0)
        bind(window.document, "touchstart", documentClick);
      else
        bind(window.document, "mousedown", documentClick);
      bind(window.document, "focus", documentClick, { capture: true });
      if (self2.config.clickOpens === true) {
        bind(self2._input, "focus", self2.open);
        bind(self2._input, "click", self2.open);
      }
      if (self2.daysContainer !== void 0) {
        bind(self2.monthNav, "click", onMonthNavClick);
        bind(self2.monthNav, ["keyup", "increment"], onYearInput);
        bind(self2.daysContainer, "click", selectDate);
      }
      if (self2.timeContainer !== void 0 && self2.minuteElement !== void 0 && self2.hourElement !== void 0) {
        var selText = function(e) {
          return getEventTarget(e).select();
        };
        bind(self2.timeContainer, ["increment"], updateTime);
        bind(self2.timeContainer, "blur", updateTime, { capture: true });
        bind(self2.timeContainer, "click", timeIncrement);
        bind([self2.hourElement, self2.minuteElement], ["focus", "click"], selText);
        if (self2.secondElement !== void 0)
          bind(self2.secondElement, "focus", function() {
            return self2.secondElement && self2.secondElement.select();
          });
        if (self2.amPM !== void 0) {
          bind(self2.amPM, "click", function(e) {
            updateTime(e);
          });
        }
      }
      if (self2.config.allowInput) {
        bind(self2._input, "blur", onBlur);
      }
    }
    function jumpToDate(jumpDate, triggerChange2) {
      var jumpTo = jumpDate !== void 0 ? self2.parseDate(jumpDate) : self2.latestSelectedDateObj || (self2.config.minDate && self2.config.minDate > self2.now ? self2.config.minDate : self2.config.maxDate && self2.config.maxDate < self2.now ? self2.config.maxDate : self2.now);
      var oldYear = self2.currentYear;
      var oldMonth = self2.currentMonth;
      try {
        if (jumpTo !== void 0) {
          self2.currentYear = jumpTo.getFullYear();
          self2.currentMonth = jumpTo.getMonth();
        }
      } catch (e) {
        e.message = "Invalid date supplied: " + jumpTo;
        self2.config.errorHandler(e);
      }
      if (triggerChange2 && self2.currentYear !== oldYear) {
        triggerEvent("onYearChange");
        buildMonthSwitch();
      }
      if (triggerChange2 && (self2.currentYear !== oldYear || self2.currentMonth !== oldMonth)) {
        triggerEvent("onMonthChange");
      }
      self2.redraw();
    }
    function timeIncrement(e) {
      var eventTarget = getEventTarget(e);
      if (~eventTarget.className.indexOf("arrow"))
        incrementNumInput(e, eventTarget.classList.contains("arrowUp") ? 1 : -1);
    }
    function incrementNumInput(e, delta, inputElem) {
      var target = e && getEventTarget(e);
      var input = inputElem || target && target.parentNode && target.parentNode.firstChild;
      var event = createEvent("increment");
      event.delta = delta;
      input && input.dispatchEvent(event);
    }
    function build() {
      var fragment = window.document.createDocumentFragment();
      self2.calendarContainer = createElement("div", "flatpickr-calendar");
      self2.calendarContainer.tabIndex = -1;
      if (!self2.config.noCalendar) {
        fragment.appendChild(buildMonthNav());
        self2.innerContainer = createElement("div", "flatpickr-innerContainer");
        if (self2.config.weekNumbers) {
          var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
          self2.innerContainer.appendChild(weekWrapper);
          self2.weekNumbers = weekNumbers;
          self2.weekWrapper = weekWrapper;
        }
        self2.rContainer = createElement("div", "flatpickr-rContainer");
        self2.rContainer.appendChild(buildWeekdays());
        if (!self2.daysContainer) {
          self2.daysContainer = createElement("div", "flatpickr-days");
          self2.daysContainer.tabIndex = -1;
        }
        buildDays();
        self2.rContainer.appendChild(self2.daysContainer);
        self2.innerContainer.appendChild(self2.rContainer);
        fragment.appendChild(self2.innerContainer);
      }
      if (self2.config.enableTime) {
        fragment.appendChild(buildTime());
      }
      toggleClass(self2.calendarContainer, "rangeMode", self2.config.mode === "range");
      toggleClass(self2.calendarContainer, "animate", self2.config.animate === true);
      toggleClass(self2.calendarContainer, "multiMonth", self2.config.showMonths > 1);
      self2.calendarContainer.appendChild(fragment);
      var customAppend = self2.config.appendTo !== void 0 && self2.config.appendTo.nodeType !== void 0;
      if (self2.config.inline || self2.config.static) {
        self2.calendarContainer.classList.add(self2.config.inline ? "inline" : "static");
        if (self2.config.inline) {
          if (!customAppend && self2.element.parentNode)
            self2.element.parentNode.insertBefore(self2.calendarContainer, self2._input.nextSibling);
          else if (self2.config.appendTo !== void 0)
            self2.config.appendTo.appendChild(self2.calendarContainer);
        }
        if (self2.config.static) {
          var wrapper = createElement("div", "flatpickr-wrapper");
          if (self2.element.parentNode)
            self2.element.parentNode.insertBefore(wrapper, self2.element);
          wrapper.appendChild(self2.element);
          if (self2.altInput)
            wrapper.appendChild(self2.altInput);
          wrapper.appendChild(self2.calendarContainer);
        }
      }
      if (!self2.config.static && !self2.config.inline)
        (self2.config.appendTo !== void 0 ? self2.config.appendTo : window.document.body).appendChild(self2.calendarContainer);
    }
    function createDay(className, date, _dayNumber, i) {
      var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", className, date.getDate().toString());
      dayElement.dateObj = date;
      dayElement.$i = i;
      dayElement.setAttribute("aria-label", self2.formatDate(date, self2.config.ariaDateFormat));
      if (className.indexOf("hidden") === -1 && compareDates(date, self2.now) === 0) {
        self2.todayDateElem = dayElement;
        dayElement.classList.add("today");
        dayElement.setAttribute("aria-current", "date");
      }
      if (dateIsEnabled) {
        dayElement.tabIndex = -1;
        if (isDateSelected(date)) {
          dayElement.classList.add("selected");
          self2.selectedDateElem = dayElement;
          if (self2.config.mode === "range") {
            toggleClass(dayElement, "startRange", self2.selectedDates[0] && compareDates(date, self2.selectedDates[0], true) === 0);
            toggleClass(dayElement, "endRange", self2.selectedDates[1] && compareDates(date, self2.selectedDates[1], true) === 0);
            if (className === "nextMonthDay")
              dayElement.classList.add("inRange");
          }
        }
      } else {
        dayElement.classList.add("flatpickr-disabled");
      }
      if (self2.config.mode === "range") {
        if (isDateInRange(date) && !isDateSelected(date))
          dayElement.classList.add("inRange");
      }
      if (self2.weekNumbers && self2.config.showMonths === 1 && className !== "prevMonthDay" && i % 7 === 6) {
        self2.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self2.config.getWeek(date) + "</span>");
      }
      triggerEvent("onDayCreate", dayElement);
      return dayElement;
    }
    function focusOnDayElem(targetNode) {
      targetNode.focus();
      if (self2.config.mode === "range")
        onMouseOver(targetNode);
    }
    function getFirstAvailableDay(delta) {
      var startMonth = delta > 0 ? 0 : self2.config.showMonths - 1;
      var endMonth = delta > 0 ? self2.config.showMonths : -1;
      for (var m = startMonth; m != endMonth; m += delta) {
        var month = self2.daysContainer.children[m];
        var startIndex = delta > 0 ? 0 : month.children.length - 1;
        var endIndex = delta > 0 ? month.children.length : -1;
        for (var i = startIndex; i != endIndex; i += delta) {
          var c = month.children[i];
          if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj))
            return c;
        }
      }
      return void 0;
    }
    function getNextAvailableDay(current, delta) {
      var givenMonth = current.className.indexOf("Month") === -1 ? current.dateObj.getMonth() : self2.currentMonth;
      var endMonth = delta > 0 ? self2.config.showMonths : -1;
      var loopDelta = delta > 0 ? 1 : -1;
      for (var m = givenMonth - self2.currentMonth; m != endMonth; m += loopDelta) {
        var month = self2.daysContainer.children[m];
        var startIndex = givenMonth - self2.currentMonth === m ? current.$i + delta : delta < 0 ? month.children.length - 1 : 0;
        var numMonthDays = month.children.length;
        for (var i = startIndex; i >= 0 && i < numMonthDays && i != (delta > 0 ? numMonthDays : -1); i += loopDelta) {
          var c = month.children[i];
          if (c.className.indexOf("hidden") === -1 && isEnabled(c.dateObj) && Math.abs(current.$i - i) >= Math.abs(delta))
            return focusOnDayElem(c);
        }
      }
      self2.changeMonth(loopDelta);
      focusOnDay(getFirstAvailableDay(loopDelta), 0);
      return void 0;
    }
    function focusOnDay(current, offset2) {
      var activeElement = getClosestActiveElement();
      var dayFocused = isInView(activeElement || document.body);
      var startElem = current !== void 0 ? current : dayFocused ? activeElement : self2.selectedDateElem !== void 0 && isInView(self2.selectedDateElem) ? self2.selectedDateElem : self2.todayDateElem !== void 0 && isInView(self2.todayDateElem) ? self2.todayDateElem : getFirstAvailableDay(offset2 > 0 ? 1 : -1);
      if (startElem === void 0) {
        self2._input.focus();
      } else if (!dayFocused) {
        focusOnDayElem(startElem);
      } else {
        getNextAvailableDay(startElem, offset2);
      }
    }
    function buildMonthDays(year, month) {
      var firstOfMonth = (new Date(year, month, 1).getDay() - self2.l10n.firstDayOfWeek + 7) % 7;
      var prevMonthDays = self2.utils.getDaysInMonth((month - 1 + 12) % 12, year);
      var daysInMonth = self2.utils.getDaysInMonth(month, year), days = window.document.createDocumentFragment(), isMultiMonth = self2.config.showMonths > 1, prevMonthDayClass = isMultiMonth ? "prevMonthDay hidden" : "prevMonthDay", nextMonthDayClass = isMultiMonth ? "nextMonthDay hidden" : "nextMonthDay";
      var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
      for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
        days.appendChild(createDay("flatpickr-day " + prevMonthDayClass, new Date(year, month - 1, dayNumber), dayNumber, dayIndex));
      }
      for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
        days.appendChild(createDay("flatpickr-day", new Date(year, month, dayNumber), dayNumber, dayIndex));
      }
      for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth && (self2.config.showMonths === 1 || dayIndex % 7 !== 0); dayNum++, dayIndex++) {
        days.appendChild(createDay("flatpickr-day " + nextMonthDayClass, new Date(year, month + 1, dayNum % daysInMonth), dayNum, dayIndex));
      }
      var dayContainer = createElement("div", "dayContainer");
      dayContainer.appendChild(days);
      return dayContainer;
    }
    function buildDays() {
      if (self2.daysContainer === void 0) {
        return;
      }
      clearNode(self2.daysContainer);
      if (self2.weekNumbers)
        clearNode(self2.weekNumbers);
      var frag = document.createDocumentFragment();
      for (var i = 0; i < self2.config.showMonths; i++) {
        var d = new Date(self2.currentYear, self2.currentMonth, 1);
        d.setMonth(self2.currentMonth + i);
        frag.appendChild(buildMonthDays(d.getFullYear(), d.getMonth()));
      }
      self2.daysContainer.appendChild(frag);
      self2.days = self2.daysContainer.firstChild;
      if (self2.config.mode === "range" && self2.selectedDates.length === 1) {
        onMouseOver();
      }
    }
    function buildMonthSwitch() {
      if (self2.config.showMonths > 1 || self2.config.monthSelectorType !== "dropdown")
        return;
      var shouldBuildMonth = function(month2) {
        if (self2.config.minDate !== void 0 && self2.currentYear === self2.config.minDate.getFullYear() && month2 < self2.config.minDate.getMonth()) {
          return false;
        }
        return !(self2.config.maxDate !== void 0 && self2.currentYear === self2.config.maxDate.getFullYear() && month2 > self2.config.maxDate.getMonth());
      };
      self2.monthsDropdownContainer.tabIndex = -1;
      self2.monthsDropdownContainer.innerHTML = "";
      for (var i = 0; i < 12; i++) {
        if (!shouldBuildMonth(i))
          continue;
        var month = createElement("option", "flatpickr-monthDropdown-month");
        month.value = new Date(self2.currentYear, i).getMonth().toString();
        month.textContent = monthToStr(i, self2.config.shorthandCurrentMonth, self2.l10n);
        month.tabIndex = -1;
        if (self2.currentMonth === i) {
          month.selected = true;
        }
        self2.monthsDropdownContainer.appendChild(month);
      }
    }
    function buildMonth() {
      var container = createElement("div", "flatpickr-month");
      var monthNavFragment = window.document.createDocumentFragment();
      var monthElement;
      if (self2.config.showMonths > 1 || self2.config.monthSelectorType === "static") {
        monthElement = createElement("span", "cur-month");
      } else {
        self2.monthsDropdownContainer = createElement("select", "flatpickr-monthDropdown-months");
        self2.monthsDropdownContainer.setAttribute("aria-label", self2.l10n.monthAriaLabel);
        bind(self2.monthsDropdownContainer, "change", function(e) {
          var target = getEventTarget(e);
          var selectedMonth = parseInt(target.value, 10);
          self2.changeMonth(selectedMonth - self2.currentMonth);
          triggerEvent("onMonthChange");
        });
        buildMonthSwitch();
        monthElement = self2.monthsDropdownContainer;
      }
      var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
      var yearElement = yearInput.getElementsByTagName("input")[0];
      yearElement.setAttribute("aria-label", self2.l10n.yearAriaLabel);
      if (self2.config.minDate) {
        yearElement.setAttribute("min", self2.config.minDate.getFullYear().toString());
      }
      if (self2.config.maxDate) {
        yearElement.setAttribute("max", self2.config.maxDate.getFullYear().toString());
        yearElement.disabled = !!self2.config.minDate && self2.config.minDate.getFullYear() === self2.config.maxDate.getFullYear();
      }
      var currentMonth = createElement("div", "flatpickr-current-month");
      currentMonth.appendChild(monthElement);
      currentMonth.appendChild(yearInput);
      monthNavFragment.appendChild(currentMonth);
      container.appendChild(monthNavFragment);
      return {
        container,
        yearElement,
        monthElement
      };
    }
    function buildMonths() {
      clearNode(self2.monthNav);
      self2.monthNav.appendChild(self2.prevMonthNav);
      if (self2.config.showMonths) {
        self2.yearElements = [];
        self2.monthElements = [];
      }
      for (var m = self2.config.showMonths; m--; ) {
        var month = buildMonth();
        self2.yearElements.push(month.yearElement);
        self2.monthElements.push(month.monthElement);
        self2.monthNav.appendChild(month.container);
      }
      self2.monthNav.appendChild(self2.nextMonthNav);
    }
    function buildMonthNav() {
      self2.monthNav = createElement("div", "flatpickr-months");
      self2.yearElements = [];
      self2.monthElements = [];
      self2.prevMonthNav = createElement("span", "flatpickr-prev-month");
      self2.prevMonthNav.innerHTML = self2.config.prevArrow;
      self2.nextMonthNav = createElement("span", "flatpickr-next-month");
      self2.nextMonthNav.innerHTML = self2.config.nextArrow;
      buildMonths();
      Object.defineProperty(self2, "_hidePrevMonthArrow", {
        get: function() {
          return self2.__hidePrevMonthArrow;
        },
        set: function(bool) {
          if (self2.__hidePrevMonthArrow !== bool) {
            toggleClass(self2.prevMonthNav, "flatpickr-disabled", bool);
            self2.__hidePrevMonthArrow = bool;
          }
        }
      });
      Object.defineProperty(self2, "_hideNextMonthArrow", {
        get: function() {
          return self2.__hideNextMonthArrow;
        },
        set: function(bool) {
          if (self2.__hideNextMonthArrow !== bool) {
            toggleClass(self2.nextMonthNav, "flatpickr-disabled", bool);
            self2.__hideNextMonthArrow = bool;
          }
        }
      });
      self2.currentYearElement = self2.yearElements[0];
      updateNavigationCurrentMonth();
      return self2.monthNav;
    }
    function buildTime() {
      self2.calendarContainer.classList.add("hasTime");
      if (self2.config.noCalendar)
        self2.calendarContainer.classList.add("noCalendar");
      var defaults2 = getDefaultHours(self2.config);
      self2.timeContainer = createElement("div", "flatpickr-time");
      self2.timeContainer.tabIndex = -1;
      var separator = createElement("span", "flatpickr-time-separator", ":");
      var hourInput = createNumberInput("flatpickr-hour", {
        "aria-label": self2.l10n.hourAriaLabel
      });
      self2.hourElement = hourInput.getElementsByTagName("input")[0];
      var minuteInput = createNumberInput("flatpickr-minute", {
        "aria-label": self2.l10n.minuteAriaLabel
      });
      self2.minuteElement = minuteInput.getElementsByTagName("input")[0];
      self2.hourElement.tabIndex = self2.minuteElement.tabIndex = -1;
      self2.hourElement.value = pad(self2.latestSelectedDateObj ? self2.latestSelectedDateObj.getHours() : self2.config.time_24hr ? defaults2.hours : military2ampm(defaults2.hours));
      self2.minuteElement.value = pad(self2.latestSelectedDateObj ? self2.latestSelectedDateObj.getMinutes() : defaults2.minutes);
      self2.hourElement.setAttribute("step", self2.config.hourIncrement.toString());
      self2.minuteElement.setAttribute("step", self2.config.minuteIncrement.toString());
      self2.hourElement.setAttribute("min", self2.config.time_24hr ? "0" : "1");
      self2.hourElement.setAttribute("max", self2.config.time_24hr ? "23" : "12");
      self2.hourElement.setAttribute("maxlength", "2");
      self2.minuteElement.setAttribute("min", "0");
      self2.minuteElement.setAttribute("max", "59");
      self2.minuteElement.setAttribute("maxlength", "2");
      self2.timeContainer.appendChild(hourInput);
      self2.timeContainer.appendChild(separator);
      self2.timeContainer.appendChild(minuteInput);
      if (self2.config.time_24hr)
        self2.timeContainer.classList.add("time24hr");
      if (self2.config.enableSeconds) {
        self2.timeContainer.classList.add("hasSeconds");
        var secondInput = createNumberInput("flatpickr-second");
        self2.secondElement = secondInput.getElementsByTagName("input")[0];
        self2.secondElement.value = pad(self2.latestSelectedDateObj ? self2.latestSelectedDateObj.getSeconds() : defaults2.seconds);
        self2.secondElement.setAttribute("step", self2.minuteElement.getAttribute("step"));
        self2.secondElement.setAttribute("min", "0");
        self2.secondElement.setAttribute("max", "59");
        self2.secondElement.setAttribute("maxlength", "2");
        self2.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
        self2.timeContainer.appendChild(secondInput);
      }
      if (!self2.config.time_24hr) {
        self2.amPM = createElement("span", "flatpickr-am-pm", self2.l10n.amPM[int((self2.latestSelectedDateObj ? self2.hourElement.value : self2.config.defaultHour) > 11)]);
        self2.amPM.title = self2.l10n.toggleTitle;
        self2.amPM.tabIndex = -1;
        self2.timeContainer.appendChild(self2.amPM);
      }
      return self2.timeContainer;
    }
    function buildWeekdays() {
      if (!self2.weekdayContainer)
        self2.weekdayContainer = createElement("div", "flatpickr-weekdays");
      else
        clearNode(self2.weekdayContainer);
      for (var i = self2.config.showMonths; i--; ) {
        var container = createElement("div", "flatpickr-weekdaycontainer");
        self2.weekdayContainer.appendChild(container);
      }
      updateWeekdays();
      return self2.weekdayContainer;
    }
    function updateWeekdays() {
      if (!self2.weekdayContainer) {
        return;
      }
      var firstDayOfWeek = self2.l10n.firstDayOfWeek;
      var weekdays = __spreadArrays(self2.l10n.weekdays.shorthand);
      if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
        weekdays = __spreadArrays(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
      }
      for (var i = self2.config.showMonths; i--; ) {
        self2.weekdayContainer.children[i].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + weekdays.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
      }
    }
    function buildWeeks() {
      self2.calendarContainer.classList.add("hasWeeks");
      var weekWrapper = createElement("div", "flatpickr-weekwrapper");
      weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self2.l10n.weekAbbreviation));
      var weekNumbers = createElement("div", "flatpickr-weeks");
      weekWrapper.appendChild(weekNumbers);
      return {
        weekWrapper,
        weekNumbers
      };
    }
    function changeMonth(value, isOffset) {
      if (isOffset === void 0) {
        isOffset = true;
      }
      var delta = isOffset ? value : value - self2.currentMonth;
      if (delta < 0 && self2._hidePrevMonthArrow === true || delta > 0 && self2._hideNextMonthArrow === true)
        return;
      self2.currentMonth += delta;
      if (self2.currentMonth < 0 || self2.currentMonth > 11) {
        self2.currentYear += self2.currentMonth > 11 ? 1 : -1;
        self2.currentMonth = (self2.currentMonth + 12) % 12;
        triggerEvent("onYearChange");
        buildMonthSwitch();
      }
      buildDays();
      triggerEvent("onMonthChange");
      updateNavigationCurrentMonth();
    }
    function clear(triggerChangeEvent, toInitial) {
      if (triggerChangeEvent === void 0) {
        triggerChangeEvent = true;
      }
      if (toInitial === void 0) {
        toInitial = true;
      }
      self2.input.value = "";
      if (self2.altInput !== void 0)
        self2.altInput.value = "";
      if (self2.mobileInput !== void 0)
        self2.mobileInput.value = "";
      self2.selectedDates = [];
      self2.latestSelectedDateObj = void 0;
      if (toInitial === true) {
        self2.currentYear = self2._initialDate.getFullYear();
        self2.currentMonth = self2._initialDate.getMonth();
      }
      if (self2.config.enableTime === true) {
        var _a = getDefaultHours(self2.config), hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
        setHours(hours, minutes, seconds);
      }
      self2.redraw();
      if (triggerChangeEvent)
        triggerEvent("onChange");
    }
    function close() {
      self2.isOpen = false;
      if (!self2.isMobile) {
        if (self2.calendarContainer !== void 0) {
          self2.calendarContainer.classList.remove("open");
        }
        if (self2._input !== void 0) {
          self2._input.classList.remove("active");
        }
      }
      triggerEvent("onClose");
    }
    function destroy() {
      if (self2.config !== void 0)
        triggerEvent("onDestroy");
      for (var i = self2._handlers.length; i--; ) {
        self2._handlers[i].remove();
      }
      self2._handlers = [];
      if (self2.mobileInput) {
        if (self2.mobileInput.parentNode)
          self2.mobileInput.parentNode.removeChild(self2.mobileInput);
        self2.mobileInput = void 0;
      } else if (self2.calendarContainer && self2.calendarContainer.parentNode) {
        if (self2.config.static && self2.calendarContainer.parentNode) {
          var wrapper = self2.calendarContainer.parentNode;
          wrapper.lastChild && wrapper.removeChild(wrapper.lastChild);
          if (wrapper.parentNode) {
            while (wrapper.firstChild)
              wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
            wrapper.parentNode.removeChild(wrapper);
          }
        } else
          self2.calendarContainer.parentNode.removeChild(self2.calendarContainer);
      }
      if (self2.altInput) {
        self2.input.type = "text";
        if (self2.altInput.parentNode)
          self2.altInput.parentNode.removeChild(self2.altInput);
        delete self2.altInput;
      }
      if (self2.input) {
        self2.input.type = self2.input._type;
        self2.input.classList.remove("flatpickr-input");
        self2.input.removeAttribute("readonly");
      }
      [
        "_showTimeInput",
        "latestSelectedDateObj",
        "_hideNextMonthArrow",
        "_hidePrevMonthArrow",
        "__hideNextMonthArrow",
        "__hidePrevMonthArrow",
        "isMobile",
        "isOpen",
        "selectedDateElem",
        "minDateHasTime",
        "maxDateHasTime",
        "days",
        "daysContainer",
        "_input",
        "_positionElement",
        "innerContainer",
        "rContainer",
        "monthNav",
        "todayDateElem",
        "calendarContainer",
        "weekdayContainer",
        "prevMonthNav",
        "nextMonthNav",
        "monthsDropdownContainer",
        "currentMonthElement",
        "currentYearElement",
        "navigationCurrentMonth",
        "selectedDateElem",
        "config"
      ].forEach(function(k) {
        try {
          delete self2[k];
        } catch (_) {
        }
      });
    }
    function isCalendarElem(elem) {
      return self2.calendarContainer.contains(elem);
    }
    function documentClick(e) {
      if (self2.isOpen && !self2.config.inline) {
        var eventTarget_1 = getEventTarget(e);
        var isCalendarElement = isCalendarElem(eventTarget_1);
        var isInput3 = eventTarget_1 === self2.input || eventTarget_1 === self2.altInput || self2.element.contains(eventTarget_1) || e.path && e.path.indexOf && (~e.path.indexOf(self2.input) || ~e.path.indexOf(self2.altInput));
        var lostFocus = !isInput3 && !isCalendarElement && !isCalendarElem(e.relatedTarget);
        var isIgnored = !self2.config.ignoredFocusElements.some(function(elem) {
          return elem.contains(eventTarget_1);
        });
        if (lostFocus && isIgnored) {
          if (self2.config.allowInput) {
            self2.setDate(self2._input.value, false, self2.config.altInput ? self2.config.altFormat : self2.config.dateFormat);
          }
          if (self2.timeContainer !== void 0 && self2.minuteElement !== void 0 && self2.hourElement !== void 0 && self2.input.value !== "" && self2.input.value !== void 0) {
            updateTime();
          }
          self2.close();
          if (self2.config && self2.config.mode === "range" && self2.selectedDates.length === 1)
            self2.clear(false);
        }
      }
    }
    function changeYear(newYear) {
      if (!newYear || self2.config.minDate && newYear < self2.config.minDate.getFullYear() || self2.config.maxDate && newYear > self2.config.maxDate.getFullYear())
        return;
      var newYearNum = newYear, isNewYear = self2.currentYear !== newYearNum;
      self2.currentYear = newYearNum || self2.currentYear;
      if (self2.config.maxDate && self2.currentYear === self2.config.maxDate.getFullYear()) {
        self2.currentMonth = Math.min(self2.config.maxDate.getMonth(), self2.currentMonth);
      } else if (self2.config.minDate && self2.currentYear === self2.config.minDate.getFullYear()) {
        self2.currentMonth = Math.max(self2.config.minDate.getMonth(), self2.currentMonth);
      }
      if (isNewYear) {
        self2.redraw();
        triggerEvent("onYearChange");
        buildMonthSwitch();
      }
    }
    function isEnabled(date, timeless) {
      var _a;
      if (timeless === void 0) {
        timeless = true;
      }
      var dateToCheck = self2.parseDate(date, void 0, timeless);
      if (self2.config.minDate && dateToCheck && compareDates(dateToCheck, self2.config.minDate, timeless !== void 0 ? timeless : !self2.minDateHasTime) < 0 || self2.config.maxDate && dateToCheck && compareDates(dateToCheck, self2.config.maxDate, timeless !== void 0 ? timeless : !self2.maxDateHasTime) > 0)
        return false;
      if (!self2.config.enable && self2.config.disable.length === 0)
        return true;
      if (dateToCheck === void 0)
        return false;
      var bool = !!self2.config.enable, array = (_a = self2.config.enable) !== null && _a !== void 0 ? _a : self2.config.disable;
      for (var i = 0, d = void 0; i < array.length; i++) {
        d = array[i];
        if (typeof d === "function" && d(dateToCheck))
          return bool;
        else if (d instanceof Date && dateToCheck !== void 0 && d.getTime() === dateToCheck.getTime())
          return bool;
        else if (typeof d === "string") {
          var parsed = self2.parseDate(d, void 0, true);
          return parsed && parsed.getTime() === dateToCheck.getTime() ? bool : !bool;
        } else if (typeof d === "object" && dateToCheck !== void 0 && d.from && d.to && dateToCheck.getTime() >= d.from.getTime() && dateToCheck.getTime() <= d.to.getTime())
          return bool;
      }
      return !bool;
    }
    function isInView(elem) {
      if (self2.daysContainer !== void 0)
        return elem.className.indexOf("hidden") === -1 && elem.className.indexOf("flatpickr-disabled") === -1 && self2.daysContainer.contains(elem);
      return false;
    }
    function onBlur(e) {
      var isInput3 = e.target === self2._input;
      var valueChanged = self2._input.value.trimEnd() !== getDateStr();
      if (isInput3 && valueChanged && !(e.relatedTarget && isCalendarElem(e.relatedTarget))) {
        self2.setDate(self2._input.value, true, e.target === self2.altInput ? self2.config.altFormat : self2.config.dateFormat);
      }
    }
    function onKeyDown(e) {
      var eventTarget = getEventTarget(e);
      var isInput3 = self2.config.wrap ? element2.contains(eventTarget) : eventTarget === self2._input;
      var allowInput = self2.config.allowInput;
      var allowKeydown = self2.isOpen && (!allowInput || !isInput3);
      var allowInlineKeydown = self2.config.inline && isInput3 && !allowInput;
      if (e.keyCode === 13 && isInput3) {
        if (allowInput) {
          self2.setDate(self2._input.value, true, eventTarget === self2.altInput ? self2.config.altFormat : self2.config.dateFormat);
          self2.close();
          return eventTarget.blur();
        } else {
          self2.open();
        }
      } else if (isCalendarElem(eventTarget) || allowKeydown || allowInlineKeydown) {
        var isTimeObj = !!self2.timeContainer && self2.timeContainer.contains(eventTarget);
        switch (e.keyCode) {
          case 13:
            if (isTimeObj) {
              e.preventDefault();
              updateTime();
              focusAndClose();
            } else
              selectDate(e);
            break;
          case 27:
            e.preventDefault();
            focusAndClose();
            break;
          case 8:
          case 46:
            if (isInput3 && !self2.config.allowInput) {
              e.preventDefault();
              self2.clear();
            }
            break;
          case 37:
          case 39:
            if (!isTimeObj && !isInput3) {
              e.preventDefault();
              var activeElement = getClosestActiveElement();
              if (self2.daysContainer !== void 0 && (allowInput === false || activeElement && isInView(activeElement))) {
                var delta_1 = e.keyCode === 39 ? 1 : -1;
                if (!e.ctrlKey)
                  focusOnDay(void 0, delta_1);
                else {
                  e.stopPropagation();
                  changeMonth(delta_1);
                  focusOnDay(getFirstAvailableDay(1), 0);
                }
              }
            } else if (self2.hourElement)
              self2.hourElement.focus();
            break;
          case 38:
          case 40:
            e.preventDefault();
            var delta = e.keyCode === 40 ? 1 : -1;
            if (self2.daysContainer && eventTarget.$i !== void 0 || eventTarget === self2.input || eventTarget === self2.altInput) {
              if (e.ctrlKey) {
                e.stopPropagation();
                changeYear(self2.currentYear - delta);
                focusOnDay(getFirstAvailableDay(1), 0);
              } else if (!isTimeObj)
                focusOnDay(void 0, delta * 7);
            } else if (eventTarget === self2.currentYearElement) {
              changeYear(self2.currentYear - delta);
            } else if (self2.config.enableTime) {
              if (!isTimeObj && self2.hourElement)
                self2.hourElement.focus();
              updateTime(e);
              self2._debouncedChange();
            }
            break;
          case 9:
            if (isTimeObj) {
              var elems = [
                self2.hourElement,
                self2.minuteElement,
                self2.secondElement,
                self2.amPM
              ].concat(self2.pluginElements).filter(function(x) {
                return x;
              });
              var i = elems.indexOf(eventTarget);
              if (i !== -1) {
                var target = elems[i + (e.shiftKey ? -1 : 1)];
                e.preventDefault();
                (target || self2._input).focus();
              }
            } else if (!self2.config.noCalendar && self2.daysContainer && self2.daysContainer.contains(eventTarget) && e.shiftKey) {
              e.preventDefault();
              self2._input.focus();
            }
            break;
          default:
            break;
        }
      }
      if (self2.amPM !== void 0 && eventTarget === self2.amPM) {
        switch (e.key) {
          case self2.l10n.amPM[0].charAt(0):
          case self2.l10n.amPM[0].charAt(0).toLowerCase():
            self2.amPM.textContent = self2.l10n.amPM[0];
            setHoursFromInputs();
            updateValue();
            break;
          case self2.l10n.amPM[1].charAt(0):
          case self2.l10n.amPM[1].charAt(0).toLowerCase():
            self2.amPM.textContent = self2.l10n.amPM[1];
            setHoursFromInputs();
            updateValue();
            break;
        }
      }
      if (isInput3 || isCalendarElem(eventTarget)) {
        triggerEvent("onKeyDown", e);
      }
    }
    function onMouseOver(elem, cellClass) {
      if (cellClass === void 0) {
        cellClass = "flatpickr-day";
      }
      if (self2.selectedDates.length !== 1 || elem && (!elem.classList.contains(cellClass) || elem.classList.contains("flatpickr-disabled")))
        return;
      var hoverDate = elem ? elem.dateObj.getTime() : self2.days.firstElementChild.dateObj.getTime(), initialDate = self2.parseDate(self2.selectedDates[0], void 0, true).getTime(), rangeStartDate = Math.min(hoverDate, self2.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate, self2.selectedDates[0].getTime());
      var containsDisabled = false;
      var minRange = 0, maxRange = 0;
      for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
        if (!isEnabled(new Date(t), true)) {
          containsDisabled = containsDisabled || t > rangeStartDate && t < rangeEndDate;
          if (t < initialDate && (!minRange || t > minRange))
            minRange = t;
          else if (t > initialDate && (!maxRange || t < maxRange))
            maxRange = t;
        }
      }
      var hoverableCells = Array.from(self2.rContainer.querySelectorAll("*:nth-child(-n+" + self2.config.showMonths + ") > ." + cellClass));
      hoverableCells.forEach(function(dayElem) {
        var date = dayElem.dateObj;
        var timestamp = date.getTime();
        var outOfRange = minRange > 0 && timestamp < minRange || maxRange > 0 && timestamp > maxRange;
        if (outOfRange) {
          dayElem.classList.add("notAllowed");
          ["inRange", "startRange", "endRange"].forEach(function(c) {
            dayElem.classList.remove(c);
          });
          return;
        } else if (containsDisabled && !outOfRange)
          return;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach(function(c) {
          dayElem.classList.remove(c);
        });
        if (elem !== void 0) {
          elem.classList.add(hoverDate <= self2.selectedDates[0].getTime() ? "startRange" : "endRange");
          if (initialDate < hoverDate && timestamp === initialDate)
            dayElem.classList.add("startRange");
          else if (initialDate > hoverDate && timestamp === initialDate)
            dayElem.classList.add("endRange");
          if (timestamp >= minRange && (maxRange === 0 || timestamp <= maxRange) && isBetween(timestamp, initialDate, hoverDate))
            dayElem.classList.add("inRange");
        }
      });
    }
    function onResize() {
      if (self2.isOpen && !self2.config.static && !self2.config.inline)
        positionCalendar();
    }
    function open(e, positionElement) {
      if (positionElement === void 0) {
        positionElement = self2._positionElement;
      }
      if (self2.isMobile === true) {
        if (e) {
          e.preventDefault();
          var eventTarget = getEventTarget(e);
          if (eventTarget) {
            eventTarget.blur();
          }
        }
        if (self2.mobileInput !== void 0) {
          self2.mobileInput.focus();
          self2.mobileInput.click();
        }
        triggerEvent("onOpen");
        return;
      } else if (self2._input.disabled || self2.config.inline) {
        return;
      }
      var wasOpen = self2.isOpen;
      self2.isOpen = true;
      if (!wasOpen) {
        self2.calendarContainer.classList.add("open");
        self2._input.classList.add("active");
        triggerEvent("onOpen");
        positionCalendar(positionElement);
      }
      if (self2.config.enableTime === true && self2.config.noCalendar === true) {
        if (self2.config.allowInput === false && (e === void 0 || !self2.timeContainer.contains(e.relatedTarget))) {
          setTimeout(function() {
            return self2.hourElement.select();
          }, 50);
        }
      }
    }
    function minMaxDateSetter(type) {
      return function(date) {
        var dateObj = self2.config["_" + type + "Date"] = self2.parseDate(date, self2.config.dateFormat);
        var inverseDateObj = self2.config["_" + (type === "min" ? "max" : "min") + "Date"];
        if (dateObj !== void 0) {
          self2[type === "min" ? "minDateHasTime" : "maxDateHasTime"] = dateObj.getHours() > 0 || dateObj.getMinutes() > 0 || dateObj.getSeconds() > 0;
        }
        if (self2.selectedDates) {
          self2.selectedDates = self2.selectedDates.filter(function(d) {
            return isEnabled(d);
          });
          if (!self2.selectedDates.length && type === "min")
            setHoursFromDate(dateObj);
          updateValue();
        }
        if (self2.daysContainer) {
          redraw();
          if (dateObj !== void 0)
            self2.currentYearElement[type] = dateObj.getFullYear().toString();
          else
            self2.currentYearElement.removeAttribute(type);
          self2.currentYearElement.disabled = !!inverseDateObj && dateObj !== void 0 && inverseDateObj.getFullYear() === dateObj.getFullYear();
        }
      };
    }
    function parseConfig() {
      var boolOpts = [
        "wrap",
        "weekNumbers",
        "allowInput",
        "allowInvalidPreload",
        "clickOpens",
        "time_24hr",
        "enableTime",
        "noCalendar",
        "altInput",
        "shorthandCurrentMonth",
        "inline",
        "static",
        "enableSeconds",
        "disableMobile"
      ];
      var userConfig = __assign(__assign({}, JSON.parse(JSON.stringify(element2.dataset || {}))), instanceConfig);
      var formats2 = {};
      self2.config.parseDate = userConfig.parseDate;
      self2.config.formatDate = userConfig.formatDate;
      Object.defineProperty(self2.config, "enable", {
        get: function() {
          return self2.config._enable;
        },
        set: function(dates) {
          self2.config._enable = parseDateRules(dates);
        }
      });
      Object.defineProperty(self2.config, "disable", {
        get: function() {
          return self2.config._disable;
        },
        set: function(dates) {
          self2.config._disable = parseDateRules(dates);
        }
      });
      var timeMode = userConfig.mode === "time";
      if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
        var defaultDateFormat = flatpickr.defaultConfig.dateFormat || defaults.dateFormat;
        formats2.dateFormat = userConfig.noCalendar || timeMode ? "H:i" + (userConfig.enableSeconds ? ":S" : "") : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
      }
      if (userConfig.altInput && (userConfig.enableTime || timeMode) && !userConfig.altFormat) {
        var defaultAltFormat = flatpickr.defaultConfig.altFormat || defaults.altFormat;
        formats2.altFormat = userConfig.noCalendar || timeMode ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K") : defaultAltFormat + (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
      }
      Object.defineProperty(self2.config, "minDate", {
        get: function() {
          return self2.config._minDate;
        },
        set: minMaxDateSetter("min")
      });
      Object.defineProperty(self2.config, "maxDate", {
        get: function() {
          return self2.config._maxDate;
        },
        set: minMaxDateSetter("max")
      });
      var minMaxTimeSetter = function(type) {
        return function(val) {
          self2.config[type === "min" ? "_minTime" : "_maxTime"] = self2.parseDate(val, "H:i:S");
        };
      };
      Object.defineProperty(self2.config, "minTime", {
        get: function() {
          return self2.config._minTime;
        },
        set: minMaxTimeSetter("min")
      });
      Object.defineProperty(self2.config, "maxTime", {
        get: function() {
          return self2.config._maxTime;
        },
        set: minMaxTimeSetter("max")
      });
      if (userConfig.mode === "time") {
        self2.config.noCalendar = true;
        self2.config.enableTime = true;
      }
      Object.assign(self2.config, formats2, userConfig);
      for (var i = 0; i < boolOpts.length; i++)
        self2.config[boolOpts[i]] = self2.config[boolOpts[i]] === true || self2.config[boolOpts[i]] === "true";
      HOOKS.filter(function(hook) {
        return self2.config[hook] !== void 0;
      }).forEach(function(hook) {
        self2.config[hook] = arrayify(self2.config[hook] || []).map(bindToInstance);
      });
      self2.isMobile = !self2.config.disableMobile && !self2.config.inline && self2.config.mode === "single" && !self2.config.disable.length && !self2.config.enable && !self2.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      for (var i = 0; i < self2.config.plugins.length; i++) {
        var pluginConf = self2.config.plugins[i](self2) || {};
        for (var key in pluginConf) {
          if (HOOKS.indexOf(key) > -1) {
            self2.config[key] = arrayify(pluginConf[key]).map(bindToInstance).concat(self2.config[key]);
          } else if (typeof userConfig[key] === "undefined")
            self2.config[key] = pluginConf[key];
        }
      }
      if (!userConfig.altInputClass) {
        self2.config.altInputClass = getInputElem().className + " " + self2.config.altInputClass;
      }
      triggerEvent("onParseConfig");
    }
    function getInputElem() {
      return self2.config.wrap ? element2.querySelector("[data-input]") : element2;
    }
    function setupLocale() {
      if (typeof self2.config.locale !== "object" && typeof flatpickr.l10ns[self2.config.locale] === "undefined")
        self2.config.errorHandler(new Error("flatpickr: invalid locale " + self2.config.locale));
      self2.l10n = __assign(__assign({}, flatpickr.l10ns.default), typeof self2.config.locale === "object" ? self2.config.locale : self2.config.locale !== "default" ? flatpickr.l10ns[self2.config.locale] : void 0);
      tokenRegex.D = "(" + self2.l10n.weekdays.shorthand.join("|") + ")";
      tokenRegex.l = "(" + self2.l10n.weekdays.longhand.join("|") + ")";
      tokenRegex.M = "(" + self2.l10n.months.shorthand.join("|") + ")";
      tokenRegex.F = "(" + self2.l10n.months.longhand.join("|") + ")";
      tokenRegex.K = "(" + self2.l10n.amPM[0] + "|" + self2.l10n.amPM[1] + "|" + self2.l10n.amPM[0].toLowerCase() + "|" + self2.l10n.amPM[1].toLowerCase() + ")";
      var userConfig = __assign(__assign({}, instanceConfig), JSON.parse(JSON.stringify(element2.dataset || {})));
      if (userConfig.time_24hr === void 0 && flatpickr.defaultConfig.time_24hr === void 0) {
        self2.config.time_24hr = self2.l10n.time_24hr;
      }
      self2.formatDate = createDateFormatter(self2);
      self2.parseDate = createDateParser({ config: self2.config, l10n: self2.l10n });
    }
    function positionCalendar(customPositionElement) {
      if (typeof self2.config.position === "function") {
        return void self2.config.position(self2, customPositionElement);
      }
      if (self2.calendarContainer === void 0)
        return;
      triggerEvent("onPreCalendarPosition");
      var positionElement = customPositionElement || self2._positionElement;
      var calendarHeight = Array.prototype.reduce.call(self2.calendarContainer.children, function(acc, child) {
        return acc + child.offsetHeight;
      }, 0), calendarWidth = self2.calendarContainer.offsetWidth, configPos = self2.config.position.split(" "), configPosVertical = configPos[0], configPosHorizontal = configPos.length > 1 ? configPos[1] : null, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPosVertical === "above" || configPosVertical !== "below" && distanceFromBottom < calendarHeight && inputBounds.top > calendarHeight;
      var top2 = window.pageYOffset + inputBounds.top + (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
      toggleClass(self2.calendarContainer, "arrowTop", !showOnTop);
      toggleClass(self2.calendarContainer, "arrowBottom", showOnTop);
      if (self2.config.inline)
        return;
      var left2 = window.pageXOffset + inputBounds.left;
      var isCenter = false;
      var isRight = false;
      if (configPosHorizontal === "center") {
        left2 -= (calendarWidth - inputBounds.width) / 2;
        isCenter = true;
      } else if (configPosHorizontal === "right") {
        left2 -= calendarWidth - inputBounds.width;
        isRight = true;
      }
      toggleClass(self2.calendarContainer, "arrowLeft", !isCenter && !isRight);
      toggleClass(self2.calendarContainer, "arrowCenter", isCenter);
      toggleClass(self2.calendarContainer, "arrowRight", isRight);
      var right2 = window.document.body.offsetWidth - (window.pageXOffset + inputBounds.right);
      var rightMost = left2 + calendarWidth > window.document.body.offsetWidth;
      var centerMost = right2 + calendarWidth > window.document.body.offsetWidth;
      toggleClass(self2.calendarContainer, "rightMost", rightMost);
      if (self2.config.static)
        return;
      self2.calendarContainer.style.top = top2 + "px";
      if (!rightMost) {
        self2.calendarContainer.style.left = left2 + "px";
        self2.calendarContainer.style.right = "auto";
      } else if (!centerMost) {
        self2.calendarContainer.style.left = "auto";
        self2.calendarContainer.style.right = right2 + "px";
      } else {
        var doc = getDocumentStyleSheet();
        if (doc === void 0)
          return;
        var bodyWidth = window.document.body.offsetWidth;
        var centerLeft = Math.max(0, bodyWidth / 2 - calendarWidth / 2);
        var centerBefore = ".flatpickr-calendar.centerMost:before";
        var centerAfter = ".flatpickr-calendar.centerMost:after";
        var centerIndex = doc.cssRules.length;
        var centerStyle = "{left:" + inputBounds.left + "px;right:auto;}";
        toggleClass(self2.calendarContainer, "rightMost", false);
        toggleClass(self2.calendarContainer, "centerMost", true);
        doc.insertRule(centerBefore + "," + centerAfter + centerStyle, centerIndex);
        self2.calendarContainer.style.left = centerLeft + "px";
        self2.calendarContainer.style.right = "auto";
      }
    }
    function getDocumentStyleSheet() {
      var editableSheet = null;
      for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        if (!sheet.cssRules)
          continue;
        try {
          sheet.cssRules;
        } catch (err) {
          continue;
        }
        editableSheet = sheet;
        break;
      }
      return editableSheet != null ? editableSheet : createStyleSheet();
    }
    function createStyleSheet() {
      var style = document.createElement("style");
      document.head.appendChild(style);
      return style.sheet;
    }
    function redraw() {
      if (self2.config.noCalendar || self2.isMobile)
        return;
      buildMonthSwitch();
      updateNavigationCurrentMonth();
      buildDays();
    }
    function focusAndClose() {
      self2._input.focus();
      if (window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0) {
        setTimeout(self2.close, 0);
      } else {
        self2.close();
      }
    }
    function selectDate(e) {
      e.preventDefault();
      e.stopPropagation();
      var isSelectable = function(day) {
        return day.classList && day.classList.contains("flatpickr-day") && !day.classList.contains("flatpickr-disabled") && !day.classList.contains("notAllowed");
      };
      var t = findParent(getEventTarget(e), isSelectable);
      if (t === void 0)
        return;
      var target = t;
      var selectedDate = self2.latestSelectedDateObj = new Date(target.dateObj.getTime());
      var shouldChangeMonth = (selectedDate.getMonth() < self2.currentMonth || selectedDate.getMonth() > self2.currentMonth + self2.config.showMonths - 1) && self2.config.mode !== "range";
      self2.selectedDateElem = target;
      if (self2.config.mode === "single")
        self2.selectedDates = [selectedDate];
      else if (self2.config.mode === "multiple") {
        var selectedIndex = isDateSelected(selectedDate);
        if (selectedIndex)
          self2.selectedDates.splice(parseInt(selectedIndex), 1);
        else
          self2.selectedDates.push(selectedDate);
      } else if (self2.config.mode === "range") {
        if (self2.selectedDates.length === 2) {
          self2.clear(false, false);
        }
        self2.latestSelectedDateObj = selectedDate;
        self2.selectedDates.push(selectedDate);
        if (compareDates(selectedDate, self2.selectedDates[0], true) !== 0)
          self2.selectedDates.sort(function(a, b) {
            return a.getTime() - b.getTime();
          });
      }
      setHoursFromInputs();
      if (shouldChangeMonth) {
        var isNewYear = self2.currentYear !== selectedDate.getFullYear();
        self2.currentYear = selectedDate.getFullYear();
        self2.currentMonth = selectedDate.getMonth();
        if (isNewYear) {
          triggerEvent("onYearChange");
          buildMonthSwitch();
        }
        triggerEvent("onMonthChange");
      }
      updateNavigationCurrentMonth();
      buildDays();
      updateValue();
      if (!shouldChangeMonth && self2.config.mode !== "range" && self2.config.showMonths === 1)
        focusOnDayElem(target);
      else if (self2.selectedDateElem !== void 0 && self2.hourElement === void 0) {
        self2.selectedDateElem && self2.selectedDateElem.focus();
      }
      if (self2.hourElement !== void 0)
        self2.hourElement !== void 0 && self2.hourElement.focus();
      if (self2.config.closeOnSelect) {
        var single = self2.config.mode === "single" && !self2.config.enableTime;
        var range = self2.config.mode === "range" && self2.selectedDates.length === 2 && !self2.config.enableTime;
        if (single || range) {
          focusAndClose();
        }
      }
      triggerChange();
    }
    var CALLBACKS = {
      locale: [setupLocale, updateWeekdays],
      showMonths: [buildMonths, setCalendarWidth, buildWeekdays],
      minDate: [jumpToDate],
      maxDate: [jumpToDate],
      positionElement: [updatePositionElement],
      clickOpens: [
        function() {
          if (self2.config.clickOpens === true) {
            bind(self2._input, "focus", self2.open);
            bind(self2._input, "click", self2.open);
          } else {
            self2._input.removeEventListener("focus", self2.open);
            self2._input.removeEventListener("click", self2.open);
          }
        }
      ]
    };
    function set(option, value) {
      if (option !== null && typeof option === "object") {
        Object.assign(self2.config, option);
        for (var key in option) {
          if (CALLBACKS[key] !== void 0)
            CALLBACKS[key].forEach(function(x) {
              return x();
            });
        }
      } else {
        self2.config[option] = value;
        if (CALLBACKS[option] !== void 0)
          CALLBACKS[option].forEach(function(x) {
            return x();
          });
        else if (HOOKS.indexOf(option) > -1)
          self2.config[option] = arrayify(value);
      }
      self2.redraw();
      updateValue(true);
    }
    function setSelectedDate(inputDate, format2) {
      var dates = [];
      if (inputDate instanceof Array)
        dates = inputDate.map(function(d) {
          return self2.parseDate(d, format2);
        });
      else if (inputDate instanceof Date || typeof inputDate === "number")
        dates = [self2.parseDate(inputDate, format2)];
      else if (typeof inputDate === "string") {
        switch (self2.config.mode) {
          case "single":
          case "time":
            dates = [self2.parseDate(inputDate, format2)];
            break;
          case "multiple":
            dates = inputDate.split(self2.config.conjunction).map(function(date) {
              return self2.parseDate(date, format2);
            });
            break;
          case "range":
            dates = inputDate.split(self2.l10n.rangeSeparator).map(function(date) {
              return self2.parseDate(date, format2);
            });
            break;
          default:
            break;
        }
      } else
        self2.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
      self2.selectedDates = self2.config.allowInvalidPreload ? dates : dates.filter(function(d) {
        return d instanceof Date && isEnabled(d, false);
      });
      if (self2.config.mode === "range")
        self2.selectedDates.sort(function(a, b) {
          return a.getTime() - b.getTime();
        });
    }
    function setDate(date, triggerChange2, format2) {
      if (triggerChange2 === void 0) {
        triggerChange2 = false;
      }
      if (format2 === void 0) {
        format2 = self2.config.dateFormat;
      }
      if (date !== 0 && !date || date instanceof Array && date.length === 0)
        return self2.clear(triggerChange2);
      setSelectedDate(date, format2);
      self2.latestSelectedDateObj = self2.selectedDates[self2.selectedDates.length - 1];
      self2.redraw();
      jumpToDate(void 0, triggerChange2);
      setHoursFromDate();
      if (self2.selectedDates.length === 0) {
        self2.clear(false);
      }
      updateValue(triggerChange2);
      if (triggerChange2)
        triggerEvent("onChange");
    }
    function parseDateRules(arr) {
      return arr.slice().map(function(rule) {
        if (typeof rule === "string" || typeof rule === "number" || rule instanceof Date) {
          return self2.parseDate(rule, void 0, true);
        } else if (rule && typeof rule === "object" && rule.from && rule.to)
          return {
            from: self2.parseDate(rule.from, void 0),
            to: self2.parseDate(rule.to, void 0)
          };
        return rule;
      }).filter(function(x) {
        return x;
      });
    }
    function setupDates() {
      self2.selectedDates = [];
      self2.now = self2.parseDate(self2.config.now) || new Date();
      var preloadedDate = self2.config.defaultDate || ((self2.input.nodeName === "INPUT" || self2.input.nodeName === "TEXTAREA") && self2.input.placeholder && self2.input.value === self2.input.placeholder ? null : self2.input.value);
      if (preloadedDate)
        setSelectedDate(preloadedDate, self2.config.dateFormat);
      self2._initialDate = self2.selectedDates.length > 0 ? self2.selectedDates[0] : self2.config.minDate && self2.config.minDate.getTime() > self2.now.getTime() ? self2.config.minDate : self2.config.maxDate && self2.config.maxDate.getTime() < self2.now.getTime() ? self2.config.maxDate : self2.now;
      self2.currentYear = self2._initialDate.getFullYear();
      self2.currentMonth = self2._initialDate.getMonth();
      if (self2.selectedDates.length > 0)
        self2.latestSelectedDateObj = self2.selectedDates[0];
      if (self2.config.minTime !== void 0)
        self2.config.minTime = self2.parseDate(self2.config.minTime, "H:i");
      if (self2.config.maxTime !== void 0)
        self2.config.maxTime = self2.parseDate(self2.config.maxTime, "H:i");
      self2.minDateHasTime = !!self2.config.minDate && (self2.config.minDate.getHours() > 0 || self2.config.minDate.getMinutes() > 0 || self2.config.minDate.getSeconds() > 0);
      self2.maxDateHasTime = !!self2.config.maxDate && (self2.config.maxDate.getHours() > 0 || self2.config.maxDate.getMinutes() > 0 || self2.config.maxDate.getSeconds() > 0);
    }
    function setupInputs() {
      self2.input = getInputElem();
      if (!self2.input) {
        self2.config.errorHandler(new Error("Invalid input element specified"));
        return;
      }
      self2.input._type = self2.input.type;
      self2.input.type = "text";
      self2.input.classList.add("flatpickr-input");
      self2._input = self2.input;
      if (self2.config.altInput) {
        self2.altInput = createElement(self2.input.nodeName, self2.config.altInputClass);
        self2._input = self2.altInput;
        self2.altInput.placeholder = self2.input.placeholder;
        self2.altInput.disabled = self2.input.disabled;
        self2.altInput.required = self2.input.required;
        self2.altInput.tabIndex = self2.input.tabIndex;
        self2.altInput.type = "text";
        self2.input.setAttribute("type", "hidden");
        if (!self2.config.static && self2.input.parentNode)
          self2.input.parentNode.insertBefore(self2.altInput, self2.input.nextSibling);
      }
      if (!self2.config.allowInput)
        self2._input.setAttribute("readonly", "readonly");
      updatePositionElement();
    }
    function updatePositionElement() {
      self2._positionElement = self2.config.positionElement || self2._input;
    }
    function setupMobile() {
      var inputType = self2.config.enableTime ? self2.config.noCalendar ? "time" : "datetime-local" : "date";
      self2.mobileInput = createElement("input", self2.input.className + " flatpickr-mobile");
      self2.mobileInput.tabIndex = 1;
      self2.mobileInput.type = inputType;
      self2.mobileInput.disabled = self2.input.disabled;
      self2.mobileInput.required = self2.input.required;
      self2.mobileInput.placeholder = self2.input.placeholder;
      self2.mobileFormatStr = inputType === "datetime-local" ? "Y-m-d\\TH:i:S" : inputType === "date" ? "Y-m-d" : "H:i:S";
      if (self2.selectedDates.length > 0) {
        self2.mobileInput.defaultValue = self2.mobileInput.value = self2.formatDate(self2.selectedDates[0], self2.mobileFormatStr);
      }
      if (self2.config.minDate)
        self2.mobileInput.min = self2.formatDate(self2.config.minDate, "Y-m-d");
      if (self2.config.maxDate)
        self2.mobileInput.max = self2.formatDate(self2.config.maxDate, "Y-m-d");
      if (self2.input.getAttribute("step"))
        self2.mobileInput.step = String(self2.input.getAttribute("step"));
      self2.input.type = "hidden";
      if (self2.altInput !== void 0)
        self2.altInput.type = "hidden";
      try {
        if (self2.input.parentNode)
          self2.input.parentNode.insertBefore(self2.mobileInput, self2.input.nextSibling);
      } catch (_a) {
      }
      bind(self2.mobileInput, "change", function(e) {
        self2.setDate(getEventTarget(e).value, false, self2.mobileFormatStr);
        triggerEvent("onChange");
        triggerEvent("onClose");
      });
    }
    function toggle(e) {
      if (self2.isOpen === true)
        return self2.close();
      self2.open(e);
    }
    function triggerEvent(event, data) {
      if (self2.config === void 0)
        return;
      var hooks = self2.config[event];
      if (hooks !== void 0 && hooks.length > 0) {
        for (var i = 0; hooks[i] && i < hooks.length; i++)
          hooks[i](self2.selectedDates, self2.input.value, self2, data);
      }
      if (event === "onChange") {
        self2.input.dispatchEvent(createEvent("change"));
        self2.input.dispatchEvent(createEvent("input"));
      }
    }
    function createEvent(name) {
      var e = document.createEvent("Event");
      e.initEvent(name, true, true);
      return e;
    }
    function isDateSelected(date) {
      for (var i = 0; i < self2.selectedDates.length; i++) {
        var selectedDate = self2.selectedDates[i];
        if (selectedDate instanceof Date && compareDates(selectedDate, date) === 0)
          return "" + i;
      }
      return false;
    }
    function isDateInRange(date) {
      if (self2.config.mode !== "range" || self2.selectedDates.length < 2)
        return false;
      return compareDates(date, self2.selectedDates[0]) >= 0 && compareDates(date, self2.selectedDates[1]) <= 0;
    }
    function updateNavigationCurrentMonth() {
      if (self2.config.noCalendar || self2.isMobile || !self2.monthNav)
        return;
      self2.yearElements.forEach(function(yearElement, i) {
        var d = new Date(self2.currentYear, self2.currentMonth, 1);
        d.setMonth(self2.currentMonth + i);
        if (self2.config.showMonths > 1 || self2.config.monthSelectorType === "static") {
          self2.monthElements[i].textContent = monthToStr(d.getMonth(), self2.config.shorthandCurrentMonth, self2.l10n) + " ";
        } else {
          self2.monthsDropdownContainer.value = d.getMonth().toString();
        }
        yearElement.value = d.getFullYear().toString();
      });
      self2._hidePrevMonthArrow = self2.config.minDate !== void 0 && (self2.currentYear === self2.config.minDate.getFullYear() ? self2.currentMonth <= self2.config.minDate.getMonth() : self2.currentYear < self2.config.minDate.getFullYear());
      self2._hideNextMonthArrow = self2.config.maxDate !== void 0 && (self2.currentYear === self2.config.maxDate.getFullYear() ? self2.currentMonth + 1 > self2.config.maxDate.getMonth() : self2.currentYear > self2.config.maxDate.getFullYear());
    }
    function getDateStr(specificFormat) {
      var format2 = specificFormat || (self2.config.altInput ? self2.config.altFormat : self2.config.dateFormat);
      return self2.selectedDates.map(function(dObj) {
        return self2.formatDate(dObj, format2);
      }).filter(function(d, i, arr) {
        return self2.config.mode !== "range" || self2.config.enableTime || arr.indexOf(d) === i;
      }).join(self2.config.mode !== "range" ? self2.config.conjunction : self2.l10n.rangeSeparator);
    }
    function updateValue(triggerChange2) {
      if (triggerChange2 === void 0) {
        triggerChange2 = true;
      }
      if (self2.mobileInput !== void 0 && self2.mobileFormatStr) {
        self2.mobileInput.value = self2.latestSelectedDateObj !== void 0 ? self2.formatDate(self2.latestSelectedDateObj, self2.mobileFormatStr) : "";
      }
      self2.input.value = getDateStr(self2.config.dateFormat);
      if (self2.altInput !== void 0) {
        self2.altInput.value = getDateStr(self2.config.altFormat);
      }
      if (triggerChange2 !== false)
        triggerEvent("onValueUpdate");
    }
    function onMonthNavClick(e) {
      var eventTarget = getEventTarget(e);
      var isPrevMonth = self2.prevMonthNav.contains(eventTarget);
      var isNextMonth = self2.nextMonthNav.contains(eventTarget);
      if (isPrevMonth || isNextMonth) {
        changeMonth(isPrevMonth ? -1 : 1);
      } else if (self2.yearElements.indexOf(eventTarget) >= 0) {
        eventTarget.select();
      } else if (eventTarget.classList.contains("arrowUp")) {
        self2.changeYear(self2.currentYear + 1);
      } else if (eventTarget.classList.contains("arrowDown")) {
        self2.changeYear(self2.currentYear - 1);
      }
    }
    function timeWrapper(e) {
      e.preventDefault();
      var isKeyDown = e.type === "keydown", eventTarget = getEventTarget(e), input = eventTarget;
      if (self2.amPM !== void 0 && eventTarget === self2.amPM) {
        self2.amPM.textContent = self2.l10n.amPM[int(self2.amPM.textContent === self2.l10n.amPM[0])];
      }
      var min2 = parseFloat(input.getAttribute("min")), max2 = parseFloat(input.getAttribute("max")), step = parseFloat(input.getAttribute("step")), curValue = parseInt(input.value, 10), delta = e.delta || (isKeyDown ? e.which === 38 ? 1 : -1 : 0);
      var newValue = curValue + step * delta;
      if (typeof input.value !== "undefined" && input.value.length === 2) {
        var isHourElem = input === self2.hourElement, isMinuteElem = input === self2.minuteElement;
        if (newValue < min2) {
          newValue = max2 + newValue + int(!isHourElem) + (int(isHourElem) && int(!self2.amPM));
          if (isMinuteElem)
            incrementNumInput(void 0, -1, self2.hourElement);
        } else if (newValue > max2) {
          newValue = input === self2.hourElement ? newValue - max2 - int(!self2.amPM) : min2;
          if (isMinuteElem)
            incrementNumInput(void 0, 1, self2.hourElement);
        }
        if (self2.amPM && isHourElem && (step === 1 ? newValue + curValue === 23 : Math.abs(newValue - curValue) > step)) {
          self2.amPM.textContent = self2.l10n.amPM[int(self2.amPM.textContent === self2.l10n.amPM[0])];
        }
        input.value = pad(newValue);
      }
    }
    init();
    return self2;
  }
  function _flatpickr(nodeList, config) {
    var nodes = Array.prototype.slice.call(nodeList).filter(function(x) {
      return x instanceof HTMLElement;
    });
    var instances = [];
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      try {
        if (node.getAttribute("data-fp-omit") !== null)
          continue;
        if (node._flatpickr !== void 0) {
          node._flatpickr.destroy();
          node._flatpickr = void 0;
        }
        node._flatpickr = FlatpickrInstance(node, config || {});
        instances.push(node._flatpickr);
      } catch (e) {
        console.error(e);
      }
    }
    return instances.length === 1 ? instances[0] : instances;
  }
  if (typeof HTMLElement !== "undefined" && typeof HTMLCollection !== "undefined" && typeof NodeList !== "undefined") {
    HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(config) {
      return _flatpickr(this, config);
    };
    HTMLElement.prototype.flatpickr = function(config) {
      return _flatpickr([this], config);
    };
  }
  var flatpickr = function(selector, config) {
    if (typeof selector === "string") {
      return _flatpickr(window.document.querySelectorAll(selector), config);
    } else if (selector instanceof Node) {
      return _flatpickr([selector], config);
    } else {
      return _flatpickr(selector, config);
    }
  };
  flatpickr.defaultConfig = {};
  flatpickr.l10ns = {
    en: __assign({}, default_default),
    default: __assign({}, default_default)
  };
  flatpickr.localize = function(l10n) {
    flatpickr.l10ns.default = __assign(__assign({}, flatpickr.l10ns.default), l10n);
  };
  flatpickr.setDefaults = function(config) {
    flatpickr.defaultConfig = __assign(__assign({}, flatpickr.defaultConfig), config);
  };
  flatpickr.parseDate = createDateParser({});
  flatpickr.formatDate = createDateFormatter({});
  flatpickr.compareDates = compareDates;
  if (typeof jQuery !== "undefined" && typeof jQuery.fn !== "undefined") {
    jQuery.fn.flatpickr = function(config) {
      return _flatpickr(this, config);
    };
  }
  Date.prototype.fp_incr = function(days) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
  };
  if (typeof window !== "undefined") {
    window.flatpickr = flatpickr;
  }
  var esm_default = flatpickr;

  // src/js/components/picker.js
  var Picker = esm_default;
  var picker_default = Picker;

  // src/js/index.js
  exportGlobal("Ripple", ripple_default);
  exportGlobal("Forms", forms_default);
  exportGlobal("Accordion", accordion_default);
  exportGlobal("Tabs", tabs_default);
  exportGlobal("Appbar", appbar_default);
  exportGlobal("Menu", menu_default);
  exportGlobal("Tooltip", tooltip_default);
  exportGlobal("Snackbar", snackbar_default);
  exportGlobal("Dialog", dialog_default);
  exportGlobal("Picker", picker_default);
})();
/*!
* focus-trap 6.9.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
/*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
//# sourceMappingURL=material.js.map
