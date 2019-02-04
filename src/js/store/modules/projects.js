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
    initProjects: ({commit}) => {
        axios.get('projects.json')
            .then(
                response => {
                    return response;
                }
            )
            .then(data => {
                if (data) {
                    const projects = data.data;
                    commit('setProjects', projects);
                }
            });

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

