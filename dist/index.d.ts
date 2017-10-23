export default function bind<O extends object, K extends keyof O>(obj: O, fieldName: keyof O, key: string | number | symbol, ...args: any[]): (...args) => any;
