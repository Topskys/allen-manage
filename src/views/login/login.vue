<!--
 * @Author: Topskys
 * @Date: 2022-09-30 14:33:58
 * @LastEditTime: 2022-10-01 12:13:29
-->
<template>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" status-icon class="login-container">
        <h3 class="login_title ">通用后台管理系统登录</h3>
        <el-form-item label="用户名" label-width="80px" prop="username" class="username">
            <el-input type="input" v-model="form.username" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password" class="password">
            <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="login_submit">
            <el-button type="primary" @click="login" class="login_submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Mock from "mockjs"
import { getMenu } from '../../api/data'
export default {
    name: "login",
    data() {
        return {
            form: {},
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 1, message: "用户名长度不能小于3位", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            },
        }
    },
    methods: {
        login() {
            getMenu(this.form).then(({ code, data }) => {
                if (code === 200) {
                    this.$store.commit("clearMenu")
                    this.$store.commit("setMenu", data.menu)
                    this.$store.commit("setToken", data.token)
                    this.$store.commit("addMenu", this.$router)
                    this.$router.push({ name: "home" })
                } else {
                    this.$message.warning(data.msg)
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    width: 400px;
    margin: 100px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #eaeaea;
}

.login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}

.login_submit {
    margin: 10px auto 0px auto;
}
</style>