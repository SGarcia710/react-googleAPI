import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyADJrv5LLWrJQsDFw2d_7w_M54y87FizMw",
  authDomain: "react-album.firebaseapp.com",
  databaseURL: "https://react-album.firebaseio.com",
  projectId: "react-album",
  storageBucket: "react-album.appspot.com",
  messagingSenderId: "168063426238"
}

firebase.initializeApp(config);

export default firebase;