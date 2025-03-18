import { describe, expect, it } from 'vitest'
import { smoothstep, step } from 'src/lib/step'

describe('step', () => {
    it('should return 0 if x < edge', () => {
        expect(step(1, 0)).toBe(0)
        expect(step(2, 1)).toBe(0)
        expect(step(1, 0.5)).toBe(0)
    })

    it('should return 1 if x >= edge', () => {
        expect(step(1, 1)).toBe(1)
        expect(step(1, 2)).toBe(1)
        expect(step(1, 1.5)).toBe(1)
    })
})

describe('smoothstep', () => {
    it('should return 0 if x < edge0', () => {
        expect(smoothstep(1, 2, 0)).toBe(0)
        expect(smoothstep(1, 2, -1)).toBe(0)
        expect(smoothstep(1, 2, 0.5)).toBe(0)
    })

    it('should return 1 if x >= edge1', () => {
        expect(smoothstep(1, 2, 2)).toBe(1)
        expect(smoothstep(1, 2, 3)).toBe(1)
        expect(smoothstep(1, 2, 2.5)).toBe(1)
    })

    it('should return a smooth interpolation between 0 and 1 if x is between edge0 and edge1', () => {
        expect(smoothstep(1, 2, 1.5)).toBe(0.5)
        expect(smoothstep(1, 2, 1.75)).toBe(0.84375)
        expect(smoothstep(1, 2, 1.25)).toBe(0.15625)
    })
})
