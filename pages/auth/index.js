import {request} from '../../request/index.js'
import {login} from '../../utils/asyncWx.js'

Page({
  // 点击获取用户信息
  async headleGetUserInfo(e){
    try{
      const {encryptedData,iv,rawData,signature} = e.detail
      const {code} =await login()
      const dataParams = {encryptedData,rawData,iv,signature,code}
      const {token} = request({
        url:'/users/wxlogin',
        method:'post',
        data:dataParams
      })
      wx.setStorageSync('token', token);
      wx.navigateBack({
      delta: 1
    });
    }catch(error){
      console.log(error)
    }
    
    
  }
})