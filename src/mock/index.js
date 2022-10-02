/*
 * @Author: Topskys
 * @Date: 2022-09-28 09:36:11
 * @LastEditTime: 2022-09-30 15:22:55
 */
import Mock from 'mockjs'
import home from './home'
import user from './user'
import permission from './permission'

Mock.mock('/home', home.getStatisticalData)
Mock.mock(/user\/add/, 'post', user.createUser)
Mock.mock(/user\/edit/, 'post', user.updateUser)
Mock.mock(/\/user\/getUser/, 'get', user.getUserList)
Mock.mock(/\/user\/del/, 'get', user.deleteUser)

Mock.mock('/permission/menu',"post", permission.getMenu)
