import {get} from '@/utils/request/request'

// 获取用户的历史记录
export function getHistoryApi(userId: string) {

    return get(
        {
            url: '/api/user/getHistory',
            data: {
                userId: userId
            }
        }
    )
}