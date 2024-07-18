<style scoped lang="less">
@import "./signIn.less";
</style>

<template>
  <div class="container">
    <div class="logindiv">
      <span>Sign In!</span>
      <input v-model="username" placeholder="用户名" type="email" />
      <input v-model="password" placeholder="密码" type="password" />
      <input class="submit" type="submit" @click="toHome" />
      <div class="noaccount">
        <p>还没有账号?</p>
        <router-link class="link" to="/SignUp">Sign Up !</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="SignIn">
import { ref } from "vue";
import { useUser } from "@/hocks/useUser";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const router = useRouter();

// 解构useUser
const { signIn } = useUser();
const username = ref();
const password = ref();
const signInParam = ref({
  username: "",
  password: "",
});

function toHome() {
  // 后端验证登录
  signInParam.value.username = username.value;
  signInParam.value.password = password.value;
  signIn(signInParam.value)
    .then((result) => {
      if (result.status == "0000") {
        // 将后端返回的用户信息存入userStore供全局使用
        let { userId, username, token, refreshToken } = result.data;
        userStore.$patch({
          userId: userId,
          username: username,
          token: token,
          refresh_token: refreshToken,
        });
        alert("登录成功");
        // 跳转到首页
        router.push({
          path: "/home",
        });
      }
    })
    .catch((error) => {
      alert(error.message);
      // 刷新页面
      location.reload();
    });
}
</script>
