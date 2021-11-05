<template>
  <div class="top-filter">
    <el-form ref="form"
             class="form"
             label-width="90px"
             :model="value">
      <el-row :gutter="15">
        <el-col :span="item.col || 6"
                v-for="(item,index) in columns"
                :key="index">
          <el-form-item :label="item.label"
                        :prop="item.prop">
            <el-select v-if="item.type === 'select'"
                       v-model="value[item.prop]"
                       :placeholder="`请选择${item.label}`"
                       clearable>
              <el-option v-for="option in item.options || []"
                         :key="option.value"
                         :label="option.label"
                         :value="option.value">
              </el-option>
            </el-select>
            <el-date-picker v-else-if="item.type === 'dateRange'"
                            style="width:100%;"
                            v-model="value[item.prop]"
                            type="daterange"
                            align="right"
                            value-format='timestamp'
                            unlink-panels
                            range-separator="~"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
            <el-input v-else
                      v-model="value[item.prop]"
                      class="search-input"
                      :placeholder="`请输入${item.label}`"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="actionSpan"
                class="text-right">
          <el-button type="primary"
                     @click="search">查询</el-button>
          <slot name="action"></slot>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'topFilter',

  mixins: [],

  components: {},

  props: {
    columns: {
      type: Array,
      default () {
        return [];
      }
    },
    value: {
      type: Object,
      default () {
        return {};
      }
    }
  },

  data () {
    return {
    };
  },

  computed: {
    actionSpan () {
      const span = this.columns.length % 4;
      return (4 - span) * 6;
    }
  },

  watch: {
  },

  created () { },

  methods: {
    search () {
      this.$emit('search');
    }
  }
};
</script>

<style lang="scss" scoped>
.top-filter {
  margin-bottom: 15px;
}
</style>
