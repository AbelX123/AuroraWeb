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
            <div class="left-top-new-chat">
                <span class="tooltiptext">新建会话</span>
                <img src="@/assets/images/new-chat.svg">
            </div>
        </div>
        <!-- 会话列表栏 -->
        <div class="left-middle">
            <!-- 胶水 -->
            <div class="left-moddle-time-chat" v-for="(h, index) in history" :key="index">
                <div class="left-middle-time">
                    <span>{{ h.time }}</span>
                </div>
                <div class="left-middle-chat" v-for="(c) in h.contents" :key="c.contentId"
                    @click="showCurrentContent(c.contentId, c.content)"
                    @mouseenter="handleMouseEnterEllipsis(c.contentId)" @mouseleave="handleMouseLeaveEllipsis()"
                    :class="{ active: isActice(c.contentId) }">
                    <span>{{ c.content[0].ask + " " + c.content[0].answer }}</span>
                    <img src="@/assets/images/ellipsis.svg" :class="{ hidden: isHidden(c.contentId) }">
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

const {getHistory, history, current_history} = useChat();

onMounted(() => {
    history.value = getHistory("afdjalfd")
})


</script>
