<template>
    <div class="">
        <label
        :class="[
            ' text-inkDark flex items-center space-x-1',
            checkable ? 'flex items-center ml-2' : 'mb-2'
        ]"
        v-if="label"
        :for="name"
        >
        <div v-html="label"></div>
        <slot name="pre-label"></slot>
        </label>
        
      <div :class="($slots.prepend || $slots.append) ? (errors ? `${wrapperErrors}` : `${[wapperClass]}`) : ''">
        <div class="input-group-prepend" v-if="$slots.prepend">
          <slot name="prepend"></slot>
        </div>
        <!-- v-model="model" -->
        <input
          :class="$slots.prepend ? 'w-full focus:outline-none px-2' : errors ? `rounded h-8 lg:h-10 px-2 border text-inkNormal-simple border-kkiapayRed w-full focus:outline-none ${customClass}` : `rounded h-8 lg:h-10 px-2 border text-inkNormal-simple border-borderColor focus:border-blueNormal w-full focus:outline-none ${customClass}`"
          v-bind="attributes"
          v-on="listeners"
          :type="type"
          :name="name"
        />
        <div class="input-group-append" v-if="$slots.append">
          <slot name="append"></slot>
        </div>
      </div>
      <span v-if="errors" class="flex space-x-1 text-xs md:text-sm mt-1 items-center">
          <svgicon name="error" width="16" height="16"></svgicon> 
          <span>{{ errors }}</span>
      </span>
    </div>
</template>

<script>
export default {
    props: {
        errors: null,
        customClass:String,
        label: String,
        name: String,
        value: {},
        type: {
            type: String,
            default: "text"
        },
        /* acceptNumberOnly: {
          type: Boolean,
          default: false
        },
        isNumberKey: {
          type: Function,
          default(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
            return true;
          }
        } */
    },
    data() {
        return {
            model: this.value || "",
            wrapperErrors: 'flex items-center space-x-1 w-full rounded select-none h-8 lg:h-10 px-2 border text-inkNormal-simple border-kkiapayRed focus-within:border-blueNormal'
        }
    },
    methods: {
    changeValue(val) {
      console.log("change value", val);
      this.model = val;
    },

    setInitialValueForInput(value) {
      this.$emit("input ", value);
    }
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: (event) => {
          this.model = event.target.value;

          this.$emit("input", event.target.value);
        },
        focus: (event) => {
          this.$emit("focus", event);
        },
        blur: (event) => {
          this.$emit("blur", event);
        }
      };
    },

    attributes() {
      return {
        ...this.$attrs,
        value: this.value
      };
    },

    checkable() {
      return this.type === "radio" || this.type === "checkbox";
    },

    wapperClass() {
      const classes = ["flex items-center space-x-1 w-full rounded select-none h-8 lg:h-10 px-2 border text-inkNormal-simple border-borderColor focus-within:border-blueNormal"];

      if (this.tagInput) {
        classes.push("min-h-10.5");
      } else {
        classes.push("h-10.5");
      }

      if (!this.checkable) {
        classes.push(
          "border",
          "mb-2",
          "focus-within:border-Tint-30",
          "border-btnBorder"
        );
      }
      return classes;
    }
  },

  created() {
    if (this.value && this.value != null) {
        this.setInitialValueForInput(this.value);
    }
  }
}
</script>

<style scoped>
input[type="radio"] {
  min-width: 15px;
}
</style>