<template>
  <div class="p-2.5 flex space-x-3.5 bg-white rounded shadow-md">
      <slot name="logo"></slot>
      <p class="flex flex-col justify-center space-y-1">
          <span class="text-xs sm:text-sm font-medium"><slot name="title" ></slot></span>
          <span class="text-sm sm:text-base font-bold"><slot name="data"></slot></span>
      </p>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>