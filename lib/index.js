/* istanbul ignore file */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-cycle
import {
  editPosts, deletePosts, goToLogIn, showHome, AddLikes,
} from '../main.js';
import { ShowPostsById, ShowPosts } from '../components/ShowPosts.js';
// eslint-disable-next-line import/no-cycle
import {
  emailVerification, createUser, signIn,
  signInGoogle, passwordReset, urlPhoto, setUserPhoto, uploadPostImage,
  updatePostImage, findPostById, auth, updatePhotoPosts,
} from './Firestore.js';
// Funcion que llama a la funcion de firebase y el mensaje de envio de correo de verificacion
export function emailVerificacionMessage() {
  emailVerification().then(() => {
    const errorMessageText = document.querySelector('#message');
    errorMessageText.classList.add('showMessage');
    errorMessageText.innerText = 'correo de verificacion enviado!';
    setTimeout(goToLogIn, 2000);
  });
}
// Funcion que muestra los mensajes de error
export function messageErrorCases(errorMessage) {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.add('showMessageError');
  switch (errorMessage) {
    case 'Firebase: Error (auth/email-already-in-use).':
      errorMessageText.innerText = 'email ya registrado';
      break;
    case 'Firebase: Error (auth/internal-error).':
      errorMessageText.innerText = 'ingresar contraseña';
      break;
    case 'Firebase: Error (auth/invalid-email).':
      errorMessageText.innerText = 'email invalido';
      break;
    case 'Firebase: Error (auth/user-not-found).':
      errorMessageText.innerText = 'usuario no encontrado';
      break;
    case 'Firebase: Error (auth/wrong-password).':
      errorMessageText.innerText = 'contraseña incorrecta';
      break;
    case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
      errorMessageText.innerText = 'la contraseña debe tener al menos 6 caracteres';
      break;
    case 'Firebase: Error (auth/missing-email).':
      errorMessageText.innerText = 'ingresar email';
      break;
    default:
      break;
  }
}
// Funcion que llama a firebase para hacer el registro
export function register(email, password, displayname) {
  createUser(email, password, displayname).then(() => {
    emailVerificacionMessage();
  })
    .catch((error) => {
      const errorMessage = error.message;
      messageErrorCases(errorMessage);
    });
}
// Funcion que llama a firebase para hacer el inicio de sesion con Google
export function logInGoogle() {
  signInGoogle()
    .then((result) => {
      const user = result.user;
      // eslint-disable-next-line no-console
      console.log(user);
      showHome();
    }).catch((/* error */) => {
      // const errorMessage = error.message;
    });
}
// Funcion para limpiar la etiqueta de los mensajes de error
export function cleanMessageError() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.remove('showMessageError');
  errorMessageText.innerText = ' ';
}
// Funcion que muestra mensaje de error si el correo no esta verificado
export function verifyEmailMessage() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.add('showMessageError');
  errorMessageText.innerText = 'verificar usuario mediante el link enviado a tu correo';
}
// Funcion que valida si el correo fue verificado
export function validateEmailVerification(user) {
  switch (user.emailVerified) {
    case true:
      showHome();
      break;
    case false:
      verifyEmailMessage();
      break;
    default:
      break;
  }
}
// Funcion que llama a firebase para iniciar sesion
export function logIn(email, password) {
  signIn(email, password).then((userCredential) => {
    const user = userCredential.user;
    cleanMessageError();
    validateEmailVerification(user);
  })
    .catch(() => { });
}
// Funcion que agrega mensaje de exito a una ventana
export function addMessageError() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.add('showMessageError');
}
// Funcion que agrega mensaje de error a una ventana
export function removeMessageError() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.remove('showMessageError');
}
// Funcion que agrega mensaje de envio de correo de verificacion
export function addMessage() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.add('showMessage');
}
// Funcion que quita mensaje de envio de correo de verificacion
export function removeMessage() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.remove('showMessage');
}
// Funcion que agrega mensaje de envio de correo de reestablecimiento de contraseña
export function resetPasswordMessageOK() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.innerText = 'Email de reestablecimiento de contraseña enviado';
  setTimeout(goToLogIn, 2000);
}
// Funcion que llama a Firestore para el envio de correo de reestablecimiento de contraseña
export function emailResetPassword(email) {
  passwordReset(email)
    .then(() => {
      removeMessageError();
      addMessage();
      resetPasswordMessageOK();
    })
    .catch((error) => {
      const errorMessage = error.message;
      removeMessage();
      addMessageError();
      messageErrorCases(errorMessage);
    });
}
// Funcion que devuelve el archivo seleccionado por el usuario para su imagen de perfil
export function getFileChoosenProfile() {
  const filechoosen = document.getElementById('chooseFile').files[0];
  return filechoosen;
}
// Funcion que inserta la imagen de perfil del usuario
export function getReferenceImg(url) {
  const img = document.getElementById('profilePhoto');
  img.setAttribute('src', url);
  return img;
}
// Funcion que llama a la funcion de firestore que crea la URL de la foto de perfil del usuario
export function getURLProfilePhoto() {
  const filechoosen = getFileChoosenProfile();
  urlPhoto(filechoosen)
    .then((url) => {
      getReferenceImg(url);
      setUserPhoto(url).then(() => {
        updatePhotoPosts(url);
      });
    });
}
// Funcion que devuelve el archivo seleccionado por el usuario para su post
export function getFileChoosenPost() {
  const filechoosen = document.getElementById('chooseFilePost').files[0];
  return filechoosen;
}
// Funcion que llama a la funcion de firestore que crea la URL de la foto del post del usuario
export function getURLPostPhoto(title, post, level, type) {
  const filechoosen = getFileChoosenPost();
  return urlPhoto(filechoosen)
    // eslint-disable-next-line consistent-return
    .then((url) => {
      uploadPostImage(title, post, url, filechoosen.name, level, type);
      if (window.location.hash === '#/profile') {
        return findPostById();
      }
    });
}
// Funcion que devuelve el archivo elegido para editar la foto del post
export function getFileChoosenPostEdit() {
  const filechoosen = document.getElementById('chooseFilePost1').files[0];
  return filechoosen;
}
// funcion para editar foto del post
export function updatePostPhoto(id, title, post) {
  // Recuperar datos
  const filechoosen = getFileChoosenPostEdit();
  urlPhoto(filechoosen)
    .then((url) => {
      updatePostImage(id, title, post, url);
      findPostById();
    });
}
// Funcion que muestra los posts del usuario loggeado
export function showUserPostsById(snapshot) {
  const containerPosts = document.getElementById('postsContainer');
  containerPosts.innerHTML = '';
  snapshot.forEach((e) => {
    containerPosts.innerHTML += ShowPostsById(e, e.data());
    const button = document.querySelectorAll('.editButton');
    const text = document.querySelectorAll(`.${button.id}`);
    text.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.readonly = true;
    });
    editPosts();
    deletePosts();
  });
}
// Funcion que muestra los posts de todo los usuarios por tipo de receta
export function showPostsByType(snapshot) {
  const containerPosts = document.getElementById('postsContainer');
  containerPosts.innerHTML = '';
  snapshot.forEach((e) => {
    containerPosts.innerHTML += ShowPosts(e, e.data());
  });
}
// Funcion que muestra los posts de todos los usuarios
export function showPostsHome(querySnapshot) {
  const containerPosts = document.getElementById('postsContainer');
  containerPosts.innerHTML = '';
  let createdPosts = '';
  querySnapshot.forEach((d) => {
    createdPosts += ShowPosts(d, d.data());
    containerPosts.innerHTML = createdPosts;
  });
  AddLikes(auth.currentUser);
}
