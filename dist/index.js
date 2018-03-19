"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var byName_1 = require("./byName");
var byFunction_1 = require("./byFunction");
function bind(obj, func, key) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    if (typeof func === 'function') {
        return byFunction_1.default.apply(void 0, [obj, func, key].concat(args));
    }
    else {
        return byName_1.default.apply(void 0, [obj, func, key].concat(args));
    }
}
exports.default = bind;
//# sourceMappingURL=index.js.map