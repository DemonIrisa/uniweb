import request from '../../utils/request';

const gateway = 'type';
/**
 * @memberof apis
 * @description: 获取分类
 * @function allNoAuth
 * @param {type}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const allNoAuth = (data = {}) => {
  return request.post({
    url: 'allNoAuth',
    data,
    gateway,
    loading: false,
  });
};
