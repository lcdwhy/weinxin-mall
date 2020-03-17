// pages/login/index.js
Page({
  headleGetUserInfo(e){
    const {userInfo} = e.detail
    wx.setStorageSync('userinfo', userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})