
import {request} from '../../request/index.js'
Page({
  data: {
    orders:[],
    tabs:[
      {
        id:0,
        value:'全部',
        isActive:true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      }
    ]
  },
  onShow(){
    // 判断是否有token 如果没有token则跳转到授权页面
    // const token = wx.getStorageSync('token')
    // if(!token){
    //   wx.navigateTo({
    //     url: '/pages/auth/index',
    //   })
      
    // }

    // 获取微信小程序的页面栈
    let pages =  getCurrentPages()
    // 取得当前页面
    let currentPage = pages[pages.length-1]
    // 获取当前页面上的URL参数 type
    const {type} = currentPage.options
    this.changeItemIndex(type-1)
    this.getOrders(type)
    
  },
  // 获取订单信息
  async getOrders(type){
    const token = wx.getStorageSync('token')
    const header ={Authorization:token}
    console.log(token)
    const res = await request({url:'/my/orders/all',header,data:{type}})
    const {orders} = res
    
    this.setData({
      // orders:orders.map(v=>({...v,create_time_cn:(new DataCue(v.create_time*1000).toLocalString())}))
      orders:orders
    })
  },
  // 根据index来改变bar选项
  changeItemIndex(index){
    let {tabs} = this.data
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  },
  // 点击bars改变选项
  itemClick(e){
    // 获取index改变bars选中状态
    const {index} = e.detail
    this.changeItemIndex(index)
    // 点击其它bar选项时，需要重新发送请求
    this.getOrders(index+1)
  }

})