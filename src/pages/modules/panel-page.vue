<template>
  <div class="container">
    <el-button type="primary"
               @click="show = true">打开弹窗</el-button>

    <app-panel :show.sync='show'
               title='弹窗'
               width='500px'
               append-to-body
               :options='options'>
      <h1>这是一段信息</h1>
    </app-panel>
  </div>
</template>

<script>

export default {
  name: 'panelPage',

  mixins: [],

  components: {},

  props: {},

  data () {
    return {
      show: false,
      options: this.createOptions()
    };
  },

  computed: {},

  watch: {},

  created () { },

  methods: {
    createOptions () {
      return [
        {
          text: '取消',
          onClick: () => {
            this.$message('取消');
            this.show = false;
          }
        },
        {
          text: '提交',
          type: 'primary',
          onClick: () => {
            this.$message('提交');
            this.show = false;
          }
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
