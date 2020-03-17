// pages/collect/index.js
Page({
  data: {
    collect:[],
    tabs:[
      {
        id:0,
        value:'商品收藏',
        isActive:true
      },
      {
        id: 1,
        value: '品牌收藏',
        isActive: false
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        value: '游览足迹',
        isActive: false
      }
    ]
  },
  onShow(){
    const collect = wx.getStorageSync('collect')||[];
    this.setData({
      collect
    })
  },
  // 点击bars改变选项
  itemClick(e){
    // 获取index改变bars选中状态
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  }

})