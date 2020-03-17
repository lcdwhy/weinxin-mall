import {request} from "../../request/index.js"
const WXAPI = require('apifm-wxapi')
WXAPI.init('luochaodong')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperList:{},
    // 导航数据
    catesList:[],
    //楼层数据
    flootList:[],
  },

  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    // });

    //获取轮播图数据
    this.getSwiperList()

    //获取导航数据
    this.getCatesList()

    //获取楼层数据
    this.getFlootList()
  },
  //获取轮播图数据方法
  async getSwiperList(){
   const result = await request({
     url: '/home/swiperdata'
    })
    let arr = result.data.message

    // 后台返回的navigator_url不符合，中间自己做转换 把mian换成index
    arr.forEach(v=>v.navigator_url=v.navigator_url.substr(0,20)+'index'+v.navigator_url.substr(24,))
    
    this.setData({
            swiperList:arr
    })
      
    
    // const result = await WXAPI.banners()
    //   this.setData({
    //     swiperList:result.data
    //   })
    
  },

  //获取导航数据方法
  async getCatesList(){
    const result = await request({
      url:"/home/catitems"
    })
    
      this.setData({
        catesList:result.data.message
      })
    
  },

  //获取楼层数据方法
  async getFlootList(){
    const result = await request({
      url:"/home/floordata"
    })
    const arr = result.data.message
    // arr.forEach(v=>v.navigator_url=v.navigator_url.substr(0,16)+'/index'+v.navigator_url.substr(16,))
  
      for(let x in arr){
        for(let y in arr[x].product_list){
          arr[x].product_list[y].navigator_url=arr[x].product_list[y].navigator_url.substr(0,17)+'/index'+arr[x].product_list[y].navigator_url.substr(17,)
        }
      }
  
    this.setData({
        flootList:arr
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
  onPageScroll:function(){

  },

  onTavItemTap:function(item){
    
  },
 


  //下拉到底加载新的内容
  // onReachBottom:function(){
  //   wx.showLoading({
  //     title: '加载中',
  //   })   
  //   this.getFlootList1()
  // },

  // getFlootList1() {
  //   request({
  //     url: "https://api.zbztb.cn/api/public/v1/home/floordata"
  //   }).then((result) => {
  //     this.setData({
  //       flootList: this.data.flootList.concat(result.data.message)
  //     })
  //   })
  //   wx.hideLoading()
  // }
})