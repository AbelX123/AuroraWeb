/**
 * axios全局配置
 */

// 配置token
import { useUserStore } from '@/store/user';
import axios from 'axios'

const userStore = useUserStore()

// 创建一个axios实例
const request = axios.create({
    baseURL: import.meta.env.VITE_GLOB_API_URL,
})

// 添加请求拦截器
request.interceptors.request.use((request) => {
    request.headers['Content-Type'] = 'application/json;charest=utf-8';
    request.headers['Authorization-token'] = userStore.token;
    return request;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use((response) => {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default request;