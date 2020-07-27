// pages/smile/smile.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    texts: [],
    imgs: [],
    gifs: [],
    num1: 1,
    num2: 1,
    num3: 1,
    show: false
  },
  //返回顶部
  toTop() {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  //加载更多
  more() {
    this.setData({
      num1: this.data.num1 + 1
    })
    this.gataTexts()
  },
  more2() {
    this.setData({
      num2: this.data.num2 + 1
    })
    this.gataImgs()
  },

  //获取文本笑话

  gataTexts() {
    const that = this
    wx.request({
      url: 'https://v1.alapi.cn/api/joke?page=' + this.data.num1 + '&num=10',
      success(res) {
        that.setData({
          texts: that.data.texts.concat(res.data.data.data)
        })
      }
    })
  },
  // 获取图片笑话
  gataImgs() {
    const that = this
    wx.request({
      url: 'https://way.jd.com/showapi/tpxh?time=2020-07-01&page=' + this.data.num2 + '&maxResult=5&appkey=9f7bd223b160b7533e425b413ec40166',
      success(res) {
        var arr1 = JSON.stringify(res.data.result.showapi_res_body.contentlist).replace(/<img src='/gi, "<img src='https://images.weserv.nl/?url=");
        var arr=JSON.parse(arr1);
        that.setData({
          imgs: that.data.imgs.concat(...arr)
        })
      }
    })
  },

  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 1000) {
      this.setData({
        show: true
      })
    } else {
      this.setData({
        show: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '笑话大全'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.gataTexts()
    this.gataImgs()
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
      num1: 1,
      num2: 1,
      texts: [],
      imgs: []
    })
    this.gataTexts()
    this.gataImgs()
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500);
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

  }
})