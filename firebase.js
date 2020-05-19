import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from '~/firebaseConfig'

// App
const app = firebase.initializeApp(firebaseConfig)

// Firestore
export const database = app.firestore()
export const citiesRef = database.collection('cities')
export const statesRef = database.collection('states')
export const countriesRef = database.collection('countries')
export const configRef = database.collection('config')
export const Timestamp = firebase.firestore.Timestamp

export default app
