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
var FilmStripLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "film-strip-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M30,4H6A2,2,0,0,0,4,6V30a2,2,0,0,0,2,2H30a2,2,0,0,0,2-2V6A2,2,0,0,0,30,4Zm0,26H6V6H30Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-2", "d": "M14.6,23.07a1.29,1.29,0,0,0,1.24.09l8.73-4a1.3,1.3,0,0,0,0-2.37h0l-8.73-4A1.3,1.3,0,0,0,14,14v8A1.29,1.29,0,0,0,14.6,23.07Zm1-8.6L23.31,18,15.6,21.51Z" }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-3", "x": 8, "y": 7, "width": 2, "height": 3 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-4", "x": 14, "y": 7, "width": 2, "height": 3 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-5", "x": 20, "y": 7, "width": 2, "height": 3 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-6", "x": 26, "y": 7, "width": 2, "height": 3 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-7", "x": 8, "y": 26, "width": 2, "height": 3 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-8", "x": 14, "y": 26, "width": 2, "height": 3 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-9", "x": 20, "y": 26, "width": 2, "height": 3 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-10", "x": 26, "y": 26, "width": 2, "height": 3 }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = FilmStripLine;
