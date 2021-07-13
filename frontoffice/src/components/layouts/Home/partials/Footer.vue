<template>
    <div class="bg-black">
        <div class="text-white md:px-16 p-8 md:py-20">
            <div class="md:px-12">
                <div class="grid md:grid-flow-col grid-cols-2 md:grid-cols-5 md:auto-cols-auto gap-8 text-xs">
                    <div class="flex flex-col space-y-3" v-for="(menu, index) in footerMenu" :key="index">
                        <p class="font-bold">{{ menu.menuTitle }}</p>
                        <p v-for="(item, index) in menu.items" :key="index"><a href="">{{ item.menu }}</a></p>
                    </div>
                </div>
                <div class="mt-8">
                    <div class="flex items-center space-x-7">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.3598 6.12273H17.7598C18.0247 6.12273 18.2398 5.90769 18.2398 5.64273V2.40897C18.2398 2.15745 18.0463 1.94817 17.7958 1.93041C17.0321 1.87617 15.5402 1.80273 14.4674 1.80273C11.5198 1.80273 9.59977 3.56913 9.59977 6.77937V9.96273H6.23977C5.97481 9.96273 5.75977 10.1778 5.75977 10.4427V13.8027C5.75977 14.0677 5.97481 14.2827 6.23977 14.2827H9.59977V23.4027C9.59977 23.6677 9.81481 23.8827 10.0798 23.8827H13.4398C13.7047 23.8827 13.9198 23.6677 13.9198 23.4027V14.2827H17.3863C17.6311 14.2827 17.8366 14.0989 17.8634 13.8555L18.2369 10.4955C18.2686 10.2114 18.0458 9.96273 17.7598 9.96273H13.9198V7.56273C13.9198 6.76737 14.5644 6.12273 15.3598 6.12273Z" fill="white"/>
                        </svg>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                            <path d="M24.0303 5.85086C23.1434 6.24461 22.1928 6.50898 21.1934 6.62898C22.2134 6.01773 22.9972 5.05023 23.3647 3.89898C22.4122 4.46336 21.3528 4.87398 20.2297 5.09523C19.3297 4.13523 18.0472 3.53711 16.6278 3.53711C13.9015 3.53711 11.6909 5.74586 11.6909 8.47211C11.6909 8.85836 11.7359 9.23523 11.8203 9.59711C7.71779 9.39086 4.08217 7.42586 1.64654 4.43898C1.22092 5.17023 0.979043 6.01773 0.979043 6.92148C0.979043 8.63336 1.84904 10.1446 3.17467 11.0315C2.36467 11.0052 1.60342 10.7821 0.937793 10.4127C0.937793 10.4334 0.937793 10.454 0.937793 10.4746C0.937793 12.8671 2.64029 14.8602 4.89592 15.3159C4.48342 15.4284 4.04654 15.4884 3.59654 15.4884C3.27779 15.4884 2.96842 15.4584 2.66654 15.3984C3.29654 17.3577 5.11904 18.7884 7.27717 18.8277C5.58967 20.1515 3.46154 20.939 1.14779 20.939C0.748418 20.939 0.356543 20.9165 -0.027832 20.8696C2.15467 22.2721 4.74967 23.0877 7.53779 23.0877C16.6165 23.0877 21.5815 15.5671 21.5815 9.04586C21.5815 8.83211 21.5759 8.61648 21.5684 8.40648C22.5322 7.71086 23.3684 6.84086 24.0303 5.85086Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0">
                            <rect width="24" height="24" fill="white" transform="translate(0 0.841797)"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <p style="font-size: 7px" class="mt-4 text-greyscales">© <span>{{new Date().getFullYear()}}</span> | FTTH Planning</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//grid md:grid-flow-col grid-cols-2 md:grid-cols-5 md:auto-cols-auto gap-4 text-xs
//md:flex grid grid-flow-col grid-cols-2 gap-4 md:space-x-20 2xl:space-x-40 text-xs
export default {
    data() {
        return {
            footerMenu: [
                {
                    menuTitle: 'FTTH Planning', 
                    items: [
                        {menu: 'Accueil', path: '/'},
                        {menu: 'A Propos de FTTH Planning', path: ''},
                        {menu: 'Tutoriel', path: ''},
                    ]
                },
                
            ]
        }
    },
}
</script>

<style scoped>

</style>