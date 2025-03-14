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
} & { [K: number]: number }

function keyIn<T extends object>(key: Key, obj: T): key is keyof T {
    return key in obj
}

function getValue(target: any, prop: string, receiver: any, Vec: typeof Vec2 | typeof Vec3 | typeof Vec4) {
    if (typeof prop === 'symbol') {
        return Reflect.get(target, prop, receiver)
    }
    const attrs = prop.split('')
    const values: number[] = []
    for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i]
        if (keyIn(attr, Vec.PROPS)) {
            values.push(Reflect.get(target, Vec.PROPS[attr], receiver))
        }
        else {
            return Reflect.get(target, prop, receiver)
        }
    }
    switch (values.length) {
        case 1:
            return values[0]
        case 2:
            return new Vec2(values[0], values[1])
        case 3:
            return new Vec3(values[0], values[1], values[2])
        case 4:
            return new Vec4(values[0], values[1], values[2], values[3])
        default:
            return Reflect.get(target, prop, receiver)
    }
}

function setValue(target: any, prop: string, value: any, receiver: any, Vec: typeof Vec2 | typeof Vec3 | typeof Vec4) {

    if (typeof prop === 'symbol') {
        return Reflect.set(target, prop, value, receiver)
    }

    const attrs = prop.split('')
    if (attrs.some(attr => !keyIn(attr, Vec.PROPS))) {
        return Reflect.set(target, prop, value, receiver)
    }

    if (attrs.length === 1) {
        const attr = attrs[0]
        if (keyIn(attr, Vec.PROPS)) {
            return Reflect.set(target, Vec.PROPS[attr], value, receiver)
        }
    }
    else {
        for (let i = 0; i < attrs.length; i++) {
            const attr = attrs[i]
            if (keyIn(attr, Vec.PROPS)) {
                Reflect.set(target, Vec.PROPS[attr], value[i], receiver)
            }
        }
    }

    return true
}

class Vec2 {

    [key: string]: any
    static readonly PROPS = {
        x: 'x',
        y: 'y',
        r: 'x',
        g: 'y',
        0: 'x',
        1: 'y',
    }

    static SIZE = 2
    
    constructor(x: number, y: number) {
        const _target = Object.create(Vec2.prototype)
        _target.x = x
        _target.y = y

        return new Proxy(_target, {
            get: function(target: Vec2, prop: string, receiver: any) {
                return getValue(target, prop, receiver, Vec2)
            },
            set: function(target: Vec2, prop: string, value: number, receiver: any) {
                return setValue(target, prop, value, receiver, Vec2)
            },
        })
    }

    [Symbol.toStringTag]() {
        return '[object Vec2]'
    }

    [Symbol.toPrimitive]() {

        return this.toString()
    }

    *[Symbol.iterator]() {
        yield this.x
        yield this.y
    }

    toString() {
        return `vec2(${this.x}, ${this.y})`
    }

    toJSON() {
        return [this.x, this.y]
    }
}

class Vec3 {
    [key: string]: any
    static readonly PROPS = {
        x: 'x',
        y: 'y',
        z: 'z',
        r: 'x',
        g: 'y',
        b: 'z',
        0: 'x',
        1: 'y',
        2: 'z',
    }
    static SIZE = 3

    constructor(x: number, y: number, z: number) {
        const _target = Object.create(Vec3.prototype)
        _target.x = x
        _target.y = y
        _target.z = z

        return new Proxy(_target, {
            get: function(target: Vec3, prop: string, receiver: any) {
                return getValue(target, prop, receiver, Vec3)
            },
            set: function(target: Vec3, prop: string, value: number, receiver: any) {
                return setValue(target, prop, value, receiver, Vec3)
            },
        })
    }

    [Symbol.toStringTag]() {
        return '[object Vec3]'
    }

    [Symbol.toPrimitive]() {
        return this.toString()
    }

    *[Symbol.iterator]() {
        yield this.x
        yield this.y
        yield this.z
    }

    toString() {
        return `vec3(${this.x}, ${this.y}, ${this.z})`
    }
    
    toJSON() {
        return [this.x, this.y, this.z]
    }
}

class Vec4 {
    [key: string]: any
    static readonly PROPS = {
        x: 'x',
        y: 'y',
        z: 'z',
        w: 'w',
        r: 'x',
        g: 'y',
        b: 'z',
        a: 'w',
        0: 'x',
        1: 'y',
        2: 'z',
        3: 'w',
    }
    static SIZE = 4

    constructor(x: number, y: number, z: number, w: number) {

        const _target = Object.create(Vec4.prototype)
        _target.x = x
        _target.y = y
        _target.z = z
        _target.w = w

        return new Proxy(_target, {
            get: function(target: Vec4, prop: string, receiver: any) {
                return getValue(target, prop, receiver, Vec4)
            },
            set: function(target: Vec4, prop: string, value: number, receiver: any) {
                return setValue(target, prop, value, receiver, Vec4)
            },
        })
    }

    [Symbol.toStringTag]() {
        return '[object Vec4]'
    }

    [Symbol.toPrimitive]() {
        return this.toString()
    }

    *[Symbol.iterator]() {
        yield this.x
        yield this.y
        yield this.z
        yield this.w
    }

    toString() {
        return `vec4(${this.x}, ${this.y}, ${this.z}, ${this.w})`
    }
    
    toJSON() {
        return [this.x, this.y, this.z, this.w]
    }
}

function vec2(x: number, y: number) {
    return new Vec2(x, y) as unknown as Vec<V2>
}

function vec3(x: number, y: number, z: number) {
    return new Vec3(x, y, z) as unknown as Vec<V3>
}

function vec4(x: number, y: number, z: number, w: number) {
    return new Vec4(x, y, z, w) as unknown as Vec<V4>
}

export { vec2, vec3, vec4 }
