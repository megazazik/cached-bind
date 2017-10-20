const cachedFunctionFieldName = Symbol('cachedFunction');
export default function cachedBind<O, K extends keyof O>(
	obj: O, 
	fieldName: keyof O, 
	key: string | number | symbol, 
	...args
): (...args) => any {
	let cache = obj[cachedFunctionFieldName];
	if (!cache) {
		// создаем поля для хранения закешированных значений этого объекта
		obj[cachedFunctionFieldName] = cache = {};
	}

	let functionsCache = cache[fieldName];
	if (!functionsCache) {
		// создаем поля для хранения закешированных функций с таким именем
		cache[fieldName] = functionsCache = {};
	}

	let cache4Function = functionsCache[key];
	if (!cache4Function) {
		functionsCache[key] = cache4Function = {};
		const binded = (obj[fieldName] as any).bind(obj);
		cache4Function.func = (...callArgs) => {
			const cachedArgs = args.length ? cache4Function.args : [key];
			return binded(...cachedArgs, ...callArgs);
		};
	}
	cache4Function.args = args;

	return cache4Function.func;
}