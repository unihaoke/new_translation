//app.js
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // var that = this;
        var code = res.code; //登录凭证
        if (code) {
          //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
          wx.request({
            url: 'http://127.0.0.1:8080/user/login', //自己的服务接口地址
            method: 'post',
            data: {
              code: code
            },
            success: function (data) {
              //4.解密成功后 获取自己服务器返回的结果
              console.log(data.data.data)
              if (data.data.code == 20000) {
                console.log("用户id！" + data.data.data);
                that.globalData.userId = data.data.data
                that.usermessage(data.data.data);
                if (that.employIdCallback) {
                  that.employIdCallback(data.data.data);
                }
              } else {
                console.log('登录失败')
              }
            },
            fail: function () {
              console.log('系统错误')
            }
          })
        }
        else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
  },
  usermessage: function (userId) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/user/' + userId,
      method: 'GET',
      data: {},
      success: function (res) {
        var flag = res.data.flag;
        if (!flag) {
          var toastText = '网络异常';
          wx.showToast({
            title: toastText,
            icon: 'none',
            duration: 2000
          });
        } else {
          console.log(res.data.data)
          if (res.data.data != null) {
            that.globalData.username = res.data.data.username;
            that.globalData.email = res.data.data.email;
            that.globalData.phone = res.data.data.phone;
          }
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userId:null,
    username:null,
    email:"",
    phone:""
  }
})