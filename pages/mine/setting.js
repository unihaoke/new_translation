// pages/mine/setting.js
var app = getApp();
Page({
  data: {
    username: null,
    email: null,
    phone: null,
  },
  onLoad: function (options) {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    that.setData({
      username:app.globalData.username,
      email:app.globalData.email,
      phone:app.globalData.phone
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭 
  },
  submit: function () {
    var that = this;
    var reg = new RegExp('^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$');
    var phoneVar = reg.test(that.data.phone);
    var reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
    var emailVar = reg.test(that.data.email);
    if (!emailVar){
      wx.showToast({
        title: '邮箱格式错误',
        icon: 'none',
        duration: 2000
      });
    } else if (!phoneVar) {
      wx.showToast({
        title: '手机格式错误',
        icon: 'none',
        duration: 2000
      });
    }else{
      that.updateUserMessage();
    }
  },
  
  usernameinput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  emailinput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  phoneinput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  updateUserMessage:function(){
    var that = this;
    var userId = app.globalData.userId;
    wx.request({
      url: 'http://localhost:8080/user/'+ userId,
      method: 'PUT',
      data: {
        id: userId,
        username: that.data.username,
        email: that.data.email,
        phone: that.data.phone
      },
      success: function (res) {
        var flag = res.data.flag;
        if (!flag) {
          var toastText = '更新失败';
          wx.showToast({
            title: toastText,
            icon: 'none',
            duration: 2000
          });
        } else {
          wx.showModal({
            content: '更新成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {

              }
            }
          });
        }
      }
    })
  }
})