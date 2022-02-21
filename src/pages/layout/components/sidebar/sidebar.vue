<template>
  <el-scrollbar style="height: 100%;"
                class="scrollbar-container">
    <el-menu mode="vertical"
             :show-timeout="200"
             :default-active="vx_gt_GetActiveMenu"
             background-color="#fafafa"
             text-color="#4b4b4b"
             active-text-color="#ffffff"
             v-bind:unique-opened="true"
             @select="setCurrentMenu">
      <sidebar-item v-for="item of vx_gt_GetPermissionMenus"
                    :item="item"
                    :key="item.name"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SidebarItem from './sidebar-item';

export default {
  name: 'sidebar',
  components: { SidebarItem },
  computed: {
    ...mapGetters(['vx_gt_GetActiveMenu', 'vx_gt_GetPermissionMenus'])
  },
  methods: {
    ...mapActions(['vx_ac_SetActiveMenu']),
    setCurrentMenu (name) {
      this.vx_ac_SetActiveMenu({ menu: name });
      if (name === this.$route.name) {
        this.$router.replace({
          name: 'redirect',
          params: {
            fullPath: this.$route.fullPath
          }
        });
        return;
      }
      this.$router.push({
        name: name
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.scrollbar-container ::v-deep .el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
