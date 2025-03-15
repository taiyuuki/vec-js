import { describe, expect, it } from 'vitest'
import { vec2, vec3, vec4 } from 'src/lib/vector'
import { mix } from 'src/lib/mix'

describe('mix', () => {
    it('number', () => {
        expect(mix(1, 2, 0.5)).toBe(1.5)
        expect(mix(1, 2, 0)).toBe(1)
        expect(mix(1, 2, 1)).toBe(2)
    })

    it('vec2', () => {
        const a = vec2(1, 2)
        const b = vec2(3, 4)
        expect(mix(a, b, 0.5)).toEqual(vec2(2, 3))
        expect(mix(a, b, 0)).toEqual(vec2(1, 2))
        expect(mix(a, b, 1)).toEqual(vec2(3, 4))
    })

    it('vec3', () => {
        const a = vec3(1, 2, 3)
        const b = vec3(4, 5, 6)
        expect(mix(a, b, 0.5)).toEqual(vec3(2.5, 3.5, 4.5))
        expect(mix(a, b, 0)).toEqual(vec3(1, 2, 3))
        expect(mix(a, b, 1)).toEqual(vec3(4, 5, 6))
    })

    it('vec4', () => {
        const a = vec4(1, 2, 3, 4)
        const b = vec4(5, 6, 7, 8)
        expect(mix(a, b, 0.5)).toEqual(vec4(3, 4, 5, 6))
        expect(mix(a, b, 0)).toEqual(vec4(1, 2, 3, 4))
        expect(mix(a, b, 1)).toEqual(vec4(5, 6, 7, 8))
    })
})
