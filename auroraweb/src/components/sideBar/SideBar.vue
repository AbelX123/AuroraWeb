<style scoped>
@import './sideBar.less';
</style>

<template>
    <div class="left">
        <!-- 会话顶部，新增会话和收起会话列表 -->
        <div class="left-top">
            <div class="left-top-callapse-panel">
                <span class="tooltiptext">收起侧边栏</span>
                <img src="@/assets/images/callapse-panel.svg">
            </div>
            <div class="left-top-new-chat" @click="showCompany">
                <span class="tooltiptext">新建会话</span>
                <img src="@/assets/images/new-chat.svg">
            </div>
        </div>
        <!-- 会话列表栏 -->
        <div class="left-middle">
            <!-- 胶水 -->
            <div class="left-moddle-time-chat" v-for="(profiles, index) in allProfiles" :key="index">
                <div class="left-middle-time">
                    <span>{{ profiles.time }}</span>
                </div>
                <div class="left-middle-chat" v-for="(p) in profiles.profiles" :key="p.contentId"
                    @click="showCurrentContent(p.contentId)" @mouseenter="handleMouseEnterEllipsis(p.contentId)"
                    @mouseleave="handleMouseLeaveEllipsis()" :class="{ active: isActice(p.contentId) }">
                    <span>{{ p.contentProfile }}</span>
                    <img src="@/assets/images/ellipsis.svg" :class="{ hidden: isHidden(p.contentId) }">
                </div>
            </div>
        </div>
        <!-- 付费栏 -->
        <div class="left-bottom">
            <div class="left-bottom-upgrade">
                <div class="left-bottom-payment">
                    <img src="@/assets/images/payment.svg">
                </div>
                <span>欢迎订阅成为会员</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="">
import { useChat } from '@/hocks/useChat';
import { onMounted } from 'vue';
import SideBar from './sideBar'
import { useRouter } from 'vue-router';

// 会话钩子解构
const { getHistory, allProfiles } = useChat();

// 页面行为解构
const { handleMouseEnterEllipsis, isActice, handleMouseLeaveEllipsis, isHidden, activeState } = SideBar


onMounted(() => {
    // 获取当前用户历史记录
    getHistory("12345678")
    showCompany();
})

// 编程式路由
const router = useRouter()

// 渲染初始会话组件
function showCompany() {
    router.push({
        path: '/home/company'
    })
}

function showCurrentContent(contentId: string) {
    activeState(contentId);
    // 渲染对话组件
    router.push({
        path: '/home/chat',
        query: {
            contentId:contentId
        }
    })
}

</script>
