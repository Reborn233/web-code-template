<template>
  <div class="app-section"
    :style="[cmpt_getFullContainer, cmpt_getSectionStyle]">
    <div class="app-section-header"
      v-if="$slots.right || title">
      <div class="left">{{title}}</div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'AppSection',

  props: {
    title: {
      type: String,
      default: ''
    },
    full: Boolean,
    sectionStyle: {
      type: Object,
      default () {
        return {};
      }
    }
  },

  computed: {
    cmpt_getFullContainer () {
      return this.full ? { width: '100%', height: '100%' } : {};
    },
    cmpt_getSectionStyle () {
      return this.sectionStyle;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-section {
  background: #ffffff;
  padding: 15px;
  overflow: hidden;

  .app-section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;

    .left {
      font-weight: 700;
      color: #333333;
      font-size: 14px;
    }
  }
}
</style>
