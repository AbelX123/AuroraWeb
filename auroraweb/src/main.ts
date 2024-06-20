
import { createApp } from 'vue'
import App from './App.vue'
import jQuery from 'jquery'
import router from './router';
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import axios from "./utils/request"

declare const window: any;
window.$ = window.jQuery = jQuery;

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(ArcoVue, {
    componentPrefix: 'arco'
})
app.provide("$axios", axios)
app.mount('#app')

// 全局挂载axios
app.config.globalProperties.$axios = axios;