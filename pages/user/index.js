// pages/user/index.js
Page({
  data: {
    // 用户的个人信息
    userinfo:{},
    // 收藏商品的数量
    collectNums:0
  },
  onShow:function(){
    // 获取缓存中的用户信息
    const userinfo = wx.getStorageSync('userinfo')
    // 获取缓存中收藏商品的信息,得到收藏商品的数量
    const collect = wx.getStorageSync('collect')||[];
    const collectNums = collect.length
    // 把用户信息存入data中
    this.setData({
      userinfo,
      collectNums
    })
  }
  
})