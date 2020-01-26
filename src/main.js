import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import store from './store';
// import * as firebase from 'firebase';
const firebase = require('firebase');
require('firebase/functions');

require('firebase/firestore');

import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)

Vue.productionTip = false;

import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {});
import 'vue-wysiwyg/dist/vueWysiwyg.css';

// Material Vue
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial)

Vue.use(require('vue-moment'))

var firebaseConfig = {
  apiKey: "AIzaSyCTqX3P2jJL73c4PUowA2QY5DI-5n5fXh8",
  authDomain: "mimoza-441ee.firebaseapp.com",
  databaseURL: "https://mimoza-441ee.firebaseio.com",
  projectId: "mimoza-441ee",
  storageBucket: "mimoza-441ee.appspot.com",
  messagingSenderId: "196202057966",
  appId: "1:196202057966:web:23c4aad31b992fa2"
};

export const db = firebase.initializeApp(firebaseConfig).firestore();

var functions = firebase.functions();

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')