import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home'
import Login from './views/Login'
import Logout from './views/Logout'
import Register from './views/Register'
import Question from './views/Question'
import Hypothesis from './views/Hypothesis'
//import UpdateProfile from './components/UpdateProfile'
import UpdatePassword from './components/UpdatePassword'
import UpdateEmail from './components/UpdateEmail'


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
            path: '/hypothesis/:id',
            name: 'hypothesis',
            component: Hypothesis
        },
        // {
        //     path: '/updateProfile',
        //     name: '/updateProfile',
        //     component: UpdateProfile
        // },
        {
            path: '/updatePassword',
            name: '/updatePassword',
            component: UpdatePassword
        },
        {
            path: '/updateEmail',
            name: '/updateEmail',
            component: UpdateEmail
        }
    ]
});

export default router