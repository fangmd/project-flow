/**
 * 存储错误 code
 */

/**请求成功 code */
export const SUCCESS_CODE = 0;

export interface HttpCode {
  code: number;
  msg: string;
}

export const SERVER_ERROR: HttpCode = {
  code: 5000,
  msg: '服务器异常',
};

export const ACCOUNT_OR_PWD_ERROR: HttpCode = {
  code: 3000,
  msg: '账号或密码错误',
};
