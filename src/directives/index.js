/**
 * 权限指令
 */
import Vue from 'vue';
import store from '@/store';
import { Util } from '../utils/common';

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value ? binding.value : '自主开票';
  }
});

Vue.directive('hasPermission', {
  inserted: function (el, binding) {
    if (!Vue.prototype.$_hasPermission(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
});
/**
 * 注册到全局：判断是否有权限
 * @param {String} value 权限码
 */
Vue.prototype.$_hasPermission = function (value) {
  let permissions = store.getters.vx_gt_GetPermissions;
  if (Util.isUndefined(permissions) || Util.isNull(permissions)) {
    return false;
  }

  return Util.hasPermission(value, permissions);
};

/* 重置微信浏览器下：input获得焦点页面不回弹 */
let timer = null;
Vue.directive('resetBodyPostion', {
  bind: function (el) {
    // 如果不是微信浏览器，直接返回
    if (!/MicroMessenger/gi.test(navigator.userAgent)) return;

    el.addEventListener('blur', () => {
      timer = setTimeout(() => {
        window.scroll(0, 0);
      }, 20);
    });
    el.addEventListener('focus', () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    });
  }
});

// v-drag窗口拖拽指令
Vue.directive('drag', {
  bind (el) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    const dragDom = el.querySelector('.el-dialog');
    dialogHeaderEl.style.cursor = 'move';

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

    dialogHeaderEl.onmousedown = e => {
      e.preventDefault();
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;

      // 获取到的值带px 正则匹配替换
      let styL, styT;

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        /* eslint-disable */
        styL =
          +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
        styT =
          +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
        /* eslint-disable */
      }
      else {
        if (sty.left === 'auto') {
          styL = +sty.x.replace(/\px/g, '');
          styT = +sty.y.replace(/\px/g, '');
        } else {
          styL = +sty.left.replace(/\px/g, '');
          styT = +sty.top.replace(/\px/g, '');
        }
      }

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX;
        const t = e.clientY - disY;
        // 移动当前元素
        dragDom.style.left = `${l + styL}px`;
        dragDom.style.top = `${t + styT}px`;
        e.preventDefault();
      };

      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
});
