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
var ControlLunSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "control-lun-solid"), mithril_1.default("g", { "id": "e56f8095-9f69-44a3-8187-a1efe27087b6", "data-name": "Layer 4" }, mithril_1.default("path", { "d": "M16.11,27a1,1,0,1,0,1,1A1,1,0,0,0,16.11,27Z" }), mithril_1.default("path", { "d": "M32.09,21H32V17.32c-1.9,2.93-10.46,3.3-14,3.3A42.43,42.43,0,0,1,8,19.56V17.88A40.59,40.59,0,0,0,18,19c5,0,13.2-.82,14-3.82V10.72c-2.21,3.36-10.49,3.46-14,3.46A42.12,42.12,0,0,1,8,13.11V11a40.59,40.59,0,0,0,10,1.14c5,0,13.28-.83,14-3.88V7.83h0c-.19-3.27-8.84-4.15-14-4.15S4.21,4.56,4,7.83H4v19.7c0,2.16,3.64,3.3,7.63,3.84l2.84,3,.59.62h17a3,3,0,0,0,3-3V23.93A3,3,0,0,0,32.09,21ZM8,26.08V24.4a25.79,25.79,0,0,0,3.46.7l-1.24,1.44C9.46,26.42,8.71,26.27,8,26.08ZM33.09,32a1,1,0,0,1-1,1H15.92L11.4,28.23,15.92,23H32.09a1,1,0,0,1,1,1Z" })));
    } };
exports.default = ControlLunSolid;
