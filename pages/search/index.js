// pages/search/index.js
import {request} from '../../request/index.js'
Page({
  data: {
    goods:[]
  },
  TimeId:-1,
  // 绑定输入框改变事件，获取输入框中的值
  headleInput(e){
    // 获取输入框的值
    const {value} = e.detail
    // 判断value的合法性，如果为空，则直接返回
    if(!value.trim()){
      return;
    }
    // q清除开启的定时器
    clearTimeout(this.TimeId)
    // 设置定时器
    this.TimeId = setTimeout(()=>{
      // 发起请求
      this.qsearch(value)
    },500)
        
  },
  // 在输入框输入内容时，向后台发送请求
  async qsearch(query){
    const res = await request({
      url:'/goods/qsearch',
      data:{query}
    })
    const goods = res.data.message
    this.setData({
      goods
    })
  }
  
  
})