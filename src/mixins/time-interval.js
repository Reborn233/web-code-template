/**
 * 时间区间mixin
 */
import { Util } from '@/utils/common';

export default {
  data () {
    return {
      timeIntervalMixin: null
    };
  },
  methods: {
    // 重置数据
    resetTimeIntervalMixin () {
      this.timeIntervalMixin = null;
    },
    // 构造时间查询数据格式
    buildTimeIntervalMixin () {
      return {
        startTime: Util.isArray(this.timeIntervalMixin)
          ? this.timeIntervalMixin[0]
          : null,
        endTime: Util.isArray(this.timeIntervalMixin)
          ? this.timeIntervalMixin[1]
          : null
      };
    }
  }
};
