<template>
    <div :style="{borderTopColor: color}"></div>
</template>

<script>
export default {
  props:{
    color: {
      type: String,
      default: '#ffffff'
    }
  }
}
</script>

<style scoped>
div {
  border: 3px solid hsla(185, 100%, 62%, 0.2);
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>