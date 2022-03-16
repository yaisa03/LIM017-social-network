import { LogIn } from './components/LogIn.js';
import { Register } from './components/Register.js';
import { logIn, register } from './lib/Firestore.js';
/* eslint-disable camelcase */

// Declaracion de variables de ventanas
const pageOne = document.getElementById('containerPageOne');

const routes = {
  '/': LogIn,
  '/register': Register,
};

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  pageOne.innerHTML = routes[pathname]();
};

// Funcion que permite mostrar contraseña al presionar el icono
export function show_password(id1, id2, id3) {
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
export function hide_password(id1, id2, id3) {
  const eye = document.getElementById(id1);
  const eyeSlash = document.getElementById(id2);
  const password = document.getElementById(id3);
  eyeSlash.addEventListener('click', () => {
    eye.style.display = '';
    eyeSlash.style.display = 'none';
    password.setAttribute('type', 'password');
  });
}
// funcion queda funcionalidad a la pag Register
function showRegister() {
  const registerButton = document.getElementById('registerButton');
  show_password('eyeLogo2', 'eyeSlashLogo2', 'newUserPassword');
  hide_password('eyeLogo2', 'eyeSlashLogo2', 'newUserPassword');
  registerButton.addEventListener('click', () => {
    const email = document.getElementById('newUser').value;
    const password = document.getElementById('newUserPassword').value;
    register(email, password);
  });
}
// funcion que da funcionalida a LogIn
function showLogIn() {
  show_password('eyeLogo1', 'eyeSlashLogo1', 'password');
  hide_password('eyeLogo1', 'eyeSlashLogo1', 'password');
  const logInBtn = document.getElementById('logIn');
  logInBtn.addEventListener('click', () => {
    const email = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    logIn(email, password);
  });
  const newRegistry = document.getElementById('register');
  newRegistry.addEventListener('click', () => {
    onNavigate('/register');
    showRegister();
  });
}
// mostrar el logIn cuando carga la pagina
window.addEventListener('load', () => {
  onNavigate('/');
  showLogIn();
});
