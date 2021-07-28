export default {
  props: {
    value: [String, Number, Array],
    clearable: {
      type: Boolean,
      default () {
        return false;
      }
    },
    filterable: Boolean,
    multiple: Boolean,
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default () {
        return false;
      }
    },
    prop: {
      type: Object,
      default () {
        return {
          label: 'label',
          value: 'value'
        };
      }
    }
  },
  methods: {
    handleBlur (event) {
      this.$emit('blur', event);
    },
    handleFocus (event) {
      this.$emit('focus', event);
    },
    handleInput (event) {
      this.$emit('input', event);
    },
    handleChange (event) {
      this.$emit('change', event, this.options);
    }
  }
};
