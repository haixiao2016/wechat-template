import { toast } from '../../template/index.js'
Page({
  onLoad: function (options) {
  },
  btnClicked(){
    toast({
      text: '呵呵哒',
      icon:'success',
      closed: () => {
        console.log("已经消失了")
      }
    })
  },
  btnClicked2(){
    toast({
      text: '我一秒钟就消失了',
      background: 'rgba(125,125,125,0.8)',
      time:'1000',
      icon: 'warning',
      closed: () => {
        console.log("已经消失了")
      }
    })
  },
  btnClicked3() {
    toast({
      text: '呵呵哒',
      icon: 'error',
      closed: () => {
        console.log("已经消失了")
      }
    })
  }
})