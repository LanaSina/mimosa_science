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
import About from './views/About'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },

        {
            path: '/login',
            name: 'login',
            component: Login
        },

        {
            path: '/logout',
            name: 'logout',
            component: Logout
        },

        {
            path: '/register',
            name: 'register',
            component: Register
        },

        {
            path: '/question/:id',
            name: 'question',
            component: Question
        },

        {
            path: '/question/:q_id/hypothesis/:h_id',
            name: 'hypothesis',
            component: Hypothesis
        },

        {
            path: '/updateProfile',
            name: 'updateProfile',
            component: UpdateProfile
        },

        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },

        {
            path: '/updatePassword',
            name: '/updatePassword',
            component: UpdatePassword
        },

        {
            path: '/updateEmail',
            name: 'updateEmail',
            component: UpdateEmail
        },

        {
            path: '/updateQuestion/:id',
            name: 'updateQuestion',
            component: UpdateQuestion
        },

        {
            path: '/updateHypothesis/:q_id/hypothesis/:h_id',
            name: 'updateHypothesis',
            component: UpdateHypothesis
        },

        {
            path: '/updateExperiment/:q_id/hypothesis/:h_id/experiment/:e_id',
            name: 'updateExperiment',
            component: UpdateExperiment
        },

        {
            path: '/userItemList',
            name: 'userItemList',
            component: UserItemList
        },

        {
            path: '/uploadImage',
            name: 'uploadImage',
            component: UploadImage
        },

        {
            path: '/about',
            name: 'about',
            component: About
        }
    ]
});

export default router