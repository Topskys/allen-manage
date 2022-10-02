/*
 * @Author: Topskys
 * @Date: 2022-09-27 16:06:43
 * @LastEditTime: 2022-10-02 10:34:02
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)


const Main = () => import('../views/Main.vue')
const Home = () => import('../views/home/index.vue')
const User = () => import('../views/user')
const Mall = () => import('../views/mall')
const PageOne = () => import('../views/other/pageOne.vue')
const PageTwo = () => import('../views/other/pageTwo.vue')
const Login = () => import('../views/login/login')


const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: "/home",
    children: [
      //   {
      //     path: '/',
      //     name: 'home',
      //     component: Home,
      //   },
      //   {
      //     path: '/mall',
      //     name: 'mall',
      //     component: Mall
      //   },
      //   {
      //     path: '/user',
      //     name: 'user',
      //     component: User
      //   },
      //   {
      //     path: '/page1',
      //     name: 'page1',
      //     component: PageOne
      //   },
      //   {
      //     path: '/page2',
      //     name: 'page2',
      //     component: PageTwo
      //   },

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  store.commit("getToken")
  const token = store.state.m_user.token
  if (!token && to.name !== "login") {
    next({ name: "login" })
  } else if (token && to.name === "login") {
    next({ name: "home" })
  } else {
    next()
  }
})



export default router
