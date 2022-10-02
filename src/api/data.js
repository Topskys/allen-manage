/*
 * @Author: Topskys
 * @Date: 2022-09-27 23:01:44
 * @LastEditTime: 2022-09-30 15:23:18
 */
import axios from "./axios";

export const getMenu = (params) => {
    return axios.request({
        url: "/permission/menu",
        method: "post",
        data: params
    })
}


export const getHomeData = () => {
    return axios.request({
        url: "/home",
        method: "get",
    })
}


export const getUser = (params) => {
    return axios.request({
        url: "/user/getUser",
        method: "get",
        params
    })
}