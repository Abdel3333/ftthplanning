<template>
  <div>
    <button
      @click="click"
      class="focus:outline-none "
      :type="type"
      :class="classes"
    >
        <slot name="icon"></slot>
        <span v-if="text" class="flex justify-center"><LoaderCss :color="loadColor" v-if="load && activateLoad"/><span v-if="!activateLoad">{{ text }}</span></span>
        <slot name="icon-append"></slot>
    </button>
  </div>
</template>

<script>
export default {
    props: {
        load: {
          type: Boolean,
          default: false
        },
        activateLoad: {
          type: Boolean,
          default: false
        },
        loadColor: {
            type: String,
            default: "#ffffff"
        },
        type: {
            type: String,
            default: "button"
        },
        text: {
            type: String,
            default: ""
        },
        classes: {
            type: String,
            default: ""
        }
    },
    computed: {
      
    },
    methods: {
      click(){
        this.$emit('click')
      }
    }
}
</script>