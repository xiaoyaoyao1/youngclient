import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../views/user/User.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].common) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/login/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/user/:userId',
    component: () => import('../views/user/User.vue'),
    redirect: '/user/:userId/course',
    meta: {
      title: '首页'
    },
    children: [
      {
        path:'/user/:userId/course',
        name:'course',
        component:() => import('../views/course/Course.vue')
      },
      {
        path:'/user/:userId/addcourse',
        name:'addcourse',
        component:() => import('../views/course/addCourse.vue')
      },
      {
        path:'/user/:userId/service',
        name:'service',
        component:() => import('../views/service/Service.vue')
      },
      {
        path:'/user/:userId/profile',
        redirect: '/user/:userId/profile/index',
        component:() => import('../views/profile/Profile.vue'),
        meta: {
          title: '个人简介'
        },
        children: [
          {
            path: '/user/:userId/profile/index',
            name: 'index',
            component:() => import('../views/profile/Index.vue')
          },
          {
          path: '/user/:userId/profile/mine',
          name: 'myprofile',
          component:() => import('../views/profile/Mine.vue')
          },
          {
            path: '/user/:userId/profile/skill',
            name: 'skill',
            component:() => import('../views/profile/MySkill.vue')
          }]
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
