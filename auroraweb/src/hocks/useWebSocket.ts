import { ref } from 'vue';

export function useWebSocket(url: string) {
    const message = ref<string>('');
    let socket: WebSocket | null = null;

    const connectWebSocket = () => {
        socket = new WebSocket(url);

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event: MessageEvent) => {
            message.value = event.data;
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socket.onerror = (error: Event) => {
            console.error('WebSocket error', error);
        };
    };

    const sendMessage = (msg: any) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(msg);
        }
    };

    return { message, connectWebSocket, sendMessage };
}
