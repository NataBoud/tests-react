import { describe, it, expect } from 'vitest'
import { isValidEmail } from '../utils/isValidEmail'

describe('isValidEmail()', () => {
    it('valide un email correct', () => {
        expect(isValidEmail('test@example.com')).toBe(true)
    })

    it('rejette un email invalide', () => {
        expect(isValidEmail('invalid@')).toBe(false)
    })

    it('rejette une chaîne vide', () => {
        expect(isValidEmail('')).toBe(false)
    })
})
