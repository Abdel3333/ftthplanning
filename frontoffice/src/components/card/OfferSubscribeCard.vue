<template>
    <div class="bg-white rounded shadow-md p-5 md:min-w-280 xl:min-w-328 ">
        <p class="px-1 text-inkNormal-simple text-14 mb-9">Souscrivez à l’offre {{ offerName }} dès maintenant</p>
        <m-button @click="$emit('subscriptionProceed', true)" :classes="'text-white rounded-l30 bg-black w-full p-1.5'" :text="'Souscrire'"></m-button>
    </div>
</template>

<script>
export default {
    props: {
        offerName: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>

</style>