<template>
    <div @click="understand" class="background px-6 fixed top-0 w-full text-white text-xs py-14 h-screen">
        <div class="flex mb-6">
            <div>
                <p class="font-bold mb-5">Profitez d'une expérience de type application</p>
                <p class="flex items-center space-x-2 mb-5">
                    <span>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5999 1.85486C13.4563 1.85502 13.3154 1.89384 13.1919 1.96725C13.0685 2.04065 12.9671 2.14594 12.8983 2.27205L6.53897 12.6017V12.6033C6.4482 12.7364 6.39974 12.8938 6.3999 13.0549C6.3999 13.267 6.48419 13.4705 6.63422 13.6205C6.78425 13.7706 6.98773 13.8549 7.1999 13.8549H11.5999L10.4155 21.6955C10.405 21.748 10.3998 21.8013 10.3999 21.8549C10.3999 22.067 10.4842 22.2705 10.6342 22.4205C10.7842 22.5706 10.9877 22.6549 11.1999 22.6549C11.3453 22.6546 11.4878 22.6148 11.6123 22.5396C11.7367 22.4645 11.8383 22.3569 11.9062 22.2283H11.9077L18.2452 11.9267L18.2374 11.9127C18.3321 11.7812 18.3999 11.6291 18.3999 11.4549C18.3999 11.0133 18.0415 10.6549 17.5999 10.6549H13.1999L14.364 2.8908C14.3877 2.81439 14.3998 2.73486 14.3999 2.65486C14.3999 2.44269 14.3156 2.2392 14.1656 2.08917C14.0156 1.93914 13.8121 1.85486 13.5999 1.85486Z" fill="white"/>
                        </svg>
                    </span>
                    <span>C'est très rapide</span>
                </p>
                <p class="flex items-center space-x-2 mb-5">
                    <span>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.20001 1.69489C6.41063 1.69489 5.76001 2.34551 5.76001 3.13489V21.3749C5.76001 22.1643 6.41063 22.8149 7.20001 22.8149H16.8C17.5894 22.8149 18.24 22.1643 18.24 21.3749V3.13489C18.24 2.34551 17.5894 1.69489 16.8 1.69489H7.20001ZM6.72001 5.05489H17.28V18.9749H6.72001V5.05489ZM10.56 20.4149H13.44C13.7044 20.4149 13.92 20.6305 13.92 20.8949C13.92 21.1593 13.7044 21.3749 13.44 21.3749H10.56C10.2956 21.3749 10.08 21.1593 10.08 20.8949C10.08 20.6305 10.2956 20.4149 10.56 20.4149Z" fill="white"/>
                        </svg>

                    </span>
                    <span>Facile d'accès</span>
                </p>
                <p class="flex items-center space-x-2">
                    <span>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4.25488L4 14.9215H20L18 4.25488H6ZM12 5.58822C14.599 5.58822 16.6667 7.05436 16.6667 8.92155C16.6667 10.7887 14.599 12.2549 12 12.2549C9.40104 12.2549 7.33333 10.7887 7.33333 8.92155C7.33333 7.05436 9.40104 5.58822 12 5.58822ZM12 7.58822C11.263 7.58822 10.6667 8.01009 10.6667 8.52572C10.6667 9.04134 11.263 9.46322 12 9.46322C12.737 9.46322 13.3333 9.04134 13.3333 8.52572C13.3333 8.01009 12.737 7.58822 12 7.58822ZM4 15.5882V20.2549H20V15.5882H4ZM16 17.5882H18.6667V18.9215H16V17.5882Z" fill="white"/>
                        </svg>

                    </span>
                    <span>Gagnez de l'espace</span>
                </p>
            </div>
            <div class="fixed right-6 top-4">
                <svg width="66" height="195" viewBox="0 0 66 195" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M61.7482 0.859336C61.2578 -0.289719 59.659 -0.285453 59.1745 0.866219L55.0997 10.5514C54.7025 11.4955 55.3811 12.5462 56.388 12.5462H59.484C63.2131 108.837 3.95306 143.112 0.702849 193.811C0.660437 194.473 2.69933 194.328 2.7325 193.811C5.9859 143.067 64.5967 113.417 61.4875 12.5462H64.5967C65.6067 12.5462 66.2853 11.4894 65.882 10.5446L61.7482 0.859336Z" fill="white"/>
                </svg>
            </div>
        </div>
        <div class="mb-5">
            <p class="font-bold mb-4">Comment ajouter MTN Business à l'écran d'accueil ?</p>
            <p class="mb-4">1.Appuyez sur l'icône en haut à droite de l'écran.</p>
            <p>2.Sélectionnez "Ajouter à l'écran d'accueil" dans le menu.</p>
        </div>
        <MButton :classes="'px-4 py-2 text-black bg-yellowNormal-simple rounded-l30'" :text="'Ok, compris'"></MButton>
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
    methods: {
        understand(){
            this.$emit('understand', false)
        }
    },
}
</script>

<style scoped>
.background{
    background:rgba(70, 56, 0, 0.85);
}
</style>