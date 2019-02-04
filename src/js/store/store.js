import Vue from 'vue';
import Vuex from 'vuex';

import projects from './modules/projects';
import  login from './modules/login';
import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        message : ''
    },
    actions,
    getters,
    mutations,
    modules: {
        login,
        projects,
    }
});
