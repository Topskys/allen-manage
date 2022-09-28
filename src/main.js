/*
 * @Author: Topskys
 * @Date: 2022-09-27 16:06:43
 * @LastEditTime: 2022-09-28 09:59:29
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  Button, Container, Header, Aside, Main,
  Menu, Submenu, MenuItem, MenuItemGroup,
  Dropdown, DropdownMenu, DropdownItem,
  Row, Col, Card, Table, TableColumn
} from 'element-ui'; // 按需引入
import 'element-ui/lib/theme-chalk/index.css';
import './assets/less/index.less'
import '@/mock/index'
import http from 'axios'


Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);










Vue.config.productionTip = false
Vue.prototype.$http =http


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


