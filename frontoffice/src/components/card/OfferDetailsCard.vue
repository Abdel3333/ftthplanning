<template>
    <div class="bg-white rounded shadow-md">
        <div class="flex flex-col justify-center px-3 p-6 md:px-9">
            <div class="mb-8">
                <!-- <img :src="`${require(`@/assets/images/${offerData.image}`)}`" class="imgResponsive" alt=""> -->
                <img :src="`${offerData.image}`" class="imgResponsive" alt="">
                <p class="mt-2 text-inkNormal-active" v-html="offerData.text"></p>
            </div>
            <div class="bg-white rounded shadow-md">
                <div class="px-3 bg-saltGrey">
                    <ul class="flex space-x-5 lg:space-x-10 h-full">
                        <li @click="advantage = true" class="cursor-pointer" :class="advantage ? 'border-b-4 border-black': ''"><p class="py-2">Avantages</p></li>
                        <li @click="advantage = false" class="cursor-pointer" :class="!advantage ? 'border-b-4 border-black': ''"><p class="py-2">Caractéristiques</p></li>
                    </ul>
                </div>
                <div class="min-h-200 overflow-x-hidden overflow-y-auto">
                    <div class="p-5" v-if="advantage">
                        <div class="mb-6" v-for="(advant, i) in offerData.advantages" :key="i">
                            <p class="flex items-center space-x-1.5">
                                <svg width="9" height="3" viewBox="0 0 9 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="0.757812" width="9" height="2" fill="#F2C200"/>
                                </svg>
                                <span class="text-inkDark">{{ advant.title }}</span>

                            </p>
                            <p class="text-14 text-inkNormal-simple" v-html="advant.description"></p>
                        </div>
                    </div>
                    <div class="p-5 text-inkDark" v-else>
                        <div class="mb-6" v-for="(caract, i) in offerData.caracteristics" :key="i">
                            <p class="flex items-center space-x-1.5" v-if="caract.title">
                                <svg width="9" height="3" viewBox="0 0 9 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="0.757812" width="9" height="2" fill="#F2C200"/>
                                </svg>
                                <span >{{ caract.title }}</span>

                            </p>
                            <p v-html="caract.description"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        offerData:{
            type: Object,
            default: function () {
                return {
                    image: '',
                    text: '',
                    advantages: [],
                    caracteristics: []
                }
            }
        }
    },
    data() {
        return {
            advantage: true,
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