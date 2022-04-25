/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
// importamos la funcion que vamos a testear
// import { emailVerification } from '../src/lib/Firestore.js';

const fs = require('fs');

window.document.body.innerHTML = fs.readFileSync('./src/index.html');

const {
  createUser, emailVerification, signIn, signInGoogle, passwordReset,
  SignOut, setUser, setUserPhoto, setUserInfo, uploadPostImage,
  urlPhoto, postDeleted, findPostByType, postLike, updatePost, getArrayLikes,
  /* deleteUserPosts, deleteAccount, getURLProfilePhoto, updatePhotoPosts, */
} = require('../src/lib/Firestore.js');
const { Register } = require('../src/components/Register.js');
const { Posts } = require('../src/components/Posts.js');
const { Profile } = require('../src/components/Profile.js');
const { ResetPassword } = require('../src/components/ResetPassword.js');
const { ShowPosts, ShowPostsById } = require('../src/components/ShowPosts.js');
const { getAuth } = require('../src/lib/FirebaseImport.js');

const {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification,
  signInWithPopup, sendPasswordResetEmail, signOut, updateProfile, deleteDoc,
  getDownloadURL, GoogleAuthProvider, addDoc, onSnapshot, setDoc,
} = require('../src/lib/FirebaseImport.js');

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
  it('should render without crashing, con photoURL', () => {
    /*  getAuth.mockReturnValue({
        currentUser: {
          displayName: 'name',
          email: 'bob@example.com',
          photoURL: 'http://example.com',
        },
      }); */
    const el = Profile();
    expect(typeof el).toBe('string');
  });
  it('should render without crashing, con photoURL NULL', () => {
    /* getAuth.mockReturnValue({
      currentUser: {
        displayName: 'name',
        email: 'bob@example.com',
        photoURL: null,
      },
    }); */
    /* getAuth.mockImplementationOnce({
      currentUser: {
        displayName: 'name',
        email: 'bob@example.com',
        photoURL: null,
      },
    }); */
    /*     const user = getAuth();
    user.currentUser.photoURL = null;
    console.log(user.currentUser.photoURL); */
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
  photoURL: 'Images/userImage.jpeg',
  likes: [],
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
  it('DEBERIA FALLAR', () => {
    expect.assertions(0);
    return (updateProfile().catch((e) => expect(e).toEqual({
      error: 'usuario no fue actualizado',
    })));
  });
  /* it('should throw an error, when user is invalid', () => {
    updateProfile('', null)
      .catch(() => {
        expect(updateProfile()).toEqual('usuario no fue actualizado');
      });
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
describe('setUser', () => {
  it('debería retornar un uid', () => {
    expect(setUser('username', 'photo.jpeg')).toEqual(getAuth().currentUser.uid);
  });
  /*  it('debería retornar un error', () => {
      expect(() => {
        getAuth.mockReturnValue({
          currentUser: null,
        });
        setUser('username', 'photo.jpeg');
        console.log(getAuth().currentUser);
      }).toThrow(TypeError());
      // expect(setUser('username', 'photo.jpeg')).toEqual(getAuth().currentUser.uid);
    }); */
});
describe('setUserPhoto', () => {
  it('Deberia retornar la photo setup', () => {
    expect(setUserPhoto('photo.jpeg')).toEqual(updateProfile());
  });
});
/* describe('updatePhotoPosts', () => {
  it('Deberia retornar', () => {
    expect(updatePhotoPosts('photo.jpeg')).toEqual(findPostById());
  });
}); */
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

describe('SignOut', () => {
  it('Deberia cerrar sesion', () => {
    expect(SignOut()).toEqual(signOut());
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
  });
});
describe('updatePost', () => {
  it('Deberia actualizar los post', () => {
    expect(updatePost('id', 'title', 'post')).toEqual(setDoc());
  });
});
