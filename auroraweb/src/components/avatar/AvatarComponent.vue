<style scoped lang="less">
@import "./avatarComponent.less";
</style>

<template>
  <!-- 头像栏 -->
  <div class="right-top">
    <div class="right-top-username">
      <span>{{ userStore.username }}</span>
    </div>
    <div class="right-top-avatar">
      <img src="@/assets/images/avatar.png" alt="" class="avatar" />
    </div>
    <div class="logout" @mouseenter="showLogout" @mouseleave="hiddenLogout">
      <button v-show="logout" @click="doLogout">退出登录</button>
    </div>
  </div>
</template>

<script setup lang="ts" name="Avatar">
import { useUserStore } from "@/store/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
// 从userStore中取出用户名
const userStore = useUserStore();

const router = useRouter();

const logout = ref(false);

function showLogout() {
  logout.value = true;
}
function hiddenLogout() {
  logout.value = false;
}
function doLogout() {
  router.push({
    path: "/"
  })
}
</script>
