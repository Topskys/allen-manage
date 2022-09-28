<!--
 * @Author: Topskys
 * @Date: 2022-09-27 16:06:43
 * @LastEditTime: 2022-09-27 21:50:59
-->
<template>
  <div class="home">
    <el-container style="height:100vh">
      <el-aside width="auto">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader'

export default {
  name: 'Home',
  components: {
    CommonAside,
    CommonHeader,
  }
}
</script>


<style lang="less" scoped>
.el-header {
  background: gray;
}
</style>