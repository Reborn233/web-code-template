<template>
  <div class="service-layout-wrapper clearfix">
    <div class="service-side-bar">
      <sidebar></sidebar>
    </div>
    <div class="service-main-container">
      <div class="app-breadcrumb"
           v-if="showBreadcrumbWhenServiceHome">
        <img src="../../assets/images/breadcrumb.jpg"
             style="height:35%; margin: auto 0;">
        <app-bread-crumb :data="breadCrumbs"></app-bread-crumb>
      </div>
      <div class="service-view-container">
        <transition name="fade"
                    mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { Util } from '@/utils/common';
import { mapGetters, mapActions } from 'vuex';
import Sidebar from './components/sidebar/sidebar';
import AppBreadCrumb from '@/components/app-breadcrumb';

export default {
  name: 'ServiceLayout',
  components: { Sidebar, AppBreadCrumb },
  computed: {
    ...mapGetters(['vx_gt_GetActiveMenu'])
  },
  data () {
    return {
      breadCrumbs: [],
      // 服务首页是否显示面包屑
      showBreadcrumbWhenServiceHome: ''
    };
  },
  methods: {
    ...mapActions(['vx_Set_IsShowSwitcher']),
    buildBreadCrumb (routerMatched) {
      if (!Util.isArray(routerMatched)) return [];
      let _breads = [];
      let _hasCurrentServiceHome = true;
      routerMatched.forEach(router => {
        if (!Util.isUndefined(router.meta.breadcrumb)) {
          let _name = router.meta.breadcrumb;
          let _title = this.$t(`navigation.${_name}`);
          _breads.push({
            routerName: _name,
            title: _title
          });
        }
      });
      this.showBreadcrumbWhenServiceHome = _hasCurrentServiceHome;
      this.breadCrumbs = _breads;
    }
  },
  // 用来做面包屑
  beforeRouteUpdate (to, from, next) {
    this.buildBreadCrumb(to.matched);
    next();
  },
  created () {
    this.buildBreadCrumb(this.$route.matched);
    // 默认跳转到当前激活路由
    // 注释此代码：当菜单存在查询参数、动态路由时保证参数存在
    // this.$router.push({ name: this.vx_gt_GetActiveMenu });
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.service-layout-wrapper {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  height: $percent-100;
  width: $percent-100;

  > .service-side-bar {
    padding-top: 0;
    width: 200px;
    height: $percent-100;
    transition: width 0.3s;
    background-color: #fafafa;
  }

  > .service-main-container {
    width: calc(100% - 200px);
    height: $percent-100;
    background-color: #e5ecef;
    // padding: 0 20px;
    overflow: auto;

    > .app-breadcrumb {
      width: 100%;
      height: 40px;
      background-color: #ffffff;
      display: flex;
      flex-direction: row;
      padding-left: 20px;
    }
    > .service-view-container {
      background-color: #e5ecef;
      padding: 15px;
      height: calc(100% - 40px);
    }
  }

  &.active {
    > .service-side-bar {
      width: 40px;
      ::v-deep .el-submenu {
        overflow: hidden;
        & > .el-submenu__title {
          padding-left: 9px !important;
          .el-submenu__icon-arrow {
            display: none;
          }
        }
      }

      ::v-deep .el-tooltip {
        padding-left: 9px !important;
      }

      ::v-deep .el-menu--collapse {
        .el-submenu {
          & > .el-submenu__title {
            & > span {
              height: 0;
              width: 0;
              overflow: hidden;
              visibility: hidden;
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
</style>
