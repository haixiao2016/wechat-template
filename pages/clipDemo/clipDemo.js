import { actionSheet } from '../../template/index.js'
Page({
  data: {
    list_msg: [{
      "moveStyle": "",
      "text": "内容我会被删除吗"
    }
    ]
  },
  onLoad: function (options) {
    actionSheet({
      header: '你好，请选择样式',
      hederColor: '#e5e5e5',
      itemColor: '',
      itemList: [{
        imgUrl: '/images/1.png',
        text: 'A'
      }, {
        text: 'B'
      }, {
        text: 'C'
      },]
    })
  }
})