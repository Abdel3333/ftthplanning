<template>
    <div class="pt-2.5 px-2 pr-6 flex space-x-2.5 background">
        <div>
            <!-- <svgicon name="app" width="65" height="106"></svgicon> -->
            <img :src="`${require(`@/assets/svg/app.svg`)}`" alt="">
        </div>
        <div >
            <p class="mb-1 text-xs text-blueActive">Profitez d'une expérience en mode application</p>
            <p class="mb-1 text-10 text-inkDark">Obtenez notre mini-application web de 0,8 Mo; Moins volumineux qu'un selfie</p>
            <MButton :classes="'py-2 px-4 bg-yellowNormal-simple rounded-l30 text-xs'" :text="'Ajouter à l\'écran d\'accueil'"></MButton>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
        }
    },
    computed: {
    },
}
</script>

<style scoped>
.background{
    background: radial-gradient(300.85% 1053.43% at 153.43% 233.28%, #F9E1E1 25.8%, #F1F8FC 60.02%, #FFF4C0 92.47%);
}
</style>