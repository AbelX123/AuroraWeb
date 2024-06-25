/**
 * axios全局配置
 */

import axios from 'axios'

// 创建一个axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default request;