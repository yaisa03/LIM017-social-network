import { LogIn } from './components/LogIn.js';
import { Register } from './components/Register.js';
import { ResetPassword } from './components/ResetPassword.js';
import { Posts } from './components/Posts.js';
// import { ShowPosts } from './components/ShowPosts.js';
// eslint-disable-next-line object-curly-newline
// eslint-disable-next-line import/no-cycle
import { logIn, register, logInGoogle, emailResetPassword, uploadPost, findPost } from './lib/Firestore.js';
/* eslint-disable camelcase */

// Declaracion de variables
const pageOne = document.getElementById('containerPageOne');
const root = document.getElementById('root');
const routes = {
  '/': LogIn,
  '/register': Register,
  '/resetpassword': ResetPassword,
  '/posts': Posts,
};
const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  pageOne.innerHTML = routes[pathname]();
};

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
// funcion para enviar correo para reestablecer contraseña
function resetPassword() {
  const resetPasswordButton = document.getElementById('resetPasswordButton');
  resetPasswordButton.addEventListener('click', () => {
    const emailReset = document.getElementById('emailReset').value;
    emailResetPassword(emailReset);
  });
}
// funcion que permite hacer el inicio de sesion con google
function showLogInGoogle() {
  const googleLogo = document.querySelector('.googleLogo');
  googleLogo.addEventListener('click', () => {
    logInGoogle();
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
// funcion que da funcionalida a la pagina LogIn
function showLogIn() {
  show_password('eyeLogo1', 'eyeSlashLogo1', 'password');
  hide_password('eyeLogo1', 'eyeSlashLogo1', 'password');
  // boton que permite iniciar sesion
  const logInBtn = document.getElementById('logIn');
  logInBtn.addEventListener('click', () => {
    const email = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    logIn(email, password);
  });
  // link que lleva a vista que permite reestablecer contraseña
  const forgotPasswordLink = document.getElementById('forgotPassword');
  forgotPasswordLink.addEventListener('click', () => {
    onNavigate('/resetpassword');
    resetPassword();
  });
  // link que permite crear nuevo usuario con email
  const newRegistry = document.getElementById('register');
  newRegistry.addEventListener('click', () => {
    onNavigate('/register');
    showRegister();
  });
  // funcion que permite iniciar sesion con google
  showLogInGoogle();
}
export function goToLogIn() {
  onNavigate('/');
  showLogIn();
}

export function showPostsPage() {
  root.classList.add('hideBackground');
  onNavigate('/posts');
  findPost();
  const postButton = document.getElementById('postButton');
  postButton.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const post = document.getElementById('post').value;
    const createPost = document.getElementById('createPost');
    uploadPost(title, post);
    createPost.reset();
  });
}
// mostrar el logIn cuando carga la pagina
window.addEventListener('load', () => {
  onNavigate('/');
  showLogIn();
});
