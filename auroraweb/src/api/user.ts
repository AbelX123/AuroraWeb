import { post } from '@/utils/request/request'

// 注册
export function signUpApi(signUpParam: any) {
    return post({
        url: '/api/user/signUp',
        data: signUpParam,
    })
}

// 登录
export function signInApi(signInParam: any) {
    return post({
        url: '/api/user/signIn',
        data: signInParam,
    })
}