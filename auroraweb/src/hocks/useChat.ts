import { getHistoryApi, getContentApi } from '@/api/chat';
import { ref, } from 'vue';

export function useChat() {

    // 当前对话
    const content = ref()

    // 获取当前用户历史记录
    async function getHistory(contentQuery: any) {
        return await getHistoryApi(contentQuery);
    }

    // 获取具体的对话
    async function getContent(contentId: string) {
        const data = await getContentApi(contentId);
        content.value = data.data
    }


    return { getHistory, getContent, content }
}