<template>
    <div class=" p-2 md:p-10">
        <ValidationObserver ref="form" tag="div">
            <form @submit.prevent="onSubmit" class="">
                    <div >
                        <div class="mb-6 text-xs flex justify-center items-center">
                            <div class="flex flex-col items-center">
                                <p class="mb-1 rounded-full flex items-center justify-center" :class="step == 1 ? 'text-blueDark h-7 w-7 bg-blueLighter-simple' : (step > 1 ? 'h-5 w-5 bg-inkLighter-simple  text-blueDark-simple' : 'h-5 w-5  bg-stepper  text-inkLighter-simple font-bold')">1</p>
                                <p class="hidden md:inline text-center" :class="step == 1 ? 'text-black' : (step > 1 ? 'text-blueDark':'text-inkLighter-simple')">Informations <br>d’identification</p>
                            </div>
                            <svgicon :color="step >= 2 ?'#55CEFF': ''" class="mx-2 lg:mx-3" name="stepperArrow" width="43" height="17"></svgicon>
                            <div class="flex flex-col items-center">
                                <p class="mb-1 rounded-full flex items-center justify-center" :class="step == 2 ? 'text-blueDark h-7 w-7 bg-blueLighter-simple' : (step > 2 ? 'h-5 w-5 bg-inkLighter-simple  text-blueDark-simple' : 'h-5 w-5  bg-stepper  text-inkLighter-simple font-bold')">2</p>
                                <p class="hidden md:inline text-center" :class="step == 2 ? 'text-black' : (step > 2 ? 'text-blueDark':'text-inkLighter-simple')">Informations <br> de connexion</p>
                            </div>
                        </div>
                        <div v-if="step === 1" class="step-1">
                            <div class="">
                                <div class="flex flex-col md:flex-row md:space-x-8 justify-between">
                                    <div class="mb-4 md:w-1/2">
                                        <ValidationProvider name="Nom" rules="required" v-slot="{ errors }">
                                            <m-input name = "name" :errors="errors[0]" v-model="user.lastName" label="Nom <span class='text-red-500'>*</span>"/>
                                        </ValidationProvider>
                                    </div>
                                    <div class="mb-4 md:w-1/2">
                                        <ValidationProvider name="Prénom" rules="required" v-slot="{ errors }">
                                            <m-input name = "firstName" :errors="errors[0]" v-model="user.firstName" label="Prénom <span class='text-red-500'>*</span>"/>
                                        </ValidationProvider>
                                    </div>
                                </div>
                                <div class="flex flex-col md:flex-row md:space-x-8 justify-between">
                                    <div class=" md:w-1/2">
                                     <ValidationProvider name="Email" rules="required|email" v-slot="{ errors}">
                                       <m-input :errors="errors[0]" name = "mail" v-model="user.email" label="Email"/>
                                     </ValidationProvider>
                                    </div>
                                    <div class=" md:w-1/2">
                                        <ValidationProvider name="Téléphone" rules="required" v-slot="{ errors }">
                                            <m-input name = "phone" :errors="errors[0]" v-model="user.phone" label="Numéro de téléphone <span class='text-red-500'>*</span>">
                                            </m-input>
                                        </ValidationProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="step === 2" class="step-2  lg:w-3/6 mx-auto">
                            <div class="">
                                <div>
                                    <div class="mb-4">
                                        <ValidationProvider name="Email">
                                            <m-input name = "mail" v-model="user.email" readonly label="Email"/>
                                        </ValidationProvider>
                                        <div v-if="existingAccount">
                                            <span  class="flex space-x-1 text-sm items-center mt-1">
                                                <svgicon name="error" width="16" height="16"></svgicon> 
                                                <span>Ce compte existe déjà</span>
                                            </span>
                                            <p @click="step--" class="text-blueNormal underline mt-1 cursor-pointer">Changer le mail</p>
                                        </div>
                                    </div>
                                    <div class="mb-4">
                                        <ValidationProvider name="Mot de passe" rules="upCase|oneNumber|oneCharac|min:8"  vid="confirmation" v-slot="{ errors }">
                                            <m-input name = "pwd" :errors="errors[0]" v-model="password" type="password" label="Mot de passe"/>
                                        </ValidationProvider>
                                    </div>
                                    <div class="grid grid-rows-2 grid-flow-col gap-2 mb-4" v-if="password">
                                        <div class="flex flex-row items-center"><svgicon name="online" width="4" height="4" v-if="validMsg.carac"></svgicon><svgicon name="offline" width="4" height="4" v-else></svgicon><span class="ml-1 text-10 uppercase">Un caractère spécial(#?*+/)</span></div>
                                        <div class="flex flex-row items-center"><svgicon name="online" width="4" height="4" v-if="validMsg.num"></svgicon><svgicon name="offline" width="4" height="4" v-else></svgicon><span class="ml-1 text-10 uppercase">Un chiffre</span></div>
                                        <div class="flex flex-row items-center"><svgicon name="online" width="4" height="4" v-if="validMsg.upper"></svgicon><svgicon name="offline" width="4" height="4" v-else></svgicon><span class="ml-1 text-10 uppercase">Une lettre majuscule</span></div>
                                        <div class="flex flex-row items-center"><svgicon name="online" width="4" height="4" v-if="validMsg.eightCarac"></svgicon><svgicon name="offline" width="4" height="4" v-else></svgicon><span class="ml-1 text-10 uppercase">8 caractères minimum</span></div>
                                    </div>
                                    <div class="">
                                        <ValidationProvider name="confirmation du mot de passe" rules="required|confirmed:confirmation" v-slot="{ errors }">
                                            <m-input :errors="errors[0]" v-model="passwordConfirmation" name = "pwdConfirm" type="password" label="Confirmer mot de passe"/>
                                        </ValidationProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div :class="step === totalSteps ? 'mt-6 ' : 'mt-6 flex space-x-2 md:space-x-8'">
                        <m-button class="flex justify-center" :type="'submit'" :classes="step === totalSteps ? 'w-full lg:w-3/6 text-white bg-black rounded-l30 text-xs sm:text-base p-1 md:p-2' : 'md:max-w-160  text-white bg-black text-xs sm:text-base rounded-l30 px-8 py-2'" load :activateLoad="request" :text="step == totalSteps ? 'Valider': 'Continuer'"></m-button>
                    </div>
                
            </form>
        </ValidationObserver>
         <slot name="form-footer"></slot>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
import MButton from '../globalComponents/MButton.vue'
//import User from '../../store/models/user'
export default {
  components: { MButton },
    data() {
        return {
            request: false,
            pwdType: 'password',
            validMsg: {
                carac: false,
                num: false,
                upper: false,
                eightCarac: false
            },
            step: 1,
            user: {
                lastname: '',
                firstname: '',
                phone: '',
                officeName: '',
                email: '',
            },
            password: '',
            passwordConfirmation: '',
            existingAccount: false,
        }
    },
    computed: {
        
        totalSteps(){
            return 2
        },
    },
    watch: {
        interval(){
            //console.log('ghjk',this.interval)
        },
        password(value){
            this.password = value;
            this.validatePassword(value);
        }
    },
    methods: {
        ...mapMutations([
        'mutShowLoginModal', 
        'mutShowRegisterModal'
        ]),
        onSubmit(){
            this.$refs.form.validateWithInfo().then(validate => {
                let { isValid } = validate;
                if(isValid) {
                    if(this.step < this.totalSteps) {
                        this.step++
                    }
                    else {
                        this.request = true
                        axios.post('/auth/sign_up',{
                            firstName: this.user.firstName,
                            lastName: this.user.lastName,
                            phone: this.user.phone,
                            username: this.user.email,
                            password: this.password,
                                
                        })
                        .then(res => {
                            this.request = false
                            console.log(res.data)
                            this.mutShowRegisterModal(false)
                            this.mutShowLoginModal(true)
                        })
                        .catch(err => {
                            this.request = false
                            console.log(err.response.data)
                            const code = err.response.data.code;
                            if (code == 11000) this.existingAccount = true
                        })
                    }
                }
            })
        },
        
        validatePassword(value){
            let eigh = /.{8,}/;
            let numreq = /[0-9]+/;
            let upp = /[A-Z]+/;
            let car = /^(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/;
            eigh.test(value) ? this.validMsg.eightCarac = true : this.validMsg.eightCarac = false;

            numreq.test(value) ? this.validMsg.num = true : this.validMsg.num = false;
            
            upp.test(value) ? this.validMsg.upper = true : this.validMsg.upper = false;
            
            car.test(value) ? this.validMsg.carac = true : this.validMsg.carac = false;
            
        },
  }
}
</script>

<style scoped>
.no-spin::-webkit-inner-spin-button, .no-spin::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
}

.no-spin {
    -moz-appearance:textfield !important;
}
</style>