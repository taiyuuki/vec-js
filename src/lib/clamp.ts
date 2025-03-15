import type { VecArg } from './types'

function clamp<T extends VecArg>(v: T, a: number, b: number): T {
    if (a > b) {
        [a, b] = [b, a]
    }
    if (typeof v === 'number') {
        return Math.min(Math.max(v, a), b) as T
    }
    else {
        const args = []
        const len = Object.keys(v).length

        for (let i = 0; i < len; i++) {
            args.push(clamp(v[i], a, b))
        }

        return new (v.constructor as any)(...args) as T
    }
}

export { clamp }
