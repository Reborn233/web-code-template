/*
  只写应用于全局的Formatter Function
*/
import { DateUtil } from '../utils/date';
import { Util } from '../utils/common';
/*
  格式化日期
*/
export function DateFormat (target, format) {
  return DateUtil.format(target, format);
}

/**
 * 小写显示
 * @param {String} target
 */
export function LowerCase (target) {
  return !Util.isUndefined(target) && !Util.isNull(target)
    ? target.toString().toLowerCase()
    : '';
}

/**
 * 大写显示
 * @param {String} target
 */
export function UpperCase (target) {
  return !Util.isUndefined(target) && !Util.isNull(target)
    ? target.toString().toUpperCase()
    : '';
}

export function ToInteger (target) {
  if (Number.isNaN(Number(target))) return null;
  return +target;
}

/**
 * 对数字或者类数字字符串进行格式化
 * @param {String<Number> | Number} target 要转换的数字或类数字字符串
 * @param {Boolean} rounding 是否四舍五入
 * @param {Number} hold 保留几位小数
 */
export function NumberFormat (target, hold = 0, rounding = true) {
  if (Number.isNaN(Number(target))) return null;
  // hold = Number.isNaN(Number(hold)) ? 0 : Number(hold);
  let r = /^\+?[1-9][0-9]*$/;
  hold = r.test(hold) ? Number(hold) : 0;
  target = Number(target);

  if (rounding) {
    return Number(target.toFixed(hold));
  }
  else {
    let _multiplier = 1;
    while (hold--) {
      _multiplier *= 10;
    }
    return Math.floor(target * _multiplier) / _multiplier;
  }
}

/**
 * 将数字转化为千分位显示, eg:
 *  2222222  => 2,222,222
 * @param {String|Number} num
 */
export function ThousandNumberFormat (num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

/**
 * 根據attr路徑獲取對應的value
 * @param {Object} obj 對象結構
 * @param {String} path as 'obj.attr1.attr2....'
 */
export function getValueByObjectPath (obj, path = '') {
  if (!path) return '';
  const keys = path.split('.');
  let result = obj;
  let _result = '';
  keys.forEach(key => {
    result = _result[key] ? _result[key] : '';
  });
  return result;
}

/**
 * 替換字符串中的空格
 * @param {String} str 字符串
 */
export function repalceSpace (str) {
  return str.replace(/^ +| +$/g, '');
}
