/*
 * @Author: Topskys
 * @Date: 2022-09-27 16:06:43
 * @LastEditTime: 2022-09-28 10:38:04
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import('../views/Main.vue')
const Home = () => import('../views/home/index.vue')
const User = () => import('../views/user')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/mall',
        name: 'mall',
        component: User
      },
      {
        path: '/user',
        name: 'user',
        component: User
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
