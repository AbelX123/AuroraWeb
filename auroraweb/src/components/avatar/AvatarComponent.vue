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
  </div>
</template>

<script setup lang="ts" name="Avatar">
import { useUserStore } from "@/store/user";
// 从userStore中取出用户名
const userStore = useUserStore();
</script>
