<style scoped lang="less">
@import "./auroraCompany.less";
</style>

<template>
  <!-- 会话窗口 -->
  <div class="right">
    <!-- 头像栏 -->
    <Avatar />
    <!-- 正文版心 -->
    <div class="right-middle" ref="scrollContainer">
      <h1>AAAA</h1>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts" name="">
import Avatar from "@/components/avatar/AvatarComponent.vue";
import Footer from "@/components/footer/FooterComponet.vue";
</script>
