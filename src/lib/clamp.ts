import type { VecArg } from './types'

function clamp<T extends VecArg>(x: T, minValue: number, maxValue: number): T {
    if (minValue > maxValue) {
        [minValue, maxValue] = [maxValue, minValue]
    }
    if (typeof x === 'number') {
        return Math.min(Math.max(x, minValue), maxValue) as T
    }
    else {
        const args = []
        const len = Object.keys(x).length

        for (let i = 0; i < len; i++) {
            args.push(clamp(x[i], minValue, maxValue))
        }

        return new (x.constructor as any)(...args) as T
    }
}

function saterate<T extends VecArg>(x: T): T {
    return clamp(x, 0, 1) as T
}

export { clamp, saterate }
