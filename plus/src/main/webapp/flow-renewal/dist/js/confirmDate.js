(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.confirmDatePlugin = factory());
}(this, (function () {
    'use strict';

    /*! *****************************************************************************
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

    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

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

    var defaultConfig = {
        confirmIcon: "<i class='fa fa-check'></i>",
        confirmText: "OK ",
        showAlways: false,
        theme: "light",
    };

    function confirmDatePlugin(pluginConfig, callback) {
        var config = __assign(__assign({}, defaultConfig), pluginConfig);
        var confirmContainer;
        var confirmButtonCSSClass = "flatpickr-confirm";
        return function (fp) {
            if (fp.config.noCalendar || fp.isMobile)
                return {};
            return __assign({
                onKeyDown: function (_, __, ___, e) {
                    var eventTarget = getEventTarget(e);
                    if (fp.config.enableTime &&
                        e.key === "Tab" &&
                        eventTarget === fp.amPM) {
                        e.preventDefault();
                        confirmContainer.focus();
                    } else if (e.key === "Enter" && eventTarget === confirmContainer)
                        fp.close();
                },
                onReady: function () {
                    confirmContainer = fp._createElement("div", confirmButtonCSSClass + " " + (config.showAlways ? "visible" : "") + " " + config.theme + "Theme", config.confirmText);
                    confirmContainer.tabIndex = -1;
                    confirmContainer.innerHTML += config.confirmIcon;
                    confirmContainer.addEventListener("click", function () {
                        var isStart = $(fp.input).hasClass("js-start-flatpickr") > -1 || $(fp.input).hasClass("js-start-flatpickr") > -1;
                        fp.close();
                        (typeof callback === "function") && callback(isStart);
                    });
                    fp.calendarContainer.appendChild(confirmContainer);
                    fp.loadedPlugins.push("confirmDate");
                }
            }, (!config.showAlways
                ? {}
                : {}));
        };
    }

    return confirmDatePlugin;

})));