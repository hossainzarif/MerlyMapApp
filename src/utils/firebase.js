import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCatvrPP7NsbwWcmTTxlaerMMeWFbGuWpY',
  authDomain: 'merlymapapp.firebaseapp.com',
  projectId: 'merlymapapp',
  storageBucket: 'merlymapapp.appspot.com',
  messagingSenderId: '937218447496',
  appId: '1:937218447496:web:4b23d49608976c93fa273d',
  measurementId: 'G-03FE8YBB4L',
}

let app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export { db, auth }
