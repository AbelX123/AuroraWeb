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
            <div class="left-moddle-time-chat" v-for="(h) in history" :key="h.contentId">
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
import { ref } from 'vue'
import { useChat } from '@/hocks/useChat';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

// 会话钩子解构
const { getHistory, history, current_history } = useChat();

// 编程式路由
const router = useRouter()

// 中间变量，用于存储当前用户的编号
const activeItemId = ref();

// 鼠标悬停省略号
let hoveredBox = ref()

onMounted(() => {
    // 获取当前用户历史记录
    getHistoryById("afdjalfd");

    showCompany();
})

// 渲染初始会话组件
function showCompany() {
    router.push({
        path: '/home/company'
    })
}

async function getHistoryById(id: string) {
    const { data } = await getHistory(id);
    const allContents = data.allContents;
    history.value = allContents;
}

// 点击日期下的某个问答展示该问题内容
function showCurrentContent(id: string, content: []) {
    // 当前激活
    activeItemId.value = id === activeItemId.value ? null : id;

    // 当前展示内容
    current_history.value = content;

    const nowContent = JSON.stringify(content)

    // 渲染路由组件
    router.push({
        name: 'chat',
        meta: {
            content: nowContent
        }
    });
}

// 鼠标进入历史记录区域显示省略号并修改背景颜色
function handleMouseEnterEllipsis(contentId: string) {
    hoveredBox.value = contentId;
}

function isActice(id: string) {
    return id === activeItemId.value;
}

// 鼠标离开历史记录区域隐藏省略号并取消背景颜色
function handleMouseLeaveEllipsis() {
    hoveredBox.value = "-1";
}

function isHidden(id: string) {
    return id != hoveredBox.value
}
</script>
