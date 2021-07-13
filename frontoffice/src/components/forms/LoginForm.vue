<template>
    <ValidationObserver ref="form" tag="div"  class="p-6">
        <form  @submit.prevent="onSubmit">
            <ValidationProvider name="L'email" v-slot="{ errors }" rules="required|email">
                <div class="mb-4">
                    <m-input
                    :errors="errors[0]"
                    v-model="username"
                    name = "email"
                    label="E-mail"
                    />
                </div>
            </ValidationProvider>
            <ValidationProvider name="Le mot de passe"  v-slot="{ errors }" rules="required">
                <div class="mb-4">
                    <m-input
                     :errors="errors[0]"
                    v-model="pwd"
                    type="password"
                    name = "pwd"
                    label="Mot de passe"
                    />
                </div>
            </ValidationProvider>
            <m-button :type="'submit'" :classes="'text-white bg-black rounded-l30 p-2 w-full'" load :activateLoad="request" :text="'Se Connecter'"></m-button>
        </form>
        <slot name="form-footer"></slot>
    </ValidationObserver>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
import User from '../../store/models/user'
export default {
    data() {
        return {
            username: "",
            pwd: "",
            request: false,
        }
    },
    methods: {
        ...mapMutations([
        'mutShowLoginModal',
        ]),
        onSubmit () {
            this.$refs.form.validateWithInfo().then(validate => {
                let { isValid } = validate;
                if(isValid) {
                    this.request = true
                    axios.post('/auth/sign_in',{
                        username: this.username,
                        password: this.pwd,
                            
                    })
                    .then(res => {
                        this.request = false
                        console.log(res)
                        const userData = res.data
                        localStorage.setItem('token', userData.accessToken)
                        this.$store.commit('mutUserData', {token: userData.accessToken})
                        User.insert({data:userData.user})
                        this.$store.commit('mutIsConnect', true)
                        this.mutShowLoginModal(false)
                        this.$router.push('/dashboard/home')
                    })
                    .catch(err => {
                        this.request = false
                        console.log(err.response.data)
                    })
                }
            })
            
        }
    },
}
</script>

<style scoped>

</style>