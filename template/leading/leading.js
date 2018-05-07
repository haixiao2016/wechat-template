import Component from '../component'
function leading(params={}){
  const DEFAULT = {
    text: '玩命加载中',
    borderBg: '#fff',
    centerBg:'rgba(102,102,102,0.8)',
    image:'',
    textColor:'#fff',
    iconColor:'#fff',
    leadingShow:true,
    inlineBlock:false
  }
  const data = Object.assign({}, DEFAULT, params)
  if (data.inlineBlock){
    // 水平布局显示样式
    data.centerBg = ''
    if (data.iconColor === '#fff'){
      data.iconColor = '#000'
    }
    if (data.textColor === '#fff'){
      data.textColor = "#000"
    }
  }
  const component = new Component({
    scope: `temp.leading`,
    data:data,
    methods:{
      show(){
        this.setData({
          [`${this.params.scope}.leadingShow`]: show
        })
      },
      hide(){
        let animation = wx.createAnimation({
          duration: 200,
          timingFunction: 'linear',
        })
        animation.opacity(0).step()
        this.setData({
          [`${this.params.scope}.animation`]: animation.export(),
        })
        setTimeout(()=>{
          this.setData({
            [`${this.params.scope}.leadingShow`]: false
          })
        },200)
      },
      setLeadingShow(){
        this.page.leadingShow = this.show
      },
      setLeadingHide(){
        this.page.leadingHide = this.hide
      }
    }
  })
  component.setLeadingShow()
  component.setLeadingHide()
}
export default leading