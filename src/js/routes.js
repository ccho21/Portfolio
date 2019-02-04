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
        component: Home, beforeEnter(to, from, next){
            if(from.path === '/sign-in'){
                alert('login successfully');
                next();
            }else {
                next();
            }
        }
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/contacts',
        component: Contact
    },
    {path: '/sign-up', component: SignupPage},
    {
        path: '/sign-in', component: SigninPage,
    },
    {
        path: '/dashboard', component: DashboardPage, beforeEnter(to, from, next) {
            console.log('this is state in routes.js line 47', login.state);
            if (login.state.idToken) {
                next();
            } else {
                next('/sign-in');
            }
        }
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
