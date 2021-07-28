import { mapActions, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['vx_gt_GetCachedViews'])
  },
  methods: {
    ...mapActions(['vx_ac_AddCachedView', 'vx_ac_RemoveCachedView'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.vx_ac_AddCachedView(to.meta.componentName);
    });
  },
  beforeRouteLeave (to, from, next) {
    this.vx_ac_RemoveCachedView(from.meta.componentName);
    next();
  }
};
