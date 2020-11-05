import request from '../../utils/request';

const gateway = 'goods';
/**
 * @memberof apis
 * @description: 获取商品
 * @function pageNoAuth
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const pageNoAuth = (data = {}) => {
  return request.post({
    url: 'pageNoAuth',
    data,
    gateway,
    loading: true,
  });
};
