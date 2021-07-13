<template>
    <div class="bg-white rounded shadow-md">
        <div class="grid md:grid-cols-5">
            <div class="md:col-span-3 py-12 px-4 md:px-16 w-full md:w-4/6">
                <slot name="form"></slot>
                <MButton :classes="'hidden mt-10 md:inline text-white bg-black p-2 rounded-l30 w-full'" :text="'Souscrire'"></MButton>
            </div>
            <div id="details" class="md:col-span-2 bg-blueLighter-simple py-6 px-7">
                <p class="text-lg md:text-2xl">Total à payer</p>
                <div class="mt-2 mb-6 md:my-8 text-blueNormal">
                    <div class="flex justify-between text-14 md:text-base">
                        <span>Pack 500 SMS </span>
                        <span>25 000</span>
                    </div>
                </div>
                <p class="text-lg md:text-2xl">Total : <span class="text-kkiapayRed">35 000 FCFA</span></p>
            </div>
        </div>
        <div class="md:hidden fixed w-full bottom-0 right-0 p-4 bg-white shadow-lg flex justify-between">
            <p class="flex flex-col">
                <span class="text-kkiapayRed">35 000 FCFA</span>
                <a href="#details" class="uppercase text-blueNormal text-xs">Voir DÉtails</a>
            </p>
            <MButton :classes="'text-white text-14 rounded-l30 bg-black w-full py-1.5 px-8 uppercase'" :text="'Souscrire'"></MButton>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>

</style>