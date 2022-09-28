/*
 * @Author: Topskys
 * @Date: 2022-09-27 19:46:56
 * @LastEditTime: 2022-09-27 19:54:52
 */
export default {
    state: {
        isCollapse: false,
    },
    mutations: {
        updateCollapse(state) {
            state.isCollapse = !state.isCollapse
        }
    }
}