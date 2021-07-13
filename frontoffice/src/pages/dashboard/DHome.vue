<template>
    <div class="lg:px-12 px-6 pb-16 lg:py-9 py-6">
        <p class="text-lg font-bold mb-6">Vue d'ensemble</p>
        <div v-if="stats" class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full mb-6">
            <DSmallCard class="lg:w-1/3">
                <span slot="logo"><svgicon name="affaire" width="52" height="52"></svgicon></span>
                <span slot="title">Projets terminés</span>
                <span slot="data">{{stats.success.toLocaleString()}}</span>
            </DSmallCard>
            <DSmallCard class="lg:w-1/3">
                <span slot="logo"><svgicon name="acountTot" width="52" height="52"></svgicon></span>
                <span slot="title">Projets en cours</span>
                <span slot="data">{{stats.pending.toLocaleString()}}</span>
            </DSmallCard>
            <DSmallCard class="lg:w-1/3">
                <span slot="logo"><svgicon name="activeAccount" width="52" height="52"></svgicon></span>
                <span slot="title">Projets archivés</span>
                <span slot="data">{{stats.archived.toLocaleString()}}</span>
            </DSmallCard>
        </div>
        
        <div class="flex justify-center mt-20">
            <img class="h-150 w-280 lg:min-w-800 lg:min-h-400" src="@/assets/svg/homeIllustration.svg" alt="">
        </div>
    </div>
</template>

<script>
//92 65
import DSmallCard from '@/components/card/DSmallCard.vue'
export default {
    components: {
        DSmallCard
    },
    data() {
        return {
            menus: [
                {icon:'discoverOffer', title: 'Voir les projets', path: '/dashboard/planningsRecap'},
                {icon:'commandHistory', title: 'Historique des commandes', path: ''},
                {icon:'customerService', title: 'Service Client', path: ''}
            ]
            
        }
    },
    computed: {
        stats(){
            return {
                success: 5,
                pending: 5,
                archived: 1
            }
        }
    }
}
</script>

<style scoped>

</style>