import {get} from '@/utils/request/request'

// 获取用户的历史记录
export function getHistoryApi(userId: string) {
    return get(
        {
            url: '/api/content/getProfileByUserId',
            data: {
                userId: userId
            }
        }
    )
}

// 获取对话
export function getContentApi(contentId: string) {
    return get(
        {
            url: '/api/content/getContentByContentId',
            data: {
                contentId: contentId
            }
        }
    )
}