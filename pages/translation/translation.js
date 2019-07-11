// pages/translation/translation.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: null,
    max: 200,
    length: 0,
    isAgree: true,
    translation: null,
    translations:null,
    isGet: 0,
    activeNames: ['1'],
    language:'',
    territory:'',
    deadline:null,
    title:'',
    subpackageid:null,
    count:0,
    section:1,
    describe:null,
    context:'这是第一段,没有上文',
    taskid:null,
    userInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.describe)
    that.setData({
      content: options.content,
      language:options.language,
      territory:options.territory,
      title:options.title,
      subpackageid:options.subpackageid,
      deadline:options.deadline,
      section:options.section,
      describe:options.describe,
      count:options.count,
      taskid:options.taskid,
      userInfo: app.globalData.userInfo
    })
    that.loadtranslation()
  },
  loadtranslation: function () {
    var that = this;
    var userId = app.globalData.userId;
    var subpackageid = that.data.subpackageid;
    wx.request({
      url: "http://localhost:8080/translation/" + userId+'/'+subpackageid,
      method: 'GET',
      data: {},
      success: function (res) {
        var list = res.data.data;
        console.log(res.data)
        if (list == null) {
          // var toastText = '获取数据失败';
          // wx.showToast({
          //   title: toastText,
          //   icon: 'none',
          //   duration: 20001
          // });
        } else {
          that.setData({
            translations: list
          });
        }
      }
    })
  },
  submit: function () {
    var that = this;
    var userid = app.globalData.userId;
    var subpackageid = that.data.subpackageid;
    var translator = that.data.userInfo.nickName;
    var translation = that.data.translation;

      wx.request({
        url: 'http://localhost:8080/translation',
        method: 'POST',
        data: {
          userid: userid,
          subpackageid: subpackageid,
          translation: translation,
          isget:1,
          translator: translator
        },
        success: function (res) {
          var flag = res.data.flag;
          if (!flag) {
            var toastText = '提交失败';
            wx.showToast({
              title: toastText,
              icon: 'none',
              duration: 2000
            });
          } else {
            var toastText = '提交成功';
            wx.showToast({
              title: toastText,
              icon: 'success',
              duration: 2000
            });
          }
        }
      })
     
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
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  userInput: function (e) {
    this.setData({
      length: e.detail.value.length,
      translation: e.detail.value
    })
  },
  onChange(event) {
    var that = this;
    var taskid = that.data.taskid;
    var section = that.data.section;
    if (section != 1 && event.detail.length !=0){
      section -= 1;
      wx.request({
        url: "http://localhost:8080/subpackage/" + taskid + '/' + section,
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
              context: list
            });
          }
        }
      })
    }
    that.setData({
      activeName: event.detail
    });
  }
})