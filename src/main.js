/*
 * @Author: Topskys
 * @Date: 2022-09-27 16:06:43
 * @LastEditTime: 2022-10-02 10:15:14
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  Button, Container, Header, Aside, Main,
  Menu, Submenu, MenuItem, MenuItemGroup,
  Dropdown, DropdownMenu, DropdownItem,
  Row, Col, Card, Table, TableColumn,
  Breadcrumb, BreadcrumbItem, Tag, Form,
  FormItem, Input, Select, Option, Switch,
  DatePicker, Dialog, Pagination, Message,
  MessageBox,

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
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Pagination);











Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm


new Vue({
  router,
  store,
  render: h => h(App),
  created() {// 防止刷新路由丢失，出现白屏，需要在此再次调用addMenu()
    store.commit('addMenu', router)
  }
}).$mount('#app')


