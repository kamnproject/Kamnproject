import firebase from 'firebase'
import 'firebase/firestore'
const config = {
  apiKey: "AIzaSyCMf7BIfawJVX3d32u5ZZuR5VJWwKd1ZX8",
  authDomain: "kamn-e4270.firebaseapp.com",
  databaseURL: "https://kamn-e4270.firebaseio.com",
  projectId: "kamn-e4270",
  storageBucket: "kamn-e4270.appspot.com",
  messagingSenderId: "754334861904"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
// db.settings({
//   timestampsInSnapshots: true
// });

export default db