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
var BetaSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "beta-solid"), mithril_1.default("polygon", { "points": "25.8,18 27.5,18 26.7,15.8", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M10.4,17.5c-0.1,0-0.2,0-0.3,0H8.5V19l1.6,0c0.4,0.1,0.8-0.2,0.9-0.6C11.1,18,10.8,17.6,10.4,17.5z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("path", { "d": "M10.7,15.8c0-0.4-0.3-0.7-0.8-0.7H8.5v1.3h1.4C10.4,16.5,10.7,16.2,10.7,15.8z", "class": "clr-i-solid clr-i-solid-path-3" }), mithril_1.default("path", { "d": "M33.1,9h-30c-0.6,0-1,0.4-1,1v14c0,0.6,0.4,1,1,1h4v4c0,0.4,0.2,0.8,0.6,0.9C7.8,30,7.9,30,8.1,30c0.3,0,0.5-0.1,0.7-0.3\n\t\tl4.7-4.7h19.6c0.6,0,1-0.4,1-1V10C34.1,9.4,33.6,9,33.1,9z M10.4,20.1c-0.1,0-0.1,0-0.2,0H7.2v-6h3c0.9-0.1,1.7,0.5,1.8,1.4\n\t\tc0,0,0,0.1,0,0.1c0,0.6-0.3,1.1-0.8,1.3c0.6,0.2,1.1,0.8,1.1,1.5C12.2,19.4,11.4,20.1,10.4,20.1z M17.9,15.2h-3.3v1.2h3v1.2h-3v1.3\n\t\th3.3v1.2h-4.6v-6h4.6V15.2z M21.7,20.1h-1.3v-4.8h-1.9v-1.2h5v1.2h-1.8V20.1z M28.4,20.1l-0.4-1h-2.7l-0.4,1h-1.4l2.4-6h1.4l2.5,6\n\t\tH28.4z", "class": "clr-i-solid clr-i-solid-path-4" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BetaSolid;
