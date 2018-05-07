import { InfiniteScroll } from '../../template/index.js'
Page({
  data: {
    end:false,
    borderHeight: 400,
    loopData:[],
    canLoad: true,
  },
  onLoad(){
    const self = this
    // 获取用户可视区域的高度
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          borderHeight: res.windowHeight
        })
      },
    })
    // 加载首页数据
    InfiniteScroll({
      name: 'getData',
      msg: '玩命加载中',
      doneMsg: '我是有底线的',
      spinnerType: 'snake'
    })
    this.loadMore('first') // 'first' ==> 全屏状态显示加载动画，可不填
    /**
     * 第一次加载数据时，全屏显示加载样式，默认为白色背景 不传入时，默认显示加载样式
     * 依靠 position:absolute 实现，方便局部调用加载组件
     * 
     */
  },
  getData(done) {
    // 防止重复加载数据
    this.setData({
      canLoad:false
    })
    let loopData = this.data.loopData
    let last = loopData[loopData.length - 1] || 0
    setTimeout(() => {
      for (let i = 1; i <= 10; i++) {
        loopData.push(last + i)
      }
      this.setData({
        loopData: loopData,
        canLoad: true
      })
      /**
       * 将第一次加载的状态关闭
       * 重置到正常加载逻辑，防止手机不能滚动屏幕
       * this.recory()
       */
      this.recory()

      if (loopData[loopData.length - 1] < 20) {
        done()
      } else {
        // 已经加载到底部~
        done(true)
        this.setData({
          canLoad: false
        })
      }
    }, 1000)
  },
  lower(){
    // 防止重复加载数据
    if (this.data.canLoad){
      this.loadMore()
    }
  }
})