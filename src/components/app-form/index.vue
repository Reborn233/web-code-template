<script>
import { Util } from '../../utils/common';

const noop = () => { };

export default {
  name: 'appForm',

  props: {
    columns: Array
  },

  data () {
    return {
      form: {},
      defaultColumn: {
        placeholder: '请输入...',
        options: [],
        type: 'text',
        col: 24,
        size: 'mini',
        min: 1,
        max: 10
      }
    };
  },
  render () {
    const props = {
      attrs: {
        model: this.form,
        ...this.$attrs
      },
      props: {
        ...this.$props
      },
      style: {
        width: '100%'
      },
      on: { ...this.$listeners }
    };
    return <el-row gutter={20}>
      <el-form ref={'appForm'} {...props}>
        {this.columns.filter(c => !c.hidden).map(column => this.renderFormItem(column))}
      </el-form>
      {this.$scopedSlots.action && this.$scopedSlots.action()}
    </el-row>;
  },
  created () {
    this.init();
  },

  methods: {
    init () {
      this.columns.forEach(column => {
        const defaultValue = Util.isFunction(column.default) ? column.default() : column.default;
        const valueIsArray = ['checkbox', 'cascader', 'dateRange'];
        const valueIsNumber = ['slider', 'rate', 'dateRange'];
        if (valueIsArray.includes(column.type)) {
          this.setForm(column.prop, defaultValue || []);
        }
        else if (column.type === 'switch') {
          this.setForm(column.prop, defaultValue || false);
        }
        else if (valueIsNumber.includes(column.type)) {
          if (column.range) {
            this.setForm(column.prop, defaultValue || []);
          }
          else {
            this.setForm(column.prop, defaultValue || 0);
          }
        }
        else {
          this.setForm(column.prop, defaultValue || '');
        }
      });
    },
    setForm (key, value, column) {
      this.$set(this.form, key, value);
      if (column && column.change) {
        column.change(value);
      }
    },
    getParams () {
      return Object.assign({}, this.form);
    },
    validate () {
      return this.$refs.appForm.validate();
    },
    clearValidate () {
      this.$refs.appForm.clearValidate();
    },
    resetForm () {
      this.$refs.appForm.resetFields();
    },
    renderFormItem (column) {
      const map = {
        text: this.renderTextItem,
        select: this.renderSelectItem,
        dateRange: this.renderDateRangeItem,
        date: this.renderDateItem,
        time: this.renderTimeItem,
        switch: this.renderSwitchItem,
        checkbox: this.renderCheckboxItem,
        radio: this.renderRadioItem,
        textarea: this.renderTextareaItem,
        upload: this.renderUploadItem,
        inputNumber: this.renderInputNumberItem,
        cascader: this.renderCascaderItem,
        slider: this.renderSliderItem,
        rate: this.renderRateItem
      };
      const assginColumn = Object.assign({}, this.defaultColumn, column);
      const prop = {
        attrs: {
          ...assginColumn
        }
      };
      if (column.render) {
        return <el-col span={column.col}>
          <el-form-item {...prop} label={assginColumn.label} prop={assginColumn.prop}>
            {column.render()}
          </el-form-item>
        </el-col>;
      }
      else {
        const render = map[assginColumn.type] || noop;
        return <el-col span={column.col}>
          <el-form-item {...prop} label={assginColumn.label} prop={assginColumn.prop}>
            {render(assginColumn, prop)}
          </el-form-item>
        </el-col>;
      }
    },
    renderTextItem (column, props) {
      return <el-input value={this.form[column.prop]} {...props} onInput={(value) => this.setForm(column.prop, value, column)}></el-input>;
    },
    renderSelectItem (column, props) {
      const options = Util.isFunction(column.options) ? column.options() : column.options;
      return <el-select value={this.form[column.prop]} {...props} onInput={(value) => this.setForm(column.prop, value, column)}>
        {options.map(o => {
          return <el-option label={o.label} value={o.value}></el-option>;
        })}
      </el-select>;
    },
    renderDateRangeItem (column, props) {
      return <el-date-picker
        value={this.form[column.prop]}
        default-time={['00:00:00', '23:59:59']}
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        {...props}
        value-format="timestamp" onInput={(value) => this.setForm(column.prop, value, column)}>
      </el-date-picker>;
    },
    renderDateItem (column, props) {
      return <el-date-picker
        value={this.form[column.prop]}
        type="date"
        {...props}
        onInput={(value) => this.setForm(column.prop, value, column)}>
      </el-date-picker>;
    },
    renderTimeItem (column, props) {
      return <el-time-select
        value={this.form[column.prop]}
        onInput={(value) => this.setForm(column.prop, value, column)}
        {...props}
        picker-options={column.pickerOptions}>
      </el-time-select>;
    },
    renderSwitchItem (column, props) {
      return <el-switch value={this.form[column.prop]}
        {...props} onInput={(value) => this.setForm(column.prop, value, column)}></el-switch>;
    },
    renderCheckboxItem (column, props) {
      const options = Util.isFunction(column.options) ? column.options() : column.options;
      return <el-checkbox-group value={this.form[column.prop]}
        {...props} onInput={(value) => this.setForm(column.prop, value, column)}>
        {options.map(o => {
          return <el-checkbox label={o.value} disabled={o.disabled} name={o.label}>{o.label}</el-checkbox>;
        })}
      </el-checkbox-group>;
    },
    renderRadioItem (column, props) {
      const options = Util.isFunction(column.options) ? column.options() : column.options;
      return <el-radio-group value={this.form[column.prop]}
        {...props} onInput={(value) => this.setForm(column.prop, value, column)}>
        {options.map(o => {
          return <el-radio label={o.value} disabled={o.disabled}>{o.label}</el-radio>;
        })}
      </el-radio-group>;
    },
    renderTextareaItem (column, props) {
      return <el-input type="textarea" value={this.form[column.prop]}
        {...props} onInput={(value) => this.setForm(column.prop, value, column)}></el-input>;
    },
    renderUploadItem (column) {
      const prop = {
        on: {
          selected: (file) => {
            this.setForm(column.prop, file, column);
          }
        }
      };
      return <div class='app-form__upload'>
        <file-button accept={column.accept} {...prop} disabled={column.disabled}>选择文件</file-button>
        {this.form[column.prop] ? <div class='el-upload-list__item-name'>
          <i class='el-icon-document'></i>
          {this.form[column.prop].name}
        </div> : ''}
      </div>;
    },
    renderInputNumberItem (column, props) {
      return <el-input-number value={this.form[column.prop]} {...props} onInput={(value) => this.setForm(column.prop, value, column)}></el-input-number>;
    },
    renderCascaderItem (column, props) {
      const scopedSlots = {
        default: (scope) => {
          return column.slot(scope);
        }
      };
      return <el-cascader
        value={this.form[column.prop]}
        onInput={(value) => this.setForm(column.prop, value, column)}
        {...props} scopedSlots={scopedSlots}></el-cascader>;
    },
    renderSliderItem (column, props) {
      return <el-slider value={this.form[column.prop]}
        onInput={(value) => this.setForm(column.prop, value, column)} {...props}></el-slider>;
    },
    renderRateItem (column, props) {
      return <el-rate value={this.form[column.prop]}
        onInput={(value) => this.setForm(column.prop, value, column)} {...props}></el-rate>;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-form__upload {
  display: flex;
}
</style>
