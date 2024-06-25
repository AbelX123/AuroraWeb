<style scoped lang="less">
@import './homePage.less';
</style>

<template>
    <!-- 视口 -->
    <div class="container">
        <!-- 会话列表 -->
         <SideBar />
        <!-- 会话窗口 -->
        <div class="right">
            <!-- 头像栏 -->
            <div class="right-top">
                <div class="right-top-avatar">
                    <img src="../assets/images/avatar.png" alt="" class="avatar" />
                </div>
            </div>
            <!-- 正文版心 -->
            <div class="right-middle" ref="scrollContainer">
                <div class="ask-answer-box" v-for="(item, index) in current_history" :key="index">
                    <div class="item right-middle-ask">
                        <span class="message ask">{{ item.ask }}</span>
                    </div>
                    <div class="item right-middle-answer">
                        <span v-show="item.answer != ''" class="message answer">{{ item.answer }}</span>
                    </div>
                </div>
            </div>
            <!-- 搜索栏 -->
            <div class="right-bottom">
                <div class="search-box-left">
                    <div class="search-box-left-attachment">
                        <img src="@/assets/images/attachment.svg" alt="">
                    </div>
                    <div class="search-box-left-input">
                        <input type="text" v-model="search_input" placeholder="请输入问题"
                            @keydown.enter="pressEnterSendMsg(search_input)" />
                    </div>
                </div>
                <div class="search-box-right">
                    <div class="search-box-right-send" @click="sendMsg(search_input)">
                        <img src="@/assets/images/send.svg" alt="">
                    </div>
                </div>
            </div>
            <!-- 合规信息 -->
            <div class="right-footer">
                <span>ChatGPT can make mistakes. Check important info.</span>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts" name="IndexComponent">
import { onMounted, ref, } from 'vue';
import SideBar from '@/components/sideBar/SideBar.vue'


onMounted(() => {
    
})

// 后台获取的历史记录
let history = ref()

// 鼠标悬停省略号
let hoveredBox = ref()

// 当前提问框input的内容
let search_input = ref()

// 版心末端 
let scrollContainer = ref();

// 后台获取的当前的历史记录
let current_history = ref([
    {
        ask: "你好",
        answer: "你好，有什么可以帮助你"
    },
    {
        ask: "两个float的div盒子如何上下分布",
        answer: "如果你想让两个 div 元素使用 float 属性上下分布，可以通过清除" +
            "浮动来实现。虽然 float 通常用于左右排列，但通过适当的清除浮动技术，可以实现上下排列的效果。"
    }
])

// 鼠标进入历史记录区域显示省略号并修改背景颜色
function handleMouseEnterEllipsis(contentId: string) {
    hoveredBox.value = contentId;
}

// 鼠标离开历史记录区域隐藏省略号并取消背景颜色
function handleMouseLeaveEllipsis() {
    hoveredBox.value = "-1";
}

// 点击发送按钮
function sendMsg(value: string) {
    search_input.value = "";
    let now_ask = { ask: value, answer: "daf" }
    current_history.value.push(now_ask)
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
}

// 提问框获得焦点时如果按下enter键，发送信息
function pressEnterSendMsg(value: string) {
    search_input.value = "";
    let now_ask = { ask: value, answer: "aaa" }
    current_history.value.push(now_ask)
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
}

const activeItemId = ref();

// 点击日期下的某个问答展示该问题内容
function showCurrentContent(id: string, content: []) {
    // 当前激活
    activeItemId.value = id === activeItemId.value ? null : id;

    // 当前展示内容
    current_history.value = content;
}

function isHidden(id: string) {
    return id != hoveredBox.value
}

function isActice(id: string) {
    return id === activeItemId.value;
}

</script>
