// pages/translation/translation_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subpackageId: null,
    conferences: [],
    status:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      subpackageId: options.subpackageid,
      status:options.status==0?"未被采纳":"被采纳"
    })
    console.log(options.subpackageid)
    that.loadConferences()
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
  loadConferences: function () {
    var that = this;
    var subpackageId = that.data.subpackageId;
    wx.request({
      url: "http://localhost:8080/translation/translation/"+subpackageId,
      method: 'GET',
      data: {},
      success: function (res) {
        var list = res.data.data;
        console.log(res.data)
        if (list == null) {
          var toastText = '获取数据失败';
          wx.showToast({
            title: toastText,
            icon: 'none',
            duration: 20001
          });
        } else {
          that.setData({
            conferences: list
          });
        }
      }
    })
  },
})