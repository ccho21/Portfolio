// CSS IMPORT
import '../css/main.scss';

import Vue from 'vue'

import VueRouter from 'vue-router';
import app from './App.vue';
import router from './routes.js';
import axios from 'axios';
import Vuelidate from 'vuelidate';
import store from './store/store.js';


// VUE USE
Vue.use(VueRouter);
Vue.use(Vuelidate);




axios.defaults.baseURL = 'https://charles-13af0.firebaseio.com/';
axios.defaults.headers.get['Accepts'] = 'application/json';

const reqInterceptor = axios.interceptors.request.use(config => {
    console.log('Request Interceptor', config);
    return config;
});
const resInterceptor = axios.interceptors.response.use(res => {
    console.log('response Interceptor', res);
    return res;
});

axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);

router.beforeEach((to, from, next) => {
    console.log('global beforeEach');
    next();
});

// VUE INSTANTIATION
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(app)
});
