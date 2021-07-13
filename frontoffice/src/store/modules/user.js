import axios from 'axios'
import User from '../models/user';
const state = {
    userData: null
};

const getters = {}

const mutations = {
    mutIsConnect(state, bool) {
        state.isConnect = bool
    },
    mutUserData(state, userData) {
        state.userData = userData
    },
}

const actions = {
    me({ commit }) {
        const token = localStorage.getItem('token')
        const header = { "Authorization": `Bearer ${token}` }
        axios.get(`/auth/me`, {
                headers: header
            })
            .then(res => {
                //console.log(res)
                const userData = res.data
                localStorage.setItem('token', userData.accessToken)
                commit('mutUserData', {
                    token: userData.accessToken,
                    profil: userData.user.profil,
                    id: userData.user._id,
                    phone: userData.phone,
                    username: userData.user.username,
                    lastname: userData.user.lastName,
                    firstname: userData.user.firstName
                })
                User.insert({ data: userData.user })
                return Promise.resolve(userData)
            })
            .catch(err => {
                console.log(err.response.data)
                localStorage.removeItem('token')
                return Promise.reject(err.response)
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions

}