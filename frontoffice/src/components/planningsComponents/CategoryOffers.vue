<template>
    <div>
        <div class="grid grid-flow-row grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            <Card v-for="(offer, index) in offers" :key="index" :path="`${url}${offer.name}`">
                <div slot="icon">
                    <!-- <img :src="`${require(`@/assets/svg/${offer.icon}.svg`)}`" alt=""> -->
                    <img :src="offer.logo" width="70" height="68" alt="">
                </div>
                <span slot="title">{{ offer.name }}</span>
                <span slot="badge">{{ offer.concern }}</span>
                <span slot="description">{{ offer.description }}</span>
            </Card>
        </div>
    </div>
</template>

<script>
//.replace(/\s/g, '').toLowerCase()
import Card from '@/components/card/Card.vue'
export default {
    props: {
        offers: {
            type: Array,
            default: ()=>{
                return []
            }
        }
    },
    components: {
        Card
    },
    data() {
        return {
        }
    },
    computed: {
        url(){
            if(this.$route.path.match(/dashboard.*/)) return '/dashboard/offers/'
            else {
                return '/offers/'
            }
        },
        collaboration(){
            if (this.$route.path.match(/dashboard.*/)) {
                return [
                {icon: 'mtnEmailPro', title: 'MTN E-mail Pro', badge: 'Entreprise', description: 'Solution de messagerie collaborative d’entreprise.', path: '/dashboard/offers/mtnEmailPro'},
                {icon: 'mtnBusinessCom', title: 'MTN Business Communication', badge: 'Enterprise & Particulier', description: 'Espace de travail, de rencontre et d’échange professionnel.', path: '/dashboard/offers/mtnBusinessCom'},
            ]
            }
            else {
                return [
                {icon: 'mtnEmailPro', title: 'MTN E-mail Pro', badge: 'Entreprise', description: 'Solution de messagerie collaborative d’entreprise.', path: '/offers/mtnEmailPro'},
                {icon: 'mtnBusinessCom', title: 'MTN Business Communication', badge: 'Enterprise & Particulier', description: 'Espace de travail, de rencontre et d’échange professionnel.', path: '/offers/mtnBusinessCom'},
            ]
            }
        }
    }
}
</script>

<style scoped>

</style>