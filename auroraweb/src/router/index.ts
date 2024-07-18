import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path: '/',
        redirect: '/signIn'
    },
    {
        path: '/signUp',
        name: 'signUp',
        component: () => import("@/pages/signUp/SignUp.vue")
    },
    {
        path: '/signIn',
        name: 'signIn',
        component: () => import("@/pages/signIn/SignIn.vue")
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
    {
        path: '/:catchall(.*)',
        name: '404',
        component: () => import("@/pages/404/NotFound.vue")
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router