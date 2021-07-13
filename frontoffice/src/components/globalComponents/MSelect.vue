<template>
  <div class="">
    <div @mousedown="showDropdown">
      <div :class="errors ? `flex items-center select-none rounded h-8 lg:h-10 px-3 border border-kkiapayRed w-full focus:outline-none` : `flex items-center select-none rounded h-8 lg:h-10 px-3 border border-borderColor focus-within:border-blueLighter-simple w-full focus:outline-none`">
       <input ref="input"  class="w-full h-full text-inkNormal-simple focus:outline-none select-none cursor-default" type="text" v-model="selectedData.label" readonly :placeholder="placeholder">
       <svgicon name="selectArrow" width="18" height="19"></svgicon>
      </div>
    </div>
    <transition name="fade">
      <div class="relative z-20" v-if="drop">
       <div :class="putOnTop" class="absolute mt-1  w-full rounded bg-saltGrey border border-borderColor max-h-52 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-white">
          <ul class="flex flex-col divide-y divide-borderColor">
            <li @mousedown="selectValue(option)" :class="option == selectedData ? 'bg-blueLighter-active' : '' "  class="flex items-center h-8 lg:h-10 px-2 hover:bg-blueLighter-hover cursor-pointer" v-for="(option, i) of options" :key="i">
              {{ option.label }}
            </li>
          </ul>
       </div>
      </div>
    </transition>
    <span v-if="errors" class="flex space-x-1 text-xs md:text-sm items-center mt-1">
        <svgicon name="error" width="16" height="16"></svgicon>
        <span>{{ errors }}</span>
    </span>
  </div>
</template>

<script >
//@blur="close" @focus="open" tabindex="0"
export default {
  props: {
    errors:null,
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    putOnTop: {
      type: String,
      default: ''
    },
    objectReturn: {
      type: Boolean,
      default: false
    },
    initialValue: {
      default: ''
    },
  },
  data() {
    return {
      drop: false,
      selectedData: {},
    }
  },
  methods: {
    /* open(){
     this.drop == true ? this.drop = false : this.drop = true
     console.log(this.drop)
    },
    close(){
      this.drop = false
      console.log(this.drop)
    }, */
    showDropdown(){
      /* console.log(e)
      if (this.drop) {
        this.$refs.input.blur()
      }
      else {
         this.$refs.input.focus()
      } */
      this.drop = !this.drop
    },
    selectValue(option){
      this.selectedData = option
      this.drop = false
      let value
      if (this.objectReturn) {
        this.$emit("input", this.selectedData);
      }
      else if(this.selectedData.value) {
        value = this.selectedData.value
        this.$emit("input", value);
      }
      else {
        value = this.selectedData.label
        this.$emit("input", value);
      }
      //console.log(value)
    }
  },
  async mounted() {
    await console.log('');
    if(this.initialValue) {
      let opt
      /* if (this.objectReturn) {
        opt = this.options.find(option=>{
          return option == this.initialValue
        })
      }
      else {
        opt = this.options.find(option=>{
          return option == this.initialValue|| option.label == this.initialValue || option.value == this.initialValue
        })
      } */
      opt = this.options.find(option=>{
        return option == this.initialValue|| option.label == this.initialValue || option.value == this.initialValue
      })
      console.log('option: ', opt)
      this.selectValue(opt)
      console.log('selectedData: ', this.selectedData)
    }
  },
}
</script>

<style scoped>
.hiddScroll::-webkit-scrollbar {
  display: none;
}

.hiddScroll {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
