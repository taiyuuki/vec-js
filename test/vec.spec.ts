import { describe, expect, it } from 'vitest'
import { vec2, vec3, vec4 } from 'src/lib/vector'

describe('Vec', () => {
    it('vec2', () => {
        const v = vec2(1, 2)

        expect(v.x).toBe(1)
        expect(v.y).toBe(2)
        expect(v.r).toBe(1)
        expect(v.g).toBe(2)
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)
        expect(v.yy).toEqual(vec2(2, 2))
        expect(v.xx).toEqual(vec2(1, 1))
        expect(v.xyx).toEqual(vec3(1, 2, 1))
        expect(v.rg).toEqual(vec2(1, 2))

        v.x = 3
        v.y = 4
        expect(v.x).toBe(3)
        expect(v.y).toBe(4)

        v.xy = vec2(5, 6)
        expect(v.x).toBe(5)
        expect(v.y).toBe(6)

        v[0] = 7
        v[1] = 8
        expect(v.x).toBe(7)
        expect(v.y).toBe(8)

        expect(v.toString()).toMatchInlineSnapshot('"vec2(7,8)"')
        expect(JSON.stringify(v)).toMatchInlineSnapshot('"[7,8]"')

        let i = 0
        for (const k of v) {
            expect(k).toBe(v[i])
            i++
        }
    })

    it('vec3', () => {
        const v = vec3(1, 2, 3)

        expect(v.x).toBe(1)
        expect(v.y).toBe(2)
        expect(v.z).toBe(3)
        expect(v.r).toBe(1)
        expect(v.g).toBe(2)
        expect(v.b).toBe(3)
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)
        expect(v[2]).toBe(3)
        expect(v.zz).toEqual(vec2(3, 3))
        expect(v.xx).toEqual(vec2(1, 1))
        expect(v.xy).toEqual(vec2(1, 2))
        expect(v.xyz).toEqual(vec3(1, 2, 3))
        expect(v.rgb).toEqual(vec3(1, 2, 3))

        v.x = 4
        v.y = 5
        expect(v.x).toBe(4)
        expect(v.y).toBe(5)

        v.xy = vec2(6, 7)
        expect(v.x).toBe(6)
        expect(v.y).toBe(7)

        v.r = 7
        v.g = 8
        expect(v.r).toBe(7)
        expect(v.g).toBe(8)

        v.rgb = vec3(9, 10, 11)
        expect(v.x).toBe(9)
        expect(v.y).toBe(10)
        expect(v.z).toBe(11)

        v[0] = 12
        v[1] = 13
        v[2] = 14
        expect(v.x).toBe(12)
        expect(v.y).toBe(13)
        expect(v.z).toBe(14)

        expect(v.toString()).toMatchInlineSnapshot('"vec3(12,13,14)"')
        expect(JSON.stringify(v)).toMatchInlineSnapshot('"[12,13,14]"')

        let i = 0
        for (const k of v) {
            expect(k).toBe(v[i])
            i++
        }
    })

    it('vec4', () => {
        const v = vec4(1, 2, 3, 4)

        expect(v.x).toBe(1)
        expect(v.y).toBe(2)
        expect(v.z).toBe(3)
        expect(v.w).toBe(4)
        expect(v.r).toBe(1)
        expect(v.g).toBe(2)
        expect(v.b).toBe(3)
        expect(v.a).toBe(4)
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)
        expect(v[2]).toBe(3)
        expect(v[3]).toBe(4)
        expect(v.ww).toEqual(vec2(4, 4))
        expect(v.xx).toEqual(vec2(1, 1))
        expect(v.xy).toEqual(vec2(1, 2))
        expect(v.xyz).toEqual(vec3(1, 2, 3))
        expect(v.xyzw).toEqual(vec4(1, 2, 3, 4)) 
        expect(v.rgba).toEqual(vec4(1, 2, 3, 4)) 
        expect(v.rg).toEqual(vec2(1, 2))

        v.x = 5
        v.y = 6
        expect(v.x).toBe(5)
        expect(v.y).toBe(6)

        v.xy = vec2(7, 8)
        expect(v.x).toBe(7)
        expect(v.y).toBe(8)

        v.r = 8
        v.g = 9
        expect(v.x).toBe(8)
        expect(v.y).toBe(9)

        v.rgb = vec3(10, 11, 12)
        expect(v.x).toBe(10)
        expect(v.y).toBe(11)
        expect(v.z).toBe(12)

        v.a = 13
        expect(v.a).toBe(13)

        v.rgba = vec4(14, 15, 16, 17)
        expect(v.x).toBe(14)
        expect(v.y).toBe(15)
        expect(v.z).toBe(16)
        expect(v.w).toBe(17)

        v[0] = 18
        v[1] = 19
        v[2] = 20
        v[3] = 21
        expect(v.x).toBe(18)
        expect(v.y).toBe(19)
        expect(v.z).toBe(20)
        expect(v.w).toBe(21)

        expect(v.toString()).toMatchInlineSnapshot('"vec4(18,19,20,21)"')
        expect(JSON.stringify(v)).toMatchInlineSnapshot('"[18,19,20,21]"')

        let i = 0
        for (const k of v) {
            expect(k).toBe(v[i])
            i++
        }
    })

    it('vec2.add', () => {
        const v1 = vec2(1, 2)
        const v2 = vec2(3, 4)

        expect(v1.add(v2)).toEqual(vec2(4, 6))
    })

    it('vec3.add', () => {
        const v1 = vec3(1, 2, 3)
        const v2 = vec3(4, 5, 6)

        expect(v1.add(v2)).toEqual(vec3(5, 7, 9))
    })

    it('vec4.add', () => {
        const v1 = vec4(1, 2, 3, 4)
        const v2 = vec4(5, 6, 7, 8)

        expect(v1.add(v2)).toEqual(vec4(6, 8, 10, 12))
    })

    it('vec2.sub', () => {
        const v1 = vec2(1, 2)
        const v2 = vec2(3, 4)

        expect(v1.sub(v2)).toEqual(vec2(-2, -2))
    })

    it('vec3.sub', () => {
        const v1 = vec3(1, 2, 3)
        const v2 = vec3(4, 5, 6)

        expect(v1.sub(v2)).toEqual(vec3(-3, -3, -3))
    })

    it('vec4.sub', () => {
        const v1 = vec4(1, 2, 3, 4)
        const v2 = vec4(5, 6, 7, 8)

        expect(v1.sub(v2)).toEqual(vec4(-4, -4, -4, -4))
    })

    it('vec2.mul', () => {
        const v1 = vec2(1, 2)
        const v2 = vec2(3, 4)

        expect(v1.mul(v2)).toEqual(vec2(3, 8))
    })

    it('vec3.mul', () => {
        const v1 = vec3(1, 2, 3)
        const v2 = vec3(4, 5, 6)

        expect(v1.mul(v2)).toEqual(vec3(4, 10, 18))
    })

    it('vec4.mul', () => {
        const v1 = vec4(1, 2, 3, 4)
        const v2 = vec4(5, 6, 7, 8)

        expect(v1.mul(v2)).toEqual(vec4(5, 12, 21, 32))
    })

    it('vec2.dot', () => {
        const v1 = vec2(1, 2)
        const v2 = vec2(3, 4)

        expect(v1.dot(v2)).toBe(11)
    })

    it('vec3.dot', () => {
        const v1 = vec3(1, 2, 3)
        const v2 = vec3(4, 5, 6)

        expect(v1.dot(v2)).toBe(32)
    })

    it('vec4.dot', () => {
        const v1 = vec4(1, 2, 3, 4)
        const v2 = vec4(5, 6, 7, 8)

        expect(v1.dot(v2)).toBe(70)
    })

    it('vec2.length', () => {
        const v = vec2(3, 4)

        expect(v.length()).toBe(5)
    })

    it('vec3.length', () => {
        const v = vec3(3, 4, 5)

        expect(v.length()).toBeCloseTo(7.0710678)
    })

    it('vec4.length', () => {
        const v = vec4(3, 4, 5, 6)

        expect(v.length()).toBeCloseTo(9.273618)
    })

    it('vec2.normalize', () => {
        const v = vec2(3, 4)

        expect(v.normalize().length()).toBeCloseTo(1)
    })

    it('vec3.normalize', () => {
        const v = vec3(3, 4, 5)

        expect(v.normalize().length()).toBeCloseTo(1)
    })

    it('vec4.normalize', () => {
        const v = vec4(3, 4, 5, 6)

        expect(v.normalize().length()).toBeCloseTo(1)
    })

    it('vec2.equals', () => {
        const v1 = vec2(1, 2)
        const v2 = vec2(1, 2)
        const v3 = vec2(3, 4)

        expect(v1.equals(v2)).toBe(true)
        expect(v1.equals(v3)).toBe(false)
    })

    it('vec3.equals', () => {
        const v1 = vec3(1, 2, 3)
        const v2 = vec3(1, 2, 3)
        const v3 = vec3(3, 4, 5)

        expect(v1.equals(v2)).toBe(true)
        expect(v1.equals(v3)).toBe(false)
    })

    it('vec4.equals', () => {
        const v1 = vec4(1, 2, 3, 4)
        const v2 = vec4(1, 2, 3, 4)
        const v3 = vec4(3, 4, 5, 6)

        expect(v1.equals(v2)).toBe(true)
        expect(v1.equals(v3)).toBe(false)
    })

    it('vec2.distance', () => {
        const v1 = vec2(1, 2)
        const v2 = vec2(3, 4)

        expect(v1.distance(v2)).toBeCloseTo(2.8284)
    })

    it('vec3.distance', () => { 
        const v1 = vec3(1, 2, 3)
        const v2 = vec3(4, 5, 6)

        expect(v1.distance(v2)).toBeCloseTo(5.1961)
    })

    it('vec4.distance', () => {
        const v1 = vec4(1, 2, 3, 4)
        const v2 = vec4(5, 6, 7, 8)

        expect(v1.distance(v2)).toBeCloseTo(8)
    })

    it('vec2.lerp', () => {
        const v1 = vec2(1, 2)
        const v2 = vec2(3, 4)

        expect(v1.lerp(v2, 0)).toEqual(vec2(1, 2))
        expect(v1.lerp(v2, 0.5)).toEqual(vec2(2, 3))
        expect(v1.lerp(v2, 1)).toEqual(vec2(3, 4))
    })

    it('vec3.lerp', () => {
        const v1 = vec3(1, 2, 3)
        const v2 = vec3(4, 5, 6)

        expect(v1.lerp(v2, 0)).toEqual(vec3(1, 2, 3))
        expect(v1.lerp(v2, 0.5)).toEqual(vec3(2.5, 3.5, 4.5))
        expect(v1.lerp(v2, 1)).toEqual(vec3(4, 5, 6))
    })

    it('vec4.lerp', () => {
        const v1 = vec4(1, 2, 3, 4)
        const v2 = vec4(5, 6, 7, 8)

        expect(v1.lerp(v2, 0)).toEqual(vec4(1, 2, 3, 4))
        expect(v1.lerp(v2, 0.5)).toEqual(vec4(3, 4, 5, 6))
        expect(v1.lerp(v2, 1)).toEqual(vec4(5, 6, 7, 8))
    })

    it('vec2.angle', () => {
        const v1 = vec2(1, 0)
        const v2 = vec2(0, 1)

        expect(v1.angle(v2)).toBeCloseTo(Math.PI / 2)
    })

    it('vec3.angle', () => {
        const v1 = vec3(1, 0, 0)
        const v2 = vec3(0, 1, 0)

        expect(v1.angle(v2)).toBeCloseTo(Math.PI / 2)
    })

    it('vec4.angle', () => {
        const v1 = vec4(1, 0, 0, 0)
        const v2 = vec4(0, 1, 0, 0)

        expect(v1.angle(v2)).toBeCloseTo(Math.PI / 2)   
    })
})

