import { dialog } from '../../template/index.js'
Page({
  onLoad: function (options) {

  },
  open(){
    dialog({
      header: '确定要完成收货吗',
      content: '收货后钱将立即打款到对方账户',
      btns: ['再想想吧', '确认收货'],
      background:"rgba(125,125,125,0.8)",
      btnColor:"red",
      cancel() {
        console.log('点击取消')
      },
      ensure() {
        console.log('点击确认')
      }
    })
  }
})