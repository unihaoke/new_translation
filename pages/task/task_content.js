// pages/task/task_content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conferences:[],
    taskid: "",
    title: null,
    t_language: null,
    territory: null,
    deadline: null,
    t_describe: null,
    createtime: null,
    content: null,
    t_length: 0,
    token:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      taskid: options.taskid,
      title: options.title,
      t_language: options.t_language,
      territory: options.territory,
      deadline: options.deadline,
      t_describe: options.t_describe,
      createtime: options.createtime,
      content: options.content,
      t_length: options.t_length,
      jwt: wx.getStorageSync("jwt")
    })
    that.loadConferences();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    that.loadConferences();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  loadConferences: function() {
    var that = this;
    var taskid = that.data.taskid;
    wx.request({
      url: 'http://127.0.0.1:8080/subpackage/task/' + taskid,
      method:'GET',
      header: {
        'Authorization': 'Bearer ' + that.data.jwt
      },
      data: {},
      success: function(res) {
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
})