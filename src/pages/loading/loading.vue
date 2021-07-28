<template>
  <div v-loading="loading" element-loading-text="拼命加载中"></div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {
      loading: true
    };
  }
};
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
