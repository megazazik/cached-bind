"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cachedFunctionFieldName = typeof Symbol === 'function' ? Symbol('cached-bind') : '__cachedBindFunctionFieldName__';
function bind(obj, func, key) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    var cache4Function = getCache(obj, func);
    if (!cache4Function.cache[key]) {
        var binded_1 = func.bind(obj);
        var cachedFunc = function () {
            var callArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                callArgs[_i] = arguments[_i];
            }
            var cachedArgs = args.length ? cache4Function.cache[key].args : [key];
            return binded_1.apply(void 0, cachedArgs.concat(callArgs));
        };
        cache4Function.cache[key] = { args: args, cachedFunc: cachedFunc };
    }
    else {
        cache4Function.cache[key].args = args;
    }
    return cache4Function.cache[key].cachedFunc;
}
exports.default = bind;
function getCache(obj, func) {
    var caches = obj[cachedFunctionFieldName];
    if (!caches) {
        // создаем поля для хранения закешированных значений этого объекта
        obj[cachedFunctionFieldName] = caches = [];
    }
    var functionCache = caches.find(function (cach) { return cach.func === func; });
    if (!functionCache) {
        functionCache = { cache: {}, func: func };
        caches.push(functionCache);
    }
    return functionCache;
}
//# sourceMappingURL=byFunction.js.map