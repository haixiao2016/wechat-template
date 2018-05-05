import Component from '../component'
function toast(params={}){
  const DEFAULT = {
    toastShow:false,
    time: 2000,
    text: '这是文本内容'
  }
  const data = Object.assign({}, DEFAULT, params)
  const component = new Component({
    scope: 'temp.toast',
    data: data,
    methods: {
      show(){
        let animation = wx.createAnimation({
          duration: 200
        })
        let animationBg = wx.createAnimation({
          duration: 200
        })
        this.setData({
          [`${this.params.scope}.toastShow`]: true,
          [`${this.params.scope}.animation`]: animation.scale(1).step().export(),
          [`${this.params.scope}.animationBg`]: animationBg.opacity(1).step().export()
        })
        if (data.time === 0){
          return
        }
        setTimeout(()=>{
          this.hide(data.closed)
        }, data.time)
      },
      hide(cb){
        let animation = wx.createAnimation({
          duration: 200
        })
        let animationBg = wx.createAnimation({
          duration: 200
        })
        this.setData({
          [`${this.params.scope}.animation`]: animation.scale(0).step().export(),
          [`${this.params.scope}.animationBg`]: animationBg.opacity(0).step().export()
        })
        setTimeout(() => {
          this.setData({
            [`${this.params.scope}.toastShow`]: false
          })
          typeof cb === `function` && cb()
        }, 200)
      }
    }
  })
  if (data.text || data.icon) {
    component.show()
  }
}
export default toast