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

<style scoped lang="less">
.container {
  background-color: rgb(243, 241, 241);
  position: fixed;
  height: 100%;
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

    input {
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
      margin-top: 40px;
      height: 40px;
      width: 30%;
    }

    .submit:hover {
      background-color: rgb(237, 241, 243);
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
  }
}
</style>
