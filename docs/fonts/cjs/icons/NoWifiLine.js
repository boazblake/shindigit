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
var NoWifiLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "no-wifi-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M18,24.42a4,4,0,1,0,4,4A4,4,0,0,0,18,24.42Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,18,30.42Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-2", "d": "M26.21,21.85a1,1,0,0,0-.23-1.4,13.56,13.56,0,0,0-5-2.23l3.87,3.87A1,1,0,0,0,26.21,21.85Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-3", "d": "M18.05,10.72a20.88,20.88,0,0,0-4.16.43l1.74,1.74a19,19,0,0,1,2.42-.17A18.76,18.76,0,0,1,28.64,16a1,1,0,0,0,1.12-1.65A20.75,20.75,0,0,0,18.05,10.72Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-4", "d": "M33.55,8.2A28.11,28.11,0,0,0,8.11,5.36L9.69,6.93A26,26,0,0,1,32.45,9.87a1,1,0,0,0,1.1-1.67Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-5", "d": "M1.84,4.75,4.27,7.18c-.62.34-1.23.7-1.83,1.1A1,1,0,1,0,3.56,9.94C4.26,9.47,5,9,5.74,8.65l3.87,3.87A20.59,20.59,0,0,0,6.23,14.4,1,1,0,0,0,7.36,16a18.82,18.82,0,0,1,3.77-2l4.16,4.16A13.51,13.51,0,0,0,10,20.55a1,1,0,0,0,1.18,1.61A11.52,11.52,0,0,1,17,20l10.8,10.8,1.41-1.41-26-26Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = NoWifiLine;
