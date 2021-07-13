<template>
    <div>
        <div class="h-68p bg-blueLighter-simple px-5 lg:px-10 flex justify-between items-center">
            <div class="flex items-center">
                <div @click="mobileMenu = true" class="lg:hidden mr-5">
                    <svgicon name="amburger" width="33" height="32"></svgicon>
                </div>
                <div class="flex  space-x-32">
                    <!-- <div class="bg-black my-4">
                        <p class="text-white font-bold text-xl p-2 py-1">FTTH Planning</p>
                    </div> -->
                    <div class="hidden lg:flex my-auto items-center space-x-10">
                        <div class="" v-for="(item, index) in navItems" :key="index">
                            <routerLink :to="item.path" active-class="border-b-4 border-black" class="py-5" >{{item.menu}}</routerLink>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div class="lg:hidden flex items-center space-x-3">
                    <div @click="installApp = true">
                        <svgicon name="add" width="32" height="32"></svgicon>
                    </div>
                </div>
                <AuthBtn :classes="'hidden lg:flex bg-white mr-7'"></AuthBtn>
            </div>
        </div>
        <div  class="lg:hidden transform top-0 w-10/12 sm:w-2/4 md:w-2/5 left-0 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
            :class="mobileMenu ? 'translate-x-0' : '-translate-x-full'">

            <MobileMenu :navItems="navItems" :exitMenu="exitMenu" class="lg:hidden fixed top-0"/>
        
        </div>
        <transition 
            enter-class="opacity-0" 
            enter-active-class="ease-out transition-medium" 
            enter-to-class="opacity-100"
            leave-class="opacity-100" 
            leave-active-class="ease-out transition-medium" 
            leave-to-class="opacity-0">
            <div @keydown.esc="mobileMenu = false" v-show="mobileMenu" class="lg:hidden z-10 fixed inset-0 transition-opacity">
                <div @click="mobileMenu = false" class="lg:hidden absolute inset-0 bg-black opacity-75" tabindex="0"></div>
            </div>
        </transition>
        <AppInstallDialog v-if="installApp" @understand="installApp = $event"/>
        <AuthModal/>
    </div>
</template>

<script>
import AuthBtn from '@/components/AuthComponents/AuthBtn'
import AuthModal from '@/components/AuthComponents/AuthModal'
import AppInstallDialog from './AppInstallDialog'
import MobileMenu from './MobileMenu'
export default {
    components: {
        MobileMenu,
        AuthBtn,
        AppInstallDialog,
        AuthModal,
    },
    data() {
        return {
            navItems:[
                {menu: 'Accueil', path: '/home'},
                {menu: 'A Propos', path: '/about'},
                {menu: 'Tutoriel', path: '/home'},
            ],
            mobileMenu: false,
            installApp: false
        }
    },
    watch: {
        mobileMenu: {
        immediate: true,
        handler(mobileMenu) {
            if (process.client) {
                if (mobileMenu) document.body.style.setProperty("overflow", "hidden");
                else document.body.style.removeProperty("overflow");
            }
        },
        },
    },
    computed: {

    },
    methods: {
        exitMenu(bool){
            this.mobileMenu = bool
        }
    },
}
</script>

<style scoped>

</style>