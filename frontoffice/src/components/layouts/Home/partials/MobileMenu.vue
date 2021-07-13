<template>
    <div class="h-screen w-full bg-white flex flex-col justify-between">
        <div class="p-7">
            <div class="flex flex-col space-y-8 mb-8">
                <p  class="flex justify-end">
                    <svgicon @click="exitMenu(false)" name="close" width="12" height="13"></svgicon>
                </p>
                <div @click="exitMenu(false)" class="text-lg" v-for="(item, index) in navItems" :key="index">
                    <routerLink :to="item.path" >{{item.menu}}</routerLink>
                </div>
            </div>
            <div @click="exitMenu(false)">
                <AuthBtn :classes="'justify-center border border-black w-full'"></AuthBtn>
            </div>
        </div>
        <AppInstall class=""/>
    </div>
</template>

<script>
import AuthBtn from '@/components/AuthComponents/AuthBtn'
import AppInstall from '@/components/layouts/Dashboard/partials/AppInstall'
export default {
    components: {
        AuthBtn,
        AppInstall
    },
    props: {
        navItems:{
            type: Array
        },
        exitMenu: {
            type: Function,
            default(bool) {
                return this.mobileMenu = bool
            }
        }
    },
    data() {
        return {
            mobileMenu: true
        }
    },
}
</script>

<style scoped>

</style>