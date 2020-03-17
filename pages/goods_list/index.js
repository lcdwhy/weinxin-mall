// pages/goods_list/index.js

import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList:[]
  },
  Query:{
    query:"",
    cid: 0,
    pagenum: 1,
    pagesize: 10
  },
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Query.cid = options.cid||""
    this.Query.query = options.query||""
    this.getGoodsList()
  },


  async getGoodsList(){
   const result=await request({
      url:"/goods/search",
      data:this.Query
    })
    const total = result.data.message.total
    this.totalPages = Math.ceil(total/this.Query.pagesize)
    
    this.setData({
      goodsList: [...this.data.goodsList,...result.data.message.goods]
    })


    wx.stopPullDownRefresh()
  },

  // 页面触底加载新数据
  onReachBottom(){
    if(this.Query.pagenum < this.totalPages){
      this.Query.pagenum++
      this.getGoodsList()

    }else{
      wx:wx.showToast({
        title: '没有更多内容了！',
      })
    }
  },


  // 上拉刷新页面
  onPullDownRefresh: function () {
    this.setData({
      goodsList:[]
    })
    this.Query.pagenum=1
    this.getGoodsList()
  },


  //点击【综合，销量，价格】列表
  itemClick(e){
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  }
})