import { login } from '../../template/index.js'
Page({
  onLoad: function (options) {
    //配置授权信息
    login({
      appName: '全球好恶意见啊大家爱看的',
      appDesc: '全球好恶意见啊大家爱看的',
      cancel(){
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              console.log(res)
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
  }
})