<template>
  <div class="infinite-scroll"
       v-infinite-scroll="loadMore"
       :infinite-scroll-disabled="disabled"
       :infinite-scroll-immediate='infiniteScrollImmediate'
       :style='styles'>
    <slot></slot>
    <p class="loading-text"
       v-if="loadingStatus">加载中...</p>
    <p class="loading-text"
       v-if="finishedStatus">没有更多了</p>
  </div>
</template>

<script>

export default {
  name: 'infiniteScroll',

  mixins: [],

  components: {},

  props: {
    height: {
      type: String,
      default: '550px'
    },
    infiniteScrollImmediate: Boolean,
    loadingStatus: Boolean,
    finishedStatus: Boolean
  },

  data () {
    return {
    };
  },

  computed: {
    styles () {
      return {
        height: this.height
      };
    },
    disabled () {
      return this.loadingStatus || this.finishedStatus;
    }
  },

  watch: {},

  created () { },

  methods: {
    loadMore () {
      this.$emit('loadMore');
    }
  }
};
</script>

<style lang="scss" scoped>
.infinite-scroll {
  width: 100%;
  overflow: auto;
}
.loading-text {
  text-align: center;
  color: #999;
  font-size: smaller;
  margin-top: 10px;
}
</style>
