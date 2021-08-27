<template>
  <el-dropdown trigger="click"
               :hide-on-click='false'>
    <span class="el-dropdown-link">
      <el-button type="text">列筛选</el-button><i class="el-icon-arrow-down el-icon--right"
         style="color:#409EFF;"></i>
    </span>
    <el-dropdown-menu slot="dropdown"
                      class="dropdown-menu">
      <el-dropdown-item>
        <el-button type="text"
                   @click="$emit('reset')">重置</el-button>
      </el-dropdown-item>
      <el-dropdown-item v-for="(item,index) in options"
                        :key="index">
        <div class="dropdown-menu__item">
          <el-checkbox :value="!item.hidden"
                       @change='checkboxChange($event,item)'></el-checkbox>
          <span>{{item.label}}</span>
        </div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>

export default {
  name: 'dropdownSetting',

  props: {
    options: {
      type: Array,
      default () {
        return [];
      }
    }
  },

  methods: {
    checkboxChange (val, item) {
      item.hidden = !val;
      this.$emit('change', this.options);
    }
  }
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
  height: 350px;
  overflow-y: auto;
  border: 1px solid #ebebeb;
  margin: 0;
  &__item {
    > span {
      margin-left: 5px;
    }
  }
}
</style>
