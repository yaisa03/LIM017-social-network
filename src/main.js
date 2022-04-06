/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import { LogIn } from './components/LogIn.js';
import { Register } from './components/Register.js';
import { ResetPassword } from './components/ResetPassword.js';
import { Posts } from './components/Posts.js';
// eslint-disable-next-line import/no-cycle
import { Profile } from './components/Profile.js';
// eslint-disable-next-line object-curly-newline
// eslint-disable-next-line import/no-cycle
import {
  logIn, register, logInGoogle, emailResetPassword, uploadPost,
  findPostById, findPosts, SignOut, updatePost, postDeleted, getURL,
} from './lib/Firestore.js';
/* eslint-disable camelcase */

// Declaracion de variables
const pageOne = document.getElementById('containerPageOne');
const root = document.getElementById('root');
// router
const routes = {
  '#/': LogIn,
  '#/register': Register,
  '#/resetpassword': ResetPassword,
  '#/home': Posts,
  '#/profile': Profile,
};
// Funcion que relaciona rutas con pathnames
const onNavigate = (pathname) => {
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
// funcion para enviar correo para reestablecer contraseña
export function resetPassword() {
  const resetPasswordButton = document.getElementById('resetPasswordButton');
  resetPasswordButton.addEventListener('click', () => {
    const emailReset = document.getElementById('emailReset').value;
    emailResetPassword(emailReset);
  });
}
export function BackToLogIn() {
  const backToLogIn = document.querySelector('.backToLogIn');
  backToLogIn.addEventListener('click', () => {
    goToLogIn();
  });
}
// funcion que permite hacer el inicio de sesion con google
export function showLogInGoogle() {
  const googleLogo = document.querySelector('.googleLogo');
  googleLogo.addEventListener('click', () => {
    logInGoogle();
  });
}
// funcion queda funcionalidad a la pag Register
export function showRegister() {
  const registerButton = document.getElementById('registerButton');
  show_password('eyeLogo2', 'eyeSlashLogo2', 'newUserPassword');
  hide_password('eyeLogo2', 'eyeSlashLogo2', 'newUserPassword');
  show_password('eyeLogo3', 'eyeSlashLogo3', 'newUserPassword2');
  hide_password('eyeLogo3', 'eyeSlashLogo3', 'newUserPassword2');
  registerButton.addEventListener('click', () => {
    const email = document.getElementById('newUser').value;
    const password = document.getElementById('newUserPassword').value;
    const confirmPassword = document.getElementById('newUserPassword2').value;
    const displayName = document.getElementById('newUserDisplayName').value;
    if (password === confirmPassword) {
      register(email, password, displayName);
    } else {
      alert('Las contraseñas deben ser iguales');
    }
  });
}
// funcion que da funcionalida a la pagina LogIn
export function showLogIn() {
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
    onNavigate('#/resetpassword');
    resetPassword();
    BackToLogIn();
  });
  // link que permite crear nuevo usuario con email
  const newRegistry = document.getElementById('register');
  newRegistry.addEventListener('click', () => {
    onNavigate('#/register');
    showRegister();
    BackToLogIn();
  });
  // funcion que permite iniciar sesion con google
  showLogInGoogle();
}
// funcion que lleva a la vista de inicio/logIn
export function goToLogIn() {
  onNavigate('#/');
  showLogIn();
}
// funcion que permite crear posts
export function createNewPost() {
  const errorMessage = document.getElementById('messagePost');
  const title = document.getElementById('title');
  const post = document.getElementById('post');
  const postButton = document.getElementById('postButton');
  errorMessage.classList.remove('showMessageError');
  errorMessage.innerHTML = '';
  postButton.addEventListener('click', (e) => {
    e.preventDefault();
    title.classList.remove('inputError');
    post.classList.remove('inputError');
    const createPost = document.getElementById('createPost');
    if (title.value === '' && post.value === '') {
      title.classList.add('inputError');
      post.classList.add('inputError');
      errorMessage.classList.add('showMessageError');
      errorMessage.innerHTML = 'Los campos no pueden estar vacios';
    } else if (title.value === '') {
      title.classList.add('inputError');
      errorMessage.classList.add('showMessageError');
      errorMessage.innerHTML = 'Debes ingresar un titulo';
    } else if (post.value === '') {
      post.classList.add('inputError');
      errorMessage.classList.add('showMessageError');
      errorMessage.innerHTML = 'Debes ingresar contenido al post';
    } else if (title.value !== '' && post.value !== '') {
      uploadPost(title.value, post.value);
      createPost.reset();
      errorMessage.classList.remove('showMessageError');
      errorMessage.innerHTML = '';
      if (window.location.hash === '#/profile') {
        return findPostById();
      }
    }
  });
}
// Funcion que permite editar los posts
export function editPosts() {
  const editButton = document.querySelectorAll('.editButton');
  editButton.forEach((button) => {
    button.addEventListener('click', () => {
      const text = document.querySelectorAll(`.text${button.id}`);
      text.forEach((e) => {
        e.removeAttribute('readonly');
        e.style.backgroundColor = 'white';
      });
      document.querySelector(`.editButton.${button.id}`).classList.add('hide');
      document.querySelector(`.publishButton.${button.id}`).classList.remove('hide');
    });
  });
  const publishButton = document.querySelectorAll('.publishButton');
  publishButton.forEach((button) => {
    button.addEventListener('click', () => {
      if (window.confirm('¿Estas seguro de guardar tus cambios?')) {
        const text = document.querySelectorAll(`.text${button.id}`);
        text.forEach((e) => {
          e.setAttribute('readonly', true);
          e.style.backgroundColor = '#FFF1CE';
          const title = document.querySelector(`.title.text${button.id}`);
          const post = document.querySelector(`.description.text${button.id}`);
          updatePost(button.id, title.value, post.value);
          document.querySelector(`.editButton.${button.id}`).classList.remove('hide');
          document.querySelector(`.publishButton.${button.id}`).classList.add('hide');
        });
      }
    });
  });
}
// Damos funcionalidad a boton para eliminar posts
export function deletePosts() {
  const deleteButton = document.querySelectorAll('.deleteButton');
  deleteButton.forEach((button) => {
    button.addEventListener('click', () => {
      if (window.confirm('¿Estas seguro de eliminar este post?')) {
        postDeleted(button.id);
        return findPostById();
      }
    });
  });
}
// funcionalidad de los iconos en el navegador
export function navIcons() {
  const Usericon = document.getElementById('Usericon');
  Usericon.addEventListener('click', showProfile);
  const Homeicon = document.getElementById('Homeicon');
  Homeicon.addEventListener('click', () => {
    root.classList.add('hideBackground');
    onNavigate('#/home');
    findPosts();
    createNewPost();
    navIcons();
  });
  const logOut = document.getElementById('logOut');
  logOut.addEventListener('click', () => {
    root.classList.remove('hideBackground');
    SignOut();
    onNavigate('#/');
    showLogIn();
  });
}
export function editProfilePhoto() {
  const btn = document.getElementById('EditPhoto');
  const modal = document.getElementById('cont');
  const uploadImage = document.getElementById('uploadImage');
  const closeModal = document.querySelector('i.fa.fa-remove');
  btn.addEventListener('click', () => {
    modal.classList.add('showContainer');
    closeModal.addEventListener('click', () => {
      modal.classList.remove('showContainer');
    });
  });
  uploadImage.addEventListener('click', () => {
    getURL();
    modal.classList.remove('showContainer');
  });
}

// vista del perfil y post creados por el usuario
export function showProfile() {
  onNavigate('#/profile');
  findPostById();
  createNewPost();
  navIcons();
  editProfilePhoto();
}

// vista de todos los posts
export function showHome() {
  root.classList.add('hideBackground');
  onNavigate('#/home');
  findPosts();
  createNewPost();
  navIcons();
}
// mostrar el logIn cuando carga la pagina
onNavigate('#/');
showLogIn();
