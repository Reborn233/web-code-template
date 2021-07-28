import _cloneDeep from 'lodash.clonedeep';

export const Util = {
  noop: () => { },
  isString (target) {
    return typeof target === 'string';
  },
  isObject (target) {
    return this.transferTargetType(target) === '[object Object]';
  },
  isNull (target) {
    return this.transferTargetType(target) === '[object Null]';
  },
  isUndefined (target) {
    return this.transferTargetType(target) === '[object Undefined]';
  },
  isArray (target) {
    return this.transferTargetType(target) === '[object Array]';
  },
  isRegExp (target) {
    return this.transferTargetType(target) === '[object RegExp]';
  },
  isDate (target) {
    return this.transferTargetType(target) === '[object Date]';
  },
  isFunction (target) {
    return this.transferTargetType(target) === '[object Function]';
  },
  isBoolean (target) {
    return this.transferTargetType(target) === '[object Boolean]';
  },
  isNumber (target) {
    return this.transferTargetType(target) === '[object Number]';
  },
  isPlainObj (target) {
    return !this.isNull(target) && this.isObject(target);
  },
  transferTargetType (target) {
    return Object.prototype.toString.call(target);
  },
  // 获取随机颜色
  getRandomRgbColor () {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
  },
  // 深拷贝对象
  deepClone (target) {
    return _cloneDeep(target);
  },
  // 判断是否有权限
  hasPermission (permission, permissions) {
    return permissions.indexOf(permission) > -1;
  },
  // 将回车(\n)替换为<br/>
  replaceEnter2Br (str) {
    return str.replace(/\n/g, '<br/>');
  },
  replaceBr2Enter (str) {
    return str.replace(/<br\/>/g, '\n');
  },
  /**
   * 拼接URL参数
   * @param {String} url url
   * @param {Object} paramObj 参数
   */
  appendUrlParams (url, paramObj) {
    if (!url) return '';
    if (!paramObj || !this.isPlainObj(paramObj)) return url;

    let paramArr = [];
    for (let key in paramObj) {
      paramArr.push(`${key}=${paramObj[key]}`);
    }

    return url.includes('?')
      ? `${url}&${paramArr.join('&')}`
      : `${url}?${paramArr.join('&')}`;
  },
  /**
   * 提取字符中${xxx} xxx的值
   */
  getExecStrs (str) {
    const reg = /\$\{(.+?)\}/g;
    let list = [];
    let result = null;
    do {
      result = reg.exec(str);
      result && list.push(result[1]);
    } while (result);
    return list;
  },
  /**
   * 获取光标位置
   */
  getCursortPosition (obj) {
    let cursorIndex = 0;
    if (document.selection) {
      // IE Support
      obj.focus();
      let range = document.selection.createRange();
      range.moveStart('character', -obj.value.length);
      cursorIndex = range.text.length;
    }
    else if (obj.selectionStart || obj.selectionStart === 0) {
      // another support
      cursorIndex = obj.selectionStart;
    }
    return cursorIndex;
  },
  /**
   * 字符串任意位置插入字符
   */
  insertStr (soure, start, newStr) {
    return soure.slice(0, start) + newStr + soure.slice(start);
  },
  insertNodeAtCursor (node) {
    let range, html;
    if (window.getSelection && window.getSelection().getRangeAt) {
      range = window.getSelection().getRangeAt(0);
      range.insertNode(node);
    }
    else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      html = (node.nodeType === 3) ? node.data : node.outerHTML;
      range.pasteHTML(html);
    }
  },
  insertHtmlAtCursor (html) {
    let range, node, sel = window.getSelection();
    if (window.getSelection && sel.getRangeAt) {
      range = sel.getRangeAt(0);
      node = range.createContextualFragment(html);
      range.insertNode(node);
      sel.removeAllRanges();
      // sel.addRange(range);
    }
    else if (document.selection && document.selection.createRange) {
      document.selection.createRange().pasteHTML(html);
    }
  }
};
