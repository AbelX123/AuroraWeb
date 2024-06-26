import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/signUp',
        name: 'signUp',
        component: () => import("@/pages/SignUp.vue")
    },
    {
        path: '/home',
        name: 'home',
        component: () => import("@/pages/home/HomePage.vue"),
        children: [
            {
                path: 'chat',
                name: 'chat',
                component: () => import("@/pages/home/chat/AuroraChat.vue")
            },
            {
                path: 'company',
                name: 'compmay',
                component: () => import("@/pages/home/company/AuroraCompany.vue")
            }
        ]
    },
    {
        path: '/signIn',
        name: 'signIn',
        component: () => import("@/pages/SignIn.vue")
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router