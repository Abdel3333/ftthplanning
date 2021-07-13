<template>
    <div class="bg-saltGrey lg:px-40 px-6 pb-16 lg:py-16 py-6 min-h-screen">
        <div class="lg:px-14">
            <p class="mb-6 text-lg font-bold">A Propos de FTTH Planning</p>
            <div class="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10">
                <EmptyCard class=" md:min-w-596">
                    <div class="flex flex-col justify-center p-6 md:px-9" slot="body">
                        <div>
                            <img src="@/assets/images/about.png" class="imgResponsive" alt="">
                        </div>
                        <p class="mt-8 text-14 text-inkNormal-active" v-html="aboutText">
                        
                        </p>
                    </div>
                </EmptyCard>
            </div>
        </div>
    </div>
</template>

<script>
import EmptyCard from '@/components/card/EmptyCard.vue'
export default {
    components: {
        EmptyCard,
    },
    data() {
        return {
            aboutText: `<p class="mb-8"> MTN Bénin a été crée le 1er Juin 2006 grâce à l’acquisition de la licence de réseau de téléphonie mobile d’Areeba (Spacetel Bénin) par le groupe sud-africain M-Cell. 
                        L’entreprise de télécommunications est ensuite devenu MTN International et selon les dispositions de la convention de transfert, le capital de la compagnie MTN Bénin 
                        s’évalue à 892 000 000 FCFA et se décompose comme suit: 75% sont détenus par MTN International et 25% par d’autres actionnaires.
                        </p>
                        <p class="mb-8">Aujourd’hui, MTN Bénin compte plus de 4.2 millions d’abonnés actifs au Bénin et représente plus de 43% de la part de marché. 
                        Cela fait de MTN le Numéro Un dans le secteur de réseau de téléphonie mobile au Bénin.
                        </p>
                        <p>MTN Bénin offre à ses clients une gamme de produits et services dans le domaine de la communication mobile.
                        Le réseau de distribution de MTN Bénin se compose de plus de 61 000 distributeurs et points de vente, répartis sur le pays.
                        </p>`
        }
    },
}
</script>

<style scoped>
.imgResponsive {
    width: 100%;
    height: auto;
}
</style>