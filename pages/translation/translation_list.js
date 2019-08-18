// pages/translation/translation_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subpackageId: null,
    conferences: [],
    status:null,
    ellipsis: true, // 文字是否收起，默认收起
    index:0
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

          list.forEach(function (item, index) {
            console.log(item.translation.length)
            if (item.translation.length>90){
              list[index].check=true;
              list[index].fold=true;
            }else{
              list[index].check = false;
              list[index].fold = false;
            }    
             })
          that.setData({
            conferences: list
          });
        }
      }
    })
  },
  /**
  * 收起/展开按钮点击事件
  */
  ellipsis: function (event) {
    var that = this;
    var value = !that.data.conferences[event.currentTarget.dataset.index].check;
    var list = that.data.conferences;
    list[event.currentTarget.dataset.index].check = value;
    this.setData({
      conferences: list
    })
  },
})