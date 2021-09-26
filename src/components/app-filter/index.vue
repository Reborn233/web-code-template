<script>
import appRadio from './app-radio';
import appCheckbox from './app-checkbox';
import { Util } from '../../utils/common';

export default {
  name: 'appSearch',
  components: {
    appRadio,
    appCheckbox
  },

  props: {
    labelWidth: {
      type: String,
      default: '140px'
    },
    options: {
      type: Object,
      default () {
        return {};
      }
    },
    gutter: {
      type: Number,
      default: 20
    }
  },

  data () {
    return {
      showMore: false,
      queryParams: {}
    };
  },
  computed: {
    columns () {
      return this.options.columns || [];
    },
    moreOptions () {
      return this.options.more || [];
    },
    hasMore () {
      return this.moreOptions.length > 0;
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
        const rangeArray = ['daterange'];
        if (rangeArray.includes(column.type)) {
          const props = column.prop.split('|');
          this.setForm(props[0], defaultValue ? defaultValue[0] : null);
          this.setForm(props[1], defaultValue ? defaultValue[1] : null);
        }
        else if (['checkbox'].includes(column.type)) {
          this.setForm(column.prop, defaultValue || []);
        }
        else {
          this.setForm(column.prop, defaultValue || null);
        }
      });
      this.moreOptions.forEach(column => {
        const defaultValue = Util.isFunction(column.default) ? column.default() : column.default;
        this.setForm(column.prop, defaultValue || null);
      });
    },
    daterangePlaceholder (placeholder, defaultPlaceholder, index = 0) {
      if (placeholder) {
        const array = placeholder.split('|');
        return array[index];
      }
      else {
        return defaultPlaceholder;
      }
    },
    setForm (key, value, column) {
      this.$set(this.queryParams, key, value);
      if (column && column.change) {
        column.change(value);
      }
    },
    resetForm () {
      this.$refs.form.resetFields();
      this.$emit('reset');
    },
    getParams () {
      return Object.assign({}, this.queryParams);
    },
    clickSearch () {
      this.$emit('search', this.getParams());
    },
    returnOptions (option) {
      return Util.isFunction(option) ? option() : option;
    },
    renderFormItem (column) {
      const map = {
        select: this.renderSelectItem,
        date: this.renderDateItem,
        daterange: this.renderDateRangeItem,
        text: this.renderTextItem,
        radio: this.renderRadioItem,
        checkbox: this.renderCheckboxItem
      };
      const type = column.type || 'text';
      return map[type] ? map[type](column) : null;
    },
    renderSelectItem (column) {
      const prop = {
        attrs: {
          ...column
        }
      };
      const key = column.prop;
      const options = this.returnOptions(column.options);
      return <el-form-item label={column.label} prop={key} labelWidth={column.labelWidth}>
        <el-select {...prop} clearable value={this.queryParams[column.prop]} onInput={(value) => this.setForm(key, value, column)}>
          {options.map(item => {
            return <el-option key={item.value} label={item.label} value={item.value}></el-option>;
          })}
        </el-select>
      </el-form-item>;
    },
    renderDateItem (column) {
      const prop = {
        attrs: {
          ...column
        }
      };
      const key = column.prop;
      return <el-form-item label={column.label} prop={key} labelWidth={column.labelWidth}>
        <el-date-picker {...prop} value={this.queryParams[key]}
          type="date"
          class="datePicker"
          value-format='timestamp'
          placeholder="请选择" onInput={value => this.setForm(key, value, column)} />
      </el-form-item>;
    },
    renderDateRangeItem (column) {
      const props = column.prop.split('|');
      return <el-form-item label={column.label} class='el-form-item-bottom-0'>
        <el-row>
          <el-col span={11}>
            <el-form-item prop={props[0]} labelWidth={column.labelWidth}>
              <el-date-picker value={this.queryParams[props[0]]}
                type="date"
                class="datePicker"
                value-format='timestamp'
                placeholder="请选择" onInput={value => this.setForm(props[0], value, column)} />
            </el-form-item>
          </el-col>
          <el-col span={2}
            class="text-center">-</el-col>
          <el-col span={11}>
            <el-form-item prop={props[1]}>
              <el-date-picker value={this.queryParams[props[1]]}
                type="date"
                class="datePicker"
                value-format='timestamp'
                onInput={value => this.setForm(props[1], value, column)}
                placeholder="请选择" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>;
    },
    renderTextItem (column) {
      const prop = {
        attrs: {
          ...column,
          placeholder: column.placeholder || '请输入'
        }
      };
      const key = column.prop;
      return <el-form-item label={column.label} prop={key} labelWidth={column.labelWidth}>
        <el-input {...prop} value={this.queryParams[key]} onInput={(value) => this.setForm(key, value, column)}></el-input>
      </el-form-item>;
    },
    renderRadioItem (column) {
      const key = column.prop;
      return <el-form-item label={column.label} prop={key} labelWidth={column.labelWidth}>
        <app-radio value={this.queryParams[column.prop]} onInput={(value) => this.setForm(key, value, column)} options={this.returnOptions(column.options)}></app-radio>
      </el-form-item>;
    },
    renderCheckboxItem (column) {
      const key = column.prop;
      return <el-form-item label={column.label} prop={key} labelWidth={column.labelWidth}>
        <app-checkbox value={this.queryParams[column.prop]} onInput={(value) => this.setForm(key, value, column)} options={this.returnOptions(column.options)}></app-checkbox>
      </el-form-item>;
    },
    renderAction () {
      return <div class='action'>
        <el-button onClick={() => this.resetForm()}>重置</el-button>
        <el-button type='primary'
          onClick={() => this.clickSearch()}>查询</el-button>
        {
          this.hasMore ? <el-button type='text'
            onClick={() => { this.showMore = !this.showMore; }}>高级搜索
            <i class={this.showMore ? 'el-icon-arrow-up' : 'el-icon-arrow-down'}></i>
          </el-button> : null
        }
      </div>;
    },
    renderMoreItem () {
      const styles = {
        display: this.showMore ? 'block' : 'none'
      };
      return <el-row gutter={20} style={styles}>
        {
          this.moreOptions.map(column => {
            const col = column.col || 8;
            return <el-col span={col}>
              {this.renderFormItem(column)}
            </el-col>;
          })
        }
      </el-row>;
    }
  },
  render () {
    const props = {
      attrs: {
        model: this.queryParams
      }
    };
    return <div class="filter-container">
      <el-form ref="form"
        class="form"
        size="mini"
        label-width={this.labelWidth}
        {...props}>
        <el-row gutter={this.gutter}>
          {
            this.columns.map(column => {
              const col = column.col || 8;
              return <el-col span={col}>
                {this.renderFormItem(column)}
              </el-col>;
            })
          }
        </el-row>
        {this.renderAction()}
        {this.renderMoreItem()}
      </el-form>
    </div>;
  }
};
</script>

<style lang="scss" scoped>
.filter-container {
  margin-bottom: 15px;
}
.action {
  text-align: center;
  margin-top: 15px;
  margin-bottom: 12px;
}
.form {
  /deep/ .el-form-item__label {
    font-weight: bold;
  }
  /deep/ .el-input,
  /deep/ .el-select {
    width: 100%;
  }
  .datePicker {
    width: 100%;
  }
}
</style>
