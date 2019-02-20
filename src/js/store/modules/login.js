import axiosAuth from "../../axios-auth";
import axios from "axios";

const state = {
    idToken: null,
    userId: null,
    user: null
};


const mutations = {
    authUser(state, userData) {
        console.log('AUTH USER IN MUTATION', state);
        state.idToken = userData.token;
        state.userId = userData.userId;
        state.email = userData.email;
    },
    storeUser(state, user) {
        console.log('STORE USER in MUTATION', user);
        state.user = user;
    },
    clearAuthData(state) {
        state.idToken = null;
        state.userId = null;
        state.user = null;
        state.email = null;
    }
};
const actions = {
    setLogoutTimer({commit, dispatch}, expirationTime) {
        console.log('expiration time', expirationTime);
        setTimeout(() => {
            dispatch('logout');
        }, expirationTime * 1000);
    },
    signup: ({commit, dispatch}, authData) =>
        new Promise((resolve, reject) => {
            axiosAuth.post('/signupNewUser?key=AIzaSyDxUWwq9qoxe8kJSwzcYGJoCXUkAa-tIRU', {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            })
                .then(res => {

                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
                    localStorage.setItem('token', res.data.idToken);
                    localStorage.setItem('userId', res.data.localId);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('email', res.data.email);

                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.localId,
                        email: res.data.email
                    });
                    authData.id = res.data.localId;
                    console.log('AUTHDATA!!!', authData)
                    dispatch('storeUser', authData);
                    dispatch('setLogoutTimer', res.data.expiresIn);
                    resolve(res);
                })
                .catch(error => {
                    console.log(error.response);
                    reject(error);
                })
        }),
    login: ({commit, dispatch}, authData) => new Promise((resolve, reject) => {
        axiosAuth.post('/verifyPassword?key=AIzaSyDxUWwq9qoxe8kJSwzcYGJoCXUkAa-tIRU', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        })
            .then(res => {
                console.log('LOGIN RESS!!', res);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('email', res.data.email);

                commit('authUser', {
                    token: res.data.idToken,
                    userId: res.data.localId,
                    email: res.data.email
                });
                dispatch('setLogoutTimer', res.data.expiresIn);
                resolve(res);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            })
    }),
    tryAutoLogin: ({commit, dispatch}) =>
        new Promise((resolve, reject) => {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const expirationDate = localStorage.getItem('expirationDate');
            const now = new Date();
            if (now >= expirationDate) {
                return;
            }
            const userId = localStorage.getItem('userId');
            const email = localStorage.getItem('email');
            dispatch('fetchUser');
            commit('authUser', {
                token: token,
                userId: userId,
                email: email,
            });
            resolve();
        }),
    logout: ({commit}) =>
        new Promise((resolve, reject) => {
            commit('clearAuthData');
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('email');
            resolve();
        }),
    storeUser({commit, state}, userData) {
        if (!state.idToken) {
            return;
        }
        axios.post(`/users.json?auth=${state.idToken}`, userData)
            .then(res => console.log(res))
            .error(error => console.log(error));
    },
    fetchUser({commit, state}) {
        console.log('fetch User function in login.js 114 line');
        if (!state.idToken) {
            return;
        }
        axios.get(`/users.json?orderBy="id"&equalTo="${state.userId}"&auth=${state.idToken}`)
            .then(res => {
                const data = res.data;
                let user = null;
                for (let key in data) {
                    user = data[key];
                }
                commit('storeUser', user);
            })
            .catch(error => console.log(error));
    }
};
const getters = {
    user(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.idToken !== null;
    },
};

export default {
    state, mutations, actions, getters
};
