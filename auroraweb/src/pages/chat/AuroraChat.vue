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
    <Footer />
  </div>
</template>

<script setup lang="ts" name="">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useChat } from "@/hocks/useChat";
import Avatar from "@/components/avatar/AvatarComponent.vue";
import Footer from "@/components/footer/FooterComponet.vue";
// 取出contentId
const route = useRoute();
const contentId = ref((route.query.contentId as string) || "");

// 解构
const { getContent } = useChat();

// 当前对话
const current_history = ref([
  {
    ask: "吃了吗？",
    answer: "吃了！",
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

let search_input = ref();

onMounted(() => {
  getContentDetail();
});

// 版心末端
let scrollContainer = ref();

// 提问框获得焦点时如果按下enter键，发送信息
function pressEnterSendMsg(value: string) {
  search_input.value = "";
  let now_ask = { ask: value, answer: "aaa" };
  current_history.value.push(now_ask);
  scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
}

// 点击发送按钮
function sendMsg(value: string) {
  search_input.value = "";
  let now_ask = { ask: value, answer: "daf" };
  current_history.value.push(now_ask);
  scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
}
</script>
