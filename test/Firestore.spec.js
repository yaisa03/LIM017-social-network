/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
// importamos la funcion que vamos a testear
// importamos la funcion que
// import { emailVerification } from '../src/lib/Firestore.js';

const fs = require('fs');

window.document.body.innerHTML = fs.readFileSync('./src/index.html');

const { emailVerification, register } = require('../src/lib/Firestore.js');
const { Register } = require('../src/components/Register.js');
const { Posts } = require('../src/components/Posts.js');
const { Profile } = require('../src/components/Profile.js');
const { ResetPassword } = require('../src/components/ResetPassword.js');
const { ShowPosts, ShowPostsById } = require('../src/components/ShowPosts.js');

jest.mock('../src/lib/FirebaseImport.js');

test('use jsdom in this test file', () => {
  const pageOne = document.getElementById('containerPageOne');
  expect(pageOne).not.toBeNull();
});

describe('Register', () => {
  it('should render without crashing', () => {
    const el = Register();
    expect(typeof el).toBe('string');
  });
});

describe('Posts', () => {
  it('should render without crashing', () => {
    const el = Posts();
    expect(typeof el).toBe('string');
  });
});

describe('Profile', () => {
  it('should render without crashing', () => {
    const el = Profile();
    expect(typeof el).toBe('string');
  });
});

describe('ResetPassword', () => {
  it('should render without crashing', () => {
    const el = ResetPassword();
    expect(typeof el).toBe('string');
  });
});

const post = {
  id: '123',
  url: 'Images/userImage.jpeg',
  likes: 5,
};

describe('ShowPosts', () => {
  it('should render without crashing', () => {
    const el = ShowPosts(post, post);
    expect(typeof el).toBe('string');
  });
});

describe('ShowPostsById', () => {
  it('should render without crashing', () => {
    const el = ShowPostsById(post, post);
    expect(typeof el).toBe('string');
  });
});

describe('emailVerification', () => {
  it('debería ser una función', () => {
    expect(typeof emailVerification).toBe('function');
  });
});

describe('register', () => {
  it('debería ser una función', () => {
    expect(typeof register).toBe('function');
  });
});
