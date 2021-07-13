import Vue from 'vue';
import Vuex from 'vuex';
import VuexOrm from "@vuex-orm/core";
import Planning from './models/planning'
import user from './modules/user';
import User from './models/user';
Vue.use(Vuex);

import plannings from './modules/plannings'


const database = new VuexOrm.Database();

database.register(User, user);
database.register(Planning, plannings);

export const store = new Vuex.Store({
    plugins: [VuexOrm.install(database)],

    state: {
        showLoginModal: false,
        showRegisterModal: false
    },
    getters: {

    },
    mutations: {
        mutShowLoginModal(state, bool) {
            state.showLoginModal = bool
        },
        mutShowRegisterModal(state, bool) {
            state.showRegisterModal = bool
        }
    },
    actions: {

    },
    modules: {
        plannings,
        user
    }
})