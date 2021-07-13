<template>
    <div class="bg-saltGrey">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            removePadding: false
        }
    },
}
</script>

<style scoped>
.minh{
    height: calc(100vh - 140px);
}
</style>