<template>
    <div class="min-h-screen">
        <div class="landBg min-h-224 md:min-h-312 lg:min-h-600  bg-no-repeat select-none">
            <div class="min-h-224 md:min-h-312 lg:min-h-600 bgLinear pl-6 lg:pl-20 pt-8 lg:pt-36 pr-16 sm:pr-32 lg:pr-64 xl:pr-96">
                <p class="text-xs sm:text-base md:text-2xl lg:text-4xl text-white mb-2 md:mb-6">FTTH Planning</p>
                <p class="xl:w-3/4 text-lg sm:text-xl md:text-4xl lg:text-6xl text-white font-bold mb-2 md:mb-6 break-words">Planifier et concevoir des réseaux de fibre optique constructibles</p>
                <router-link to="/">
                    <MButton :classes="'bg-blueLighter-simple rounded-l30 py-2 lg:py-4 px-4 lg:px-8 text-9 md:text-lg lg:text-xl'" :text="'Commencer maintenant'"></MButton>
                </router-link>
            </div>
        </div>

        <div class="py-10 lg:py-12 px-16 lg:px-28 bg-saltGrey">
            <p class="text-lg md:text-2xl lg:text-4xl font-bold text-center mb-7 lg:mb-16">Avantages</p>
            <div class="">
                <div class="grid lg:grid-cols-3 gap-10 xl:gap-20">
                    <EmptyCard v-for="el in workDetail" :key="el.icon" >
                        <div slot="body" class="py-4 px-6 flex flex-col items-center text-center">
                            <svgicon class="mb-2 h-10 w-10 lg:h-20 lg:w-20" :name="el.icon" color="black"></svgicon>
                            <!-- <img class="mb-2" :src="`${require(`@/assets/svg/${el.icon}.svg`)}`" width="80" height="80"> -->
                            <p class="font-bold sm:text-lg">{{ el.title }}</p>
                            <p class="w-3/4 text-xs sm:text-base">{{ el.description }}</p>
                        </div>
                    </EmptyCard>
                </div>
            </div>
        </div>

        <div class="py-10 lg:py-12 px-16 lg:px-28 bg-blueLighter-active">
            <EmptyCard>
                <div slot="body" class="p-6 lg:p-10">
                    <p class="text-lg md:text-2xl lg:text-4xl text-blueNormal font-bold text-center mb-7 lg:mb-16">Comparaison des solutions de conception de réseau</p>
                    <div class="grid lg:grid-cols-3 gap-6">
                        <div class="lg:col-span-1 text-justify">{{comparisonDesc}}</div>
                        <div class="lg:col-span-2">
                            <table class="table-auto w-full text-xs sm:text-14 md:text-base">
                                <thead class="bg-gray-100 text-blueNormal">
                                    <tr >
                                        <th></th>
                                        <th class="p-4">FTTH Planning</th>
                                        <th>Conception manuelle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-b border-gray-200">
                                        <th class="p-4">Vitesse</th>
                                        <td ><p class="flex space-x-2 items-center"><svgicon class="hidden sm:block" name="checkmark" width="20" height="20" color="green"></svgicon><span>Plus rapide</span> </p></td>
                                        <td><p class="flex space-x-2 items-center"><svgicon class="hidden sm:block" name="closemark" width="20" height="20"></svgicon><span>Lent</span></p></td>
                                    </tr>
                                    <tr class="border-b border-gray-200 bg-gray-100">
                                        <th class="p-4">Précision</th>
                                        <td><p class="flex space-x-2 items-center"><svgicon class="hidden sm:block" name="checkmark" width="20" height="20" color="green"></svgicon><span>Plus de précision</span></p></td>
                                        <td><p class="flex space-x-2 items-center"><svgicon class="hidden sm:block" name="closemark" width="20" height="20" ></svgicon><span>Sujette aux erreurs</span></p></td>
                                    </tr>
                                    <tr>
                                        <th class="p-4">Coût</th>
                                        <td><p class="flex space-x-2 items-center"><svgicon class="hidden sm:block" name="checkmark" width="20" height="20" color="green"></svgicon><span>Moins de travail manuel</span></p></td>
                                        <td><p class="flex space-x-2 items-center"><svgicon class="hidden sm:block" name="closemark" width="20" height="20"></svgicon><span>Beaucoup d'heures de travail</span></p></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </EmptyCard>
            
        </div>

        <div class="grid lg:grid-cols-2">
            <div class="contactImg min-h-328 lg:min-h-442 flex flex-col justify-between">
                
            </div>
            <div class="bg-white">
                <div class="px-4 md:px-8 lg:px-24 py-6 md:py-8">
                    <div class="mb-4 lg:mb-10">
                        <p class="font-bold text-xl lg:text-4xl mb-2 lg:mb-4">Besoin d’aide ?</p>
                        <p class="text-14 lg:text-lg">Nous sommes là pour vous aider à tout moment ! </p>
                    </div>
                    <MButton :classes="' text-white text-xs lg:text-base bg-black px-4 lg:px-6 py-2 rounded-l30'" :text="'Contacter le support'"></MButton>
                    <div class="mt-6 lg:mt-8 text-xs md:text-base lg:text-lg">
                        <p class="mb-4 lg:mb-6">Pour plus d’informations :</p>
                        <ul class="px-1 lg:px-3 list-disc list-inside">
                            <li>Télephone  <span class="text-blueNormal">+22997676990</span></li>
                            <li>Envoyez-nous un courriel à <a class="text-blueNormal" href="mailto:business.bj@mtn.com">ftthplanninng@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import EmptyCard from '@/components/card/EmptyCard.vue'
export default {
    components: {
        EmptyCard
    },
    data() {
        return {
            workDetail: [
                {icon: 'fast', title: 'Rapide et précis', description: 'Créez des conceptions de réseau de fibre à construire avec une précision extrême et jusqu\'à 90% plus rapidement.'},
                {icon: 'controlCursor', title: 'Gardez le control', description: 'Gardez le contrôle total sur le processus de conception de votre réseau fibre à tout moment.'},
                {icon: 'money', title: 'Investissement Optimisé', description: 'Économisez de l\'argent en économisant du temps et en créant les bonnes conceptions de réseau dès le départ.'}
            ],
            text: 'Automatisez et optimisez les processus de planification et de conception des déploiements de réseau FTTx. Gagnez du temps, augmentez vos revenus.',
            comparisonDesc: "Il existe plusieurs façons de créer des conceptions de réseau à fibre optique. Nous pensons qu'il n'existe qu'une seule solution à l'épreuve du temps. Les logiciels d'automatisation tels que FTTH Planning aident les planificateurs et les concepteurs à travailler plus rapidement et avec plus de précision. Il en résulte une analyse de rentabilisation plus solide et des conceptions de réseau meilleures et cohérentes sans perdre de temps et de ressources."
        }
    },
    watch: {
        
    },
    computed: {
        
    },
    methods: {
        
    },
}
</script>

<style scoped>
.hiddScroll::-webkit-scrollbar {
  display: none;
}

.hiddScroll {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.landBg{
    background-image: url('../assets/images/land1.png');
    background-size: cover;
    background-position: center;
}
.contactImg{
    background-image: url('../assets/images/contact.png');
    background-size: cover;
    background-position: center;
}
.bgLinear{
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) -0.52%, rgba(0, 0, 0, 0.9) 110.11%);
}
</style>