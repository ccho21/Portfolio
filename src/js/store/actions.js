import Vue from 'vue';

export const setMessage = ({commit}, payload) => {
    commit('setMessage', payload);
};
