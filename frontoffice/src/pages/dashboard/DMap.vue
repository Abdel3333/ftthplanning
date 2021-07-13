<template>
    <div class="px-6 py-6">
        <Map/>
    </div>
</template>

<script>
import Map from './components/Map'
export default {
    components: {
        Map,
    },
    data() {
        return {

        }
    },
    mounted() {
        this.$emit('padding', true)
    },
}
</script>

<style scoped>

</style>