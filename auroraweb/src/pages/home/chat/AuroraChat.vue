<style scoped lang="less">
@import './AuroraChat.less';
</style>

<template>
    <!-- 会话窗口 -->
    <div class="right">
        <!-- 头像栏 -->
        <div class="right-top">
            <div class="right-top-avatar">
                <img src="@/assets/images/avatar.png" alt="" class="avatar" />
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
</template>

<script setup lang="ts" name="">
import { useRoute } from 'vue-router';
import { ref } from 'vue'

const route = useRoute()
const content = route.meta.content

console.log(content);


const current_history = ref()

// if (null != content) {
//     current_history.value = JSON.parse(content)
// }

// 当前提问框input的内容
let search_input = ref()

// 版心末端 
let scrollContainer = ref();

// 提问框获得焦点时如果按下enter键，发送信息
function pressEnterSendMsg(value: string) {
    search_input.value = "";
    let now_ask = { ask: value, answer: "aaa" }
    current_history.value.push(now_ask)
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
}

// 点击发送按钮
function sendMsg(value: string) {
    search_input.value = "";
    let now_ask = { ask: value, answer: "daf" }
    current_history.value.push(now_ask)
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
}
</script>
