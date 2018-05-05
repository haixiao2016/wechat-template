import { InfiniteScroll } from '../../template/index.js'
Page({
  data: {
    end:false,
    animationData:{},
    borderHeight: 400,
    loopData:[]
  },
  onLoad(){
    const self = this
    // 获取用户可视区域的高度，减去底部tab栏的高度
    wx.getSystemInfo({
      success: function(res) {
        wx.createSelectorQuery().select('#tabBar').boundingClientRect(function (rect) {
          res.windowHeight = res.windowHeight - rect.height
          self.setData({
            borderHeight: res.windowHeight
          })
        }).exec()
      },
    })
    // 加载首页数据
    InfiniteScroll({
      name: 'getData',
      msg: '玩命加载中...',
      doneMsg: '我是有底线的',
      spinnerType: 'snake'
    })
    this.loadMore('first')
  },
  getData(done) {
    let loopData = this.data.loopData
    let last = loopData[loopData.length - 1] || 0
    setTimeout(() => {
      for (let i = 1; i <= 10; i++) {
        loopData.push(last + i)
      }
      this.setData({
        loopData: loopData
      })
      /**
       * 将第一次加载的状态关闭
       * 重置到正常加载逻辑，防止手机不能滚动屏幕
       * this.recory()
       */
      this.recory()

      if (loopData[loopData.length - 1] < 80) {
        done()
      } else {
        // 已经加载到底部~
        done(true)
        // wx.navigateTo({
        //   url: '/pages/notLogin/notLogin'
        // })
      }
    }, 1000)
  },
  lower(){
    // 防止重复加载数据
    this.loadMore()
  },
  showImg(){
    this.setData({
      end:!this.data.end
    })
    let animation = wx.createAnimation({
      duration:200,
      timingFunction:'linear'
    })
    this.animation = animation
    animation.scale(0.6).step()
    animation.scale(1).step()
    this.setData({
      animationData: animation.export()
    })
  }
})