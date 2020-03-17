import { request } from "../../request/index.js"
const WXAPI = require('apifm-wxapi')
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左边菜单数据列表
    leftMenuList:[],
    // 右边商品数据列表
    rightContent:[],
    currentIndex:0,
    scrollTop: 0
  },
  Cates:[],


  onLoad: function (options) {
      
    //解决缓存问题

    const Cates = wx.getStorageSync("cates")

    if(!Cates){
      //第一次加载 发送请求数据
      this.getLeft()
    }else{
      if(Date.now()-Cates.time > 10000){
        // 超过规定时间，重新发送请求
        this.getLeft()
        
      }else{
        // 使用旧数据
        this.Cates = Cates.data
        let leftArr = this.Cates.map(v => v.cat_name)
        let rightArr = this.Cates[0].children
        this.setData({
          leftMenuList: leftArr,
          rightContent: rightArr
        })
      }
    }
    
    
  },

  async getLeft(){
    const result = await request({
      url:"/categories"
    })
    this.Cates = result.data.message

    // 缓存数据
    wx.setStorageSync("cates", {
      time: Date.now(),
      data: this.Cates   
    })

    let leftArr = this.Cates.map( v => v.cat_name)
    let rightArr = this.Cates[0].children
      
    this.setData({
      leftMenuList:leftArr,
      rightContent:rightArr
    })
    
  },
  







  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleItemTap(e) {
    console.log(e)
    const { index } = e.currentTarget.dataset
    let rightArr = this.Cates[index].children
    this.setData({
      currentIndex:index,
      rightContent: rightArr,
      scrollTop:0
    })
  }
})