(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Netting = factory());
})(this, (function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var WindowEvents = /** @class */ (function () {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        function WindowEvents() {
        }
        WindowEvents.prototype.getWindowDimensions = function () {
            var innerWindowHeight = window === null || window === void 0 ? void 0 : window.innerHeight;
            var innerWindowWidth = window === null || window === void 0 ? void 0 : window.innerWidth;
            var outerWindowHeight = window === null || window === void 0 ? void 0 : window.outerHeight;
            var outerWindowWidth = window === null || window === void 0 ? void 0 : window.outerWidth;
            return {
                innerHeight: innerWindowHeight,
                innerWidth: innerWindowWidth,
                outerHeight: outerWindowHeight,
                outerWidth: outerWindowWidth,
            };
        };
        WindowEvents.prototype.getScrollPosition = function () {
            var scrollTop = (window === null || window === void 0 ? void 0 : window.scrollY) || (window === null || window === void 0 ? void 0 : window.pageYOffset);
            return scrollTop;
        };
        return WindowEvents;
    }());

    var ExitIntent = /** @class */ (function (_super) {
        __extends(ExitIntent, _super);
        function ExitIntent() {
            var _this = this;
            var _a, _b;
            _this = _super.call(this) || this;
            console.log('yes exitintent class loaded');
            // mouse leave listener
            (_a = document === null || document === void 0 ? void 0 : document.querySelector('html')) === null || _a === void 0 ? void 0 : _a.addEventListener('mouseenter', _this.mouseEnter.bind(_this));
            (_b = document === null || document === void 0 ? void 0 : document.querySelector('html')) === null || _b === void 0 ? void 0 : _b.addEventListener('mouseleave', _this.mouseLeave.bind(_this));
            return _this;
        }
        ExitIntent.prototype.mouseEnter = function () {
            console.log(this.getScrollPosition());
        };
        ExitIntent.prototype.mouseLeave = function () {
            console.log('Mouse left');
        };
        return ExitIntent;
    }(WindowEvents));

    var index = { ExitIntent: ExitIntent };

    return index;

}));
