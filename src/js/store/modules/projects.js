//import projects from '../../data/project';
import axios from 'axios';


const state = {
    projects: [],
};
const mutations = {
    setProjects(state, projects) {
        state.projects = projects
    }
};
//will be removed when all the data is set in database
const actions = {
    fetchProjects: ({commit}) => {
        return new Promise((resolve, reject) => {
            axios.get('projects.json')
                .then(res => res)
                .then(data => {
                    if (data) {
                        const projects = data.data;
                        console.log('data is successfully fetched', data);
                        commit('setProjects', projects);
                        resolve(data);
                    }
                }).catch(error => console.log('failed :', error));
        })
    },
    storeProject: ({commit}, payload) => {

    }
};
const getters = {
    projects: state => {
        console.log('state getter function in project.js', state);
        return state.projects;
    }
};

export default {
    state, mutations, actions, getters
};

