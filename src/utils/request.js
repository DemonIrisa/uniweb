import config from "./config"

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/* 异常处理程序 */
const errorHandler = error => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status } = response;
    uni.showToast({
      icon: "none",
      title: `请求错误 ${status}`,
      duration: 2000
    });
  } else if (!response) {
    uni.showToast({
      icon: "none",
      title: '您的网络发生异常，无法连接服务器',
      duration: 2000
    });
  }

  return response;
};

class $request {
  static async init({
    url,
    params,
    headers,
    data,
    method = 'POST',
    isNotice = true,
    gateway,
    loading = false,
  }) {
    const headerToken = { token: uni.getStorageSync('token') };
    try {
      if (loading) {
        uni.showLoading({
          title: '加载中'
        });
      }
      const r = await new Promise((resolve, reject) => uni.request({
        url: config.url + gateway + '/' + url,
        data: data,
        header: {
          ...headerToken,
          ...headers
        },
        method,
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          resolve(error)
        }
      }))
      const { data: resultData } = r;
      const { code, data: result, message } = resultData;
      if (loading) {
        uni.hideLoading();
      }
      if (isNotice) {
        if (code === 0) {
          return result
        }
        uni.showToast({
          title: 'message',
          duration: 2000
        });
      } else {
        return resultData;
      }
      return false;
    } catch (error) {
      if (loading) {
        uni.hideLoading()
      }
      errorHandler(error);
      return false;
    }
  }

  static post({ ...option }) {
    return this.init({
      ...option,
      method: 'post',
    });
  }

  static get({ ...option }) {
    return this.init({
      ...option,
      method: 'get',
    });
  }

}

export default $request;