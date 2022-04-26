/* istanbul ignore file */
/* eslint-disable no-console */
// aqui exportaras las funciones que necesites
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

export function emailVerificacionMessage() {
  emailVerification().then(() => {
    const errorMessageText = document.querySelector('#message');
    errorMessageText.classList.add('showMessage');
    errorMessageText.innerText = 'correo de verificacion enviado!';
    setTimeout(goToLogIn, 2000);
  });
}
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
export function register(email, password, displayname) {
  createUser(email, password, displayname).then(() => {
    emailVerificacionMessage();
  })
    .catch((error) => {
      const errorMessage = error.message;
      messageErrorCases(errorMessage);
    });
}
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

export function cleanMessageError() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.remove('showMessageError');
  errorMessageText.innerText = ' ';
}
export function verifyEmailMessage() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.add('showMessageError');
  errorMessageText.innerText = 'verificar usuario mediante el link enviado a tu correo';
}

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
export function logIn(email, password) {
  signIn(email, password).then((userCredential) => {
    const user = userCredential.user;
    cleanMessageError();
    validateEmailVerification(user);
  })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      messageErrorCases(errorMessage);
    });
}

export function addMessageError() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.add('showMessageError');
}
export function removeMessage() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.remove('showMessage');
}
export function removeMessageError() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.remove('showMessageError');
}
export function addMessage() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.add('showMessage');
}
export function resetPasswordMessageOK() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.innerText = 'Email de reestablecimiento de contraseña enviado';
  setTimeout(goToLogIn, 2000);
}

export function emailResetPassword(email) {
  // const auth = getAuth();
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

export function getFileChoosenProfile() {
  const filechoosen = document.getElementById('chooseFile').files[0];
  return filechoosen;
}
export function getReferenceImg(url) {
  const img = document.getElementById('profilePhoto');
  img.setAttribute('src', url);
  return img;
}
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

export function getFileChoosenPost() {
  const filechoosen = document.getElementById('chooseFilePost').files[0];
  return filechoosen;
}
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
export function showPostsByType(snapshot) {
  const containerPosts = document.getElementById('postsContainer');
  containerPosts.innerHTML = '';
  snapshot.forEach((e) => {
    containerPosts.innerHTML += ShowPosts(e, e.data());
  });
}

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
