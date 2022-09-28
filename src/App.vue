<!--
 * @Author: Topskys
 * @Date: 2022-09-27 16:06:43
 * @LastEditTime: 2022-09-27 16:58:24
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
  color: #000000;
}

a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #335eea;
  }
}
</style>
