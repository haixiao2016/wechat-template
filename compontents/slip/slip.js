Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    list_msg:{
      type:Array
    },
    delWidth:{
      type:Number,
      value:90
    }
  },
  data: {
    
  },
  methods: {
    getDelwidth() {
      let width = wx.getSystemInfoSync().windowWidth
      let scale = width * 2 / 750 //获取缩放比例 按 iPhone6 设计尺寸缩放
      this.data.delWidth = Math.floor(this.data.delWidth * scale)
      this.setData({
        delWidth: this.data.delWidth
      })
    },
    t_start(e) {
      // 记录手势开始时候的位置信息
      if (e.touches.length == 1) {
        this.setData({
          startX: e.touches[0].clientX
        })
      }
      this.initMsg()
    },
    initMsg() {
      //初始化开始位置，同时保证开始的时候其他页面数据是不显示删除的
      this.data.list_msg.map((item) => {
        item.moveStyle = 'right:0px'
      })
      this.setData({
        list_msg: this.data.list_msg
      })
      console.log(this.data.list_msg)
    },
    t_move(e) {
      let moveX = e.touches[0].clientX
      let moveStyle = ''
      // 记录此时的移动距离
      let move = this.data.startX - moveX
      if (move == 0 || move < 0) { //没有移动有效距离
        moveStyle = 'right:0px'
      } else {
        let validMove = move > this.data.delWidth ? this.data.delWidth : move
        moveStyle = `right:${validMove}px`
      }
      let index = e.currentTarget.id
      this.data.list_msg[index].moveStyle = moveStyle
      this.setData({
        list_msg: this.data.list_msg
      })
    },
    t_end(e) {
      // touch结束事件 获取相对位移，判定是否显示 删除按钮
      if (e.changedTouches.length == 1) {
        let moveX = e.changedTouches[0].clientX
        let moveStyle = ''
        let move = this.data.startX - moveX
        //判断位移是否大于按钮的一半
        if (move * 2 > this.data.delWidth) {
          moveStyle = `right:${this.data.delWidth}px`
        } else {
          moveStyle = `right:0px`
        }
        let index = e.currentTarget.id
        this.data.list_msg[index].moveStyle = moveStyle
        this.setData({
          list_msg: this.data.list_msg
        })
      }
    },
  }
})
