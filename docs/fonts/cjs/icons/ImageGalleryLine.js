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
var ImageGalleryLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "image-gallery-line"), mithril_1.default("path", { "d": "M32.12,10H3.88A1.88,1.88,0,0,0,2,11.88V30.12A1.88,1.88,0,0,0,3.88,32H32.12A1.88,1.88,0,0,0,34,30.12V11.88A1.88,1.88,0,0,0,32.12,10ZM32,30H4V12H32Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M8.56,19.45a3,3,0,1,0-3-3A3,3,0,0,0,8.56,19.45Zm0-4.6A1.6,1.6,0,1,1,7,16.45,1.6,1.6,0,0,1,8.56,14.85Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M7.9,28l6-6,3.18,3.18L14.26,28h2l7.46-7.46L30,26.77v-2L24.2,19a.71.71,0,0,0-1,0l-5.16,5.16L14.37,20.5a.71.71,0,0,0-1,0L5.92,28Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M30.14,3h0a1,1,0,0,0-1-1h-22a1,1,0,0,0-1,1h0V4h24Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M32.12,7V7a1,1,0,0,0-1-1h-26a1,1,0,0,0-1,1h0V8h28Z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ImageGalleryLine;
