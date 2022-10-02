<!--
 * @Author: Topskys
 * @Date: 2022-09-27 17:52:41
 * @LastEditTime: 2022-10-02 10:30:56
-->
<template>
    <header>
        <div class="l-content">
            <el-button @click="handleMenu()" plain icon="el-icon-menu" size="mini"></el-button>
            <!-- <h3 style="color:#fff">首页</h3> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span class="user">
                    <img :src="userAvatar" alt="" class="userAvatar">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'CommonHeader',
    data() {
        return {
            userAvatar: require('../assets/frank-girl.jpg')
        }
    },
    computed: {
        ...mapState({
            tags: state => state.m_tab.tabList
        })
    },
    methods: {
        handleMenu() {
            this.$store.commit("updateCollapse")
        },
        logOut() {
            this.$store.commit("clearToken")
            this.$store.commit("clearMenu")
            this.$router.push("/login")
        }
    }

}
</script>

<style lang="less" scoped="true">
header {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}

.l-content {
    display: flex;
    align-items: center;

    .el-button {
        margin-right: 20px;
    }
}

.r-content {
    .userAvatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>