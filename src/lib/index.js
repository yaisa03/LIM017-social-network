// aqui exportaras las funciones que necesites
// eslint-disable-next-line import/no-cycle
import {
  editPosts, deletePosts, goToLogIn, showHome,
} from '../main.js';
import { ShowPostsById, ShowPosts } from '../components/ShowPosts.js';
// eslint-disable-next-line import/no-cycle
import { AddLikes, postLike, getArrayLikes } from './Firestore.js';

export function emailMessageVerificacionOK() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.add('showMessage');
  errorMessageText.innerText = 'correo de verificacion enviado!';
  setTimeout(goToLogIn, 2000);
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
export function removeMessageError() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.remove('showMessageError');
}
export function addMessageError() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.add('showMessageError');
}
export function removeMessage() {
  const errorMessageText = document.querySelector('#message');
  errorMessageText.classList.remove('showMessage');
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
export function getFileChoosenProfile() {
  const filechoosen = document.getElementById('chooseFile').files[0];
  return filechoosen;
}
export function getReferenceImg(url) {
  const img = document.getElementById('profilePhoto');
  img.setAttribute('src', url);
  return img;
}
export function getFileChoosenPost() {
  const filechoosen = document.getElementById('chooseFilePost').files[0];
  return filechoosen;
}
export function getFileChoosenPostEdit() {
  const filechoosen = document.getElementById('chooseFilePost1').files[0];
  return filechoosen;
}
export function showUserPostsById(snapshot) {
  const containerPosts = document.getElementById('postsContainer');
  containerPosts.innerHTML = '';
  snapshot.forEach((e) => {
    containerPosts.innerHTML += ShowPostsById(e, e.data());
    // if (e.data().image === '') {
    //  document.getElementById('uploadPostImages').style.display = 'none';
    // }
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
export function showPostsHome(querySnapshot) {
  const containerPosts = document.getElementById('postsContainer');
  containerPosts.innerHTML = '';
  let createdPosts = '';
  querySnapshot.forEach((d) => {
    createdPosts += ShowPosts(d, d.data());
    containerPosts.innerHTML = createdPosts;
    /* if (d.data().image === '') {
        document.getElementById('uploadPostImages').style.display = 'none';
      } */
    // console.log(d.data());
  });
  AddLikes();
}
export function putLikesPosts(user) {
  const likeButton = document.querySelectorAll('.likeButton');
  likeButton.forEach((e) => {
    e.addEventListener('click', async () => {
      // eslint-disable-next-line prefer-const
      let arrayLikes = await getArrayLikes(e.id);
      let count = 0;
      const arrayCounter = arrayLikes.length;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < arrayLikes.length; i++) {
        if (arrayLikes[i] === user.uid) {
          arrayLikes.splice(i, 1);
          postLike(e.id, arrayLikes);
          break;
        } else {
          // eslint-disable-next-line no-plusplus
          count++;
        }
      }
      if (count === arrayCounter) {
        arrayLikes.push(user.uid);
        postLike(e.id, arrayLikes);
      }
    });
  });
}
export function goToHome() {
  showHome();
}
