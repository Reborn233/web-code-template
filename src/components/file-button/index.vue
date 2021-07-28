<template>
  <div class="file-button">
    <el-button type="primary"
               :size="size"
               @click="clickBtn">
      <slot></slot>
    </el-button>
    <input ref="file"
           type='file'
           @change="selectEcxel"
           :accept="accept"
           style="display:none" />
  </div>
</template>

<script>

export default {
  name: 'fileButton',

  mixins: [],

  components: {},

  props: {
    accept: {
      type: String,
      default: '.csv,.xlsx,.xls'
      // default: '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-works'
    },
    size: {
      type: String,
      default: 'mini'
    }
  },

  data () {
    return {

    };
  },

  computed: {},

  watch: {},

  created () { },

  methods: {
    clickBtn () {
      this.$refs.file.click();
    },
    selectEcxel (event) {
      const file = event.target.files[0];
      this.$emit('selected', file);
    }
  }
};
</script>

<style lang="scss" scoped>
.file-button {
  display: inline-block;
  margin-right: 8px;
}
</style>
