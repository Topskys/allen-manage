/*
 * @Author: Topskys
 * @Date: 2022-09-27 16:06:43
 * @LastEditTime: 2022-09-27 16:19:44
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // element-ui 按需引入安装插件的配置
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
