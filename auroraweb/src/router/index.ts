import SignUp from "@/pages/SignUp.vue";
import SignIn from "@/pages/SignIn.vue";
import { createRouter, createWebHistory } from "vue-router";
import Index from "@/pages/Index.vue";


const routes = [
    {
        name: 'signIn',
        path: '/signIn',
        component: SignIn
    },
    {
        name: 'signUp',
        path: '/signUp',
        component: SignUp
    },
    {
        name: 'index',
        path: '/index',
        component: Index
    },
    {
        path: '/',
        redirect: '/index'
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router