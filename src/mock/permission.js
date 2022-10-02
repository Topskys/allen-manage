/*
 * @Author: Topskys
 * @Date: 2022-09-30 15:13:13
 * @LastEditTime: 2022-10-02 10:32:44
 */
import Mock from 'mockjs'

export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        if (username === 'admin' && password === 'admin') {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'home/index.vue'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: '商品管理',
                            icon: 'video-play',
                            url: "mall/index.vue"
                        },
                        {

                            path: '/user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            url: 'user/index.vue'
                        },
                        {
                            label: '其他',
                            icon: 'location',
                            children: [
                                {
                                    path: '/page1 ',
                                    name: 'page1',
                                    label: '页面1',
                                    icon: 'setting ',
                                    url: 'other/pageOne.vue'
                                },
                                {
                                    path: "/page2",
                                    name: 'page2',
                                    label: '页面2',
                                    icon: 'setting',
                                    url: 'other/pageTwo.vue'
                                }
                            ]
                        }

                    ],
                    token: Mock.Random.guid(),
                    msg: "获取菜单成功",
                    success: true,
                }
            }
        } else if (username === 'user' && Number(password) === 123456) {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'home/index.vue'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: '商品管理',
                            icon: 'video-play',
                            url: "mall/index.vue"
                        },
                        {

                            path: '/user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            url: 'user/index.vue'
                        },
                    ]
                }
            }
        } else {
            return {
                code: 400,
                data: {
                    msg: "密码错误",
                    success: false,
                }
            }
        }
    }
}