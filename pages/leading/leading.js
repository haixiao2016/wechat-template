import { leading } from '../../template/index.js'
Page({
  data: {
  
  },
  onLoad: function (options) {
    leading({})
    setTimeout(()=>{
      this.leadingHide()
    },2000)
  },
  onShow: function () {
  
  },
  showLeading(){
    leading({})
    setTimeout(() => {
      this.leadingHide()
    }, 2000)
  }
})