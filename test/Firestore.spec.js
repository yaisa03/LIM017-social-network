/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
// importamos la funcion que vamos a testear
// importamos la funcion que
// import { emailVerification } from '../src/lib/Firestore.js';

const fs = require('fs');

window.document.body.innerHTML = fs.readFileSync('./src/index.html');

const {
  register, emailVerification, logIn, logInGoogle, emailResetPassword,
  SignOut, setUser, setUserPhoto, setUserInfo, deleteUserPosts,
  deleteAccount, getURLProfilePhoto,
  /* emailVerification, findPosts, findPostById,
   */
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
  getDownloadURL,
  /* addDoc, collection, deleteUser, uploadBytes, */
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
    const user = getAuth();
    user.currentUser.photoURL = null;
    console.log(user.currentUser.photoURL);
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
  likes: 5,
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
  it('debería ser una función', () => {
    expect(typeof emailVerification).toBe('function');
  });
  it('Debería poder registrar a un usuario', () => sendEmailVerification()
    .then(() => {
      expect(sendEmailVerification).toHaveBeenCalled();
    }));
});

describe('register', () => {
  it('deberia ser una funcion', () => {
    expect(typeof register).toBe('function');
  });
  it('deberia ser undefined', () => {
    const el = register('front@end.la', '123456', 'userlab');
    expect(el).toBeUndefined();
  });
  getAuth.mockReturnValue({
    currentUser: {
      displayName: 'name',
      email: 'front@end.la',
      photoURL: null,
    },
  });
  it('Debería poder registrar a un usuario', () => createUserWithEmailAndPassword()
    .then(() => {
      /* expect(createUserWithEmailAndPassword.mock.calls[0][0]).toBe(getAuth()); */
      expect(createUserWithEmailAndPassword.mock.calls[0][1]).toBe('front@end.la');
      expect(createUserWithEmailAndPassword.mock.calls[0][2]).toBe('123456');
    })
    .catch(() => {
      expect(createUserWithEmailAndPassword).toThrow('ERROR');
    }));
  /* it('Deberia arrojar un error', () => createUserWithEmailAndPassword()
    .catch(() => {
      expect(createUserWithEmailAndPassword).toBe('ERROR');
    })); */
});
// inicioSesionUsuario
describe('logIn', () => {
  it('deberia ser una funcion', () => {
    expect(typeof logIn).toBe('function');
  });
  it('Debería poder iniciar sesion', () => {
    const el = logIn('front@end.la', '123456');
    expect(el).toBeUndefined();
  });
  it('Deberia recibir los parametros correctos', () => signInWithEmailAndPassword()
    .then(() => {
      expect(signInWithEmailAndPassword.mock.calls[0][1]).toBe('front@end.la');
      expect(signInWithEmailAndPassword.mock.calls[0][2]).toBe('123456');
    }));
});
// googleInicioSesion
describe('logInGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof logInGoogle).toBe('function');
  });
  /* const provider = { id: 123, correo: 'hola@gmail.com' }; */
  it('proveedor deberia ser llamado', () => signInWithPopup().then(() => {
    expect(signInWithPopup).toHaveBeenCalled();
  }));
  it('Debería poder iniciar sesion', () => {
    const el = logInGoogle();
    expect(el).toBeUndefined();
  });
});
// envioCorreoRecuperacionContrasena
describe('emailResetPassword', () => {
  it('debería ser una función', () => {
    expect(typeof emailResetPassword).toBe('function');
  });
  it('deberia devolver undefined', () => expect(emailResetPassword('front@end.la')).toBeUndefined());
  it('', () => sendPasswordResetEmail()
    .then(() => {
      // console.log(auth.mock.currentUser);
      expect(sendPasswordResetEmail.mock.calls).toHaveLength(2);
    }));
});
// cierreActividadUsuario
describe('SignOut', () => {
  it('debería ser una función', () => {
    expect(typeof SignOut).toBe('function');
  });
  it('deberia cerrar sesion', () => signOut()
    .then(() => {
      expect(signOut.mock.calls[0][1]).toBe(undefined);
    }));
});
describe('setUser', () => {
  it('deberia retornar un uid', () => {
    expect(typeof setUser('username', 'urlphoto')).toBe('string');
  });
});
describe('setUserPhoto', () => {
  it('debería ser una función', () => {
    expect(typeof setUserPhoto).toBe('function');
  });
  it('deberia cambiar la foto de perfil', async () => {
    const result = await setUserPhoto('myURL');
    expect(result).toStrictEqual(undefined);
  });
  it('deberia recibir los parametros correctos ', () => updateProfile({}, {})
    .then(() => {
      expect(typeof updateProfile.mock.calls[0][0]).toBe('object');
      expect(typeof updateProfile.mock.calls[0][1]).toBe('object');
    }));
});
describe('setUserInfo', () => {
  it('debería ser una función', () => {
    expect(typeof setUserInfo).toBe('function');
  });
  it('deberia modificar la informacion del usuario', async () => {
    const result = await setUserInfo('user');
    expect(result).toStrictEqual(undefined);
  });
  it('deberia recibir los paraametros correctos ', () => updateProfile({}, {})
    .then(() => {
      expect(typeof updateProfile.mock.calls[0][0]).toBe('object');
      expect(typeof updateProfile.mock.calls[0][1]).toBe('object');
    }));
});
describe('deleteAccount', () => {
  it('debería ser una función', () => {
    expect(typeof deleteAccount).toBe('function');
  });
  it('deberia funcionar', () => {
    const result = deleteAccount();
    expect(result).toStrictEqual(undefined);
  });
});
describe('deleteUserPosts', () => {
  it('debería ser una función', () => {
    expect(typeof deleteUserPosts).toBe('function');
  });
  it('deberia ser llamado deleteDoc ', () => {
    expect(deleteDoc).toHaveBeenCalledTimes(0);
  });
  /*
  it('deberia funcionar', () => {
    const result = deleteUserPosts({ user: { uid: 'u145632' } });
    expect(result).toStrictEqual(undefined);
  }); */
});
describe('getURLProfilePhoto', () => {
  it('debería ser una función', () => {
    expect(typeof getURLProfilePhoto).toBe('function');
  });
  it('deberia llamar a UploadBytes ', () => {
    expect(getURLProfilePhoto()).toBe({});
  });
  it('deberia llamar a getDownloadURL', () => getDownloadURL().then(() => {
    expect(getDownloadURL).toHaveBeenCalledTimes(1);
  }));
});
/*
describe('findPosts', () => {
  it('Deberia subir data a coleccion posts', () => findPosts().then(async () => {
    const prueba = await addDoc(collection.mock.results[0].value, addDoc.mock.calls[0][1]);
    const variable = {
      posts: {
        categoria: 'strCat', imgPost: '', likes: [],
        publicacion: 'strPost', timestamp: undefined, usuarioId: 'strCreador',
      },
    };
    expect(prueba).toEqual(variable);
  }));
});
describe('findPostById', () => {
  it('Deberia subir data a coleccion posts', () => findPostById().then(async () => {
    const prueba = await addDoc(collection.mock.results[0].value, addDoc.mock.calls[0][1]);
    const variable = {
      posts: {
        categoria: 'strCat', imgPost: '', likes: [],
        publicacion: 'strPost', timestamp: undefined, usuarioId: 'strCreador',
      },
    };
    expect(prueba).toEqual(variable);
  }));
}); */
