<template>
  <el-dialog :visible.sync="show"
             v-bind="$attrs"
             :show-close='false'
             :fullscreen='fullscreen'
             v-on="$listeners">
    <template #title>
      <div class="el-dialog__title">{{title}}</div>
      <button type="button"
              class="el-dialog__headerbtn el-dialog__fullscreen"
              @click="onFullscreen">
        <i class="el-icon el-icon-full-screen"></i>
      </button>
      <button type="button"
              class="el-dialog__headerbtn el-dialog__close"
              @click="onClose">
        <i class="el-icon el-icon-close"></i>
      </button>
    </template>
    <div>
      <slot></slot>
    </div>
    <span slot="footer">
      <el-button v-for="(item,index) in options"
                 :key="index"
                 :type="item.type"
                 :icon="item.icon"
                 @click="item.onClick">{{item.text}}</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  name: 'appPanel',

  props: {
    title: {
      type: String,
      default: '弹窗'
    },
    show: Boolean,
    options: {
      type: Array,
      default () {
        return [];
      }
    }
  },

  data () {
    return {
      fullscreen: false
    };
  },

  methods: {
    onClose () {
      this.$emit('update:show', false);
    },
    onFullscreen () {
      this.fullscreen = !this.fullscreen;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dialog__fullscreen {
  right: 45px;
}
</style>
