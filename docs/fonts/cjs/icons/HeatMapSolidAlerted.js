"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(require("mithril"));
var HeatMapSolidAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "heat-map-solid-alerted"), mithril_1.default("path", { "class": "clr-i-solid--alerted clr-i-solid-path-1--alerted", "d": "M 34 29 C 34 30.105 33.105 31 32 31 L 4 31 C 2.896 31 2 30.105 2 29 L 2 7 C 2 5.896 2.896 5 4 5 L 21.958 5 L 19.028 10 L 8 10 L 8 26 L 28 26 L 28 15.357 L 34 15.357 Z M 10 19 L 14 19 L 14 24 L 10 24 Z M 22 24 L 22 19 L 26 19 L 26 24 Z M 20 19 L 20 24 L 16 24 L 16 19 Z M 26 17 L 22 17 L 22 15.357 L 26 15.357 Z M 20 17 L 16 17 L 16 12 L 17.856 12 L 17.625 12.395 C 16.795 13.601 17.594 15.245 19.064 15.351 C 19.134 15.357 19.201 15.359 19.27 15.357 L 20 15.357 Z M 14 12 L 14 17 L 10 17 L 10 12 Z" }), mithril_1.default("path", { "class": "clr-i-solid--alerted clr-i-solid-path-22--alerted clr-i-alert", "d": "M 26.854 1.144 L 21.134 11.004 C 20.579 11.818 21.114 12.928 22.097 13.001 C 22.142 13.005 22.188 13.006 22.234 13.004 L 33.684 13.004 C 34.669 13.036 35.319 11.991 34.855 11.122 C 34.834 11.081 34.81 11.042 34.784 11.004 L 29.064 1.144 C 28.57 0.299 27.348 0.299 26.854 1.144 Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = HeatMapSolidAlerted;
