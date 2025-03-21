import type { Key, V2, V3, V4, Vec } from './types'

function keyIn<T extends object>(key: Key, obj: T): key is keyof T {
    return key in obj
}

function getValue(target: any, prop: string, receiver: any) {
    if (typeof prop === 'symbol') {
        return Reflect.get(target, prop, receiver)
    }
    const Vec = Object.getPrototypeOf(target).constructor

    const Vecs: any = [Vec2, Vec3, Vec4]
    
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
    if (values.length === 1) {
        return values[0]
    }
    else if (values.length <= 4) {
        return new Vecs[values.length - 2](...values)
    }
    else {
        return Reflect.get(target, prop, receiver)
    }
}

function setValue(target: any, prop: string, value: any, receiver: any) {
    if (typeof prop === 'symbol') {
        return Reflect.set(target, prop, value, receiver)
    }

    const Vec = Object.getPrototypeOf(target).constructor

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

class Vector {
    [key: string]: any
    static readonly _PROPS = ['x', 'y', 'z', 'w']

    constructor(values: number[]) {
        const _target = Object.create(Object.getPrototypeOf(this))

        values.forEach((value, index) => {
            _target[Vector._PROPS[index]] = value
        })

        return new Proxy(_target, {
            get: getValue,
            set: setValue,
        })
    }

    get SelfConstructor() {
        return Object.getPrototypeOf(this).constructor
    }

    add(v: Vector) {
        const args = []
        const Vec = this.SelfConstructor
        for (const k in this) {
            args.push(this[k] + v[k])
        }

        return new Vec(...args)
    }

    sub(v: Vector) {
        const args = []
        const Vec = this.SelfConstructor
        
        for (const k in this) {
            args.push(this[k] - v[k])
        }
 
        return new Vec(...args)
    }

    mul(v: Vector) {
        const args = []
        const Vec = this.SelfConstructor
        for (const k in this) {
            args.push(this[k] * v[k])
        }
 
        return new Vec(...args)
    }

    div(v: Vector) {
        const args = []
        const Vec = this.SelfConstructor
        for (const k in this) {
            args.push(this[k] / v[k])
        }
 
        return new Vec(...args)
    }

    dot(v: Vector) {
        let dot = 0
        for (const k in this) {
            dot += this[k] * v[k]
        }

        return dot
    }

    length() {
        let len = 0
        for (const a of this) {
            len += a ** 2
        }

        return Math.sqrt(len)
    }

    normalize() {
        const Vec = this.SelfConstructor
        const len = this.length()
        const args = []
        for (const a of this) {
            args.push(a / len)
        }
 
        return new Vec(...args)
    }

    angle(v: Vector) {
        const len1 = this.length()
        const len2 = v.length()
        const dot = this.dot(v)
        const cos = dot / (len1 * len2)

        return Math.acos(cos)
    }

    distance(v: Vector) {
        let d = 0
        for (const k in this) {
            d += (this[k] - v[k]) ** 2
        }
 
        return Math.sqrt(d)
    }

    lerp(v: Vector, t: number) {
        const Vec = Object.getPrototypeOf(this).constructor
        const args = []
        for (const k in this) {
            args.push(this[k] + (v[k] - this[k]) * t)
        }
 
        return new Vec(...args)
    }

    max(v: Vector) {
        const Vec = Object.getPrototypeOf(this).constructor
        const args = []
        for (const k in this) {
            args.push(Math.max(this[k], v[k]))
        }
 
        return new Vec(...args)
    }

    min(v: Vector) {
        const Vec = Object.getPrototypeOf(this).constructor
        const args = []
        for (const k in this) {
            args.push(Math.min(this[k], v[k]))
        }

        return new Vec(...args)
    }

    clone() {
        const Vec = Object.getPrototypeOf(this).constructor
        const args = []
        for (const a of this) {
            args.push(a)
        }
        
        return new Vec(...args)
    }

    equals(v: Vector) {
        for (const k in this) {
            if (Math.abs(this[k] - v[k]) > 0.00001) {
                return false
            }
        }
 
        return true
    }

    [Symbol.toStringTag]() {
        return '[Object Vector]'
    }

    [Symbol.toPrimitive]() {
        return this.toString()
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < Vector._PROPS.length; i++) {
            if (keyIn(Vector._PROPS[i], this)) {
                yield this[Vector._PROPS[i]]
            }
        }
    }

    toString() {
        const len = Object.keys(this).length
        let str = `vec${len}(`
        for (let i = 0; i < len; i++) {
            str += this[i] + (i === len - 1 ? '' : ',')
        }
        str += ')'

        return str
    }

    toJSON() {
        const json = []
        for (let i = 0; i < Object.keys(this).length; i++) {
            json.push(this[i])
        }

        return json
    }
}

class Vec2 extends Vector {
    [key: string]: any

    static readonly PROPS = {
        x: 'x',
        y: 'y',
        r: 'x',
        g: 'y',
        0: 'x',
        1: 'y',
    }
    
    constructor(x: number, y: number) {
        super([x, y])
    }

    [Symbol.toStringTag]() {
        return '[Object Vec2]'
    }
}

class Vec3 extends Vector {
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

    constructor(x: number, y: number, z: number) {
        super([x, y, z])
    }

    [Symbol.toStringTag]() {
        return '[Object Vec3]'
    }
}

class Vec4 extends Vector {
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

    constructor(x: number, y: number, z: number, w: number) {
        super([x, y, z, w])
    }

    [Symbol.toStringTag]() {
        return '[Object Vec4]'
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
