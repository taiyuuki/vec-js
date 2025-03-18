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
    add(v: Vec<T>): Vec<T>;
    sub(v: Vec<T>): Vec<T>;
    mul(v: Vec<T>): VecType;
    div(v: Vec<T>): Vec<T>;
    dot(v: Vec<T>): number;
    length(): number;
    normalize(): Vec<T>;
    distance(v: Vec<T>): number;
    angle(v: Vec<T>): number;
    lerp(v: Vec<T>, t: number): Vec<T>;
    max(v: Vec<T>): Vec<T>;
    min(v: Vec<T>): Vec<T>;
    clone(): Vec<T>;
    equals(v: Vec<T>): boolean;
} & { [K: number]: number }

type VecType = Vec<V2> | Vec<V3> | Vec<V4>

type VecArg = Vec<V2> | Vec<V3> | Vec<V4> | number

export type { Key, V2, V3, V4, Vec, VecType, VecArg }
