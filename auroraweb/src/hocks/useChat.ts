import { getHistoryApi, getContentApi } from '@/api/chat';

export function useChat() {


    // 获取当前用户历史记录
    async function getHistory(contentQuery: any) {
        return await getHistoryApi(contentQuery);
    }

    // 获取具体的对话
    async function getContent(contentQuery: any) {
        return await getContentApi(contentQuery);
    }


    return { getHistory, getContent }
}