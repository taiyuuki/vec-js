import { describe, expect, it } from 'vitest'
import { vec2, vec3, vec4 } from 'src/lib/vector'
import { clamp } from 'src/lib/clamp'

describe('clamp', () => {
    it('number', () => {
        expect(clamp(1, 0, 2)).toBe(1)
        expect(clamp(3, 0, 2)).toBe(2)
        expect(clamp(-1, 0, 2)).toBe(0)
    })

    it('vec2', () => {
        const v = vec2(1, 2)
        expect(clamp(v, 0, 2)).toEqual(vec2(1, 2))
        expect(clamp(v, 0, 1)).toEqual(vec2(1, 1))
        expect(clamp(v, 1, 2)).toEqual(vec2(1, 2))
        expect(clamp(v, 1, 3)).toEqual(vec2(1, 2))
    })

    it('vec3', () => {
        const v = vec3(1, 2, 3)
        expect(clamp(v, 0, 2)).toEqual(vec3(1, 2, 2))
        expect(clamp(v, 0, 1)).toEqual(vec3(1, 1, 1))
        expect(clamp(v, 1, 2)).toEqual(vec3(1, 2, 2))
        expect(clamp(v, 1, 3)).toEqual(vec3(1, 2, 3))
    })

    it('vec4', () => {
        const v = vec4(1, 2, 3, 4)
        expect(clamp(v, 0, 2)).toEqual(vec4(1, 2, 2, 2))
        expect(clamp(v, 0, 1)).toEqual(vec4(1, 1, 1, 1))
        expect(clamp(v, 1, 2)).toEqual(vec4(1, 2, 2, 2))
        expect(clamp(v, 1, 3)).toEqual(vec4(1, 2, 3, 3))
    })
})
