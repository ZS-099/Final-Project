import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyBLw7hnDBcvr-dCEOVr89roi34v7Brm5Ag',
  authDomain: 'reptile-website.firebaseapp.com',
  projectId: 'reptile-website',
  storageBucket: 'reptile-website.appspot.com',
  messagingSenderId: '46993347602',
  appId: '1:46993347602:web:57110c7d2a68853449b4cb',
  measurementId: 'G-KR0G00F88B',
};
// Initialize Firebase

const firebaseSetup = firebase.initializeApp(firebaseConfig);
export const db = firebaseSetup.firestore();
export const storage = firebaseSetup.storage();
export default firebaseSetup;
