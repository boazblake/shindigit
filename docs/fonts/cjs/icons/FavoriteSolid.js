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
var FavoriteSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "favorite-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M34,16.78a2.22,2.22,0,0,0-1.29-4l-9-.34a.23.23,0,0,1-.2-.15L20.4,3.89a2.22,2.22,0,0,0-4.17,0l-3.1,8.43a.23.23,0,0,1-.2.15l-9,.34a2.22,2.22,0,0,0-1.29,4l7.06,5.55a.23.23,0,0,1,.08.24L7.35,31.21a2.22,2.22,0,0,0,3.38,2.45l7.46-5a.22.22,0,0,1,.25,0l7.46,5a2.2,2.2,0,0,0,2.55,0,2.2,2.2,0,0,0,.83-2.4l-2.45-8.64a.22.22,0,0,1,.08-.24Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = FavoriteSolid;
