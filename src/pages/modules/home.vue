<template>
  <el-row class="container">
    <el-card :body-style="style">
      <el-image :src="this.vx_gt_GetLoginedUser.headshotUrl"
                class="image">
        <div slot="placeholder"
             class="image">
          加载中...
        </div>
        <div slot="error"
             class="image">
          <i class="el-icon-s-custom"></i>
        </div>
      </el-image>
      <div style="padding: 14px;">
        <span>{{vx_gt_GetLoginedUser.userName}}</span>
        <div class="bottom clearfix">
          <p class="tips">{{ vx_gt_GetLoginedUser.phone }}</p>
        </div>
        <div class="roles"
             v-if='vx_gt_GetLoginedUser.roleNameList.length'>
          <el-tag v-for='item of vx_gt_GetLoginedUser.roleNameList'
                  class="tag"
                  :key="item">{{item}}</el-tag>
        </div>
      </div>
    </el-card>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'home',

  mixins: [],

  components: {},

  props: {},

  data () {
    return {
      defaultImage: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar'
    };
  },

  computed: {
    ...mapGetters([
      'vx_gt_GetLoginedUser'
    ]),
    style () {
      return {
        padding: '15px',
        textAlign: 'center'
      };
    }
  },

  watch: {},

  created () { },

  methods: {}
};
</script>

<style lang="scss" scoped>
.container {
  width: 300px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 100px;
  height: 100px;
  line-height: 100px;
  margin: auto;
  border: 1px solid #ccc;
  color: #ccc;
  border-radius: 50%;
  display: block;
  text-align: center;
  > i {
    font-size: 100px;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
.roles {
  margin-top: 10px;
}
.tag {
  margin-right: 5px;
}
</style>
