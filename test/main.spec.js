/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
// importamos la funcion que vamos a testear
import {
  show_password, resetPassword, hide_password, BackToLogIn, showLogInGoogle, showRegister,
  showLogIn, goToLogIn, createNewPost, editPosts, deletePosts, navIcons, showProfile, showHome,
} from '../src/main.js';

// jest.mock('../src/lib/FirebaseImport.js');

// function show_password(id1, id2, id3)
describe('show_password', () => {
  it('debería ser una función', () => {
    // eslint-disable-next-line camelcase
    expect(typeof show_password).toBe('function');
  });
});
// function hide_password(id1, id2, id3)
describe('hide_password', () => {
  it('debería ser una función', () => {
    // eslint-disable-next-line camelcase
    expect(typeof hide_password).toBe('function');
  });
});
// function resetPassword()
describe('resetPassword', () => {
  it('debería ser una función', () => {
    // eslint-disable-next-line camelcase
    expect(typeof resetPassword).toBe('function');
  });
});
// function BackToLogIn()
describe('BackToLogIn', () => {
  it('debería ser una función', () => {
    // eslint-disable-next-line camelcase
    expect(typeof BackToLogIn).toBe('function');
  });
});
// function showLogInGoogle()
describe('showLogInGoogle', () => {
  it('debería ser una función', () => {
    // eslint-disable-next-line camelcase
    expect(typeof showLogInGoogle).toBe('function');
  });
});
// function showRegister()
describe('showRegister', () => {
  it('debería ser una función', () => {
    // eslint-disable-next-line camelcase
    expect(typeof showRegister).toBe('function');
  });
});
// function showLogIn()
describe('showLogIn', () => {
  it('debería ser una función', () => {
    // eslint-disable-next-line camelcase
    expect(typeof showLogIn).toBe('function');
  });
});
// export function goToLogIn()
describe('goToLogIn', () => {
  it('debería ser una función', () => {
    // eslint-disable-next-line camelcase
    expect(typeof goToLogIn).toBe('function');
  });
});
// function createNewPost()
describe('createNewPost', () => {
  it('debería ser una función', () => {
    // eslint-disable-next-line camelcase
    expect(typeof createNewPost).toBe('function');
  });
});
// export function editPosts()
describe('editPosts', () => {
  it('debería ser una función', () => {
    expect(typeof editPosts).toBe('function');
  });
});
// export function deletePosts()
describe('deletePosts', () => {
  it('debería ser una función', () => {
    expect(typeof deletePosts).toBe('function');
  });
});
// function navIcons()
describe('navIcons', () => {
  it('debería ser una función', () => {
    expect(typeof navIcons).toBe('function');
  });
});
// function showProfile()
describe('showProfile', () => {
  it('debería ser una función', () => {
    expect(typeof showProfile).toBe('function');
  });
});
// export function showHome()
describe('showHome', () => {
  it('debería ser una función', () => {
    expect(typeof showHome).toBe('function');
  });
});
