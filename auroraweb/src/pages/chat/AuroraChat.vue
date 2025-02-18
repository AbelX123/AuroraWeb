<style scoped lang="less">
@import "./auroraChat.less";
</style>

<template>
  <div class="container">
    <SideBar ref="sideBar" />
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
            <span
              v-show="item.answer != '' && item.answer != undefined"
              class="message answer"
              >{{ item.answer }}</span
            >
          </div>
        </div>
      </div>
      <!-- 搜索栏 -->
      <Footer @handleChat="handleChat" />
    </div>
  </div>
</template>

<script setup lang="ts" name="">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useChat } from "@/hocks/useChat";
import Avatar from "@/components/avatar/AvatarComponent.vue";
import Footer from "@/components/footer/FooterComponet.vue";
import { useUserStore } from "@/store/user";
import SideBar from "@/components/sideBar/SideBar.vue";

// pinai store
const userStore = useUserStore();

// sideBar
const sideBar = ref<InstanceType<typeof SideBar> | null>(null);

// 取出contentId
const route = useRoute();
let contentId = ref(route.params.contentId);
// 当前对话
interface HistoryItem {
  detailId: string;
  ask: string;
  answer: string;
}
const current_history = ref<HistoryItem[]>([]);

// 初始化
onMounted(() => {
  // 初始化websocket连接
  setUpWebSocket();
  getContentDetail();
  scrollToBottom();
});

onBeforeUnmount(() => {
  if (websocket.value) {
    websocket.value.close();
  }
});

// *****************************************  Begin *****************************************
const websocket = ref();
const sentenceQueue = ref<string[]>([]);
const isRendering = ref(false);
// 初始化websokcet连接
function setUpWebSocket() {
  websocket.value = new WebSocket("ws://localhost:8080/ask");
  websocket.value.onmessage = (event: MessageEvent) => {
    sentenceQueue.value.push(event.data);
    processQueue();
  };
}
// 渲染
function processQueue() {
  if (!isRendering.value && sentenceQueue.value.length > 0) {
    // 如果没有在渲染且队列长度大于0
    isRendering.value = true;
    renderSentence(sentenceQueue.value.shift() as string);
  }
}
function renderSentence(sentence: string) {
  const fRJ = JSON.parse(JSON.parse(sentence).data);
  contentId.value = fRJ.contentId;
  current_history.value[current_history.value.length - 1].detailId =
    fRJ.detailId;

  let answer = fRJ.answer;

  if (answer === "") {
    if (current_history.value.length === 1) {
      if (sideBar.value) {
        sideBar.value.doSomething(contentId.value as string);
      }
    }
  }

  let index = 0;
  const renderInterval = setInterval(() => {
    if (index < answer.length) {
      current_history.value[current_history.value.length - 1].answer +=
        answer.charAt(index);
      index++;
    } else {
      clearInterval(renderInterval);
      isRendering.value = false;
      processQueue();
    }
    scrollToBottom();
  }, 100);
}
const sendMessage = (msg: any) => {
  if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
    websocket.value.send(msg);
  } else {
    // 等500毫秒再发
    setTimeout(sendMessage, 500, msg);
  }
};
// *****************************************  End *****************************************

// 处理输入框
function handleChat(ask: string) {
  // 将问题加入到页面中
  let current_history_last = {
    detailId: "",
    ask: ask,
    answer: "",
  };
  let previousDetailId = "";
  if (current_history.value.length > 0) {
    previousDetailId =
      current_history.value[current_history.value.length - 1].detailId;
  }
  current_history.value.push(current_history_last);
  // 使用websocket发送给后端
  let websocketAsk = {
    userId: userStore.userId,
    contentId: contentId.value,
    ask: ask,
    previousDetailId: previousDetailId,
  };
  sendMessage(JSON.stringify(websocketAsk));
  scrollToBottom();
}

// 版心末端
const scrollContainer = ref<HTMLElement | null>(null);

async function scrollToBottom() {
  // 在数据更新后马上操作 DOM，可能无法获取到最新的 DOM 状态。
  // 通过 nextTick ，可以确保在 DOM 更新完成后再执行相关操作
  await nextTick();
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
  }
}

// 解构
const { getContent } = useChat();

// 查询参数
const contentQuery = ref({
  userId: userStore.userId,
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
  scrollToBottom;
}

watch(
  () => route.params.contentId,
  (newValue) => {
    contentId.value = newValue;
    // 获取内容
    getContentDetail();
    scrollToBottom;
  }
);

watch(current_history, scrollToBottom);
</script>
