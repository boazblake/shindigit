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
var MicrophoneLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "microphone-line"), mithril_1.default("path", { "d": "M18,24c3.9,0,7-3.1,7-7V9c0-3.9-3.1-7-7-7s-7,3.1-7,7v8C11,20.9,14.1,24,18,24z M13,9c0-2.8,2.2-5,5-5s5,2.2,5,5v8\n\t\tc0,2.8-2.2,5-5,5s-5-2.2-5-5V9z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M30,17h-2c0,5.5-4.5,10-10,10S8,22.5,8,17H6c0,6.3,4.8,11.4,11,11.9V32h-3c-0.6,0-1,0.4-1,1s0.4,1,1,1h8c0.6,0,1-0.4,1-1\n\t\ts-0.4-1-1-1h-3v-3.1C25.2,28.4,30,23.3,30,17z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = MicrophoneLine;
