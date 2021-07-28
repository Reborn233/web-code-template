<template>
  <el-breadcrumb class="breadcrumb-container"
    separator="/">
    <template v-for="(d, index) of data">
      <el-breadcrumb-item :key="index"
        v-if="d.routerName"
        :to="{name: d.routerName}">{{d.title}}</el-breadcrumb-item>
      <el-breadcrumb-item :key="index"
        v-else>{{d.title}}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'AppBreadcrumb',
  props: {
    data: {
      type: Array,
      default () {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  line-height: 42px;
  padding-left: 5px;
  /deep/ .el-breadcrumb__item:not(:last-child) > .el-breadcrumb__inner.is-link {
    color: #7d7d7d;
    font-weight: bold;
    font-size: 16px;
  }

  /deep/ .el-breadcrumb__item:not(:last-child) > .el-breadcrumb__inner:hover {
    color: #0072ff !important;
  }

  /deep/ .el-breadcrumb__item:last-child > .el-breadcrumb__inner {
    color: #4b4b4b;
    font-weight: bold;
    font-size: 14px;
  }
}
</style>
