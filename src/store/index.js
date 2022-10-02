/*
 * @Author: Topskys
 * @Date: 2022-09-27 16:06:43
 * @LastEditTime: 2022-09-30 15:10:20
 */
import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    m_tab: tab,
    m_user: user,
  }
})
