<template>
  <div>
    <el-form ref="form"
             :model='queryParams'
             inline>
      <el-form-item v-for="column in columns"
                    :key="column.prop"
                    :prop="column.prop">
        <el-date-picker v-if="column.type === 'daterange'"
                        v-model="queryParams[column.prop]"
                        :default-time="['00:00:00', '23:59:59']"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="timestamp"
                        :disabled='column.disabled'
                        :style="column.style">
        </el-date-picker>
        <el-date-picker v-else-if="column.type === 'date'"
                        v-model="queryParams[column.prop]"
                        type="date"
                        :placeholder="column.placeholder || '请选择日期'"
                        value-format="timestamp"
                        :disabled='column.disabled'
                        :style="column.style">
        </el-date-picker>
        <el-select v-else-if="column.type === 'select'"
                   v-model="queryParams[column.prop]"
                   :placeholder="column.placeholder || '请选择'"
                   :clearable='column.clearable'
                   :disabled='column.disabled'
                   :style="column.style">
          <el-option v-for="item in returnOptions(column.options)"
                     :key="item.value"
                     :label='item.label'
                     :value='item.value'></el-option>
        </el-select>
        <el-input v-else
                  v-model="queryParams[column.prop]"
                  :disabled='column.disabled'
                  :placeholder="column.placeholder || '请输入'"
                  :style="column.style"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click="clickSearch">查询</el-button>
        <el-button type="text"
                   icon="el-icon-delete"
                   @click="resetForm">清空查询</el-button>
        <el-button v-if="moreOptions.length"
                   type="text"
                   icon="el-icon-arrow-down"
                   @click="drawerShow = true">更多筛选</el-button>
      </el-form-item>
    </el-form>
    <el-drawer title="更多过滤条件"
               :visible.sync="drawerShow"
               size='450px'>
      <el-form ref="moreForm"
               :model='moreParams'
               label-width="120px">
        <el-form-item v-for="column in moreOptions"
                      :key="column.prop"
                      :label='column.label'
                      :prop="column.prop">
          <el-date-picker v-if="column.type === 'daterange'"
                          v-model="moreParams[column.prop]"
                          :default-time="['00:00:00', '23:59:59']"
                          type="daterange"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="timestamp"
                          :disabled='column.disabled'
                          :style="column.style">
          </el-date-picker>
          <el-date-picker v-else-if="column.type === 'date'"
                          v-model="moreParams[column.prop]"
                          type="date"
                          :placeholder="column.placeholder || '请选择日期'"
                          value-format="timestamp"
                          :disabled='column.disabled'
                          :style="column.style">
          </el-date-picker>
          <el-select v-else-if="column.type === 'select'"
                     v-model="moreParams[column.prop]"
                     :placeholder="column.placeholder || '请选择'"
                     :clearable='column.clearable'
                     :disabled='column.disabled'
                     :style="column.style">
            <el-option v-for="item in returnOptions(column.options)"
                       :key="item.value"
                       :label='item.label'
                       :value='item.value'></el-option>
          </el-select>
          <el-input v-else
                    v-model="moreParams[column.prop]"
                    :disabled='column.disabled'
                    :placeholder="column.placeholder || '请输入'"
                    :style="column.style"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="action">
            <el-button type='primary'
                       icon="el-icon-search"
                       @click="clickSearch">查询</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { Util } from '../../utils/common';

export default {
  name: 'appSearch',

  props: {
    options: {
      type: Object,
      default () {
        return {};
      }
    }
  },

  data () {
    return {
      drawerShow: false,
      queryParams: {},
      moreParams: {}
    };
  },
  computed: {
    columns () {
      return this.options.columns || [];
    },
    moreOptions () {
      return this.options.more || [];
    }
  },
  watch: {
  },

  created () {
    this.init();
  },

  methods: {
    init () {
      this.columns.forEach(column => {
        const defaultValue = Util.isFunction(column.default) ? column.default() : column.default;
        const valueIsArray = ['daterange'];
        if (valueIsArray.includes(column.type)) {
          this.setForm(column.prop, defaultValue || []);
        }
        else if (column.type === 'switch') {
          this.setForm(column.prop, defaultValue || false);
        }
        else {
          this.setForm(column.prop, defaultValue || '');
        }
      });
      this.moreOptions.forEach(column => {
        const defaultValue = Util.isFunction(column.default) ? column.default() : column.default;
        const valueIsArray = ['daterange'];
        if (valueIsArray.includes(column.type)) {
          this.setMoreForm(column.prop, defaultValue || []);
        }
        else if (column.type === 'switch') {
          this.setMoreForm(column.prop, defaultValue || false);
        }
        else {
          this.setMoreForm(column.prop, defaultValue || '');
        }
      });
    },
    setForm (key, value, column) {
      this.$set(this.queryParams, key, value);
      if (column && column.change) {
        column.change(value);
      }
    },
    setMoreForm (key, value, column) {
      this.$set(this.moreParams, key, value);
      if (column && column.change) {
        column.change(value);
      }
    },
    resetForm () {
      this.$refs.form.resetFields();
      this.$refs.moreForm.resetFields();
    },
    getParams () {
      const params = {
        ...this.queryParams,
        ...this.moreParams
      };
      return Object.assign({}, params);
    },
    clickSearch () {
      if (this.drawerShow) this.drawerShow = false;
      this.$emit('search', this.getParams());
    },
    returnOptions (option) {
      return Util.isFunction(option) ? option() : option;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
