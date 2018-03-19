export default function bind<O extends object, K extends keyof O>(obj: O, func: keyof O, key: string | number | symbol, ...args: any[]): (...args) => any;
