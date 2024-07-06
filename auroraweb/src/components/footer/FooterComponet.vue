<style scoped>
@import './footerComponent.less';
</style>

<template>
  <!-- 搜索栏 -->
  <div class="right-bottom">
    <div class="search-box-left">
      <div class="search-box-left-attachment">
        <img src="@/assets/images/attachment.svg" alt="" />
      </div>
      <div class="search-box-left-input">
        <input
          type="text"
          v-model="search_input"
          placeholder="请输入问题"
          @keydown.enter="pressEnterSendMsg(search_input)"
        />
      </div>
    </div>
    <div class="search-box-right">
      <div class="search-box-right-send" @click="sendMsg(search_input)">
        <img src="@/assets/images/send.svg" alt="" />
      </div>
    </div>
  </div>
  <!-- 合规信息 -->
  <div class="right-footer">
    <span>ChatGPT can make mistakes. Check important info.</span>
  </div>
</template>

<script setup lang="ts" name="Footer">
import { ref } from 'vue';
// 当前提问框input的内容
let search_input = ref()

// 版心末端 
let scrollContainer = ref();

const current_history = ref()

// 提问框获得焦点时如果按下enter键，发送信息
function pressEnterSendMsg(value: string) {
    search_input.value = "";
    let now_ask = { ask: value, answer: "aaa" }
    current_history.value.push(now_ask)
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
}

// 点击发送按钮
function sendMsg(value: string) {
    search_input.value = "";
    let now_ask = { ask: value, answer: "daf" }
    current_history.value.push(now_ask)
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
}
</script>
