
<style scoped lang="less">
@import "./signUp.less";
</style>

<template>
  <div class="container">
    <div class="logindiv">
      <span>Sign Up!</span>
      <input
        class="username"
        v-model="username"
        placeholder="用户名"
        type="email"
      />
      <input
        class="password"
        v-model="password"
        placeholder="密码"
        type="password"
      />
      <div class="code">
        <input
          class="number-code-input"
          type="text"
          placeholder="图形验证码"
          v-model="numberCode"
        />
        <canvas
          ref="canvas"
          :width="state.contentWidth"
          :height="state.contentHeight"
          class="number-code-canvas"
          @click="changeCanvasVal"
          >图形验证码</canvas
        >
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
import { useUser } from "@/hocks/useUser";

// 解构useUser
const { signUp } = useUser();

const username = ref();
const password = ref();

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
  () => {}
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

const numberCode = ref();
// 注册提交
function submitSignUp() {
  // 比较验证码
  if (state.identifyCode != numberCode.value) {
    alert("图形验证码错误");
    changeCanvasVal();
  } else {
    // 调用注册
    let signUpParam = {
      username: username.value,
      password: password.value,
    };
    signUp(signUpParam)
      .then((result) => {
        console.log("signUp success return ", result.data);
      })
      .catch((error) => {
        alert(error.message)
        // 刷新页面
        location.reload();
      });
  }
}
</script>

