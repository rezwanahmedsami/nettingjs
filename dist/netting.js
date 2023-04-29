/**
 * MIT License
 *
 * Copyright (c) 2023 Rezwan Ahmed Sami
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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

    var HtmlDOM = document === null || document === void 0 ? void 0 : document.querySelector('html');

    function getOs() {
        return navigator === null || navigator === void 0 ? void 0 : navigator.platform;
    }
    function getUserAgent() {
        return navigator === null || navigator === void 0 ? void 0 : navigator.userAgent;
    }
    function getBrowserName() {
        var userAgent = getUserAgent();
        var browserName;
        if ((userAgent === null || userAgent === void 0 ? void 0 : userAgent.indexOf('Chrome')) !== -1) {
            browserName = 'Google Chrome';
        }
        else if ((userAgent === null || userAgent === void 0 ? void 0 : userAgent.indexOf('Safari')) !== -1) {
            browserName = 'Safari';
        }
        else if ((userAgent === null || userAgent === void 0 ? void 0 : userAgent.indexOf('Firefox')) !== -1) {
            browserName = 'Mozilla Firefox';
        }
        else if ((userAgent === null || userAgent === void 0 ? void 0 : userAgent.indexOf('Edge')) !== -1) {
            browserName = 'Microsoft Edge';
        }
        else if ((userAgent === null || userAgent === void 0 ? void 0 : userAgent.indexOf('Opera')) !== -1 ||
            (userAgent === null || userAgent === void 0 ? void 0 : userAgent.indexOf('OPR')) !== -1) {
            browserName = 'Opera';
        }
        else if ((userAgent === null || userAgent === void 0 ? void 0 : userAgent.indexOf('Trident')) !== -1) {
            browserName = 'Microsoft Internet Explorer';
        }
        else {
            browserName = 'unknown';
        }
        return browserName;
    }

    var ExitIntent = /** @class */ (function (_super) {
        __extends(ExitIntent, _super);
        function ExitIntent(config) {
            var _this = _super.call(this) || this;
            _this.Timer = null;
            _this.Interval = null;
            _this.TimeSec = 0;
            _this.MaxTime = config.MaxTime | 0;
            _this.ActivityState = {
                mouse: {
                    x: 0,
                    y: 0,
                },
                scrollPosition: 0,
                isInteracted: false,
                session: 0,
                window: {
                    innerHeight: 0,
                    innerWidth: 0,
                    outerHeight: 0,
                    outerWidth: 0,
                },
            };
            console.log('yes exitintent class loaded');
            // mouseenter listener
            HtmlDOM === null || HtmlDOM === void 0 ? void 0 : HtmlDOM.addEventListener('mouseenter', _this.mouseEnter.bind(_this));
            // mouseleave listener
            HtmlDOM === null || HtmlDOM === void 0 ? void 0 : HtmlDOM.addEventListener('mouseleave', _this.mouseLeave.bind(_this));
            // start mouse move tracker
            _this.startMouseMoveTracker();
            return _this;
        }
        ExitIntent.prototype.startMouseMoveTracker = function () {
            var _this = this;
            HtmlDOM === null || HtmlDOM === void 0 ? void 0 : HtmlDOM.addEventListener('mousemove', this.MouseMoveTracker.bind(this));
            this.Timer = setTimeout(this.stopMouseMoveTracker.bind(this), this.MaxTime * 1000);
            this.Interval = setInterval(function () {
                _this.TimeSec++;
                console.log('time: ', _this.TimeSec);
            }, 980);
        };
        ExitIntent.prototype.stopMouseMoveTracker = function () {
            console.log('stoping');
            document.removeEventListener('mousemove', this.MouseMoveTracker);
            clearTimeout(this.Timer);
            clearTimeout(this.Interval);
            if (this.TimeSec == this.MaxTime) {
                this.TimeSec = 0;
                console.log(this.ActivityState);
            }
            console.log('Mouse move event stopped');
        };
        ExitIntent.prototype.MouseMoveTracker = function (event) {
            var x = event.clientX;
            var y = event.clientY;
            var mouse = { x: x, y: y };
            var scrollPosition = this.getScrollPosition();
            this.ActivityState.mouse = mouse;
            this.ActivityState.scrollPosition = scrollPosition;
            HtmlDOM === null || HtmlDOM === void 0 ? void 0 : HtmlDOM.addEventListener('mousedown', this.updateActivityStateIsInterect.bind(this));
            this.ActivityState.window = this.getWindowDimensions();
            console.log('mouse move tracker');
        };
        ExitIntent.prototype.updateActivityStateIsInterect = function () {
            this.ActivityState.isInteracted = true;
        };
        ExitIntent.prototype.mouseEnter = function () {
            console.log('Scroll position', this.getScrollPosition());
            console.log('OS:', getOs());
            console.log('User agent:', getUserAgent());
            console.log('Browser name:', getBrowserName());
        };
        ExitIntent.prototype.mouseLeave = function () {
            console.log('Mouse left');
            this.ActivityState.session = this.TimeSec;
        };
        return ExitIntent;
    }(WindowEvents));

    var index = { ExitIntent: ExitIntent };

    return index;

}));
