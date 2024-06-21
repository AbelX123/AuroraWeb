<style scoped lang="less">
.container {
    position: fixed;
    display: flex;
    flex-direction: row;
    margin: 0%;
    height: 100%;
    width: 100%;
}

.left {
    display: flex;
    flex-direction: column;
    width: 17%;
    height: 100%;
    background-color: rgb(247, 247, 247);

    .left-top,
    .left-bottom {
        height: 8%;
    }

    .left-top {
        display: flex;
        align-items: center;

        .left-top-callapse-panel,
        .left-top-new-chat {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            width: 40px;
            cursor: pointer;
            border: 1px solid black;
            box-sizing: border-box;
            border-radius: 10px;

            img {
                display: inline-block;
                height: 20px;
            }
        }

        .left-top-callapse-panel:hover,
        .left-top-new-chat:hover {
            background-color: rgb(203, 194, 194);
        }

        .left-top-callapse-panel {
            margin-left: 10px;
        }

        .left-top-new-chat {
            margin-left: auto;
            margin-right: 10px;
        }
    }

    .left-middle {
        height: 84%;
        overflow: auto;

        .left-middle-time {
            height: 36px;
            width: 90%;
            font-size: 15px;
            line-height: 30px;
            text-indent: 10px;
            border-radius: 10px;
            color: rgb(117, 117, 117);
            background-color: rgb(247, 247, 247);
            position: sticky;
            top: 0px;
            margin: 0 auto;
            margin-top: 10px;
        }

        .left-middle-chat:hover {
            background-color: rgb(203, 194, 194);
        }

        .left-middle-chat {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 32px;
            width: 90%;
            font-size: 12px;
            white-space: nowrap;
            padding-left: 10px;
            box-sizing: border-box;
            line-height: 32px;
            border-radius: 10px;
            margin: 0 auto;
            margin-top: 3px;
            overflow-x: hidden;

            span {
                width: 80%;
                white-space: nowrap;
                overflow-x: hidden;
            }

            img {
                margin: 0 auto;
                margin-right: 10px;
                height: 20px;
            }
        }
    }

    .left-bottom {
        display: flex;
        align-items: center;
        justify-content: center;

        .left-bottom-upgrade {
            display: flex;
            align-items: center;
            font-size: 15px;
            height: 80%;
            width: 90%;
            text-indent: 10px;
            border-radius: 10px;

            .left-bottom-payment {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 35px;
                width: 35px;
                cursor: pointer;
                border: 1px solid black;
                box-sizing: border-box;
                border-radius: 10px;
                margin-left: 10px;

                img {
                    display: inline-block;
                    height: 25px;
                }
            }
        }

        .left-bottom-upgrade:hover {
            background-color: rgb(203, 194, 194);
        }
    }
}

.hidden {
    display: none;
}

.right {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 83%;

    .right-top {
        display: flex;
        align-items: center;
        justify-content: right;
        height: 60px;

        .right-top-avatar {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            margin-right: 20px;
            box-sizing: border-box;
            border-radius: 50%;

            img {
                height: 40px;
                border-radius: 50%;
            }
        }
    }

    .right-middle {
        height: 83%;
        width: 60%;
        margin: 0 auto;
        overflow: auto;
        scrollbar-width: no;

        .ask-answer-box {
            margin-top: 10px;
        }

        .item {
            display: flex;
        }

        .right-middle-ask {
            flex-direction: row-reverse;
            margin-right: 10px;
        }

        .right-middle-answer {
            flex-direction: row;
            margin-left: 10px;
        }

        .message {
            display: flex;
            align-items: center;
            background: #efefef;
            border-radius: 10px;
            min-height: 25px;
            padding: 9px 10px;
            line-height: 1.5;
            font-size: 13px;
            max-width: 500px;
            margin-top: 10px;
        }

        .ask {
            background-color: lightblue;
        }
    }

    // 搜索栏
    .right-bottom {
        background-color: rgb(247, 247, 247);
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        width: 65%;
        margin: 0 auto;
        margin-top: 3px;
        border-radius: 30px;

        .search-box-left {
            display: flex;
            align-items: center;
            justify-content: left;
            flex-grow: 1;
            height: 100%;

            .search-box-left-input {
                height: 40px;
                flex-grow: 1;
                display: flex;
                align-items: center;

                input {
                    height: 100%;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0;
                    border: none;
                    margin: 0;
                    outline: none;
                    text-indent: 20px;
                    font-size: 18px;
                    background-color: rgb(247, 247, 247);
                }
            }
        }

        .search-box-left-attachment,
        .search-box-right-send {
            width: 40px;
            height: 40px;
            box-sizing: border-box;

            img {
                height: 100%;
                width: 100%;
            }
        }
    }

    .right-footer {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        margin-top: 12px;
    }
}
</style>

<template>
    <!-- 视口 -->
    <div class="container">
        <!-- 会话列表 -->
        <div class="left">
            <!-- 会话顶部，新增会话和收起会话列表 -->
            <div class="left-top">
                <div class="left-top-callapse-panel">
                    <img src="../assets/images/callapse-panel.svg">
                </div>
                <div class="left-top-new-chat">
                    <img src="../assets/images/new-chat.svg">
                </div>
            </div>
            <!-- 会话列表栏 -->
            <div class="left-middle">
                <!-- 胶水 -->
                <div class="left-moddle-time-chat" v-for="h in history">
                    <div class="left-middle-time">
                        <span>{{ h.time }}</span>
                    </div>
                    <div class="left-middle-chat" v-for="(c) in h.contents" :key="c.contentId"
                        @mouseenter="handleMouseEnter(c.contentId)" @mouseleave="handleMouseLeave()">
                        <span>{{ c.content }}</span>
                        <img src="../assets/images/ellipsis.svg" :class="{ hidden: hoveredBox != c.contentId }">
                    </div>
                </div>
            </div>
            <!-- 付费栏 -->
            <div class="left-bottom">
                <div class="left-bottom-upgrade">
                    <div class="left-bottom-payment">
                        <img src="../assets/images/payment.svg">
                    </div>
                    <span>欢迎订阅成为会员</span>
                </div>
            </div>
        </div>
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
                        <img src="../assets/images/attachment.svg" alt="">
                    </div>
                    <div class="search-box-left-input">
                        <input type="text" v-model="search_input" placeholder="请输入问题" @keydown.enter="pressEnterSendMsg(search_input)"/>
                    </div>
                </div>
                <div class="search-box-right">
                    <div class="search-box-right-send" @click="sendMsg(search_input)">
                        <img src="../assets/images/send.svg" alt="">
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

<script setup lang="ts" name="">
import { onMounted, ref } from 'vue';
import axios from '../utils/request.js'

onMounted(() => {
    getHistory("afdjalfd")
})

// 后台获取的历史记录
let history = ref()

// 鼠标悬停省略号
let hoveredBox = ref(0)

// 当前提问框input的内容
let search_input = ref("")

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

// 获取当前用户历史记录
function getHistory(userId: string) {
    axios.get('/api/user/getHistory',
        {
            params: {
                userId: userId
            }
        }).then(response => {
            let allContents = response.data.data.allContents;
            history.value = allContents;
        }).catch((error) => {
            console.log(error)
        })
}

// 鼠标进入历史记录区域显示省略号
function handleMouseEnter(contentId: number) {
    hoveredBox.value = contentId;
}

// 鼠标离开历史记录区域隐藏省略号
function handleMouseLeave() {
    hoveredBox.value = -1;
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

</script>
