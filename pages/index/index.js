//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '学术会议与学术活动',
    userInfo: {},
    windowHeight: 0,
    windowWidth: 0,
    inputShowed: false,
    inputVal: "",
    showMore: false,
    isLower: false,
    isEnd: false,
    conferences: [],
    isSuccess: 0,
    isLoading: true,
    active: 0,
    index:0,
    count:10, //每一页显示10条数据
    page:1, //默认第一页
    isnow:0 // 判断是否是当下
    
  },
 
  onLoad: function (options) {
    //console.log(options.type)
    var that = this
    // 设置窗口大小
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight - 5,
          windowWidth: res.windowWidth
        })
        var url = 'http://localhost:8080/subpackage/search/1/10';
        that.loadConferences(url)
      }
    })
  },
  loadConferences: function (url) {
    var that = this; 
    wx.request({
      url: url,
      method: 'GET',
      data: {},
      success: function (res) {
        if(that.data.isLower){
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
          that.setData({
            isLower: false
          });
        }
        var list = res.data.data.rows;
        console.log(list)
          //如果是加载的方式的话那么合并之前的数组
          if(that.data.isnow !=0){  
            list = that.data.conferences.concat(list);
          }
          that.setData({
            conferences: list,
            showMore: false
          });
        
        if (res.data.data.rows.length==0){
           that.setData({
             showMore: false,
             isEnd: true
           });
         }   
      }
    })
  },
  onScroll: function () { },
  onChange:function(event){
    var that = this;
    that.setData({
      index: event.detail.index,
      isnow:0,
      page:1,
      conferences: [],
      isEnd: false
    });
    that.requestTask(event.detail.index)
  },
  onLower: function () {
    var that = this
   
    var page = that.data.page + 1
    that.setData({
      //isLower: true
      showMore: true,
      isnow: 1,
      page: page
    });
    that.requestTask(that.data.index)
    
  
  },
  //根据不同的领域发送url
  requestTask:function(index){
    var that = this;
    var count = that.data.count;
    var page = that.data.page;
    console.log(page)
    var url = 'http://localhost:8080/subpackage/search/'+page+'/'+count;
    if (index == 0) {
      url = 'http://localhost:8080/subpackage/search/'+page+'/'+count;
      that.loadConferences(url)
    }
    if (index == 1) {
      url = 'http://localhost:8080/subpackage/search/'+page+'/'+count+'/计算机'
      that.loadConferences(url)
    }
    if (index == 2) {
      url = 'http://localhost:8080/subpackage/search/' + page + '/' + count +'/金融'
      that.loadConferences(url)
    }
    if (index == 3) {
      wx.showActionSheet({
        itemList: ['A', 'B', 'C'],
        success: function (res) {
          if (!res.cancel) {
            console.log(res.tapIndex)
          }
        }
      });
    } 
  },
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    that.setData({
      isLower: true,
      isnow: 0,
      page: 1,
      conferences: [],
      isEnd: false
    });
    that.requestTask(that.data.index)
  },
})
