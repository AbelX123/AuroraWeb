<style scoped lang="less">
@import './homePage.less';
</style>

<template>
    <!-- 视口 -->
    <div class="container">
        <!-- 会话列表 -->
         <SideBar />
        <!-- 会话窗口 -->
        <RouterView />
    </div>
</template>

<script setup lang="ts" name="IndexComponent">
import SideBar from '@/components/sideBar/SideBar.vue'
import { RouterView } from 'vue-router';
</script>
