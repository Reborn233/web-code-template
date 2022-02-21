<script>
export default {
  beforeCreate () {
    const { params, query } = this.$route;
    const { fullPath } = params;
    this.$router.replace({ path: fullPath, query });
  },
  render: function (h) {
    return h(); // avoid warning message
  }
};
</script>
