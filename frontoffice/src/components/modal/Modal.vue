<template>
  <transition name="fade">
    <component
      :is="tag"
      :class="wrapperClass"
      v-if="show"
      @click.self="selfClick"
    >
      <div
        :class="['dialog', dialogClass, computedClass.modalClass]"
        role="document"
      >
        <div :class="['content', contentClass]">
          <slot>
            <div class="modal-header">
              <slot name="modal-header">
                <div class="flex justify-between p-4">
                  <div class="title text-xl font-semibold">{{ title }}</div>

                  <button
                    class="close focus:outline-none"
                    @click.prevent="$emit('close')"
                  >
                     <svgicon name="close" width="12" height="13"></svgicon>
                  </button>
                </div>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="modal-body"> </slot>
            </div>
            <div class="modal-footer">
              <slot name="modal-footer"> </slot>
            </div>
          </slot>
        </div>
      </div>
    </component>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  components: {
  },
  props: {
    tag: {
      type: String,
      default: "div"
    },

    css: {
      type: Object,
      default() {
        return {};
      }
    },

    title: {
      type: String,
      default: "Modal title "
    },

    size: {
      type: String,
      default: "md"
    },

    fullSizePosition: {
      type: String,
      default: ""
    },

    position: {
      type: String,
      default: ""
    },

    show: {
      type: Boolean,
      default: false
    },

    centered: {
      type: Boolean,
      default: false
    },

    scrollable: {
      type: Boolean,
      default: false
    },

    noBackground: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    selfClick() {
      this.$emit("close", this);
    }
  },

  computed: {
    wrapperClass() {
      return [
        "modal",
        this.noBackground && "modal-without-background",
        this.centered && "flex justify-center items-center"
      ];
    },

    dialogClass() {
      return [
        "modal-dialog",
        this.position || this.fullSizePosition
          ? "fixed m-0 "
          : "relative my-6 mx-auto ",
        this.modalPositon,
        this.modalSize,
        this.modalFullSizePosition,
        this.scrollable && "overflow-y-scroll"
      ];
    },

    modalPositon() {
      let position = "";
      switch (this.position) {
        case "top":
          position = "top-0";
          break;

        case "bottom":
          position = "bottom-0";
          break;

        case "left":
          position = "left-0";
          break;

        case "right":
          position = "right-0";
          break;

        case "top-left":
          position = "top-6 left-6";
          break;

        case "top-right":
          position = "top-6 right-6";
          break;

        case "bottom-left":
          position = "bottom-6 left-6";
          break;

        case "bottom-right":
          position = "bottom-6 right-6";
          break;
      }
      return position;
    },

    modalSize() {
      let size = "";
      switch (this.size) {
        case "sm":
          size = "w-10/12 lg:w-3/12";
          break;
        case "md":
          size = "w-10/12 lg:w-5/12";
          break;

        case "lg":
          size = "w-11/12 lg:w-10/12";
          break;
        case "fluid":
          size = "w-full";
          break;
      }
      return size;
    },

    modalFullSizePosition() {
      let fullSizePosition = "";

      switch (this.fullSizePosition) {
        case "top":
          fullSizePosition = "w-full lg:w-full top-0";
          break;

        case "bottom":
          fullSizePosition = "w-full lg:w-full bottom-0";
          break;

        case "left":
          fullSizePosition = "h-full lg:h-full left-0";
          break;

        case "right":
          fullSizePosition = "h-full lg:h-full right-0";
          break;

        default:
          break;
      }
      return fullSizePosition;
    },

    contentClass() {
      return ["modal-content"];
    },

    computedClass() {
      return {
        ...this.css,
        titleClass: "text-xl font-semibold"
      };
    }
  }
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
  background: rgba(0, 0, 0, 0.5);
}
.modal .modal-dialog {
  background-color: #fff;
}
</style>