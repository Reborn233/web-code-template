/**
 * 常用正则定义
 */

// 密码：必须有字母、数字、特殊字符(+-*/,.#%'`:;^_)组成
// 、_ = \ [ ] ; ' ，. / ~ ! @ # $ % ^ & * ( ) + | ? > < “ ：｛ ｝
export const PASSWORD_PATTERN = /^(?:(?=.*[0-9].*)(?=.*[A-Za-z].*)(?=.*[\\&{}:"<>?|()$@!,、~[\]/.#%'+*\-:;^_`].*))[\\&{}:"<>?|()$@!,、~[\]/.#%'+*\-:;^_`0-9A-Za-z]{8,16}$/;

// 手机号
export const PHONE_PATTERN = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

// 电话号统一校验规则：座机、服务号、95588、手机号
// export const TEL_PATTERN = /([0-9]{3,4}-)?[0-9]{5,8}/
export const TEL_PATTERN = /^[0-9-]{5,13}$/;

// 邮箱
export const EMAIL_PATTERN = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

// 身份证:支持18位和15位
export const IDCARD_PATTERN = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;

// 昵称：6至20位，以字母开头，字母，数字，减号，下划线
export const NICKNAME = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;

// 不为0的正整数
export const NOT_ZERO_INTEGER = /^[1-9]\d*$/;

// QQ
export const QQ_PATTERN = /^[1-9][0-9]{4,11}$/;

// 微信
export const WX_PATTERN = /^[a-zA-Z_-\d]{6,20}$/;

// 包含中文
export const CN_PATTERN = /[\u4E00-\u9FA5]/;

// 输入英文、数字、英文标点
// export const ALL_EN_INPUT = /^[\x00-\xff]+$/;

// 空格
export const SPACE_PATTERN = /\s+/;

// 车牌号
export const CARNO_PATTERN = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
// 车牌号（新能源）
export const ENERGY_CARNO_PATTREN = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;

export const isVehicleNumber = (vehicleNumber) => {
  if (vehicleNumber.length === 7) {
    return CARNO_PATTERN.test(vehicleNumber);
  }
  else if (vehicleNumber.length === 8) {
    return ENERGY_CARNO_PATTREN.test(vehicleNumber);
  }
  else {
    return false;
  }
};

// 纳税人识别号
export const TAXPAYER_IDENTIFICATION_NUM = /^[0-9a-zA-Z]{15,20}$/;

export const BANK_PATTERN = /^(\d{16}|\d{19})$/;

// 金额
export const PRICE_PATTERN = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
// 单价最大值
export const UNIT_PRICE_MAX_PATTER = 1000000;
