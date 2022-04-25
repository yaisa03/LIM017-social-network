/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
// importamos la funcion que vamos a testear
// import { emailVerification } from '../src/lib/Firestore.js';

const fs = require('fs');

document.body.innerHTML = fs.readFileSync('./src/index.html');

const {
  createUser, emailVerification, signIn, signInGoogle, passwordReset,
  SignOut, setUserPhoto, setUserInfo, uploadPostImage, findPosts,
  urlPhoto, postDeleted, findPostByType, postLike, updatePost, getArrayLikes,
  findPostById, updatePhotoPosts, updateNamePosts, deleteUserPosts, updatePostImage,
  deleteAccount,
  /*  getURLProfilePhoto,  */
} = require('../src/lib/Firestore.js');
const { getAuth } = require('../src/lib/FirebaseImport.js');

const {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification,
  signInWithPopup, sendPasswordResetEmail, signOut, updateProfile, deleteDoc,
  getDownloadURL, GoogleAuthProvider, addDoc, onSnapshot, setDoc, getDocs, deleteUser,
} = require('../src/lib/FirebaseImport.js');

jest.mock('../src/lib/FirebaseImport.js');

test('use jsdom in this test file', () => {
  const pageOne = document.getElementById('containerPageOne');
  expect(pageOne).not.toBeNull();
});

describe('emailVerification', () => {
  it('debería retornar una funcion', () => {
    expect(emailVerification()).toEqual(sendEmailVerification());
  });
  it('Debería enviar un correo de verificacion', () => sendEmailVerification()
    .then(() => {
      expect(sendEmailVerification).toHaveBeenCalled();
      expect(sendEmailVerification.mock.calls[0][0]).toEqual(getAuth().currentUser);
    }));
});
describe('createUser', () => {
  it('debería retornar una funcion', () => {
    expect(createUser('some@mail.com', '12345', 'username')).toEqual(createUserWithEmailAndPassword());
  });
  it('Debería crear un nuevo usuario', () => createUserWithEmailAndPassword()
    .then(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(createUserWithEmailAndPassword.mock.calls[0][0]).toEqual(getAuth());
      expect(createUserWithEmailAndPassword.mock.calls[0][1]).toEqual('some@mail.com');
      expect(createUserWithEmailAndPassword.mock.calls[0][2]).toEqual('12345');
    }));
  it('Debería actualizar nombre de usuario', () => updateProfile()
    .then(() => {
      expect(updateProfile).toHaveBeenCalled();
      expect(updateProfile.mock.calls[0][0]).toEqual(getAuth().currentUser);
      // eslint-disable-next-line object-curly-spacing
      // eslint-disable-next-line quote-props
      expect(updateProfile.mock.calls[0][1]).toEqual({ 'displayName': 'username' });
    }));
  /* it('DEBERIA FALLAR', () => {
    expect.assertions(0);
    return (updateProfile().catch((e) => expect(e).toEqual({
      error: 'usuario no fue actualizado',
    })));
  }); */
  /*   beforeEach(() => {
    getAuth.mockImplementationOnce({ currentUser: null });
  }); */
  /* it('should throw an error, when user is invalid', () => {
    updateProfile().mockImplementation(() => Promise.reject('usuario no fue actualizado'));
    expect(updateProfile().mockRejectedValue()).toEqual('usuario no fue actualizado');
  }); */
});

describe('signIn', () => {
  it('debería retornar una funcion', () => {
    expect(signIn('some@mail.com', '12345')).toEqual(signInWithEmailAndPassword());
  });
  it('Debería loggear al usuario', () => signInWithEmailAndPassword()
    .then(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalled();
      expect(signInWithEmailAndPassword.mock.calls[0][0]).toEqual(getAuth());
      expect(signInWithEmailAndPassword.mock.calls[0][1]).toEqual('some@mail.com');
      expect(signInWithEmailAndPassword.mock.calls[0][2]).toEqual('12345');
    }));
  it('should throw an error, when user is invalid', () => {
    signIn('', '')
      .catch(() => {
        expect(signIn).toEqual('no se inicio sesion');
      });
  });
});
// googleInicioSesion
describe('signInGoogle', () => {
  it('debería retornar una funcion', () => {
    expect(signInGoogle()).toEqual(signInWithPopup());
  });
  it('Debería loggear al usuario', () => signInWithPopup()
    .then(() => {
      expect(signInWithPopup).toHaveBeenCalled();
      expect(signInWithPopup.mock.calls[0][0]).toEqual(getAuth());
      expect(signInWithPopup.mock.calls[0][1]).toEqual(new GoogleAuthProvider());
    }));
});
// envioCorreoRecuperacionContrasena
describe('passwordReset', () => {
  it('debería retornar una funcion', () => {
    expect(passwordReset('some@mail.com')).toEqual(sendPasswordResetEmail());
  });
  it('Debería loggear al usuario', () => sendPasswordResetEmail()
    .then(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalled();
      expect(sendPasswordResetEmail.mock.calls[0][0]).toEqual(getAuth());
      expect(sendPasswordResetEmail.mock.calls[0][1]).toEqual('some@mail.com');
    }));
  it('debería retornar error', () => {
    passwordReset('')
      .catch(() => {
        expect(passwordReset).toEqual('no se envio el correo');
      });
  });
});

