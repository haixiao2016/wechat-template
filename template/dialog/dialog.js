import Component from '../component'
function dialog(params = {}) {
  const DEFAULT = {
    header: '',
    content: '',
    className: '',
    btns: []
  }
  const data = Object.assign({}, DEFAULT, params)
  const component = new Component({
    scope: 'temp.dialog',
    data: data,
    methods: {
      show() {
        this.page.cancel = this.cancel
        this.page.ensure = this.ensure
        let animation = wx.createAnimation({
          duration: 200
        })
        let animationBg = wx.createAnimation({
          duration: 200
        })
          this.setData({
            [`${this.params.scope}.show`]: true,
            [`${this.params.scope}.animation`]: animation.scale(1).step().export(),
            [`${this.params.scope}.animationBg`]: animationBg.opacity(1).step().export()
          })
      },
      hide(cb) {
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
        this.timer = setTimeout(() => {
          this.setData({
            [`${this.params.scope}.show`]: false
          })
          typeof cb === `function` && cb()
        }, 200)
      },
      cancel() {
        this.hide(data.cancel)
      },
      ensure() {
        this.hide(data.ensure)
      },
      close() {
        clearTimeout(this.timer)
        this.hide()
      },
      setClose() {
        this.page.close = this.close
      }
    }
  })
  component.show()
  component.setClose()
  return component
}
export default dialog