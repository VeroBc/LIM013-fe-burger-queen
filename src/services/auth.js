import firebase from 'firebase';
import { auth } from '../firebase' ;
import { setUser } from './backend';

const passw = /^[A-Za-z]\w{6,20}$/;
const imgDefault = '../img/user-default.svg';

export const createUser = (email, password) => {
  const errorMessage = document.getElementById('errorMessage');
  if (!password.match(passw)) {
    errorMessage.innerHTML = 'La contraseña debe tener al menos 6 caracteres, una letra y un número';
  } else {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => firebase.auth().currentUser)
      .then((currentUser) => {
        setUser({
          uid: currentUser.uid,
          mail: currentUser.email,
          name: currentUser.email.match(/^([^@]*)@/)[1],
          photo: imgDefault,
        });
      })
      // .then(() => getCurrentUser())
      .then(() => {
        window.location = '/restaurant';
      })
      .catch((e) => {
        errorMessage.innerHTML = e.message;
        return errorMessage;
      });
  }
};

export const signinUser = (email, password) => {
  const errorMessage = document.getElementById('errorMessage');
  firebase.auth().signInWithEmailAndPassword(email, password)
    // .then(() => getCurrentUser())
    .then(() => {
      window.location = '/restaurant';
    })
    .catch((e) => {
      errorMessage.innerHTML = e.message;
      return errorMessage;
    });
};

export const signOut = () => {
  auth.signOut()
  .then(() => {
    window.location = '/';
  })
}
