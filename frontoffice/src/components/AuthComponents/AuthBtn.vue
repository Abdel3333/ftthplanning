<template>
    <div>
        <button @click="mutShowLoginModal(true)"
        class="focus:outline-none rounded-l30 font-bold text-xs flex space-x-4 items-center px-2.5 py-1.5"
        :class="classes"
        >
        <svgicon name="user" width="23" height="24"></svgicon>
            <span >Se connecter/S’inscrire</span>
        </button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    components: {
    },
    props: {
        classes: {
            type: String,
            default: ""
        }
    },
    
    data() {
        return {
            
        }
    },
    computed: {
    },
    methods: {
        ...mapMutations([
        'mutShowLoginModal',
        ]),

    },
}
</script>