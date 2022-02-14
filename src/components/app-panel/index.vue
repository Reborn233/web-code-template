<template>
  <el-dialog :visible.sync="show"
             v-bind="$attrs"
             :top="top"
             :show-close='false'
             :fullscreen='fullscreen'
             v-on="$listeners"
             :close-on-click-modal='false'
             :before-close='onClose'
             @closed='onClosed'>
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
    <div v-loading='loading'>
      <slot v-if="show"></slot>
      <div class="footer">
        <el-button v-for="(item,index) in options"
                   :key="index"
                   :type="item.type"
                   :icon="item.icon"
                   @click="item.onClick">{{item.text}}</el-button>
        <slot name="footer"></slot>
      </div>
    </div>
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
    },
    loading: Boolean,
    top: {
      type: String,
      default: '30px'
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
    onClosed () {
      this.fullscreen = false;
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
::v-deep .el-dialog__headerbtn {
  color: #fff;
  > i {
    font-weight: 700;
  }
}
.footer {
  border-top: 1px solid #eee;
  padding: 10px 20px 0 20px;
  text-align: right;
  box-sizing: border-box;
}
</style>
