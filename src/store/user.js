/*
 * @Author: Topskys
 * @Date: 2022-09-30 14:58:06
 * @LastEditTime: 2022-09-30 15:03:08
 */

import Cookie from 'js-cookie'
export default {
    state: {
        token: "",
    },
    mutations: {
        setToken(state, val) {
            state.token = val;
            Cookie.set("token", val)
        },
        clearToken(state) {
            state.token = ""
            Cookie.remove("token")
        },
        getToken(state) {
            state.token = state.token||Cookie.get("token")
        }
    }
}