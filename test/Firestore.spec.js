/* eslint-disable import/no-unresolved */
// importamos la funcion que vamos a testear
import { emailVerification } from '../src/lib/Firestore.js';

describe('emailVerification', () => {
  it('debería ser una función', () => {
    expect(typeof emailVerification).toBe('function');
  });
});
