const cachedFunctionFieldName = typeof Symbol === 'function' ? Symbol('cached-bind') : '__cachedBindFieldName__';

export default function bind<O extends object, K extends keyof O>(
	obj: O,
	func: keyof O,
	key: string | number | symbol,
	...args
): (...args) => any {
	let cache4Function = getCache(obj, func, key);
	if (!cache4Function) {
		cache4Function = {};
		const binded = (obj[func] as any).bind(obj);
		cache4Function.func = (...callArgs) => {
			const cachedArgs = args.length ? cache4Function.args : [key];
			return binded(...cachedArgs, ...callArgs);
		};
		setCache(obj, func, key, cache4Function);
	}
	cache4Function.args = args;

	return cache4Function.func;
}

function getCache(obj: object, functionName: string | symbol, key: string | number | symbol) {
	let cache = obj[cachedFunctionFieldName];
	if (!cache) {
		// создаем поля для хранения закешированных значений этого объекта
		obj[cachedFunctionFieldName] = cache = {};
	}

	let functionsCache = cache[functionName];
	if (!functionsCache) {
		// создаем поля для хранения закешированных функций с таким именем
		cache[functionName] = functionsCache = {};
	}

	return functionsCache[key];
}

function setCache(obj: object, functionName: string | symbol, key: string | number | symbol, cachedObj: any) {
	obj[cachedFunctionFieldName][functionName][key] = cachedObj;
}