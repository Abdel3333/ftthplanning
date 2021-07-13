<template>
    <div class="">
        <div>
            <router-link to="/dashboard/planning" tag="div" class="mb-4">
                <MButton :classes="'flex items-center justify-center space-x-2 shadow-md rounded bg-blueLighter-active py-2 px-3 mx-auto w-5/6'" :text="'Planifier un reseau'">
                    <span slot="icon"><svgicon name="disconnect" width="25" height="25"></svgicon></span>
                </MButton>
            </router-link>
            <div class="flex flex-col space-y-4">
                <div @click="quitMenu" v-for="(item, i) in principalMenus" :key="i">
                    <router-link :to="item.path" active-class="border-r-4 border-blueLighter-active" class="flex items-center space-x-2 pl-8 py-2.5">
                        <span>
                            <!-- <svgicon :name="item.icon" width="25" height="25"></svgicon> -->
                            <img :src="`${require(`@/assets/svg/${item.icon}.svg`)}`" alt="">
                        </span>
                        <span>{{item.menu}}</span>
                    </router-link>
                </div>
                <div class="flex items-center space-x-2 pl-8 py-2.5 cursor-pointer">
                    <svgicon name="disconnect" width="25" height="25"></svgicon>
                    <span @click="logout">Deconnexion</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import User from '../../../../store/models/user'
export default {
    components: {
    },
    data() {
        return {
            principalMenus:[
                {icon: 'home', menu: 'Accueil', path: '/dashboard/home'},
                {icon: 'offer', menu: 'Mes Planifications', path: '/dashboard/planningsRecap'},
                {icon: 'offer', menu: 'Mes Archives', path: '/dashboard/plannings/archived'},
                {icon: 'offer', menu: 'Tutoriel', path: '/dashboard/tutorial'},
            ],
        }
    },
    computed: {
        user(){
            return User.query().first()
        },
    },
    methods: {
        quitMenu(){
            this.$emit('mobileMenu', false)
        },
        logout(){
            this.$router.push('/')
            localStorage.removeItem('token')
            User.delete(this.user._id)
        }
    }
}
</script>

<style scoped>
</style>