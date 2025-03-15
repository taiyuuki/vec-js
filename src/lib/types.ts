type Key = number | string | symbol
type V2 = 'g' | 'r' | 'x' | 'y'
type V3 = 'b' | 'g' | 'r' | 'x' | 'y' | 'z'
type V4 = 'a' | 'b' | 'g' | 'r' | 'w' | 'x' | 'y' | 'z'

type Vec<T extends string> = {
    [K in `${T}${T}`]: Vec<V2>;
} & {
    [K in `${T}${T}${T}`]: Vec<V3>;
} & {
    [K in `${T}${T}${T}${T}`]: Vec<V4>;
} & {
    [K in T]: number;
} & { 
    [Symbol.iterator]: ()=> IterableIterator<number>;
    toString(): string;
    toJSON(): number[];
} & { [K: number]: number }

type VecArg = Vec<V2> | Vec<V3> | Vec<V4> | number

export type { Key, V2, V3, V4, Vec, VecArg }
