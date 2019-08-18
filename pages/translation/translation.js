// pages/translation/translation.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    max: 200,
    length: 0,
    isAgree: true,
    translation: null,
    translations: null,
    isGet: 0,
    activeNames: ['1'],
    section: 1,
    context: '这是第一段,没有上文',
    taskid: null,
    userInfo: '',
    subpackageid: null,
    username: null,
    trans: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo,
      subpackageid: options.subpackageid,
      username: app.globalData.username
    })
    that.loadtranslation(options.subpackageid)
  },
  loadtranslation: function(subpackageid) {
    var that = this;
    var userId = app.globalData.userId;
    wx.request({
      url: "http://localhost:8080/subpackage/" + subpackageid,
      method: 'GET',
      data: {},
      success: function(res) {
        var list = res.data.data;
        console.log(list)
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
  submit: function() {
    var that = this;
    var userid = app.globalData.userId;
    var subpackageid = that.data.subpackageid;
    var translator = that.data.userInfo.nickName;
    var translation = that.data.translation;


    if (that.data.translations.t_status == 1 ) {
      wx.showToast({
        title: '该任务已完成',
        icon: 'none',
        duration: 2000
      });
    } else if (that.data.translations.overdue == 1) {
      wx.showToast({
        title: '该任务已过期',
        icon: 'none',
        duration: 2000
      });
    } else if (translation == null || translation.length == 0 || translation.match(/^[ ]*$/)) {
      wx.showToast({
        title: '译文不能为空',
        icon: 'none',
        duration: 2000
      });
    }else{
      wx.request({
        url: 'http://localhost:8080/translation',
        method: 'POST',
        data: {
          userid: userid,
          subpackageid: subpackageid,
          translation: translation,
          translator: translator,
          product_id: that.data.translations.product_id,
          content: that.data.translations.content,
          t_length: that.data.translations.text_length
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
    }

  },
  auxiliaryTranslate: function() {
    var that = this;
    var content = that.data.translations.content;
    var tl ="zh-CN";
    if ("中译英"==that.data.translations.t_language){
      tl ="en";
    }
    console.log(content)
    wx.request({
      url: "http://localhost:8080/translation/translate/" + tl + "/" + encodeURIComponent(content),
      method: 'GET',
      data: {},
      success: function(res) {
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
            trans: list
          });
        }
      }
    })
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
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  userInput: function(e) {
    this.setData({
      length: e.detail.value.length,
      translation: e.detail.value
    })
  },
  onChange(event) {
    var that = this;
    var taskid = that.data.translations.taskid;
    var section = that.data.translations.section;
    if (section != 1 && event.detail.length != 0) {
      section -= 1;
      wx.request({
        url: "http://localhost:8080/subpackage/" + taskid + '/' + section,
        method: 'GET',
        data: {},
        success: function(res) {
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