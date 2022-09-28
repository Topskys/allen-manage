/*
 * @Author: Topskys
 * @Date: 2022-09-27 23:01:44
 * @LastEditTime: 2022-09-28 10:09:24
 */
import axios from "./axios";

export const getHomeMenu = () => {
    return axios.request({
        url: "/home/menu",
        method: "get",
    })
}


export const getHomeData = () => {
    return axios.request({
        url: "/home",
        method: "get",
    })
}