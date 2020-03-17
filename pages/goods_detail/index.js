import { request } from "../../request/index.js"
import {showToast} from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollect:false,
    goods_list:{}
  },
  Goodsinfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let Pages =  getCurrentPages();
    let currentPage = Pages[Pages.length-1]
    let options = currentPage.options

    const {goods_id} = options
    this.getGoodsDetail(goods_id)

    
  },

  // 获取商品详情数据方法
  async getGoodsDetail(goods_id){
    const res = await request({
      url:"/goods/detail",
      data:{
        goods_id
      }
    })
    const arr = res.data.message
    this.Goodsinfo = arr
    let collect = wx.getStorageSync('collect')||[];
    let isCollect = collect.some(v=>v.goods_id===this.Goodsinfo.goods_id)
    this.setData({
      goods_list:{
        goods_price:arr.goods_price,
        goods_name:arr.goods_name,
        goods_introduce:arr.goods_introduce,
        pics:arr.pics
        },
        isCollect

    })
  },

  // 轮播图图片点击方法预览
  headleviewClick(e){
    
    const {index} = e.currentTarget.dataset
    const urls =this.data.goods_list.pics.map(v =>v.pics_mid_url)

    wx.previewImage({
      current: urls[index],
      urls:urls
    });
  },

  // 点击购物车 加入购物车
  headleCartAdd(){
    let cart = wx.getStorageSync('cart')||[];
    let index = cart.findIndex(v =>v.goods_id===this.Goodsinfo.goods_id)
    if(index===-1){
        this.Goodsinfo.num=1
        this.Goodsinfo.checked=true
        cart.push(this.Goodsinfo)
    }else{
        cart[index].num++
    }
    wx.setStorageSync('cart',cart)

    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
      
    });
  },
  // 点击收藏图标
  headleCollect(){
    let collect = wx.getStorageSync('collect')||[]
    let index = collect.findIndex(v=>v.goods_id===this.Goodsinfo.goods_id)
    // 判断缓存中是否有收藏该商品
    if(index!==-1){
      // 若已经收藏过，则删掉该商品
      collect.splice(index,1)
      showToast({title:'取消成功'})
    }else{
      // 若没有收藏，则把该商品添加进数组
      collect.push(this.Goodsinfo)
      // 显示提示信息
      showToast({title:'收藏成功'})
    }

    // 把得到的新的收藏信息重新放入缓存
    wx.setStorageSync('collect', collect);
    // 修改data中的属性 isCollect
    this.setData({
      isCollect:!this.data.isCollect
    })
    

  }
})