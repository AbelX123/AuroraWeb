import { ref } from 'vue';

export function useWebSocket(url: string) {
    const message = ref<string>('');
    let socket: WebSocket | null = null;

    const connectWebSocket = () => {
        socket = new WebSocket(url);

        socket.onopen = () => {
        };

        socket.onmessage = (event: MessageEvent) => {
            message.value = event.data;
        };

        socket.onclose = () => {
        };

        socket.onerror = (error: Event) => {
            console.error('WebSocket error', error);
        };
    };

    const sendMessage = (msg: any) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(msg);
        }else{ // 等500毫秒再发
            setTimeout(sendMessage, 500, msg)
        }
    };

    return { message, connectWebSocket, sendMessage, socket };
}
