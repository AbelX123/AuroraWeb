import { signUpApi, signInApi } from '@/api/user';

export function useUser() {


    // 注册
    async function signUp(signUpParam: any) {
        return await signUpApi(signUpParam);
    }

    // 登录
    async function signIn(signInParam:any) {
        return await signInApi(signInParam)
    }

    return { signUp, signIn }
}