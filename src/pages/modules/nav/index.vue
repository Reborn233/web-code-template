<template>
  <app-section title="组件切换">
    <app-navigator
      :current-name.sync="currentName"
      :components-list="componentsList"
      @navigated="onNavigated"
      @wentBack="onWentBack"
    />
  </app-section>
</template>

<script>
export default {
  name: 'Nav',

  props: {},

  data() {
    return {
      currentName: 'PageA',
      componentsList: [
        {
          name: 'PageA',
          component: () => import('./components/pageA.vue'),
          cache: true
        },
        {
          name: 'PageB',
          component: () => import('./components/pageB.vue'),
          cache: true
        },
        {
          name: 'PageC',
          component: () => import('./components/pageC.vue')
        }
      ]
    };
  },

  methods: {
    // 监听导航事件（可选）
    onNavigated(name) {
      console.log('跳转到组件：', name);
    },
    // 监听返回事件（可选）
    onWentBack(name) {
      console.log('返回到组件：', name);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
