import type { VecArg } from './types'

function mix<T extends VecArg>(a: T, b: T, t: number): T {
    if (t < 0 || t > 1) {
        throw new Error('t must be between 0 and 1')
    }
    if (typeof a === 'number' && typeof b === 'number') {
        return a * (1 - t) + b * t as T
    } 
    else if (typeof a === 'object' && typeof b === 'object') {
        const args = []
        const lenA = Object.keys(a).length
        const lenB = Object.keys(b).length

        if (lenA !== lenB) {
            throw new Error('a and b must have the same number of components')
        }

        for (let i = 0; i < lenA; i++) {
            args.push(mix(a[i], b[i], t))
        }

        return new (a.constructor as any)(...args) as T
    }
    else {
        throw new Error('a and b must be either numbers or Vecs')
    }
}

export { mix }
