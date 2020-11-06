import request from '../../utils/request';

const gateway = 'user';
/**
 * @memberof apis
 * @description: 用户登录
 * @function loginAdmin
 * @param {name,password}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const loginAdmin = (data = {}) => {
  return request.post({
    url: 'loginAdmin',
    data,
    gateway,
    loading: false,
  });
};
