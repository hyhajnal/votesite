/*
异步请求基于whatwg-fetch
 */
import fetch from 'dva/fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 500) {
    const error = { msg: '服务器出错！' };
    throw error;
  }
  if (response.status === 403) {
    const error = { msg: '需要登录才可进行操作！' };
    throw error;
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const newOptions = { ...options, mode: 'cors', credentials: 'include' };
  // console.log(newOptions);
  const response = await fetch(url, newOptions);

  checkStatus(response);

  const data = await response.json();

  if (!data.success) {
    throw data;
  }
  const ret = {
    data,
    headers: {},
  };

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }

  return ret;
}
