import { clamp } from './clamp'

function step(edge: number, x: number): number {
    return x < edge ? 0 : 1
}

function smoothstep(edge0: number, edge1: number, x: number): number {
    x = clamp((x - edge0) / (edge1 - edge0), 0, 1)

    return x * x * (3 - 2 * x)
}

export { step, smoothstep }
