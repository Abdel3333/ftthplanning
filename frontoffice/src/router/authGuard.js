import axios from 'axios'
import { store } from '@/store/store'
import User from '../store/models/user'
export default function authGuard(next) {
    const token = localStorage.getItem('token')
    const header = { "Authorization": `Bearer ${token}` }
    axios.get(`/auth/me`, {
            headers: header
        })
        .then(async res => {
            console.log(res)
            const userData = res.data
            localStorage.setItem('token', userData.accessToken)
            await store.commit('mutUserData', {
                token: userData.accessToken,
                profil: userData.user.profil,
                id: userData.user._id,
                phone: userData.phone,
                username: userData.user.username,
                lastname: userData.user.lastName,
                firstname: userData.user.firstName
            })
            User.insert({ data: userData.user })
            next()

        })
        .catch(err => {
            console.log(err)
            store.commit('mutShowLoginModal', true)
            next('/')
        })
}