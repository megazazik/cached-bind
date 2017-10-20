export default function cachedBind<O, K extends keyof O>(obj: O, fieldName: keyof O, key: string | number | symbol, ...args: any[]): O[K];
