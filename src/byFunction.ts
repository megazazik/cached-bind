const cachedFunctionFieldName = typeof Symbol === 'function' ? Symbol('cached-bind') : '__cachedBindFunctionFieldName__';

export default function bind<F extends Function>(
	obj: object,
	func: F,
	key: string | number | symbol,
	...args
): (...args) => any {
	let cache4Function = getCache(obj, func);
	if (!cache4Function.cache[key]) {
		const binded = func.bind(obj);
		const cachedFunc = (...callArgs) => {
			const cachedArgs = args.length ? cache4Function.cache[key].args : [key];
			return binded(...cachedArgs, ...callArgs);
		};
		cache4Function.cache[key] = {args, cachedFunc};
	} else {
		cache4Function.cache[key].args = args;
	}

	return cache4Function.cache[key].cachedFunc;
}

interface ICachedData {
	cache: {
		[key: string]: {
			args: any[];
			cachedFunc: (...args) => any;
		}
	};
	func: Function;
}

function getCache(obj: object, func: Function) {
	let caches: ICachedData[] = obj[cachedFunctionFieldName];
	if (!caches) {
		// создаем поля для хранения закешированных значений этого объекта
		obj[cachedFunctionFieldName] = caches = [];
	}

	let functionCache = caches.find((cach) => cach.func === func);
	if (!functionCache) {
		functionCache = {cache: {}, func};
		caches.push(functionCache);
	}

	return functionCache;
}