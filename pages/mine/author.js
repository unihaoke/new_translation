// pages/mine/aboutus.js
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
  toMiniProgramSuccess(res) {
    //从其他小程序返回的时候触发
    wx.showToast({
      title: '通过超链接跳转其他小程序成功返回了'
    })
  }
})