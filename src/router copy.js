import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home'
import Login from './views/Login'
import Logout from './views/Logout'
import Register from './views/Register'
import Question from './views/Question'
import Hypothesis from './views/Hypothesis'
import UpdateProfile from './components/UpdateProfile'
import UpdatePassword from './components/UpdatePassword'
import UpdateEmail from './components/UpdateEmail'
import UpdateQuestion from './components/UpdateQuestion'
import UpdateHypothesis from './components/UpdateHypothesis'
import UpdateExperiment from './components/UpdateExperiment'
import UserItemList from './components/UserItemList'
import Profile from './components/Profile'
import UploadImage from './components/UploadImage'
//import DefaultLayout from './layouts/Default.vue'
//import Home from './views/Home.vue'
//import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/about',
          name: 'about',
          component: About
        }
      ]
    }
  ]
})
