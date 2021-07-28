/**
 * 分页混入
 */
import { pageParams } from '@/configs/pagination';
import AppPagination from '@/components/app-pagination';

export default {
  components: { AppPagination },
  data () {
    return {
      pageParamsMixin: Object.assign({}, pageParams)
    };
  },
  methods: {
    setFirstPageMixin () {
      this.pageParamsMixin.currentPage = 1;
    },
    setTotalCountMixin (totalCount) {
      this.pageParamsMixin.totalCount = totalCount;
    },
    buildPageParamsMixin () {
      return {
        currentPage: this.pageParamsMixin.currentPage,
        pageSize: this.pageParamsMixin.pageSize
      };
    },
    // 页码和页数变化都会走这个回调
    pagerChangeMixin (pageOption) {
      this.pageParamsMixin.currentPage = pageOption.currentPage;
      this.pageParamsMixin.pageSize = pageOption.pageSize;
    }
  }
};
