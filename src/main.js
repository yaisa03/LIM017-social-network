/* eslint-disable camelcase */
import { logIn, register } from './lib/Firestore.js';

// Declaracion de variables de botones
const logInButton = document.getElementById('logIn');

// Declaracion de variables de ventanas
const pageTwo = document.getElementById('containerPageTwo');
const pageOne = document.getElementById('containerPageOne');
const pageThree = document.getElementById('containerPageThree');

// Funcion que controla ventanas
function navigation(hash) {
  switch (hash) {
    case '#registro':
      pageOne.style.display = 'none';
      pageTwo.style.display = '';
      break;
    case '#logIn':
      pageOne.style.display = 'none';
      pageThree.style.display = '';
      break;
    default:
      break;
  }
}
// Funcion que indica que cuando camabie el hash hara algo, en este caso cambiar de ventana
window.addEventListener('hashchange', () => {
  navigation(window.location.hash);
});

logInButton.addEventListener('click', () => {
  const email = document.getElementById('user').value;
  const password = document.getElementById('password').value;
  logIn(email, password);
});
/*
const registerLink = document.getElementById('register');
registerLink.addEventListener('click', () => {
  navigation(2);
}); */

const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', () => {
  const email = document.getElementById('newUser').value;
  const password = document.getElementById('newUserPassword').value;
  register(email, password);
});
// Funcion que permite mostrar contraseña al presionar el icono
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
// Funcion que permite ocultar contraseña al presionar el icono
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
