import { describe, it, expect } from 'vitest'
import { moyenne } from '../utils/moyenne'

describe('moyenne()', () => {
    it('retourne la moyenne pour un tableau standard', () => {
        expect(moyenne([10, 20, 30])).toBe(20)
    })

    it('retourne la valeur unique si un seul élément', () => {
        expect(moyenne([5])).toBe(5)
    })

    it('lève une erreur si le tableau est vide', () => {
        expect(() => moyenne([])).toThrow('Le tableau ne peut pas être vide')
    })
})
