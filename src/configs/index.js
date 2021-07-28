// 交易状态
export const TRADE_STATUS = [
  {
    label: '等待支付',
    value: 10451001
  },
  {
    label: '支付中(已经扫码)',
    value: 10451002
  },
  {
    label: '退款中',
    value: 10451003
  },
  {
    label: '支付成功',
    value: 10451004
  },
  {
    label: '交易失败',
    value: 10451005
  },
  {
    label: '部分退款',
    value: 10451006
  },
  {
    label: '全部退款',
    value: 10451007
  }
];

// 交易类型
export const TRADE_TYPE = [
  {
    label: '二维码',
    value: 10711001
  }
];

// 客户类型
export const CLIENT_TYPE = [
  {
    label: '客户类型1',
    value: 1
  },
  {
    label: '客户类型2',
    value: 2
  }
];

// 客户性别
export const SEX_TYPE_LIST = [
  {
    label: '男',
    value: 1
  },
  {
    label: '女',
    value: 2
  }
];

// 状态 1 启用 2 停用 3 禁用
export const STATUS = {
  USING: 1,
  STOP: 2,
  BAN: 3
};

// 客户类型状态
export const CLIENT_TYPE_STATUS = [
  {
    label: '启用',
    value: STATUS.USING
  },
  {
    label: '停用',
    value: STATUS.STOP
  }
];

// 业务类型状态
export const STATUS_LIST = [
  {
    label: '启用',
    value: STATUS.USING
  },
  {
    label: '停用',
    value: STATUS.STOP
  }
];

// 模板级别 1 商户 2 系统
export const TEMP_LEVEL = {
  MER: 1,
  SYS: 2
};

// 模板类型
export const TEMP_TYPE_LIST = [
  {
    label: '验证码',
    value: 10031001
  },
  {
    label: '短信通知',
    value: 10031002
  }
];

// 模板状态
export const TEMP_STATUS_LIST = [
  {
    label: '启用',
    value: STATUS.USING
  },
  {
    label: '停用',
    value: STATUS.STOP
  },
  {
    label: '禁用',
    value: STATUS.BAN
  }
];

// 模板收藏状态 1未收藏，2已收藏
export const TEMP_COLLECT_STATUS = {
  UNCOLLECT: 1,
  COLLECTED: 2
};

// 审核状态 1 审核中 2 审核失败 3 审核通过
export const AUDIT_STATUS = {
  DOING: 1,
  FAIL: 2,
  APPROVE: 3
};

export const AUDIT_STATUS_LIST = [
  {
    label: '审核中',
    value: AUDIT_STATUS.DOING
  },
  {
    label: '审核不通过',
    value: AUDIT_STATUS.FAIL
  },
  {
    label: '审核通过',
    value: AUDIT_STATUS.APPROVE
  }
];

// 发送短信类型 1：相同内容。2不同内容
export const SEND_TYPE = {
  SAME: '1',
  DIFF: '2'
};

// 短信发送类型 1即时；2定时
export const SEND_NOTE_TYPE = {
  IMMEDIATE: 1,
  TIME: 2
};

export const SEND_NOTE_TYPE_LIST = [
  {
    label: '即时',
    value: SEND_NOTE_TYPE.IMMEDIATE
  },
  {
    label: '定时',
    value: SEND_NOTE_TYPE.TIME
  }
];

// 短信发送状态 1未处理 2 处理成功 3 处理失败
export const SEND_STATUS = {
  UN: 1,
  SUCCESS: 2,
  FAIL: 3
};

export const SEND_STATUS_LIST = [
  {
    label: '未处理',
    value: SEND_STATUS.UN
  },
  {
    label: '处理成功',
    value: SEND_STATUS.SUCCESS
  },
  {
    label: '处理失败',
    value: SEND_STATUS.FAIL
  }
];

export const BATCH_SEND_STATUS = {
  UN: 1,
  DOING: 2,
  PAUSE: 3,
  CANCEL: 4,
  FINISHED: 5
};

// 批次发送状态
export const BATCH_SEND_STATUS_LIST = [
  {
    label: '未处理',
    value: BATCH_SEND_STATUS.UN
  },
  {
    label: '处理中',
    value: BATCH_SEND_STATUS.DOING
  },
  {
    label: '暂停',
    value: BATCH_SEND_STATUS.PAUSE
  },
  {
    label: '取消',
    value: BATCH_SEND_STATUS.CANCEL
  },
  {
    label: '处理完成',
    value: BATCH_SEND_STATUS.FINISHED
  }
];

// 短信变量类型 1 "商户自定义变量"  2 系统变量
export const VAR_TYPE = {
  DEFINED: 1,
  SYSTEM: 2
};
