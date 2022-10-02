<!--
 * @Author: Topskys
 * @Date: 2022-09-27 16:06:56
 * @LastEditTime: 2022-10-02 15:47:19
-->
# allen-manage
![Image 后台通用管理系统](https://github.com/Topskys/allen-manage/blob/main/src/assets/images/R%60UVF_B6T%5DL~Q3%25%5DN43BLRB.png)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### vue-router
```
cnpm i vue-router@3.2.0
```



### less
```
npm i less less-loader@5.0.0
```


### $nextTick()
作用：vue中的$nextTick主要用于处理数据动态变化后，DON还未及时更新的问题，用nextTick就可以获取数据更新后最新DON的变化。
场景一：点击获取元素的宽度
场景二：点击按钮原本以v-show=false隐藏起来的输入框，并获取焦点
场景三：增加和修改


### axios Features
Make XMLHttpRequests from the browser
Make http requests from node.js
Supports the Promise API
Intercept request and response
Transform request and response data
Cancel requests
Automatic transforms for JSON data
Client side support for protecting against XSRF


### echarts@5.1.2
```
npm i echarts@5.1.2
```

### js-cookie
```
npm i js-cookie
```

### 配置启动项目时，打开浏览器
在/src/package.json配置：
```
"scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build"
  },
```

### src根目录配置别名@
在src根目录下新建jsconfig.json编辑：
```
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    },
    "exclude":["node_modules","dist"], // 在这些文件夹下不可用别名
  }
}
```


### 暂时关闭eslint效验功能
由于eslint效验比较严格，容易阻塞项目启动热更新，可以先暂时关闭。在src根目录下新建vue.config.js编辑：
```
module.exports = {
    // 关闭eslint
    lintOnSave:false,
}
```
