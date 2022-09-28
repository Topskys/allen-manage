/*
 * @Author: Topskys
 * @Date: 2022-09-28 09:38:45
 * @LastEditTime: 2022-09-28 10:13:35
 */
import Mock from 'mockjs'


let list = []

export default {
    getStatisticalData: () => {
        for (let i = 0; i < 7; i++) {
            list.push(
                Mock.mock({
                    // 产生随机数100~8000，保留小数，最小0位，最大0位
                    "苹果": Mock.Random.float(100, 8000, 0, 0),
                    "vivo": Mock.Random.float(100, 8000, 0, 0),
                    "oppo": Mock.Random.float(100, 8000, 0, 0),
                    "华为": Mock.Random.float(100, 8000, 0, 0),
                    "三星": Mock.Random.float(100, 8000, 0, 0),
                    "小米": Mock.Random.float(100, 8000, 0, 0),
                })
            )
        }
        return {
            code: 200,
            data: {
                // 圆饼
                videoData: [
                    {
                        name: "xiaomi",
                        value: "1999"
                    },
                    {
                        name: "苹果",
                        value: "5999"
                    },
                    {
                        name: "华为",
                        value: "6399"
                    },
                    {
                        name: "vivo",
                        value: "2399"
                    },
                    {
                        name: "oppo",
                        value: "3599"
                    },
                    {
                        name: "三星",
                        value: "8999"
                    },
                ],
                // 柱状图
                userData: [
                    {
                        date: "周一",
                        new: 5,
                        active: 200
                    },
                    {
                        date: "周二",
                        new: 10,
                        active: 300
                    },
                    {
                        date: "周三",
                        new: 14,
                        active: 5500
                    },
                    {
                        date: "周四",
                        new: 60,
                        active: 700
                    },
                    {
                        date: "周五",
                        new: 23,
                        active: 678
                    },
                    {
                        date: "周六",
                        new: 89,
                        active: 999
                    },
                    {
                        date: "周日",
                        new: 25,
                        active: 589
                    },
                ],
                // 折线图
                orderData: {
                    date: ["20220928", "20220929", "20220930", "20221001", "20221002", "20221003", "20221004"],
                    data: list
                },
                tableData: [
                    {
                        name: "oppo", todayBuy: 100, monthBuy: 300, totalBuy: 800
                    },
                    {
                        name: " vivo", todayBuy: 100, monthBuy: 300, totalBuy: 800
                    },
                    {
                        name: "小米", todayBuy: 100, monthBuy: 300, totalBuy: 800
                    },
                    {
                        name: "苹果", todayBuy: 100, monthBuy: 300, totalBuy: 800
                    },
                    {
                        name: "三星", todayBuy: 100, monthBuy: 300, totalBuy: 800
                    },
                    {
                        name: "魅族", todayBuy: 100, monthBuy: 300, totalBuy: 800
                    },
                ],
            }
        }
    },
    getHomeMenu: () => {
        return {
            code: 200,
            data: {
                menu: [
                    {
                        path: '/',
                        name: 'home',
                        label: '首页',
                        icon: 's-home',
                        url: 'Home/Home '
                    },
                    {
                        path: '/mall',
                        name: 'mall',
                        label: '商品管理',
                        icon: 'video-play',
                        url: " MallManage/MallManage"
                    },
                    {

                        path: '/user',
                        name: 'user',
                        label: '用户管理',
                        icon: 'user',
                        url: 'UserManage/UserManage '
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
                                url: 'other/PageOne '
                            },
                            {
                                path: "/page2",
                                name: 'page2 ',
                                label: '页面2',
                                icon: 'setting',
                                url: 'other/PageTwo'
                            }
                        ]
                    }

                ]
            }
        }
    }
}