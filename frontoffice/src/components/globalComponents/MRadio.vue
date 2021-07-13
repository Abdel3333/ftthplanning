<template>
    <div>
        <label class="flex items-center space-x-2 cursor-pointer">
            <input class="form-radio text-blueDark focus:outline-none" :value="value"  type="radio" :name="name" :checked="isChecked" @change="onChange">
            <span>{{ label }}</span>
        </label>
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        name: String,
        radioButtonValue:null,
        checked: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            check: this.checked,
            value: ''
        }
    },

    methods: {
        testCheck(){
            
        },
        onChange(event){
            this.$emit('change', event.target.checked)
            this.$emit('input', this.radioButtonValue)
            this.check = event.target.checked
        }
    },

    computed: {
        isChecked(){
            if (this.radioButtonValue == this.value || this.check) return true
            else {
                return false
            }
        }
    },
}
</script>

<style scoped>

</style>