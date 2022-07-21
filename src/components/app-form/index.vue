<script>
import { Util } from '../../utils/common';

const noop = () => { };

export default {
  name: 'appForm',

  props: {
    columns: Array,
    data: Object
  },
  watch: {
    data: {
      handler (val) {
        this.init();
        if (val) {
          this.form = Object.assign({}, val);
        }
      },
      immediate: true
    }
  },

  data () {
    return {
      form: {},
      defaultColumn: {
        placeholder: '请输入...',
        options: [],
        type: 'text',
        col: 24,
        min: 1,
        max: 10,
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        clearable: true
      },
      uploadForm: {}
    };
  },
  render () {
    const _attrs = this.$attrs;
    const RowProps = {
      attrs: {
        gutter: _attrs.gutter
      }
    };
    const FormProps = {
      attrs: {
        model: this.form
      },
      props: {
        rules: _attrs.rules,
        labelWidth: _attrs['label-width'],
        labelSuffix: _attrs['label-suffix'],
        size: _attrs.size,
        disabled: _attrs.disabled
      },
      style: {
        width: '100%'
      },
      on: { ...this.$listeners }
    };
    const filterColumns = this.columns.filter(c => !c.hidden);
    return <el-row {...RowProps}>
      <el-form ref={'appForm'} {...FormProps}>
        {filterColumns.map(column => this.renderFormItem(column))}
        <el-col span={24}>
          <el-form-item>
            {this.$scopedSlots.action && this.$scopedSlots.action()}
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>;
  },
  created () {
  },

  methods: {
    init () {
      this.columns.forEach(column => {
        if (column.prop) {
          const defaultValue = Util.isFunction(column.default) ? column.default() : column.default;
          const valueIsArray = ['checkbox', 'cascader', 'dateRange'];
          const valueIsNumber = ['slider', 'rate'];
          if (valueIsArray.includes(column.type)) {
            this.setForm(column.prop, defaultValue || []);
          }
          else if (column.type === 'switch') {
            this.setForm(column.prop, defaultValue);
          }
          else if (valueIsNumber.includes(column.type)) {
            if (column.range) {
              this.setForm(column.prop, defaultValue || []);
            }
            else {
              this.setForm(column.prop, defaultValue || 0);
            }
          }
          else if (column.type === 'upload') {
            this.$set(this.uploadForm, column.prop, { name: defaultValue });
          }
          else {
            this.setForm(column.prop, defaultValue || '');
          }
        }
      });
    },
    isEmptyObject (obj) {
      return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
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
        number: this.renderTextItem,
        password: this.renderTextItem,
        select: this.renderSelectItem,
        dateRange: this.renderDateRangeItem,
        date: this.renderDateItem,
        datetime: this.renderDateItem,
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
      const FormItemProps = {
        props: {
          prop: assginColumn.prop,
          label: assginColumn.label,
          labelWidth: assginColumn.labelWidth,
          required: assginColumn.required,
          rules: assginColumn.rules,
          showMessage: assginColumn.showMessage,
          inlineMessage: assginColumn.inlineMessage,
          size: assginColumn.size,
          disabled: Util.isFunction(assginColumn.disabled) ? assginColumn.disabled() : assginColumn.disabled
        }
      };
      if (column.type === 'slot') {
        return <el-col span={column.col}>
          {column.render()}
        </el-col>;
      }
      else if (column.render) {
        return <el-col span={column.col}>
          <el-form-item {...FormItemProps}>
            {column.render()}
          </el-form-item>
        </el-col>;
      }
      else {
        const render = map[assginColumn.type] || noop;
        return <el-col span={column.col}>
          <el-form-item {...FormItemProps} class={assginColumn.renderBottom ? 'el-form-item-bottom-0' : ''} >
            {render(assginColumn)}
            {assginColumn.renderBottom && assginColumn.renderBottom()}
          </el-form-item>
        </el-col>;
      }
    },
    renderTextItem (column) {
      const InputTextProps = {
        attrs: {
          maxlength: column.maxlength,
          minlength: column.minlength,
          placeholder: column.placeholder,
          clearable: column.clearable,
          showPassword: column.showPassword,
          prefixIcon: column.prefixIcon,
          suffixIcon: column.suffixIcon,
          autocomplete: column.autocomplete,
          name: column.name,
          readonly: column.readonly,
          label: column.label,
          disabled: column.disabled,
          type: column.type
        }
      };
      const onClickRight = column.onClickRight || Util.noop;
      return <el-input value={this.form[column.prop]} {...InputTextProps} onInput={(value) => this.setForm(column.prop, value, column)} style={column.style}>
        <template slot="suffix">
          {column.renderSuffix ? column.renderSuffix() : <i class={`el-input__icon ${column.rightIcon} cursor-pointer`} onClick={onClickRight}></i>}
        </template>
      </el-input>;
    },
    renderSelectItem (column) {
      const InputSelectProps = {
        attrs: {
          multiple: column.multiple,
          disabled: column.disabled,
          placeholder: column.placeholder,
          clearable: column.clearable,
          collapseTags: column.collapseTags,
          multipleLimit: column.multipleLimit,
          name: column.name,
          readonly: column.readonly,
          label: column.label,
          filterable: column.filterable
        }
      };
      const options = Util.isFunction(column.options) ? column.options() : column.options;
      return <div>
        <el-select value={this.form[column.prop]} {...InputSelectProps} onChange={(value) => this.setForm(column.prop, value, column)} style={column.style}>
          {options.map(o => {
            return <el-option label={o.label} value={o.value} disabled={o.disabled}></el-option>;
          })}
        </el-select>
      </div>;
    },
    renderDateRangeItem (column) {
      const DateRangeProps = {
        attrs: {
          readonly: column.readonly,
          disabled: column.disabled,
          editable: column.editable,
          clearable: column.clearable,
          rangeSeparator: column.rangeSeparator,
          defaultValue: column.defaultValue,
          valueFormat: column.valueFormat,
          name: column.name
        }
      };
      return <el-date-picker
        value={this.form[column.prop]}
        default-time={['00:00:00', '23:59:59']}
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        {...DateRangeProps} onInput={(value) => this.setForm(column.prop, value, column)} style={column.style}>
      </el-date-picker>;
    },
    renderDateItem (column) {
      const DateProps = {
        attrs: {
          readonly: column.readonly,
          disabled: column.disabled,
          editable: column.editable,
          clearable: column.clearable,
          pickerOptions: column.pickerOptions,
          defaultValue: column.defaultValue,
          valueFormat: column.valueFormat,
          format: column.format,
          name: column.name,
          placeholder: column.placeholder
        }
      };
      return <el-date-picker
        type={column.type}
        value={this.form[column.prop]}
        {...DateProps}
        onInput={(value) => this.setForm(column.prop, value, column)} style={column.style}>
      </el-date-picker>;
    },
    renderTimeItem (column) {
      const TimeProps = {
        attrs: {
          readonly: column.readonly,
          disabled: column.disabled,
          editable: column.editable,
          clearable: column.clearable,
          pickerOptions: column.pickerOptions,
          defaultValue: column.defaultValue,
          valueFormat: column.valueFormat,
          name: column.name,
          placeholder: column.placeholder
        }
      };
      return <el-time-select
        value={this.form[column.prop]}
        onInput={(value) => this.setForm(column.prop, value, column)}
        {...TimeProps}
        picker-options={column.pickerOptions} style={column.style}>
      </el-time-select>;
    },
    renderSwitchItem (column) {
      const SwitchProps = {
        attrs: {
          disabled: column.disabled,
          width: column.width,
          activeText: column.activeText,
          inactiveText: column.inactiveText,
          activeValue: column.activeValue,
          inactiveValue: column.inactiveValue,
          activeColor: column.activeColor,
          inactiveColor: column.inactiveColor,
          name: column.name
        }
      };
      return <el-switch value={this.form[column.prop]}
        {...SwitchProps} onInput={(value) => this.setForm(column.prop, value, column)} style={column.style}></el-switch>;
    },
    renderCheckboxItem (column) {
      const CheckboxProps = {
        attrs: {
          disabled: column.disabled,
          label: column.label,
          trueLabel: column.trueLabel,
          falseLabel: column.falseLabel,
          border: column.border,
          name: column.name,
          checked: column.checked
        }
      };
      const options = Util.isFunction(column.options) ? column.options() : column.options;
      return <el-checkbox-group value={this.form[column.prop]} onInput={(value) => this.setForm(column.prop, value, column)}
        {...CheckboxProps} style={column.style}>
        {options.map(o => {
          return <el-checkbox label={o.value} disabled={o.disabled} name={o.label}>{o.label}</el-checkbox>;
        })}
      </el-checkbox-group>;
    },
    renderRadioItem (column) {
      const RadioProps = {
        attrs: {
          disabled: column.disabled,
          textColor: column.textColor,
          label: column.label,
          border: column.border,
          name: column.name,
          checked: column.checked,
          fill: column.fill
        }
      };
      const options = Util.isFunction(column.options) ? column.options() : column.options;
      return <el-radio-group value={this.form[column.prop]}
        {...RadioProps} onInput={(value) => this.setForm(column.prop, value, column)} style={column.style}>
        {options.map(o => {
          return <el-radio label={o.value} disabled={o.disabled}>{o.label}</el-radio>;
        })}
      </el-radio-group>;
    },
    renderTextareaItem (column) {
      const InputTextareaProps = {
        attrs: {
          maxlength: column.maxlength,
          minlength: column.minlength,
          placeholder: column.placeholder,
          clearable: column.clearable,
          showPassword: column.showPassword,
          prefixIcon: column.prefixIcon,
          suffixIcon: column.suffixIcon,
          autocomplete: column.autocomplete,
          name: column.name,
          readonly: column.readonly,
          disabled: column.disabled,
          label: column.label,
          showWordLimit: column.showWordLimit,
          rows: column.rows
        }
      };
      return <el-input type="textarea" value={this.form[column.prop]}
        {...InputTextareaProps} onInput={(value) => this.setForm(column.prop, value, column)} style={column.style}></el-input>;
    },
    renderUploadItem (column) {
      const UploadProps = {
        on: {
          selected: (file) => {
            if (column.prop) {
              this.$set(this.uploadForm, column.prop, file);
              column.change && column.change(file);
            }
          }
        }
      };
      return <div>
        <div class='app-form__upload' style={column.style}>
          <file-button accept={column.accept} {...UploadProps} disabled={column.disabled}>选择文件</file-button>
          {this.uploadForm[column.prop] ? <div class='el-upload-list__item-name'>
            {this.uploadForm[column.prop].name ? <i class='el-icon-document'></i> : ''}
            {this.uploadForm[column.prop].name}
          </div> : ''}
          {column.renderRight && column.renderRight()}
        </div>
        <div class='tips'>{column.desc}</div>
      </div>;
    },
    renderInputNumberItem (column) {
      const InputNumberProps = {
        attrs: {
          max: column.max,
          min: column.min,
          placeholder: column.placeholder,
          step: column.step,
          stepStrictly: column.stepStrictly,
          name: column.name,
          precision: column.precision,
          label: column.label,
          controls: column.controls,
          controlsSosition: column.controlsSosition,
          disabled: column.disabled
        }
      };
      return <el-input-number value={this.form[column.prop]} {...InputNumberProps} onInput={(value) => this.setForm(column.prop, value, column)} style={column.style}></el-input-number>;
    },
    renderCascaderItem (column) {
      const scopedSlots = {
        default: (scope) => {
          return column.slot(scope);
        }
      };
      const CascaderProps = {
        attrs: {
          options: column.options,
          disabled: column.disabled,
          placeholder: column.placeholder,
          clearable: column.clearable,
          showAllLevels: column.showAllLevels,
          collapseTags: column.collapseTags,
          separator: column.separator,
          filterable: column.filterable
        }
      };
      return <el-cascader
        value={this.form[column.prop]}
        onInput={(value) => this.setForm(column.prop, value, column)}
        {...CascaderProps} scopedSlots={scopedSlots} style={column.style}></el-cascader>;
    },
    renderSliderItem (column) {
      const SliderProps = {
        attrs: {
          min: column.min,
          max: column.max,
          disabled: column.disabled,
          step: column.step,
          showStops: column.showStops,
          showTooltip: column.showTooltip,
          range: column.range,
          vertical: column.vertical,
          height: column.height,
          label: column.label,
          marks: column.marks
        }
      };
      return <el-slider value={this.form[column.prop]}
        onInput={(value) => this.setForm(column.prop, value, column)} {...SliderProps} style={column.style}></el-slider>;
    },
    renderRateItem (column) {
      const RateProps = {
        attrs: {
          max: column.max,
          disabled: column.disabled,
          allowHalf: column.allowHalf,
          lowThreshold: column.lowThreshold,
          highThreshold: column.highThreshold,
          colors: column.colors,
          voidColor: column.voidColor,
          disabledVoidColor: column.disabledVoidColor,
          showText: column.showText,
          showScore: column.showScore,
          textColor: column.textColor,
          texts: column.texts,
          scoreTemplate: column.scoreTemplate
        }
      };
      return <el-rate value={this.form[column.prop]}
        onInput={(value) => this.setForm(column.prop, value, column)} {...RateProps} style={column.style}></el-rate>;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-form__upload {
  display: flex;
}
::v-deep .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

::v-deep .el-select {
  width: 100%;
}
</style>
