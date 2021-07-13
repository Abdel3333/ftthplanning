<template>
    <div>
        <div class="h-68p bg-blueLighter-simple px-5 lg:px-10 flex justify-between items-center">
            <div class="flex items-center">
                <div @click="mobileMenu = true" class="lg:hidden mr-5">
                    <svgicon name="amburger" width="33" height="32"></svgicon>
                </div>
                <div class="flex space-x-32">
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
                    <div>
                        <svgicon name="search" width="18" height="19"></svgicon>
                    </div>
                </div>
            </div>
            <div  class="lg:hidden transform top-0 w-10/12 sm:w-2/4 md:w-2/5 left-0 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
                :class="mobileMenu ? 'translate-x-0' : '-translate-x-full'">

                <div class=" bg-white">
                    <DProfilResume>
                        <span @click="mobileMenu = false" slot="close-icon">
                            <svgicon name="close" width="12" height="13"></svgicon>
                        </span>
                    </DProfilResume>
                    <hr class="bg-gray5 mb-6">
                    <DMenu @mobileMenu="mobileMenu = $event"/>
                    <AppInstall/>
                </div>
            
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
        </div>
        <AppInstallDialog v-if="installApp" @understand="installApp = $event"/>
    </div>
</template>

<script>
import DProfilResume from './DProfilResume'
import DMenu from './DMenu'
import AppInstall from './AppInstall'
import AppInstallDialog from '@/components/layouts/Home/partials/AppInstallDialog'
export default {
    components: {
        DProfilResume,
        DMenu,
        AppInstall,
        AppInstallDialog,
    },
    data() {
        return {
            accountActive: true,
            navItems:[
                {menu: 'Tableau de bord', path: '/dashboard/home'},
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