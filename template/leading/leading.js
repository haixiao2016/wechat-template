import Component from '../component'
function leading(params={}){
  const DEFAULT = {
    text: '玩命加载中',
    borderBg: '#fff',
    centerBg:'rgba(102,102,102,0.8)',
    image:'',
    textColor:'#fff',
    iconColor:'#fff',
    leadingShow:true
  }
  const data = Object.assign({}, DEFAULT, params)
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