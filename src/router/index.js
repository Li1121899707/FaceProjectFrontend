import Vue from 'vue'
import Router from 'vue-router'
import vindex from '@/components/vindex'
import vlogin from '@/components/vlogin'
import vregister from '@/components/vregister'
import vadmin from '@/components/vadmin'
import vadminlogin from '@/components/vadminlogin'
import vattendancetime from '@/components/table/vattendancetime'
import vattendancecount from '@/components/table/vattendancecount'
import vattendancerate from '@/components/table/vattendancerate'
import vemployeeinfo from '@/components/table/vemployeeinfo'
import { getLogin } from './local.storage'
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/login',
      name:"home"
    },
    {
      path: '/index',
      component: vindex,
      redirect: '/index/login',
      children: [{
        path: "/index/login",
        component: vlogin
      },
      {
        path: "/index/register",
        component: vregister
      },
      {
        path: '/index/adminlogin',
        name: 'adminlogin',
        component: vadminlogin,
      }
      ]
    },
    {
      path: '/admin',
      component: vadmin,
      name: 'admin',
      redirect: '/admin/employee',
      children: [
        {
          path: "/admin/employee",
          redirect: '/admin/employee/info',
          meta: { login: true }
        },
        {
          path: "/admin/employee/info",
          component: vemployeeinfo,
          meta: { login: true }
        },
        {
          path: "/admin/attendance",
          redirect: '/admin/attendance/time',
          meta: { login: true }
        },
        {
          path: "/admin/attendance/time",
          component: vattendancetime,
          meta: { login: true }
        },
        {
          path: "/admin/attendance/count",
          component: vattendancecount,
          meta: { login: true }
        },
        {
          path: "/admin/attendance/rate",
          component: vattendancerate,
          meta: { login: true }
        }
      ]
    },
    {path:'*', redirect:{name:"home"}}
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.login) {  // 判断该路由是否需要登录权限
    if (getLogin().id && getLogin().pwd) {  // 通过store获取当前的token是否存在
      next();
    }
    else {
      Message('未登录，请先登录');
      next({
        path: '/index',
        query: { redirect: to.path }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})

export default router;
