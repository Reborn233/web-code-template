<template>
  <el-select :value="value"
             v-bind="$attrs"
             @input="handleInput"
             @focus="handleFocus"
             @blur="handleBlur"
             @change="handleChange">
    <el-option v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
    </el-option>
  </el-select>
</template>

<script>

export default {
  name: 'appSelect',

  props: {
    value: [String, Number, Array],
    options: {
      type: Array,
      default () {
        return [];
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
</script>

<style lang="scss" scoped>
</style>
