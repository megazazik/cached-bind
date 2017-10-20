"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cachedFunctionFieldName = Symbol('cachedFunction');
function cachedBind(obj, fieldName, key) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    var cache = obj[cachedFunctionFieldName];
    if (!cache) {
        // создаем поля для хранения закешированных значений этого объекта
        obj[cachedFunctionFieldName] = cache = {};
    }
    var functionsCache = cache[fieldName];
    if (!functionsCache) {
        // создаем поля для хранения закешированных функций с таким именем
        cache[fieldName] = functionsCache = {};
    }
    var cache4Function = functionsCache[key];
    if (!cache4Function) {
        functionsCache[key] = cache4Function = {};
        var binded_1 = obj[fieldName].bind(obj);
        cache4Function.func = function () {
            var callArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                callArgs[_i] = arguments[_i];
            }
            var cachedArgs = args.length ? cache4Function.args : [key];
            binded_1.apply(void 0, cachedArgs.concat(callArgs));
        };
    }
    cache4Function.args = args;
    return cache4Function.func;
}
exports.default = cachedBind;
//# sourceMappingURL=index.js.map