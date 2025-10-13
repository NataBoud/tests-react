import { describe, it, expect } from 'vitest'
import { filtrerPairs } from '../utils/filtrerPairs'

describe('filtrerPairs()', () => {
    it('renvoie uniquement les nombres pairs', () => {
        expect(filtrerPairs([1, 2, 3, 4, 5])).toEqual([2, 4])
    })

    it('ignore les éléments non numériques', () => {
        expect(filtrerPairs([10, 'a', 15, 20])).toEqual([10, 20])
    })
})
