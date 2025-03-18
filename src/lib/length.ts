import type { VecType } from './types'

function length<T extends VecType>(x: T): number {
    let len = 0
    for (const i of x) {
        len += i ** 2
    }

    return Math.sqrt(len)
}

export { length }
