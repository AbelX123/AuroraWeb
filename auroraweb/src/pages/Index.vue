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

.right {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 83%;
}

.hidden {
    display: none;
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
                        @mouseenter="handleMouseEnter(c.contentId)"
                        @mouseleave="handleMouseLeave()">
                        <span>{{ c.content }}</span>
                        <img src="../assets/images/ellipsis.svg" :class="{hidden: hoveredBox != c.contentId}">
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
        </div>
    </div>

</template>

<script setup lang="ts" name="">
import { onMounted, ref } from 'vue';
import axios from '../utils/request.js'
import { id } from 'element-plus/es/locales.mjs';

onMounted(() => {
    getHistory("afdjalfd")
})

let history = ref()

let hoveredBox = ref(0)

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
function handleMouseEnter(contentId:number) {
    hoveredBox.value = contentId;
}

// 鼠标离开历史记录区域隐藏省略号
function handleMouseLeave() {
    hoveredBox.value = -1;
}

</script>
