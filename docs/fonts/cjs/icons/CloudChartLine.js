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
var CloudChartLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "cloud-chart-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,29V7H32V29Z" }), mithril_1.default("path", { "d": "M 20.971 11.243 C 23.314 13.586 22.364 18.335 18.849 21.849 C 15.334 25.364 10.586 26.314 8.243 23.97 C 5.899 21.627 6.849 16.878 10.364 13.364 C 13.879 9.849 18.628 8.9 20.971 11.243 Z M 11.636 14.637 C 8.824 17.449 7.875 21.058 9.515 22.698 C 11.155 24.338 14.764 23.389 17.576 20.577 C 20.388 17.765 21.338 14.156 19.697 12.516 C 18.057 10.876 14.448 11.825 11.636 14.637 Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M 28 22 C 28 23.657 26.657 25 25 25 C 23.343 25 22 23.657 22 22 C 22 20.343 23.343 19 25 19 C 26.657 19 28 20.343 28 22 Z M 25 20.6 C 24.227 20.6 23.6 21.227 23.6 22 C 23.6 22.773 24.227 23.4 25 23.4 C 25.773 23.4 26.4 22.773 26.4 22 C 26.4 21.227 25.773 20.6 25 20.6 Z", "class": "clr-i-outline clr-i-outline-path-3", "x": 7 }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CloudChartLine;
