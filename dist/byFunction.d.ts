export default function bind<F extends Function>(obj: object, func: F, key: string | number | symbol, ...args: any[]): (...args) => any;
