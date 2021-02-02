import firebase from 'firebase';
import { auth } from '../firebase';
import { setUser } from './backend';
import logoGoogle from '../img/logo-google.svg'

export const AuthPage = () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  const authWithGoogle = () => {
    firebase.auth().signInWithPopup(provider)
    .then(() => auth.currentUser)
    .then((currentUser) => {
      setUser({
        uid: currentUser.uid,
        mail: currentUser.email,
        name: currentUser.displayName,
        photo: currentUser.photoURL,
      });
    })
    // .then(() => getCurrentUser())
    .then(() => {
      window.location = '/restaurant';
    })

  }

  return (
    <div>
      <img src={logoGoogle} onClick={authWithGoogle} alt="Google" class="googleIcon"></img>
    </div>
  )

}