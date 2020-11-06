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
/**
 * @memberof apis
 * @description: 新建分类
 * @function editoradd
 * @param {name}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const editoradd = (data = {}) => {
  return request.post({
    url: 'editoradd',
    data,
    gateway,
    loading: false,
  });
};
/**
 * @memberof apis
 * @description: 分类删除
 * @function remove
 * @param {_id}  传入参数
 * @author 许(后端对接人名称)
 * @see {@link https://t.com/doc/MrD0qNADV}
 * @return {object} 接口对象
 */

export const remove = (data = {}) => {
  return request.post({
    url: 'remove',
    data,
    gateway,
    loading: false,
  });
};
