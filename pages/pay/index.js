import {openSetting,getSetting,chooseAddress,showModal,showToast,requestPayment} from '../../utils/asyncWx.js'
import {request} from '../../request/index.js'
Page({
  data:{
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow:function(){
    // 获取缓存中的收货地址信息
      const address = wx.getStorageSync('address');
      // 获取缓存中的购物车信息
      let cart = wx.getStorageSync('cart')||[];
      // 将购物车选中的商品选出来，过滤
      cart = cart.filter(v=>v.checked)
      
      
      // 将在缓存中获得的地址信息存入data中
      this.setData({address})

      let allChecked=true
      
      // 选中商品的总金额
      let totalNum=0
      //选中商品的总数量
      let totalPrice=0
      cart.forEach(v => {
          totalNum+=v.num 
          totalPrice+=v.goods_price*v.num
      })
      this.setData({
        cart,
        totalNum,
        totalPrice,
        address
      })
  },
// 支付功能
  async headleOderPay(){
    try{
      //1. 获取token
    const token = wx.getStorageSync('token')
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return ;
    }
    console.log("授权完成")

    // 2.创建订单，把得到的token设置请求头参数，请求体参数
    const header ={Authorization:token}
    const order_price = this.data.totalPrice
    const consignee_addr = this.data.address.all	
    let goods = []
    const {cart} = this.data
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.goods_number,
      goods_price:v.goods_price
    }))
    const OderParams = {order_price,consignee_addr,goods}

    // 3.准备发送请求 ，目的是为了获得订单号
    const {order_number}= request({
      url:'/my/orders/create',
      data:OderParams,
      method:'POST',
      header
    })
    // 4.发起预支付 ，返回了订单号
    const {pay} = await request({
      url:'/my/orders/req_unifiedorder',
      method:"POST",
      header,
      data:{order_number}
    })
    // 5.发起微信支付
    const flag= resrequestPayment(pay)
    // 6.查看订单状态
    const paychecked = await request({
      url:'/my/orders/chkOrder',
      method:"POST",
      header,
      data:{order_number}
    })
    // 7.若支付成功，则提示”支付成功“
    await showToast({title: "支付成功"})
    // 8.删掉购物车中已经支付过的商品
    let newCart = wx.getStorageSync('cart')
    newCart = newCart.filter(v=>!v.checked)
    wx.setStorageSync('cart', newCart);
    // 9.支付成功，跳转到订单页面
    navigateTo({url:'/pages/order/index'})
    
    }catch(err){
      await showToast({title: "支付失败"})
      console.log(err)
    }
  }
  
  
  


})