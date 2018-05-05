import Component from '../component'

function login(params = {}){
  const DEFAULT = {
    name: '',
    imgUrl:'',
    appName:'',
    appDesc:'',
    info:['获得您的公开信息（昵称，头像等）'],
    btns:[
      {
        className:'',
        btnName:'取消'
      },
      {
        className: '',
        btnName: '点击授权'
      }
    ]
  }
  const data = Object.assign({}, DEFAULT, params)
  const component = new Component({
    scope: `temp.login`,
    data: data,
    methods:{
      cancel(cb){
        typeof data.cancel === `function` && data.cancel()
      },
      ensure(e){
        console.log(e)
        typeof data.ensure === `function` && data.ensure(e)
      },
      setCancel() {
        this.page.setCancel = this.cancel
      },
      setEnsure() {
        this.page.setEnsure = this.ensure
      }
    }
  })
  component.setCancel()
  component.setEnsure()
}
export default login