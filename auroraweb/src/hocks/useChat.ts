import { getHistoryApi } from '@/api/chat';
import { ref, } from 'vue';

export function useChat() {
    
    // 用户的历史记录
    const history = ref()
    
    // 会话
    const current_history = ref([])
    
    // 获取当前用户历史记录
    function getHistory(userId: string) {
        return getHistoryApi(userId);
    }
    
    return {history, current_history, getHistory}
}