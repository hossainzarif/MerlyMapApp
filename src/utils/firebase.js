import * as firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCc4d9fmX1MZbqFd2cqeJ0omCRFclTLU7Y",
  authDomain: "garage-sales-map.firebaseapp.com",
  projectId: "garage-sales-map",
  storageBucket: "garage-sales-map.appspot.com",
  messagingSenderId: "888836721819",
  appId: "1:888836721819:web:1d190ee436342d9e95ca3e",
  measurementId: "G-1Z2EB5RRFB",
}

let app

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()
const fireinit = firebase.firestore()
export { db, auth, fireinit }
