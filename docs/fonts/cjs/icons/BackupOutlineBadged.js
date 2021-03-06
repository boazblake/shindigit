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
var BackupOutlineBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "backup-outline-badged"), mithril_1.default("rect", { "class": "clr-i-outline--badged clr-i-outline-path-1--badged", "x": 6, "y": 22, "width": 24, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline--badged clr-i-outline-path-2--badged", "x": 26, "y": 26, "width": 4, "height": 2 }), mithril_1.default("path", { "class": "clr-i-outline--badged clr-i-outline-path-3--badged", "d": "M18,19.84l6.38-6.35A1,1,0,1,0,23,12.08L19,16V4a1,1,0,1,0-2,0V16l-4-3.95a1,1,0,0,0-1.41,1.42Z" }), mithril_1.default("path", { "class": "clr-i-outline--badged clr-i-outline-path-4--badged", "d": "M30.87,13.45a7.55,7.55,0,0,1-.87.05,7.46,7.46,0,0,1-3.35-.8,3,3,0,0,1-.24,1.3h2.54C30,16.94,31.72,21.65,32,22.48V30H4V22.48C4.28,21.65,7.05,14,7.05,14H9.58a3,3,0,0,1-.14-2H7.07a1.92,1.92,0,0,0-1.9,1.32C2,22,2,22.1,2,22.33V30a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V22.33C34,22.1,34,22,30.87,13.45Z" }), mithril_1.default("circle", { "class": "clr-i-outline--badged clr-i-outline-path-5--badged clr-i-badge", "cx": 30, "cy": 6, "r": 5 }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BackupOutlineBadged;
