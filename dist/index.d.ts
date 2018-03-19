export default function bind<O extends object, K extends keyof O>(obj: O, fieldName: keyof O, key: string | number | symbol, ...args: any[]): (...args) => any;
export default function bind<F extends Function>(obj: object, fieldName: F, key: string | number | symbol, ...args: any[]): (...args) => any;
