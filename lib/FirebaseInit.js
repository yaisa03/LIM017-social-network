/* istanbul ignore file */
/* eslint-disable import/no-unresolved */
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { initializeApp } from './FirebaseImport.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBnTpBzOUriU6ztyOeGumDQE8HHpkjqreU',
  authDomain: 'foodbook-66988.firebaseapp.com',
  databaseURL: 'https://foodbook-66988-default-rtdb.firebaseio.com',
  projectId: 'foodbook-66988',
  storageBucket: 'foodbook-66988.appspot.com',
  messagingSenderId: '558953316138',
  appId: '1:558953316138:web:d5c91f573abe129835e853',
  measurementId: 'G-YN3T2EDM93',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
