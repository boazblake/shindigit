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
var CloudSolidAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "cloud-solid-alerted"), mithril_1.default("path", { "class": "clr-i-solid--alerted clr-i-solid-path-1--alerted", "d": "M29,16.66a10.15,10.15,0,0,0,.2-1.26h-7A3.68,3.68,0,0,1,19,9.89l3-5.21A10.19,10.19,0,0,0,8.91,13.36,10,10,0,0,0,1,23.1C1,28.19,5.62,33,10.57,33H27.09C31.28,33,35,29.1,35,24.65A8.29,8.29,0,0,0,29,16.66Z" }), mithril_1.default("path", { "class": "clr-i-solid--alerted clr-i-solid-path-2--alerted clr-i-alert", "d": "M26.85,1.14,21.13,11A1.28,1.28,0,0,0,22.23,13H33.68A1.28,1.28,0,0,0,34.78,11L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CloudSolidAlerted;
