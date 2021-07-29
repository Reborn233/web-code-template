<script>
import { Util } from '../../utils/common';

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
        col: 24
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
    </el-row>;
  },
  created () {
    this.init();
  },

  methods: {
    init () {
      this.columns.forEach(column => {
        const defaultValue = Util.isFunction(column.default) ? column.default() : column.default;
        switch (column.type) {
          case 'checkbox':
            this.setForm(column.prop, defaultValue || []);
            break;
          case 'dateRange':
            this.setForm(column.prop, defaultValue || []);
            break;
          case 'switch':
            this.setForm(column.prop, defaultValue || false);
            break;
          default:
            this.setForm(column.prop, defaultValue || '');
            break;
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
        upload: this.renderUploadItem
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
        return <el-col span={column.col}>
          <el-form-item {...prop} label={assginColumn.label} prop={assginColumn.prop}>
            {map[assginColumn.type](assginColumn, prop)}
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
    }
  }
};
</script>

<style lang="scss" scoped>
.app-form__upload {
  display: flex;
}
</style>
