import '@testing-library/jest-dom'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from '../../test/msw/server'

// demarrer MSW avant les tests
beforeAll(() => {
    server.listen();
});

// reinitialiser les gestionnaires de requetes apres chaque test
afterEach(() => {
    server.resetHandlers();
});

// arreter MSW apres les tests
afterAll(() => {
    server.close();
});