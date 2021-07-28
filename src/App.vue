<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
  @import "styles/variables";
  #app {
    width: $percent-100;
    height: $percent-100;
    overflow: hidden;
  }
</style>