describe('setUserPhoto', () => {
  it('Deberia retornar la photo setup', () => {
    expect(setUserPhoto('photo.jpeg')).toEqual(updateProfile());
  });
});

describe('updatePhotoPosts', () => {
  it('Deberia retornar', () => {
    expect(updatePhotoPosts('photo.jpeg')).toEqual(findPostById());
  });
});

describe('updateNamePosts', () => {
  it('Deberia retornar', () => {
    expect(updateNamePosts('username')).toEqual(getDocs());
  });
});
describe('deleteUserPosts', () => {
  it('Deberia retornar', () => {
    expect(deleteUserPosts('username')).toEqual(getDocs());
  });
});

describe('setUserInfo', () => {
  it('Deberia retornar la informacion del usuario', () => {
    expect(setUserInfo('newUserName')).toEqual(updateProfile());
  });
});
describe('urlPhoto', () => {
  it('Deberia retornar la url de la photo', () => {
    expect(urlPhoto('file.jpeg')).toEqual(getDownloadURL());
  });
});
describe('uploadPostImage', () => {
  it('Deberia subir el post con foto photo', () => {
    expect(uploadPostImage('title', 'postDescription', 'url', 'storageName', 'level', 'type')).toEqual(addDoc());
  });
});
describe('findPostByType', () => {
  it('Deberia retornar los post por categoria', () => {
    expect(findPostByType('type')).toEqual(onSnapshot());
  });
});

describe('findPosts', () => {
  it('Deberia retornar los post por categoria', () => {
    expect(findPosts()).toEqual(onSnapshot());
  });
});
describe('postDeleted', () => {
  it('debería retornar una funcion', () => {
    expect(postDeleted('id')).toEqual(deleteDoc());
  });
  it('Debería enviar un correo de verificacion', () => {
    expect(deleteDoc).toHaveBeenCalled();
    // eslint-disable-next-line quote-props
    expect(deleteDoc.mock.calls[0][0]).toEqual({ 'posts': 'id' });
  });
});

describe('postLike', () => {
  it('Deberia retornar los post por categoria', () => {
    expect(postLike('id', 'newArray')).toEqual(setDoc());
  });
});

describe('getArrayLikes', () => {
  it('Deberia retornar los post por categoria', () => {
    expect(typeof getArrayLikes('id')).toBe('object');
  });
});

describe('updatePost', () => {
  it('Deberia actualizar los post', () => {
    expect(updatePost('id', 'title', 'post')).toEqual(setDoc());
  });
});

describe('updatePostImage', () => {
  it('Deberia actualizar los post', () => {
    expect(updatePostImage('id', 'title', 'post', 'url')).toEqual(setDoc());
  });
});

describe('SignOut', () => {
  it('Deberia cerrar sesion', () => {
    expect(SignOut()).toEqual(signOut());
  });
  /* beforeEach(() => {
    getAuth.mockImplementationOnce({ currentUser: null });
  });
  it('No deberia cerrar sesion', () => {
    SignOut()
      .catch(() => {
        console.log(SignOut);
        expect(SignOut).toEqual('no se cerro sesion');
      });
  });
  it('mock', () => {
    signOut()
      .catch(() => {
        expect(signOut).toEqual('no se cerro sesion');
      });
  }); */
});

describe('deleteAccount', () => {
  it('Deberia retornar la photo setup', () => {
    expect(deleteAccount()).toEqual(deleteUser());
  });
});
