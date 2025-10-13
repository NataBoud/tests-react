import { describe, it, expect } from 'vitest'
import { capitalize } from '../utils/capitalize'

describe('capitalize()', () => {
    it('met en majuscule la première lettre', () => {
        expect(capitalize('bonjour')).toBe('Bonjour')
    })

    it('ne modifie pas le reste de la chaîne', () => {
        expect(capitalize('rEact')).toBe('REact')
    })

    it('lève une erreur si entrée non chaîne', () => {
        // @ts-expect-error test volontaire
        expect(() => capitalize(123)).toThrow()
    })
})
