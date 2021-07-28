<template>
  <el-row class="operation-line-height" type="flex" justify="end">
    <el-pagination layout="total, sizes, prev, pager, next" :current-page="currentPage" :page-size="pageSize" :total="totalCount" :page-sizes="pageSizes" @current-change="handleCurrentChange" @size-change="handleSizeChange" background>
    </el-pagination>
  </el-row>
</template>

<script>
import { PAGESIZES } from '@/configs/pagination';

export default {
  name: 'AppPagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    },
    pageSizes: {
      type: Array,
      default () {
        return PAGESIZES.slice(0);
      }
    }
  },
  methods: {
    handleCurrentChange (currentPage, pageSize = this.pageSize) {
      this.emitChange(currentPage, pageSize);
    },
    handleSizeChange (currentPageSize) {
      // 只要页码改变，重置页码为1,并触发handleCurrentChange
      this.handleCurrentChange(1, currentPageSize);
    },
    emitChange (currentPage, pageSize) {
      this.$emit('pagerChange', { currentPage, pageSize });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
