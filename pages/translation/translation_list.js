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
    index:0,
    title: null,
    t_language: null,
    territory: null,
    deadline: null,
    t_describe: null,
    createtime:null,
    content:null,
    t_length:0,
    token: null,
    flag:0,
    astatus:0//判断是否被采纳
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      subpackageId: options.subpackageid,
      status:options.status==0?"任务未完成":"任务已完成",
      astatus: options.status,
      title: options.title,
      t_language: options.t_language,
      territory: options.territory,
      deadline: options.deadline,
      t_describe: options.t_describe,
      createtime: options.createtime,
      content: options.content,
      t_length: options.t_length,
      createtime:options.createtime,
      flag:options.flag,
      jwt: wx.getStorageSync("jwt")
    })
    console.log(options.createtime)
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
      header: {
        'Authorization': 'Bearer ' + that.data.jwt
      },
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
  /**
   * 采纳
   */
  adopt: function (options){
    var that = this;
    if(that.data.astatus==1){
      wx.showModal({
        content: '该分包任务已完成，无法再次采纳',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }else{
     
      wx.showModal({
        title: '采纳',
        content: '是否要采纳该译文，采纳后不能取消',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          console.log(that.data.conferences[options.currentTarget.dataset.index].subpackageid);
          if (res.confirm) {
            wx.request({
              url: "http://localhost:8080/translation/adopt",
              method: 'POST',
              header: {
                'Authorization': 'Bearer ' + that.data.jwt
              },
              data: {
                transId: that.data.conferences[options.currentTarget.dataset.index].id,
                trans_text: that.data.conferences[options.currentTarget.dataset.index].translation,
                subpackageid: that.data.conferences[options.currentTarget.dataset.index].subpackageid,
                userId: that.data.conferences[options.currentTarget.dataset.index].userid
              },
              success: function (res) {
                var flag = res.data.flag;
                if (!flag) {
                  var toastText = '采纳失败';
                  wx.showToast({
                    title: toastText,
                    icon: 'none',
                    duration: 2000
                  });
                } else {
                  var number = options.currentTarget.dataset.index;
                  var up = "conferences["+number+"].status"
                  that.setData({
                    astatus:1,
                    status:'任务已完成',
                    [up]:1
                  })
                  var toastText = '采纳成功';
                  wx.showToast({
                    title: toastText,
                    icon: 'success',
                    duration: 2000
                  });
                }
                
              }
            })
          } else {
            console.log('取消')
          }
        }
      });
    }
    
  }
})