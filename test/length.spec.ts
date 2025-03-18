import { describe, expect, it } from 'vitest'
import { length } from 'src/lib/length'
import { vec2, vec3, vec4 } from 'src/lib/vector'

describe('length', () => {
    it('should return the length of a vector', () => {
        const v2 = vec2(3, 4)
        const v3 = vec3(1, 2, 3)
        const v4 = vec4(1, 2, 3, 4)

        expect(length(v2)).toBe(5)
        expect(length(v3)).toBe(Math.sqrt(14))
        expect(length(v4)).toBe(Math.sqrt(30))
    })
})
