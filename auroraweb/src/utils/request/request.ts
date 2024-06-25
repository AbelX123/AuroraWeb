/**
 * RestFul风格封装
 */

import type { AxiosResponse } from 'axios'
import request from './axios'

export interface HttpOption {
    url: string
    data?: any
    method?: string
    headers?: any
    beforeRequest?: () => void
    afterRequest?: () => void
}

export interface Response<T = any> {
    status: string
    message: string
    data: T
    sign: string
}

// http公共方法
function http<T = any>(
    { url, data, method, headers, beforeRequest, afterRequest }: HttpOption,
) {
    const successHandler = (res: AxiosResponse<Response<T>>) => {
        if (res.data.status === '200' || typeof res.data === 'string')
            return res.data

        if (res.data.message === 'Unauthorized') {
            window.location.reload()
        }

        return Promise.reject(res.data)
    }

    const failHandler = (error: Response<Error>) => {
        afterRequest?.()
        throw new Error(error?.message || 'Error')
    }

    beforeRequest?.()

    method = method || 'GET'

    const params = Object.assign(typeof data === 'function' ? data() : data ?? {}, {})

    return method === 'GET'
        ? request.get(url, { params }).then(successHandler, failHandler)
        : request.post(url, params, { headers }).then(successHandler, failHandler)
}

// get方法
export function get<T = any>(
    { url, data, method = 'GET', beforeRequest, afterRequest }: HttpOption,
): Promise<Response<T>> {
    return http<T>({
        url,
        method,
        data,
        beforeRequest,
        afterRequest,
    })
}

// post方法
export function post<T = any>(
    { url, data, method = 'POST', headers, beforeRequest, afterRequest }: HttpOption,
): Promise<Response<T>> {
    return http<T>({
        url,
        method,
        data,
        headers,
        beforeRequest,
        afterRequest,
    })
}

export default { get, post }
