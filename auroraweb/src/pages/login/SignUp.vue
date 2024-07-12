<template>
  <div class="container">
    <div class="logindiv">
      <span>Sign Up!</span>
      <input class="username" placeholder="用户名" type="email" />
      <input class="password" placeholder="密码" type="password" />
      <div class="code">
        <input
          class="number-code-input"
          type="text"
          placeholder="图形验证码"
          v-model="numberCode"
        />
        <canvas ref="canvas" :width="state.contentWidth" :height="state.contentHeight" class="number-code-canvas" @click="changeCanvasVal">图形验证码</canvas>
      </div>
      <input class="submit" type="submit" @click="submitSignUp" />
      <div class="noaccount">
        <p>已经有账号了?</p>
        <router-link class="link" to="/SignIn">Sign In !</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="SignUp">
import { reactive, ref, onMounted, watch } from "vue";
const canvas = ref();
const state = reactive({
  contentWidth: 100,
  contentHeight: 30,
  valicodes: "abcdefghijklmnopqrstuvwxyz1234567890",
  identifyCode: "",
  count: 4,
});
onMounted(() => {
  state.identifyCode = draw();
});
watch(
  () => {
    return state.identifyCode;
  },
  (newVal) => {
    
  }
);
// 随机数字
const randomNum = (min: any, max: any) => {
  return Math.floor(Math.random() * (max - min) + min);
};
// 随机颜色
const randomColor = (min: any, max: any) => {
  let r = randomNum(min, max);
  let g = randomNum(min, max);
  let b = randomNum(min, max);
  return `rgb(${r}, ${g}, ${b})`;
};
// 干扰线
const drawLine = (ctx: any) => {
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = randomColor(40, 180);
    ctx.beginPath();
    ctx.moveTo(
      randomNum(0, state.contentWidth),
      randomNum(0, state.contentHeight)
    );
    ctx.lineTo(
      randomNum(0, state.contentWidth),
      randomNum(0, state.contentHeight)
    );
    ctx.stroke();
  }
};
// 绘制点
const drawDot = (ctx: any) => {
  for (let i = 0; i < 20; i++) {
    //20个点
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(
      randomNum(0, state.contentWidth),
      randomNum(0, state.contentHeight),
      1,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
};
//开始绘制
const draw = () => {
  const ctx = canvas.value.getContext("2d");
  //绘制背景
  ctx.fillStyle = randomColor(220, 255);
  ctx.fillRect(0, 0, state.contentWidth, state.contentHeight);
  // 绘制文字
  let identifyCode = "";
 
  for (let i = 0; i < state.count; i++) {
    //控制字数
    // drawText(ctx, state.identifyCode[i], i);
    const text = state.valicodes[randomNum(0, state.valicodes.length - 1)];
    identifyCode += text;
    // 字体随机的旋转角度
    var deg = randomNum(-10, 10);
    ctx.font = randomNum(18, 40) + "px Arial"; //字体大小
    ctx.fillStyle = randomColor(50, 160); //字体颜色
 
    ctx.textBaseline = "middle";
 
    ctx.save();
    //文字依次随机的上下左右
    let x = (state.contentWidth / state.count) * i + 10;
    let y = randomNum(
      -state.contentHeight / state.count,
      state.contentHeight / state.count
    );
    ctx.translate(x, y);
    ctx.rotate((deg * Math.PI) / 180); //文字旋转角度
    ctx.fillText(text, 0, state.contentHeight / 2);
    ctx.restore();
  }
  //绘制线条
  drawLine(ctx);
  //绘制点
  drawDot(ctx);
  return identifyCode;
};
const changeCanvasVal = () => {
  state.identifyCode = draw();
};

const numberCode = ref()
// 注册提交
function submitSignUp() {
  // 比较验证码
  if(state.identifyCode != numberCode.value) {
    alert("图形验证码错误")
  }
}

</script>

<style scoped lang="less">
.container {
  background-color: rgb(243, 241, 241);
  position: fixed;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .logindiv {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 30px;
    width: 24%;
    height: 50%;

    span {
      margin: 0 auto;
      font-size: 30px;
      color: black;
      margin-top: 60px;
      margin-bottom: 20px;
      font-weight: 900;
    }

    .username,
    .password,
    .submit {
      display: block;
      margin-left: 50%;
      transform: translateX(-50%);
      margin-top: 20px;
      text-indent: 2px;
      width: 200px;
      height: 30px;
      background-color: rgb(244, 241, 241);
      border: 1px solid black;
      border-radius: 10px;
    }

    .submit {
      margin-top: 35px;
      height: 40px;
      width: 30%;
    }

    .submit:hover {
      background-color: rgb(206, 213, 216);
      cursor: pointer;
    }

    .noaccount {
      margin: 0 auto;
      margin-top: 20px;
      p {
        display: inline-block;
      }

      .link {
        margin-left: 10px;
      }
    }

    .code {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      margin-top: 20px;
      height: 30px;
      width: 200px;

      .number-code-canvas {
        background-color: rgb(244, 241, 241);
        height: 30px;
        width: 100px;
        height: 100%;
        margin-left: 10px;
        border: 1px solid black;
        border-radius: 10px;
      }

      .number-code-input {
        background-color: rgb(244, 241, 241);
        text-indent: 2px;
        display: inline-block;
        height: 100%;
        width: 90px;
        border: 1px solid black;
        border-radius: 10px;
      }
    }
  }
}
</style>
