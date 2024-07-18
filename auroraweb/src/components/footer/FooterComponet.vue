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
import { useRouter } from "vue-router";
import { ref } from "vue";

// 编程式路由
const router = useRouter();
const emit = defineEmits(["handle_chat"]);
const props = defineProps(["name"]);

// 当前提问框input的内容
const search_input = ref();

// 回车或者发送
const sendMsg = () => {
  if (search_input.value != undefined && search_input.value != "") {
    if (props.name === "company") {
      router.push({
        path: "/home/chat",
        query: {
          contentId: null,
          search_input: search_input.value,
        },
      });
    } else {
      // 将输入框的内容传递给父组件用于传递后端提问和展示在页面
      const data = search_input.value;
      emit("handle_chat", data);
    }
    search_input.value = "";
  }
};
</script>
