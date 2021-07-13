<template>
    <router-link :to="path" class="bg-white px-2 py-3 sm:px-4 sm:py-6 flex flex-col items-center space-y-1 sm:space-y-2 max-w-200 sm:max-w-256 rounded shadow-md cursor-pointer">
        <div>
            <slot name="icon"></slot>
        </div>
        <div class="text-inkNormal-active text-9 sm:text-15 font-bold text-center">
            <slot name="title"></slot>
        </div>
        <div style="border-radius: 30px" class="border border-innerBorder">
            <p class="text-8 sm:text-9 py-1 px-3 uppercase text-center">
                <slot name="badge"></slot>
            </p>
        </div>
        <div>
            <p class="text-inkNormal-active text-7 sm:text-xs text-center">
                <slot name="description"></slot>
            </p>
        </div>
    </router-link>
</template>

<script>
export default {
    props:{
        path:{
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