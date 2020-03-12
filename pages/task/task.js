// pages/task/task.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conferences:[],
    isEnd:false,
    active: 1,
    windowHeight: 0,
    windowWidth: 0,
    turl: "/pages/translation/translation_list?",
    change:1,
    token: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 设置窗口大小
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight - 5,
          windowWidth: res.windowWidth,
          jwt: wx.getStorageSync("jwt")
        })
      }
    })
    var url = 'http://127.0.0.1:8080/translation/';
    that.loadConferences(url);
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
  onScroll: function () { },
  loadConferences: function (url) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + that.data.jwt
      },
      data: {},
      success: function (res) {
        var list = res.data.data;
        if (list == null) {
          
        } else {
          that.setData({
            conferences: list
          });
          console.log(list)
        }
      }
    })
  },
  onLower:function(){
    var that = this;
    that.setData({
      isEnd:true
    });
  },
  onUpper:function(){
    
  },
  onChange:function(event) {
    var that = this;
    console.log(that.data.change)
    var turl = "/pages/translation/translation_list?&flag=0&";
    var url = 'http://127.0.0.1:8080/translation/';
    if (event.detail.index ==0){
      url = 'http://127.0.0.1:8080/task/';
      turl = "/pages/task/task_content?";
    }
    that.setData({
      turl:turl,
      change: event.detail.index
    })
    that.loadConferences(url);

  },

  onClickRight:function(event){
    wx.navigateTo({
      url: '/pages/task/post',
    })
  }
})