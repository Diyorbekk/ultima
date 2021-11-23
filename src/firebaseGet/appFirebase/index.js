import firebase from 'firebase/compat'

const firebaseConfig = {
    apiKey: "AIzaSyCgH6DZV7luZ7Ib8ESaUqwHMo8M1R19mH4",
    authDomain: "ultima-94cee.firebaseapp.com",
    databaseURL: "https://ultima-94cee-default-rtdb.firebaseio.com",
    projectId: "ultima-94cee",
    storageBucket: "ultima-94cee.appspot.com",
    messagingSenderId: "555457262889",
    appId: "1:555457262889:web:c574ca6e0647d19e09b338",
    measurementId: "G-2N0VZFFMTT"
};


const appFirebase = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default appFirebase
