import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app';
import 'firebase/firestore';

import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCTqX3P2jJL73c4PUowA2QY5DI-5n5fXh8",
  authDomain: "mimoza-441ee.firebaseapp.com",
  databaseURL: "https://mimoza-441ee.firebaseio.com",
  projectId: "mimoza-441ee",
  storageBucket: "mimoza-441ee.appspot.com",
  messagingSenderId: "196202057966",
  appId: "1:196202057966:web:23c4aad31b992fa2"
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);

const db = firebase.initializeApp(firebaseConfig).firestore();

export default db
