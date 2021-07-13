<template>
    <div>
        <DHeader class="sticky top-0"></DHeader>
        <div class="lg:grid lg:grid-cols-12 xl:grid-cols-5">
            <div @click="sidebarView" class="hidden lg:block fixed z-10 left-0 bg-white shadow-md p-1 cursor-pointer">
                <svgicon name="lgHamburger" width="25" height="25"></svgicon>
            </div>
            <DSidebar :class="hideSideBar ? 'hidden' : 'hidden lg:block lg:col-span-3 xl:col-span-1 maxh overflow-y-auto hiddScroll'" ></DSidebar>
            <DBody class="minh overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-10" :class="hideSideBar ? 'lg:col-span-12 xl:col-span-5' : 'lg:col-span-9 xl:col-span-4' " ></DBody>
        </div>
    </div>
</template>

<script>
import DHeader from './partials/DHeader'
import DSidebar from './partials/DSidebar'
import DBody from './partials/DBody'
export default {
    components: {
        DHeader,
        DSidebar,
        DBody,
    },
    data() {
        return {
            hideSideBar: false
        }
    },
    methods: {
        sidebarView(){
            this.hideSideBar = !this.hideSideBar
        }
    },
}
</script>

<style scoped>
.maxh{
    max-height: calc(100vh - 68px);
}
.minh{
    min-height: calc(100vh - 68px);
}
.hiddScroll::-webkit-scrollbar {
  display: none;
}

.hiddScroll {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>