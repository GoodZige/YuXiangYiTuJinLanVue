import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
/* Layout */
import Layout from '@/Layout'

export const constantRoutes = [
    // {
    //     path: '/login',
    //     component: (resolve) => require(['@/views/login'], resolve),
    // },
    // { path: '*', redirect: '', },
    {
      path: "/",
      redirect: "/taiPing",
    },
    {
        path: '/taiPing',
        component: Layout,
        redirect: '/taiPing',
        children: [
            {
                path: '/',
                component: () => import('@/views/taiPing'),
                name: 'index',
                meta: { title: '隧道一图尽览_太平隧道' }
            },
        ]
    },
]
const router = new Router({
    // mode: 'history', // 去掉url中的#
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || "隧道一图尽览";
    next();
  }); 
export default router
