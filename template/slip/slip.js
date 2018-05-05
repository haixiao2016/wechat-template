import Component from '../component'

function slip(params = {}) {
  const DEFAULT = {
    list_msg: [],
    btnWidth:90,
    btns: [
      {
        className: '',
        btnName: '删除'
      }
    ]
  }
  const data = Object.assign({}, DEFAULT, params)
  // 按照设计尺寸重新计算按钮的宽度
    let width = wx.getSystemInfoSync().windowWidth
    let scale = width * 2 / 750 //获取缩放比例 按 iPhone6 设计尺寸缩放
    data.btnWidth = Math.floor(data.btnWidth * scale)
  const component = new Component({
    scope: "temp.slip",
    data: data,
    methods: {
      t_start(e){
        if (e.touches.length == 1) {
          this.setData({
            startX: e.touches[0].clientX
          })
        }
        this.initMsg()
      },
      t_move(e){
        let moveX = e.touches[0].clientX
        let moveStyle = ''
        // 记录此时的移动距离
        let move = this.data.startX - moveX
        if (move == 0 || move < 0) { //没有移动有效距离
          moveStyle = 'right:0px'
        } else {
          let validMove = move > this.data.btnWidth ? this.data.btnWidth : move
          moveStyle = `right:${validMove}px`
        }
        let index = e.currentTarget.id
        this.data.list_msg[index].moveStyle = moveStyle
        this.setData({
          list_msg: this.data.list_msg
        })
      },
      t_end(e){
        // touch结束事件 获取相对位移，判定是否显示 删除按钮
        if (e.changedTouches.length == 1) {
          let moveX = e.changedTouches[0].clientX
          let moveStyle = ''
          let move = this.data.startX - moveX
          //判断位移是否大于按钮的一半
          if (move * 2 > this.data.btnWidth) {
            moveStyle = `right:${this.data.btnWidth}px`
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
      initMsg() {
        //初始化开始位置，同时保证开始的时候其他页面数据是不显示删除的
        this.data.list_msg.map((item) => {
          item.moveStyle = 'right:0px'
        })
        this.setData({
          list_msg: this.data.list_msg
        })
      },
      delEnter(e) {
        console.log(e)
      },
      setDelEnter() {
        this.page.setDelEnter = this.delEnter
      }
    }
  })
  component.setDelEnter()
}
export default slip