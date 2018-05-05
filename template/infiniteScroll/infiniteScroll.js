import Component from '../component'

function infiniteScroll(params = {}) {
  const DEFAULT = {
    name: '',
    msg: '加载中...',
    doneMsg: '我是有底线的',
    spinnerType: 'fading-circle',
    className: '',
    scrollFirst:false
  }
  const data = Object.assign({}, DEFAULT, params)
  const component = new Component({
    scope: `temp.infiniteScroll`,
    data: data,
    methods: {
      done(params) {
        if (!params) {
          this.setData({
            [`${this.params.scope}.infiniteScrollShow`]: false
          })
        } else {
          this.setData({
            [`${this.params.scope}.doneEnd`]: true,
            [`${this.params.scope}.spinnerType`]: false,
            [`${this.params.scope}.msg`]: data.doneMsg
          })
        }
      },
      loadMore(first,...params) {
        // 判断是不是第一次加载，如果是的话，加载动画垂直居中显示
        if(first === 'first'){
          this.setData({
            [`${this.params.scope}.scrollFirst`]: true
          })
        }else{
          this.setData({
            [`${this.params.scope}.scrollFirst`]: false
          })
        }
        if (!this.page[data.name] || this.page.data.temp.infiniteScroll.doneEnd) {
          return
        }
        this.setData({
          [`${this.params.scope}.infiniteScrollShow`]: true
        })
        this.page[data.name](this.done, ...params)
      },
      recory(){
        this.setData({
          [`${this.params.scope}.scrollFirst`]: false
        })
      },
      setLoadMore() {
        this.page.loadMore = this.loadMore
      },
      setRecory() {
        this.page.recory = this.recory
      }
    }
  })
  component.setLoadMore()
  component.setRecory()
}

export default infiniteScroll