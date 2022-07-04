import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import axios from 'axios';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;

      localStorage.setItem('name', name);
      localStorage.setItem('email', email);

      const body = {
        name: name,
        email: email,
      };

      axios.post(process.env.REACT_APP_ENV + 'api/user', body);
      console.log('success');
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signOutGoogle = () => {
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  window.location.reload();

  signOut(auth)
    .then(() => {
      console.log('logout');
    })
    .catch((error) => console.log(error));
};
