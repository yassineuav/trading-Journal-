// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAkI4_nVtJlTvBAiV275o6NRlmUSIlyAls",
    authDomain: "hour-lottery-8c143.firebaseapp.com",
    databaseURL: "https://hour-lottery-8c143-default-rtdb.firebaseio.com",
    projectId: "hour-lottery-8c143",
    storageBucket: "hour-lottery-8c143.appspot.com",
    messagingSenderId: "274244694053",
    appId: "1:274244694053:web:b99309e48fe5ea2b8bcfcc",
    measurementId: "G-0RDRQN53ZZ"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };