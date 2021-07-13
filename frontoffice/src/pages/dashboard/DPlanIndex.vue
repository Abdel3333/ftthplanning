<template>
    <div class="lg:px-12 px-6 pb-16 lg:py-9 py-6">
        <p class="text-lg font-bold mb-6">Planification de réseau FTTH</p>
        <div class="grid md:grid-cols-2 grid-flow-row gap-6 mb-6">
            <EmptyCard>
                <div slot="body" class="flex flex-col justify-around space-y-4 p-4 text-inkNormal-simple">
                    <p class="text-lg lg:text-2xl font-bold">Option semi-assistée</p>
                    <p class="text-14 lg:text-base">Planifiez vos réseaux grâce à votre propre analyse concernant la zone à desservir. Il s'agira de renseigner les caractéristiques de votre réseau; c'est à dire les paramètres de chaque élément de l'installation extérieure. L'outil se chargera du traitement.</p>
                    <hr class="bg-borderColor">
                    <router-link to="/dashboard/planning/semi_assist">
                        <MButton :classes="'flex items-center text-14 lg:text-base text-black justify-center space-x-2 shadow-md rounded bg-blueLighter-active py-1 px-2 w-1/6'" :text="'Choisir'"></MButton>
                    </router-link>
                </div>
            </EmptyCard>
            <EmptyCard>
                <div slot="body" class="flex flex-col justify-around space-y-4 p-4 text-inkNormal-simple">
                    <p class="text-lg lg:text-2xl font-bold">Option assistée</p>
                    <p class="text-14 lg:text-base">Planifiez vos réseaux avec l’aide de l’outil tout au long du processus. L'outil vous propose des scénarios d'architecture et vous ferez un choix en fonction de vos attentes. Ensuite, commencera le traitement.</p>
                    <hr class="bg-borderColor">
                    <MButton :classes="'flex items-center text-14 lg:text-base text-black justify-center space-x-2 shadow-md rounded bg-blueLighter-active py-1 px-2 w-1/6'" :text="'Choisir'"></MButton>
                </div>
            </EmptyCard>
        </div>
    </div>
</template>

<script>
//92 65
import EmptyCard from '@/components/card/EmptyCard.vue'
export default {
    components: {
        EmptyCard
    },
    data() {
        return {
            
            
        }
    },
}
</script>

<style scoped>

</style>