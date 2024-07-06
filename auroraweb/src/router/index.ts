import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path: '/',
        redirect: '/signIn'
    },
    {
        path: '/signUp',
        name: 'signUp',
        component: () => import("@/pages/login/SignUp.vue")
    },
    {
        path: '/signIn',
        name: 'signIn',
        component: () => import("@/pages/login/SignIn.vue")
    },
    {
        path: '/home',
        name: 'home',
        component: () => import("@/pages/home/HomePage.vue"),
        children: [
            {
                path: 'chat',
                name: 'chat',
                component: () => import("@/pages/chat/AuroraChat.vue")
            },
            {
                path: 'company',
                name: 'compmay',
                component: () => import("@/pages/company/AuroraCompany.vue")
            }
        ]
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router