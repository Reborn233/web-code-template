import {
  DateFormat,
  UpperCase,
  LowerCase,
  NumberFormat,
  ToInteger
} from '../formatters';

export function date (target, format) {
  return DateFormat(target, format);
}

export function lowerCase (target) {
  return LowerCase(target);
}

export function upperCase (target) {
  return UpperCase(target);
}

export function toInteger (target) {
  return ToInteger(target);
}

/**
 * 对数字或者类数字字符串进行格式化
 * @param {String<Number> | Number} target 要转换的数字或类数字字符串
 * @param {Boolean} rounding 是否四舍五入
 * @param {Number} hold 保留几位小数
 */
export function number (target, rounding, hold) {
  return NumberFormat(target, rounding, hold);
}
