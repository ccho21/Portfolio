//VUE IMPORT
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
// COMPONENT IMPORTS
import Home from './components/Home.vue';
import About from './components/pages/About.vue';
import Contact from './components/pages/Contact.vue';
import DashboardPage from './components/dashboard/dashboard.vue'
import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'

// VUEX IMPORT
import login from './store/modules/login';


// LAZY LOADING
const Projects = resolve => {
    require.ensure(['./components/projects/Projects.vue'], () => {
        resolve(require('./components/projects/Projects.vue'));
    }, 'user');
};
const Project = resolve => {
    require.ensure(['./components/projects/Project.vue'], () => {
        resolve(require('./components/projects/Project.vue'));
    }, 'user');
};
// ROUTING SET UP
const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/contacts',
        component: Contact
    },
    {
        path: '/sign-up', name: 'sign-up', component: SignupPage, beforeEnter(to, from, next) {
            next();
        }
    },
    {
        path: '/sign-in', name: 'sign-in', component: SigninPage,
    },
    {
        // checking Localstorage in order to work when refreshing pages
        path: '/dashboard', name: 'dashboard', component: DashboardPage,
    },
    {
        path: '/projects',
        component: Projects,
        children: [
            {path: '', component: Project},
            {
                path: '/projects/:id',
                name: 'project-detail',
                component: Project, beforeEnter: (to, from, next) => {
                    console.log('inside route setup');
                    next();
                }
            },
        ]
    },
    {path: '/redirect-me', redirect: {name: 'home'}},
    {path: '*', redirect: '/'}
];

export default new VueRouter({
    mode: 'history', routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return {selector: to.hash};
        }
        return {x: 0, y: 0};
    }
});

// beforeEnter(to, from, next) {
//     console.log('DASHBOARD');
//     const token = localStorage.getItem('token');
//     console.log(token);
//     if (token) {
//         next();
//     } else {
//         next('/sign-in');
//     }
// }
