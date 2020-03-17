import {openSetting,getSetting,chooseAddress,showModal,showToast} from '../../utils/asyncWx.js'

Page({
  data:{
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },
  onShow:function(){
    // 获取缓存中的收货地址信息
      const address = wx.getStorageSync('address');
      // 获取缓存中的购物车信息
      const cart = wx.getStorageSync('cart')||[];
      // 将购物车中购买数量和总金额存入data中
      this.setCart(cart)
      // 将在缓存中获得的地址信息存入data中
      this.setData({address})




      // 判断购物车中的商品是否全部选中
      // let allChecked=true
      // // const allChecked = cart.length?cart.every(v =>v.checked):false

      // // 选中商品的总金额
      // let totalNum=0
      // //选中商品的总数量
      // let totalPrice=0
      // cart.forEach(v => {
      //   if(v.checked){
      //     totalNum+=v.num 
      //     totalPrice+=v.goods_price*v.num
      //   }else{
      //     allChecked=false
      //   }
      // })
      // allChecked=cart.length?allChecked:false

      // this.setData({
      //   address:address,
      //   cart,
      //   allChecked,
      //   totalNum,
      //   totalPrice
      // })
  },
  //添加收货地址信息
  async headleChooseAddress(){
    // wx.getSetting({
    //   success: (result)=>{
    //     // 判断地址权限是否被禁止
    //     const scopeAddress = result.authSetting["scope.address"]
    //     if(scopeAddress===true || scopeAddress ===undefined){
    //       wx.chooseAddress()
    //     }else{
    //       // 若地址权限之前被禁止，重新打开地址权限设置
    //       wx.openSetting({
    //         success: (res)=>{
    //           wx.chooseAddress()
    //         }
    //       })
    //     }
    //   },
    // })
    try{
      const res = await getSetting()
      const scopeAddress = res.authSetting["scope.address"]
      if(scopeAddress===false){
        await openSetting()
      }
      let address = await chooseAddress()
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
      wx.setStorageSync("address", address);
    }catch(err){
       console.log(err)
      }
  },

  // 选框的改变
  healeItemChange(e){
    console.log(e.currentTarget.dataset.id)
    const goods_id = e.currentTarget.dataset.id
    let {cart} = this.data
    let index = cart.findIndex(v=>v.goods_id===goods_id)
    cart[index].checked=!cart[index].checked


    this.setCart(cart)
    
      
  },
  // 重新计算，把新的购物车信息存入缓存和data中
  setCart(cart){
    
      let allChecked=true
      // const allChecked = cart.length?cart.every(v =>v.checked):false

      // 选中商品的总金额
      let totalNum=0
      //选中商品的总数量
      let totalPrice=0
      cart.forEach(v => {
        if(v.checked){
          totalNum+=v.num 
          totalPrice+=v.goods_price*v.num
        }else{
          allChecked=false
        }
      })
      allChecked=cart.length?allChecked:false

      this.setData({
        cart,
        allChecked,
        totalNum,
        totalPrice
      })
      wx.setStorageSync('cart', cart);
  },
  // 全选框的全选和反选
  headleAllItemChange(){
    let {allChecked,cart} = this.data
    allChecked = !allChecked
    cart.forEach(v=>v.checked=allChecked)
    this.setCart(cart)
  },
  // 商品数量+ - 按钮
  async handleItemNumEdit(e){
    const {operation,id} = e.currentTarget.dataset
    let {cart} = this.data
    const index = cart.findIndex(v=>v.goods_id===id)



    // 当商品数量为1并且用户点击-按钮时，询问用户是否删除商品
    if(cart[index].num===1&&operation===-1){
      const res = await showModal({content:"是否删除该商品"})
      if (res.confirm) {
        cart.splice(index,1)
        this.setCart(cart)
      }   
    }else{
      cart[index].num+=operation
      this.setCart(cart)
    }
  },
  // 结算功能
  async headlePay(){
    const {address,totalNum} = this.data;
    // 判断是否添加收获地址
    if(!address.userName){
      await showToast({title:"还未添加收获地址"})
      return;
    }
    // 判断购物车中是否有商品
    if(!totalNum){
      await showToast({title:"还未购买商品"})
      return;
    }
    
    wx.navigateTo({url: '/pages/pay/index'})
  }
})