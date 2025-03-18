import type { VecArg } from './types'
import { clamp } from './clamp'

function mix<T extends VecArg>(x: T, y: T, a: number): T {
    a = clamp(a, 0, 1)
    if (typeof x === 'number' && typeof y === 'number') {
        return x * (1 - a) + y * a as T
    } 
    else if (typeof x === 'object' && typeof y === 'object') {
        const args = []
        const lenA = Object.keys(x).length
        const lenB = Object.keys(y).length

        if (lenA !== lenB) {
            throw new Error('a and b must have the same number of components')
        }

        for (let i = 0; i < lenA; i++) {
            args.push(mix(x[i], y[i], a))
        }

        return new (x.constructor as any)(...args) as T
    }
    else {
        throw new Error('a and b must be either numbers or Vecs')
    }
}

export { mix }
