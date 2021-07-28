/**
 * 常用格式化函數混入
 */
import { repalceSpace } from '../formatters/index';
export default {
  methods: {
    getObjectRefMixin (object, path) {
      const keys = path.split('.');
      let refKeys = keys.slice(0, keys.length - 1);
      let lastKey = keys[keys.length - 1] ? keys[keys.length - 1] : '';
      let refObj = object;
      refKeys.forEach(key => {
        refObj = refObj[key] ? refObj[key] : '';
      });

      return {
        refObj,
        lastKey
      };
    },
    repalceSpaceMixin (path = '') {
      if (!path) return '';
      let refPath = this.getObjectRefMixin(this, path);
      let _result = repalceSpace(refPath.refObj[refPath.lastKey]);
      this.$nextTick(() => {
        refPath.refObj[refPath.lastKey] = _result;
      });
    }
  }
};
