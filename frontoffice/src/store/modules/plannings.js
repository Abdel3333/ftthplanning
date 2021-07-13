import axios from 'axios'
import Planning from '../models/planning';
import User from '../models/user';
const state = {};

const getters = {}

const mutations = {}

const actions = {
    getPlannings() {
        const user = User.query().first()
        axios.get(`/planning/${user._id}`)
            .then(res => {
                console.log(res.data)
                const plannings = res.data
                plannings.forEach(planning => {
                    Planning.insert({ data: planning })
                });
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions

}