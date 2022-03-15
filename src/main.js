// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';

myFunction();

const register = document.getElementById('register');
register.addEventListener('click', () => {
  const pageTwo = document.getElementById('containerPageTwo');
  const pageOne = document.getElementById('containerPageOne');
  pageOne.style.display = 'none';
  pageTwo.style.display = '';
});

// eslint-disable-next-line camelcase
function show_password(id1, id2, id3) {
  const eye = document.getElementById(id1);
  const eyeSlash = document.getElementById(id2);
  const password = document.getElementById(id3);
  eye.addEventListener('click', () => {
    eye.style.display = 'none';
    eyeSlash.style.display = '';
    password.setAttribute('type', 'text');
  });
}
// eslint-disable-next-line camelcase
function hide_password(id1, id2, id3) {
  const eye = document.getElementById(id1);
  const eyeSlash = document.getElementById(id2);
  const password = document.getElementById(id3);
  eyeSlash.addEventListener('click', () => {
    eye.style.display = '';
    eyeSlash.style.display = 'none';
    password.setAttribute('type', 'password');
  });
}
show_password('eyeLogo1', 'eyeSlashLogo1', 'password');
hide_password('eyeLogo1', 'eyeSlashLogo1', 'password');
show_password('eyeLogo2', 'eyeSlashLogo2', 'newUserPassword');
hide_password('eyeLogo2', 'eyeSlashLogo2', 'newUserPassword');
