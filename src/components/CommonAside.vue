<!--
 * @Author: Topskys
 * @Date: 2022-09-27 16:06:43
 * @LastEditTime: 2022-09-28 10:34:08
-->
<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
    :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <h3>{{isCollapse?"后台":"通用后台管理系统"}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>

    <el-submenu v-for="(item,index) in hasChildren" :index="index.toString()" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="(subItem,subIndex) in item.children" :index="subItem.path" :key="subItem.path">
        <el-menu-item :index="subIndex.toString()">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu>
</template>


<script>
import { getHomeMenu } from '../api/data.js'

export default {
  name: 'CommonAside',
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 菜单路由跳转回调
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      })
    }
  },
  computed: {
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    hasChildren() {
      return this.menu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.m_tab.isCollapse
    }
  },
  mounted() {
    getHomeMenu().then(res => {
      const { code, data } = res.data
      code === 200 && (this.menu = data.menu)
    })
  },
}
</script>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100%;
  border: none;

  h3 {
    color: white;
    height: 56px;
    line-height: 56px;
    text-align: center;
  }
}
</style>
