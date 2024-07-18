// 引入defineStore用于创建store
import { defineStore } from "pinia";

// 定义并暴露一个store
export const useUserStore = defineStore('user', {
    // action
    actions: {},
    // state
    state: () => {
        return {
            userId: "",
            username: "",
            token: "",
            refresh_token: ""
        }
    },
    // getter
    getters: {},
    // persist
    persist: true
});
