"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cachedFunctionFieldName = typeof Symbol === 'function' ? Symbol('cached-bind') : '__cachedBindFieldName__';
function bind(obj, func, key) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    var cache4Function = getCache(obj, func, key);
    if (!cache4Function) {
        cache4Function = {};
        var binded_1 = obj[func].bind(obj);
        cache4Function.func = function () {
            var callArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                callArgs[_i] = arguments[_i];
            }
            var cachedArgs = args.length ? cache4Function.args : [key];
            return binded_1.apply(void 0, cachedArgs.concat(callArgs));
        };
        setCache(obj, func, key, cache4Function);
    }
    cache4Function.args = args;
    return cache4Function.func;
}
exports.default = bind;
function getCache(obj, functionName, key) {
    var cache = obj[cachedFunctionFieldName];
    if (!cache) {
        // создаем поля для хранения закешированных значений этого объекта
        obj[cachedFunctionFieldName] = cache = {};
    }
    var functionsCache = cache[functionName];
    if (!functionsCache) {
        // создаем поля для хранения закешированных функций с таким именем
        cache[functionName] = functionsCache = {};
    }
    return functionsCache[key];
}
function setCache(obj, functionName, key, cachedObj) {
    obj[cachedFunctionFieldName][functionName][key] = cachedObj;
}
//# sourceMappingURL=byName.js.map