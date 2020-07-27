// pages/home/home.js
Page({
    //返回顶部
    toTop(){
      wx.pageScrollTo({
        scrollTop: 0
      })
    },
  /**
   * 页面的初始数据
   */
  data: {
    color: 0,
    result: [],
    lists: [],
    num: 7,
    types: "新闻",
    active: 0,
    show:false,
    test1:{
      title:"123456&123“1233”"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
  jump(e) {
    var arr1 = (e.currentTarget.dataset.title.title).replace(/“|”|&/gi, "");
    wx.navigateTo({
      url: "../detail/detail?title=" + arr1 + "&types=" + e.currentTarget.dataset.types
    })
  },
  change(e) {
    wx.setStorageSync('types', e.currentTarget.dataset.item)
    this.setData({
      color: e.currentTarget.dataset.index,
      types: e.currentTarget.dataset.item
    })
  },
  onLoad: function (options) {
    wx.setStorageSync('types', '新闻')
    const that = this
    wx.request({
      url: 'https://way.jd.com/jisuapi/get?channel=头条&num=7&start=&appkey=9f7bd223b160b7533e425b413ec40166',
      success(res) {
        that.setData({
          lists: res.data.result.result.list
        })
      }
    })
    wx.request({
      url: 'https://way.jd.com/jisuapi/channel?appkey=9f7bd223b160b7533e425b413ec40166',
      success(res) {
        res.data.result.result.shift()
        that.setData({
          result: res.data.result.result
        })
      }
    })
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if(e.scrollTop>1000){
      this.setData({
        show:true
      })
    }else{
      this.setData({
        show:false
      })
    }
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
    this.getTabBar().init();
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
    this.setData({
      num: 7
    })
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      num: this.data.num + 7
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})