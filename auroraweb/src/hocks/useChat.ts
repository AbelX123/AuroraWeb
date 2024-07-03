import { getHistoryApi, getContentApi } from '@/api/chat';
import { ref, } from 'vue';

export function useChat() {

    // 用户的历史记录
    const allProfiles = ref()

    // 获取当前用户历史记录
    async function getHistory(userId: string) {
        const data = await getHistoryApi(userId);
        allProfiles.value = data.data.allProfiles
    }

    // 获取具体的对话
    async function getContent(contentId: string) {
        await getContentApi(contentId);
    }


    return { allProfiles, getHistory, getContent }
}