/**
 * 结果相关函数
 */

/**请求成功 code */
export const SUCCESS_CODE = 0;

/**请求成功 */
export const success = (data) => {
  return {
    code: SUCCESS_CODE,
    data,
  };
};

/**请求失败 */
export const error = ({ code, data, msg }) => {
  return {
    code,
    data,
    msg,
  };
};
