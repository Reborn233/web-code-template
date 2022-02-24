<template>
  <div class="select">
    <div class="item"
         :class="value === null?'active':''">
      <el-checkbox :value="value === null"
                   @change="$emit('input',null)">全部</el-checkbox>
    </div>
    <div class="item"
         :class="value === item.value?'active':''"
         v-for="item of optionsList"
         :key="item.value">
      <el-checkbox :value='value === item.value'
                   :label='item.value'
                   @change="$emit('input',item.value)">{{item.label}}</el-checkbox>
    </div>
  </div>
</template>

<script>

export default {
  name: 'appRadio',
  props: {
    value: [String, Number],
    options: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  computed: {
    optionsList () {
      return this.options;
    }
  }
};
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  .item {
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
    user-select: none;
  }
  .item.active {
    color: $color-major;
  }
}
</style>
