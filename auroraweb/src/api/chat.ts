import { get } from '@/utils/request/request';

// 获取用户的历史记录
export function getHistoryApi(contentQuery: any) {
    return get(
        {
            url: '/api/content/getProfileByUserId',
            data: contentQuery,
        }
    )
}

// 获取对话
export function getContentApi(contentQuery: any) {
    return get(
        {
            url: '/api/content/getContentDetailByContentId',
            data: contentQuery
        }
    )
}