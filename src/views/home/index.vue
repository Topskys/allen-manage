<!--
 * @Author: Topskys
 * @Date: 2022-09-27 17:47:43
 * @LastEditTime: 2022-09-28 14:46:24
-->
<template>
  <el-row class="Home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="home__user">
          <img :src="userAvatar" alt="">
          <div class="user__info">
            <p class="user__name">Admin</p>
            <p class="user__access">超级管理员</p>
          </div>
        </div>
        <div class="login__info">
          <p>上次登录时间：<span>2022-9-27</span></p>
          <p>上次登录地点：<span>福州</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px;">
        <el-table :data="tableData">
          <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card>
        <div class="count">
          <el-card shadow="hover" v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
            <div class="icon" :class="`el-icon-${item.icon}`" :style="{backgroundColor:item.color}"></div>
            <!-- <i :class="`el-icon-${item.icon}`"></i> -->
            <div class="detail">
              <p class="num">￥{{item.value}}</p>
              <p class="txt">￥{{item.name}}</p>
            </div>
          </el-card>
        </div>
      </el-card>
      <el-card style="height:260px; margin-top: 20px;">
        <!-- <div style="height:260px;" ref="echarts"></div> -->
        <Echart :chartData="echartData.order" style="height:240px;"></Echart>
      </el-card>
      <div class="graph">
        <el-card style="height:260px;">
          <!-- <div style="height:260px;" ref="userEcharts"></div> -->
          <Echart :chartData="echartData.user" style="height:240px;"></Echart>
        </el-card>
        <el-card style="height:260px;">
          <!-- <div style="height:260px;" ref="videoEcharts"></div> -->
          <Echart :chartData="echartData.video" :isAxisChart="false" style="height:240px;"></Echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getHomeData } from '../../api/data.js'
import * as echarts from 'echarts'
import Echart from '../../components/Echart'

export default {
  name: "Home",
  data() {
    return {
      userAvatar: require("../../assets/frank-girl.jpg"),
      tableData: [],
      tableLabel: {
        name: "课程",
        totalBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今目支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单", value: 210,
          icon: "star-on", color: "#ffb98e"
        },
        {
          name: "今日未支付订单", value: 1234,
          icon: "s-goods", color: "#5ab1ef"
        },
        {
          name: "本月支付订单", value: 1234,
          icon: "success", color: "#2ec7c9"
        },
        {
          name: "本月收藏订单", value: 210,
          icon: "star-on", color: "#ffb98e"
        },
        {
          name: "本月未支付订单", value: 1234,
          icon: "s-goods", color: "#5ab1ef"
        }
      ],
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      },
    }
  },
  components: {
    Echart,
  },
  mounted() {

    getHomeData().then(res => {
      const { code, data } = res.data
      if (code === 200) {
        this.tableData = data.tableData
        const [order, series, xData] = [data.orderData, [], data.orderData.date]
        Object.keys(order.data[0]).forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })

        // 独立Echart组件之后
        this.echartData.order.xData = xData
        this.echartData.order.series = series

        this.echartData.user.xData = data.userData.map(item => item.date)
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: data.userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: "活跃用户",
            data: data.userData.map(item => item.active),
            type: 'bar'
          }
        ]
        this.echartData.video.series = [
          {
            data: data.videoData,
            type: 'pie'
          }
        ]

        // 独立Echart组件之前
        // const keyArr = Object.keys(order.data[0]).forEach(key => {}
        // const option = {
        //   xAxis: {
        //     data: xData
        //   },
        //   yAxis: {},
        //   legend: {
        //     data: keyArr
        //   },
        //   series
        // }
        // const E = echarts.init(this.$refs.echarts)
        // E.setOption(option)
        // 用户图
        // const userOption = {
        //   legend: {
        //     //图例文字颜色
        //     textStyle: {
        //       color: "#333"
        //     },
        //   },
        //   grid: {
        //     left: "20%",
        //   },
        //   //提示框
        //   tooltip: {
        //     trigger: "axis ",
        //   },
        //   xAxis: {
        //     type: "category",// 类目轴
        //     data: data.userData.map(item => item.date),
        //     axisLine: {
        //       lineStyle: {
        //         color: "#17b3a3",
        //       },
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       color: "#333",
        //     },
        //   },
        //   yAxis: [
        //     {
        //       type: "value",
        //       axisLine: {
        //         lineStyle: {
        //           color: "#17b3a3",
        //         },
        //       },
        //     }
        //   ],
        //   color: ["#2ec7c9", "#b6a2de"],
        //   series: [
        //     {
        //       name: "新增用户",
        //       data: data.userData.map(item => item.new),
        //       type: 'bar'
        //     },
        //     {
        //       name: "活跃用户",
        //       data: data.userData.map(item => item.active),
        //       type: 'bar'
        //     }
        //   ],
        // }
        // const U = echarts.init(this.$refs.userEcharts)
        // U.setOption(userOption)
        // 饼图
        // const videoOption = {
        //   tooltip: {
        //     trigger: "item",
        //   },
        //   color: [
        //     "#Bf78f4",
        //     "#dd536b",
        //     "#9462e5",
        //     "#a6a6a6",
        //     "#e1bb22",
        //     "#39c362",
        //     "#3ed1cf"
        //   ],
        //   series: [
        //     {
        //       data: data.videoData,
        //       type: 'pie'
        //     }
        //   ],
        // }
        // const V = echarts.init(this.$refs.videoEcharts)
        // V.setOption(videoOption)
      }
    });
  }

}
</script>

<style lang="less" scoped>
.home__user {
  display: flex;
  align-items: center;
  padding: 0 0 20px 0;
  margin-bottom: 20px;
  color: #999;
  border-bottom: 1px solid #999;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
  }

  .user__info {
    padding: 20px 0;

    .user__name {
      color: #000;
      font-size: 30px;
    }

    .user__access {
      font-size: 16px;
    }
  }


}

.login__info {
  p {
    color: #999;
    padding: 5px 0;

    span {
      margin-left: 40px;
    }
  }
}

.count {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-self: center;

  .icon {
    width: 25%;
    max-width: 100px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .detail {
    flex: 1;
    // margin-left: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    .num {
      font-size: 30px;
      margin-bottom: 5px;
    }

    .txt {
      font-size: 14px;
      text-align: center;
      color: #999;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>