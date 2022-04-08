/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
// importamos la funcion que vamos a testear
import { emailVerification } from '../src/lib/Firestore.js';

jest.mock('../src/lib/FirebaseImport.js');

test('use jsdom in this test file', () => {
  const pageOne = document.getElementById('containerPageOne');
  expect(pageOne).not.toBeNull();
});

describe('emailVerification', () => {
  it('debería ser una función', () => {
    expect(typeof emailVerification).toBe('function');
  });
});
