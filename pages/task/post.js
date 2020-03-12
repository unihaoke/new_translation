/**
 * 页面的初始数据
 */
var app = getApp();
Page({
  data: {
    show: false,
    objectMultiArray: [
      [{
          id: 0,
          name: '英译中'
        },
        {
          id: 1,
          name: '中译英'
        }
      ],
      [{
          id: 0,
          name: '计算机'
        },
        {
          id: 1,
          name: '文学'
        },
        {
          id: 2,
          name: '金融'
        },
        {
          id: 3,
          name: '体育'
        },
        {
          id: 4,
          name: '电影'
        }
      ]
    ],
    multiIndex2: [0,0],
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime() + 2 * 3600 * 1000,
    maxDate: new Date(2100, 10, 1).getTime(),
    currentDate: new Date().getTime() + 2 * 3600 * 1000,
    files: [],
    filename: "",
    filepath:null,
    isAgree: true,
    subdate:"",
    text:null,
    title:"",
    taskfilename:null,
    token:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      jwt: wx.getStorageSync("jwt")
    })
    console.log(this.data.minDate)

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
  selectType: function() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  bindMultiPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex2: e.detail.value
    })
  },
  onInput(event) {
    var that = this;
    var date = new Date(event.detail);
    this.setData({
      currentDate: event.detail,
      subdate: that.formateDate(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
    });
  },
  confirm(event) {
    var that = this;
    var date = new Date(event.detail);
    this.setData({
      show: false,
      currentDate: event.detail,
      subdate: that.formateDate(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
    });
  },
  cancel(event) {
    this.setData({
      show: false
    });
  },
  formateDate(yy, mm, dd, hh, m, s) {
    mm = mm < 10 ? ('0' + mm) : mm;
    dd = dd < 10 ? ('0' + dd) : dd;
    hh = hh < 10 ? ('0' + hh) : hh;
    m = m < 10 ? ('0' + m) :m;
    s = s < 10 ? ('0' + s) : s;
    return yy + "-" + mm + "-" + dd + " " + hh + ":" + m + ":" + s
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  upLoadAction(e) {
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        const tempFilePaths = res.tempFiles
        wx.uploadFile({
          url: 'http://127.0.0.1:8080/task/upload/file',
          filePath: tempFilePaths[0].path,
          name: 'file',
          header: {
            'Authorization': 'Bearer ' + that.data.jwt
          },
          formData: {},
          success: function (res) {
            var data = JSON.parse(res.data);
            var flag = data.flag;
            console.log(res.data);
            console.log(data.data)
            if (!flag) {
              var toastText = '上传失败';
              wx.showToast({
                title: toastText,
                icon: 'none',
                duration: 2000
              });
            } else {
              that.setData({
                taskfilename:data.data,
                filename: tempFilePaths[0].name,
                filepath: tempFilePaths[0].path
              });
              wx.showModal({
                content: '提交成功',
                showCancel: false,
                success: function (res) {
                }
              });

            }
          }
        })
      }
    })
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  showTopTips: function() {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function() {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  }, 
  textInput:function(e){
    this.setData({
     text: e.detail.value
    })
  },
  titleInput:function(e){
    this.setData({
      title: e.detail.value
    })
  },
  postFile: function () {
    var that = this;
    var objectMultiArray=that.data.objectMultiArray;
    var multiIndex2=that.data.multiIndex2;
    console.log(that.data.subdate)
    wx.uploadFile({
      url: 'http://127.0.0.1:8080/task/upload',
      filePath: that.data.filepath,
      name: 'file',
      header: {
        'Authorization': 'Bearer ' + that.data.jwt
      },
      formData: {
        t_describe:that.data.text,
        title:that.data.title,
        t_language: objectMultiArray[0][multiIndex2[0]].name,
        territory: objectMultiArray[1][multiIndex2[1]].name,
        deadline: that.data.subdate
      },
      success: function (res) {
        var data = JSON.parse(res.data);
        var flag = data.flag;
        console.log(res.data);
        if (!flag) {
          var toastText = '提交失败';
          wx.showToast({
            title: toastText,
            icon: 'none',
            duration: 2000
          });
        } else {

          wx.showModal({
            content: '提交成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          });

        }
      }
    })
  },
submit:function(){
var that = this;
var title = that.data.title;
var filepath = that.data.filepath;
var isAgree = that.data.isAgree;
var taskFilename = that.data.taskfilename;
  if (title == null || title.length == 0|| title.match(/^[ ]*$/)){
    wx.showToast({
      title: '标题不能为空',
      icon: 'none',
      duration: 2000
    });
}else if(filepath==null){
    wx.showToast({
      title: '请选择要上传的文件',
      icon: 'none',
      duration: 2000
    });
  } else if (!isAgree){
    wx.showToast({
      title: '您还未同意相关条款',
      icon: 'none',
      duration: 2000
    });
  } else if (taskFilename==null){
    wx.showToast({
      title: '请等待文件上传',
      icon: 'none',
      duration: 2000
    });
  }
else{
    that.addTask();
}
},
  addTask:function(){
    var that = this;
    var objectMultiArray = that.data.objectMultiArray;
    var multiIndex2 = that.data.multiIndex2;
    console.log(that.data.jwt);
    wx.request({
      url: 'http://127.0.0.1:8080/task',
      method: 'POST',
      header: {
        'Authorization': 'Bearer ' + that.data.jwt
      },
      data: {
        t_describe: that.data.text,
        title: that.data.title,
        t_language: objectMultiArray[0][multiIndex2[0]].name,
        territory: objectMultiArray[1][multiIndex2[1]].name,
        deadline: that.data.subdate,
        fileName:that.data.taskfilename
      },
      success: function (res) {
        var flag = res.data.flag;
        console.log(res.data);
        if (!flag) {
          var toastText = '提交失败';
          wx.showToast({
            title: toastText,
            icon: 'none',
            duration: 2000
          });
        } else {

          wx.showModal({
            content: '提交成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          });

        }
      }
    })
  },
})