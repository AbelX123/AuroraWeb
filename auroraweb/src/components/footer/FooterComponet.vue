<style scoped>
@import "./footerComponent.less";
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
          @keydown.enter="sendMsg"
        />
      </div>
    </div>
    <div class="search-box-right">
      <div class="search-box-right-send" @click="sendMsg">
        <img src="@/assets/images/send.svg" alt="" />
      </div>
    </div>
  </div>
  <!-- 合规信息 -->
  <div class="right-footer">
    <span>Let life be beautiful like summer flowers.</span>
  </div>
</template>

<script setup lang="ts" name="Footer">
import { ref } from "vue";

// 当前提问框input的内容
const search_input = ref();

const emits = defineEmits(["handleChat"]);

// 回车或者发送，将search_input内容传递给父组件
const sendMsg = () => {
  if (!(search_input.value === "" || search_input.value === undefined)) {
    emits("handleChat", search_input.value);
  }
  search_input.value = "";
};
</script>
