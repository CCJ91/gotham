import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'
import AccountService from '../services/account.service'
import {LoginActionType, LoginMutationType} from "../store/modules/login";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/',
        name: 'gotham',
        redirect: '/chartManager/1',
        component: () => import('../views/Gotham.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '/workingTime/:userId',
                name: 'workingTimes',
                component: () => import('../views/WorkingTimes.vue'),
                props: true,
            },
            {
                path: '/workingTime/:userId/:workingTimeId',
                name: 'workingTime',
                component: () => import('../views/WorkingTime.vue'),
                props: (route) => ({ userId: Number(route.params.userId), workingTimeId: Number(route.params.workingTimeId)}),
            },
            {
                path: '/chartManager/:userId',
                name: 'chartManagerView',
                component: () => import('../views/ChartManager.vue'),
                props: (route) => ({ userId: Number(route.params.userId) }),
            },
            {
                path: '/userManager',
                name: 'userManagerView',
                component: () => import('../views/UserManager.vue'),
            },
            {
                path: '/admin/workingTimes',
                name: 'admin workingTimes',
                meta: { requiresAdmin: true },
                component: () => import('../views/AdminWorkingTime.vue'),
            },
            {
                path: '/admin/users',
                name: 'admin users',
                component: () => import('../views/AdminUsers.vue'),
            },
        ],
    }]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// guard d'admin
router.beforeEach(async (to) => {
    if (to.matched.some((route) => route.meta.requiresAdmin)) {
        // controle des authorities
        const accountUser = AccountService.account()
        console.log(await accountUser)
        store.commit(LoginMutationType.SetLoginUser, (await accountUser))
    }
})

// guard d'auth
router.beforeEach(async (to) => {
    if (to.matched.some((route) => route.meta.requiresAuth)) {
        const token = JSON.parse(`${localStorage.getItem('token')}`)
        // Returns to the login page if the token is not entered
        if (!token) {
            return {
                name: 'login'
            }
        }
        await store.dispatch(LoginActionType.FetchUserByToken)
    }
})

router.afterEach(() => {
    // Going to the top of the page after each redirection
    window.scrollTo(0, 0)
})



export default router