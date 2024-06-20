<template>
    <div class="container">
        <div class="heading">Sign Up</div>
        <form action="" class="form">
            <input :required="true" ref="emailPhoneRef" class="email" type="email or phone" @blur="checkEmailOrPhone"
                @focus="changeValueColor" placeholder="邮箱/手机号">
            <input :required="true" class="password" type="password" placeholder="密码">
            <input :required="true" class="password" type="password" placeholder="确认密码">
            <div class="code-container">
                <input :required="true" class="code" type="code" placeholder="验证码">
                <input class="code-button" type="submit" value="获取验证码">
            </div>
            <span class="have-account">Have an account ?<a href="#">
                    <RouterLink :to="{ path: '/signIn' }">Sign In !</RouterLink>
                </a></span>
            <input class="login-button" type="submit" value="Sign Up">
        </form>

        <span class="agreement"><a href="#">Learn user licence agreement</a></span>
    </div>
</template>

<script setup lang="ts" name="SignUp">
import { ref, watch, watchEffect } from 'vue';

let emailPhoneRef = ref()

function checkEmailOrPhone(event: FocusEvent) {
    // 获取input值
    const target = event.target as HTMLInputElement;
    const value = target.value;
    let check = false
    // 校验邮箱
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(value)) {
        check = true;
    }
    // 校验手机
    const phonePattern = /^1[3456789]\d{9}$/;
    if (phonePattern.test(value)) {
        check = true;
    }
    if (!check) {
        emailPhoneRef.value.style.color = 'red';
    }
}

function changeValueColor() {
    emailPhoneRef.value.style.color = 'black';
}

</script>

<style scoped lang="less">
.container {
    max-width: 350px;
    background: #F8F9FD;
    background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
    border-radius: 40px;
    padding: 25px 35px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
    margin: 150px auto;
}

.heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: rgb(16, 137, 211);
}

.form {
    margin-top: 20px;
}

.form input {
    width: 90%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
}

.form input::-moz-placeholder {
    color: rgb(170, 170, 170);
}

.form input::placeholder {
    color: rgb(170, 170, 170);
}

.form input:focus {
    outline: none;
    border-inline: 2px solid #12B1D1;
}

.form .code-container {
    position: relative;
    width: 100%;
}

.form .code-container .code {
    display: inline-block;
    width: 20%;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
}

.form .code-container .code-button {
    display: inline-block;
    width: 30%;
    font-weight: bold;
    background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
    color: white;
    margin-left: 10px;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
}

.form .have-account {
    font-size: 11px;
    display: block;
    margin-top: 10px;
    margin-left: 10px;
}

.form .have-account a {
    font-size: 11px;
    color: #0099ff;
    padding-left: 4px;
    text-decoration: none;
}

.form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
}

.form .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
}

.form .login-button:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
}

.social-account-container {
    margin-top: 25px;
}

.social-account-container .title {
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(170, 170, 170);
}

.social-account-container .social-accounts {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 5px;
}

.social-account-container .social-accounts .social-button {
    background: linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(112, 112, 112) 100%);
    border: 5px solid white;
    padding: 5px;
    border-radius: 50%;
    width: 40px;
    aspect-ratio: 1;
    display: grid;
    place-content: center;
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 12px 10px -8px;
    transition: all 0.2s ease-in-out;
}

.social-account-container .social-accounts .social-button .svg {
    fill: white;
    margin: auto;
}

.social-account-container .social-accounts .social-button:hover {
    transform: scale(1.2);
}

.social-account-container .social-accounts .social-button:active {
    transform: scale(0.9);
}

.agreement {
    display: block;
    text-align: center;
    margin-top: 15px;
}

.agreement a {
    text-decoration: none;
    color: #0099ff;
    font-size: 9px;
}
</style>