/*
 * @Author: Topskys
 * @Date: 2022-09-28 09:36:11
 * @LastEditTime: 2022-09-28 10:10:04
 */
import Mock from 'mockjs'
import home from './home'

Mock.mock('/home/menu', home.getHomeMenu)
Mock.mock('/home', home.getStatisticalData)