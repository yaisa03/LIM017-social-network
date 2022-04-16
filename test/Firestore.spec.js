/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
// importamos la funcion que vamos a testear
// importamos la funcion que
// import { emailVerification } from '../src/lib/Firestore.js';

const fs = require('fs');

window.document.body.innerHTML = fs.readFileSync('./src/index.html');

const {
  register, emailVerification, logIn, logInGoogle, emailResetPassword,
  SignOut, /* emailVerification, findPosts, findPostById,
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
  signInWithPopup, sendPasswordResetEmail, signOut,
  /*
   addDoc, collection,  */
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
    getAuth.mockReturnValue({
      currentUser: {
        displayName: 'name',
        email: 'bob@example.com',
        photoURL: 'http://example.com',
      },
    });
    const el = Profile();
    expect(typeof el).toBe('string');
  });
  it('should render without crashing, con photoURL NULL', () => {
    getAuth.mockReturnValue({
      currentUser: {
        displayName: 'name',
        email: 'bob@example.com',
        photoURL: null,
      },
    });
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
  url: 'Images/userImage.jpeg',
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
  it('Debería poder', () => signInWithEmailAndPassword()
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
  it('proveedor', () => signInWithPopup().then(() => {
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
  it('deberia devolver', () => expect(emailResetPassword('front@end.la')).toBeUndefined());
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
/*
// envioCorreoVerificacion
describe('emailVerification', () => {
  it('debería ser una función', () => {
    expect(typeof emailVerification).toBe('function');
  });
  it('', () => emailVerification()
    .then(() => {
      // console.log(auth.mock.currentUser);
      expect(sendEmailVerification.mock.calls).toHaveLength(1);
    }));
});

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
