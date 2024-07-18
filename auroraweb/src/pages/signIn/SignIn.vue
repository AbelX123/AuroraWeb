<style scoped lang="less">
@import "./signIn.less";
</style>

<template>
  <div class="container">
    <div class="logindiv">
      <span>Sign In!</span>
      <input placeholder="用户名" type="email" />
      <input placeholder="密码" type="password" />
      <input class="submit" type="submit" @click="toHome" />
      <div class="noaccount">
        <p>还没有账号?</p>
        <router-link class="link" to="/SignUp">Sign Up !</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="SignIn">

import { useRouter } from 'vue-router';

const router = useRouter()

function toHome() {
  router.push({
    path: '/home'
  })
}

</script>
