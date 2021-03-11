export * from './common-property'

export type Dictionary<T> = { [key: string]: T }

export type Valueof<T> = T[keyof T];

export type FixMeAny = any;