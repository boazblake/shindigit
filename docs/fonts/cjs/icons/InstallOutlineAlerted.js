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
var InstallOutlineAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "install-outline-alerted"), mithril_1.default("path", { "class": "clr-i-outline--alerted clr-i-outline-path-1--alerted", "d": "M10.3,18.87l7,6.89a1,1,0,0,0,1.4,0l7-6.89a1,1,0,0,0-1.4-1.43L19,22.65V4a1,1,0,0,0-2,0V22.65l-5.3-5.21a1,1,0,0,0-1.4,1.43Z" }), mithril_1.default("path", { "class": "clr-i-outline--alerted clr-i-outline-path-2--alerted", "d": "M31,15.4V30H5V10H9.38a1,1,0,0,0,0-2H5.08A2,2,0,0,0,3,10V30a2,2,0,0,0,2.08,2H30.92A2,2,0,0,0,33,30V15.4Z" }), mithril_1.default("path", { "class": "clr-i-outline--alerted clr-i-outline-path-3--alerted clr-i-alert", "d": "M26.85,1.14,21.13,11A1.28,1.28,0,0,0,22.23,13H33.68A1.28,1.28,0,0,0,34.78,11L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = InstallOutlineAlerted;
