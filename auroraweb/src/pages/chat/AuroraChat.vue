<style scoped lang="less">
@import "./auroraChat.less";
</style>

<template>
  <!-- 会话窗口 -->
  <div class="right">
    <Avatar />
    <!-- 正文版心 -->
    <div class="right-middle" ref="scrollContainer">
      <div
        class="ask-answer-box"
        v-for="(item, index) in current_history"
        :key="index"
      >
        <div class="item right-middle-ask">
          <span class="message ask">{{ item.ask }}</span>
        </div>
        <div class="item right-middle-answer">
          <span v-show="item.answer != ''" class="message answer">{{
            item.answer
          }}</span>
        </div>
      </div>
    </div>
    <!-- 搜索栏 -->
    <Footer @handle_chat="handleChat" />
  </div>
</template>

<script setup lang="ts" name="">
import { onMounted, ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useChat } from "@/hocks/useChat";
import Avatar from "@/components/avatar/AvatarComponent.vue";
import Footer from "@/components/footer/FooterComponet.vue";
import { useWebSocket } from "@/hocks/useWebSocket";
// 取出contentId
const route = useRoute();
const contentId = ref((route.query.contentId as string) || "");

const { message, connectWebSocket, sendMessage } = useWebSocket(
  "ws://localhost:8080/ask"
);

// 版心末端
const scrollContainer = ref<HTMLElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
  }
};

// 解构
const { getContent } = useChat();

// 当前对话
const current_history = ref([
  {
    detailId: "",
    ask: "",
    answer: "",
  },
]);

// 查询参数
const contentQuery = ref({
  userId: "abc",
  contentId: contentId,
  pageNo: 1,
  pageSize: 30,
});

// 获取内容方法封装
function getContentDetail() {
  getContent(contentQuery.value)
    .then((result) => {
      current_history.value = result.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

watch(
  () => route.query.contentId as string,
  (newValue) => {
    contentId.value = newValue;
    // 获取内容
    getContentDetail();
  }
);

watch(current_history, scrollToBottom);

onMounted(() => {
  // 获取内容
  getContentDetail();
  // 初始化websocket连接
  connectWebSocket();
  scrollToBottom();
});

// 处理输入框
const handleChat = (ask: string) => {
  // 将问题加入到页面中
  let current_history_last = {
    detailId: "",
    ask: ask,
    answer: "",
  };
  current_history.value.push(current_history_last);

  // 使用websocket发送给后端
  let websocketAsk = {
    userId: "abc",
    contentId: contentId.value,
    ask: ask,
    previousDetailId:
      current_history.value[current_history.value.length - 2].detailId,
  };
  sendMessage(JSON.stringify(websocketAsk));

  // 处理返回信息

  // 监听 message 变化并处理返回信息
  watch(message, (newValue) => {
    try {
      const data = JSON.parse(newValue);
      current_history.value[current_history.value.length - 1].answer =
        data.data;
      scrollToBottom();
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  });
};
</script>
