<template>
  <div class="select">
    <div class="item"
         :class="isEmpty(value)?'active':''">
      <el-checkbox :value="isEmpty(value)"
                   @change="$emit('input',[])">全部</el-checkbox>
    </div>
    <div class="item"
         :class="checked(item.value)?'active':''"
         v-for="item of options"
         :key="item.value">
      <el-checkbox :value='checked(item.value) '
                   :label='item.value'
                   @change="changeHandler(item.value)">{{item.label}}</el-checkbox>
    </div>
  </div>
</template>

<script>

export default {
  name: 'appRadio',
  props: {
    value: Array,
    options: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      selected: []
    };
  },
  methods: {
    changeHandler (value) {
      const index = this.selected.indexOf(value);
      if (index >= 0) {
        this.selected.splice(index, 1);
      }
      else {
        this.selected.push(value);
      }
      this.$emit('input', this.selected);
    },
    isEmpty (value) {
      return value.length === 0;
    },
    checked (value) {
      return this.value.indexOf(value) !== -1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
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
