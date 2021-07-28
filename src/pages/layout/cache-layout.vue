<template>
  <keep-alive :include="vx_gt_GetCachedViews">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import AppCachedViewMixin from '@/mixins/app-cached-view.mixin';
export default {
  name: 'CacheLayout',
  mixins: [AppCachedViewMixin],
  data () {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
</style>
