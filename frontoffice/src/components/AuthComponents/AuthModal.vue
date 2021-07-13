<template>
    <div>
        <Modal ref="modal" centered :css="css" :show="showLoginModal" @close="mutShowLoginModal(false)">
            <div slot="modal-header" class="py-2 px-3">
                <m-button @click="mutShowLoginModal(false)" class="flex justify-end"><svgicon slot="icon" name="close" width="12" height="13"></svgicon></m-button>
                <div class="title text-xl font-semibold text-center mt-2">Se connecter</div>
            </div>
            <div slot="modal-body">
                <LoginForm >
                    <div slot="form-footer" class="mt-8 px-2 text-14 text-center">
                        Vous n’avez pas de compte ? <span @click="openRegisterModal" class="text-blueNormal underline cursor-pointer"> Inscrivez-vous</span>
                    </div>
                </LoginForm>
            </div>
            
        </Modal>
        
        <Modal ref="modal" centered :css="cssRegister" :show="showRegisterModal" @close="mutShowRegisterModal(false)">
            <div slot="modal-header" class="py-2 px-3">
                <m-button @click="mutShowRegisterModal(false)" class="flex justify-end"><svgicon slot="icon" name="close" width="12" height="13"></svgicon></m-button>
                <div class="title text-xl font-semibold text-center mt-2">S’inscrire</div>
            </div>
            <div class="" slot="modal-body">
                <RegisterForm>
                    <div slot="form-footer" class="mt-8 px-2 text-xs text-center">
                        Vous avez déjà un compte ? <span @click="openLoginModal" class="text-blueNormal underline cursor-pointer"> Connectez-vous</span>
                    </div>
                </RegisterForm>
            </div>
            
        </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import RegisterForm from '@/components/forms/RegisterForm'
import LoginForm from '@/components/forms/LoginForm'
export default {
    components: {
        LoginForm,
        RegisterForm
    },
    props: {
        classes: {
            type: String,
            default: ""
        }
    },
    
    data() {
        return {
            css: {modalClass:"max-w-360 rounded"},
            cssRegister: {modalClass:"lg:min-w-800 rounded overflow-x-hidden overflow-y-auto max-h-screen"}
        }
    },
    computed: {
        ...mapState({
            showLoginModal:'showLoginModal',
            showRegisterModal: 'showRegisterModal'
        }),
    },
    methods: {
        ...mapMutations([
        'mutShowLoginModal', 
        'mutShowRegisterModal'
        ]),
        openRegisterModal(){
            this.mutShowLoginModal(false)
            this.mutShowRegisterModal(true)
        },
        openLoginModal(){
            this.mutShowLoginModal(true)
            this.mutShowRegisterModal(false)
        }

    },
}
</script>