<template>
    <div class="bg-white p-2 flex items-center justify-between space-x-2 md:min-w-280 xl:min-w-328 md:max-w-328 rounded shadow-md">
        <div class="flex items-center select-none">
            <div>
                <slot name="icon"></slot>
            </div>
            <div class="ml-2">
                <div class="text-inkNormal-active font-bold">
                    <slot name="title"></slot>
                </div>
                <div>
                    <p class="text-inkNormal-active text-xs">
                        <slot name="description"></slot>
                    </p>
                </div>
            </div>
        </div>
        <router-link :to="path" class="cursor-pointer">
            <svgicon name="arrowNext" width="18" height="18"></svgicon>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        path: {
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