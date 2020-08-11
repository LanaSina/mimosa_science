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
import './quasar'
Vue.use(VueMaterial)

Vue.use(require('vue-moment'))

// Vue Social Sharing
var SocialSharing = require('vue-social-sharing');
Vue.use(SocialSharing);

var firebaseConfig = {
    apiKey: "AIzaSyDxGoDcpzPUHAWOC3B2rb0k1Zdf6QPS1_w",
    authDomain: "mimosa-97ad6.firebaseapp.com",
    databaseURL: "https://mimosa-97ad6.firebaseio.com",
    projectId: "mimosa-97ad6",
    storageBucket: "mimosa-97ad6.appspot.com",
    messagingSenderId: "324532774780",
    appId: "1:324532774780:web:fa02235fdc310eb94c66f9",
    measurementId: "G-SKN6GVFW3B"
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