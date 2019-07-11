// pages/task/task.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conferences:[],
    isEnd:false,
    active: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userId = app.globalData.userId;
    var url = 'http://127.0.0.1:8080/translation/' + userId;
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
  loadConferences: function (url) {
    console.log(app.globalData.userId + 'userId')
    var that = this;
    var userId = app.globalData.userId;
    wx.request({
      url: url,
      method: 'GET',
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
    var that = this;
    that.loadConferences();
  },
  onChange:function(event) {
    var that = this;
    var userId = app.globalData.userId;
    var url = 'http://127.0.0.1:8080/translation/' + userId;
    if (event.detail.index ==0){
      url = 'http://127.0.0.1:8080/translation/' + userId;
    }
    that.loadConferences(url);

  },

})