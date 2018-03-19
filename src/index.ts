import bindByName from './byName';
import bindByFunction from './byFunction';

export default function bind<O extends object, K extends keyof O>(
	obj: O,
	fieldName: keyof O,
	key: string | number | symbol,
	...args
): (...args) => any;
export default function bind<F extends Function>(
	obj: object,
	fieldName: F,
	key: string | number | symbol,
	...args
): (...args) => any;
export default function bind(
	obj: object,
	func: string | Function,
	key: string | number | symbol,
	...args
): (...args) => any {
	if (typeof func === 'function') {
		return bindByFunction(obj, func, key, ...args);
	} else {
		return bindByName<any, any>(obj, func, key, ...args);
	}
}