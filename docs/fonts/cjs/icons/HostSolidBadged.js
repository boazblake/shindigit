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
var HostSolidBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "host-solid-badged"), mithril_1.default("path", { "class": "clr-i-solid--badged clr-i-solid-path-1--badged", "d": "M24,10.3v1.2H12V10h11.8c-0.5-0.7-0.8-1.5-1-2.4H12V6h10.5c0,0,0-0.1,0-0.1c0-1.4,0.4-2.7,1.1-3.9H9.5C8.7,2,8,2.7,8,3.5V34h20V13.1C26.4,12.6,25,11.7,24,10.3z M18,30.5c-1.5,0-2.8-1.2-2.8-2.8S16.5,25,18,25s2.8,1.2,2.8,2.8S19.5,30.5,18,30.5zM23,22.6H13V21h10V22.6z" }), mithril_1.default("circle", { "class": "clr-i-solid--badged clr-i-solid-path-2--badged", "cx": 18, "cy": 27.8, "r": 1.2 }), mithril_1.default("circle", { "class": "clr-i-solid--badged clr-i-solid-path-3--badged clr-i-badge", "cx": 30, "cy": 5.9, "r": 5 }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = HostSolidBadged;
