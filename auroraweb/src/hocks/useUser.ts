import { signUpApi } from '@/api/user';

export function useUser() {


    // 注册
    async function signUp(signUpParam: any) {
        return await signUpApi(signUpParam);
    }

    return { signUp }
}