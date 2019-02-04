import axiosAuth from "../../axios-auth";
import router from "../../routes";
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
    },
    storeUser(state, user) {
        console.log('STORE USER in MUTATION', user);
        state.user = user;
    },
    clearAuthData(state) {
        state.idToken = null;
        state.userId = null;
    }
};
const actions = {
    setLogoutTimer({commit, dispatch}, expirationTime) {
        console.log('expiration time', expirationTime);
        setTimeout(() => {
            dispatch('logout');
        }, expirationTime * 1000);
    },
    signup({commit, dispatch}, authData) {
        axiosAuth.post('/signupNewUser?key=AIzaSyDxUWwq9qoxe8kJSwzcYGJoCXUkAa-tIRU', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        })
            .then(res => {
                console.log(res);

                const now = new Date();
                const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expirationDate', expirationDate);

                commit('authUser', {
                    token: res.data.idToken,
                    userId: res.data.localId
                });
                dispatch('setLogoutTimer', res.data.expiresIn);
                dispatch('storeUser', authData);

            })
            .catch(error => console.log(error.response));
    },
    login({commit, dispatch, state}, authData) {
        axiosAuth.post('/verifyPassword?key=AIzaSyDxUWwq9qoxe8kJSwzcYGJoCXUkAa-tIRU', {
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

                commit('authUser', {
                    token: res.data.idToken,
                    userId: res.data.localId
                });
                dispatch('setLogoutTimer', res.data.expiresIn);

                if(state.idToken) {
                    router.replace('/');
                }
            })
            .catch(error => console.log(error));
    },
    tryAutoLogin ({commit}) {
        const token = localStorage.getItem('token');
        if(!token) {
            return;
        }
        const expirationDate = localStorage.getItem('expirationDate');
        const now = new Date();
        if(now >= expirationDate) {
            return;
        }
        const userId = localStorage.getItem('userId');
        commit('authUser', {
            token : token,
            userId : userId,
        });
    },
    logout({commit}) {
        commit('clearAuthData');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        router.replace('/sign-in');
    },
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
        console.log(state);
        if (!state.idToken) {
            return;
        }
        axios.get(`/users.json?auth=${state.idToken}`)
            .then(res => {
                console.log(res);
                const data = res.data;
                const users = [];
                for (let key in data) {
                    const user = data[key];
                    user.id = key;
                    users.push(user);
                }
                console.log(users);
                commit('storeUser', users[0]);
            })
            .catch(error => console.log(error))
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
