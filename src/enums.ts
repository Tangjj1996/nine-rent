export enum LocalStorageKey {
  /** 大盘面板暂存 */
  dashboard = 'dashboard',
  /** 请求头的 accessToken */
  accessToken = 'accessToken',
  /** login 后的 openId */
  openId = 'openId',
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export enum DashboardEatIndex {
  /**
   * 早餐
   */
  breakfast,
  /**
   * 午餐
   */
  lunch,
  /**
   * 下午茶
   */
  afternoon_tea,
  /**
   * 晚餐
   */
  dinner,
  /**
   * 夜宵
   */
  midnight_snack,
  /**
   * 随便吃
   */
  casual_meal,
  /**
   * 附近
   */
  nearby,
}

export enum DashboardType {
  /**
   * 大转盘
   */
  wheel = 'wheel',
  /**
   * 九宫格
   */
  grid = 'grid',
  /**
   * 老虎机
   */
  slotMachine = 'slotMachine',
}

export enum DashboardOption {
  /**
   * 吃
   */
  eat = 'eat',
  /**
   * 买单
   */
  money = 'money',
}
