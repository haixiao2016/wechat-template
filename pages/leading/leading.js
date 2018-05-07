import { leading } from '../../template/index.js'
Page({
  data: {
  
  },
  onLoad: function (options) {
    leading({
    })
    setTimeout(()=>{
      this.leadingHide()
    },2000)
  },
  showLeading(){
    leading({
      position:"absolute",
      inlineBlock:true
    })
    setTimeout(() => {
      this.leadingHide()
    }, 2000)
  }
})