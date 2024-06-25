import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/signIn',
        name: 'signIn',
        component: () => import("@/pages/SignIn.vue")
    },
    {
        path: '/signUp',
        name: 'signUp',
        component: () => import("@/pages/SignUp.vue")
    },
    {
        path: '/home',
        name: 'home',
        component: () => import("@/pages/home/HomePage.vue")
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router