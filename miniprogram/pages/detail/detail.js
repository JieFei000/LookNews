// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    lists: []
  },
  jump(e) {
    var arr1 = (e.currentTarget.dataset.title.title).replace(/“|”|&/gi, "");
    wx.navigateTo({
      url: "../detail/detail?title=" + arr1 + "&types=" + e.currentTarget.dataset.types
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://way.jd.com/jisuapi/get?channel=头条&num=6&start=&appkey=9f7bd223b160b7533e425b413ec40166',
      success(res) {
        that.setData({
          lists: res.data.result.result.list
        })
      }
    })
    const that = this
    wx.request({
      url: 'https://way.jd.com/jisuapi/get?channel=' + options.types + '&num=40&start=&appkey=9f7bd223b160b7533e425b413ec40166',
      success(res) {
        var arr1 = JSON.stringify(res.data.result.result.list).replace(/<img/gi, "<img class='richImg'")
        var arr = JSON.parse(arr1);
        var arr2 = (options.title).replace(/“|”|&/gi, "");
        for (var i = 0; i < arr.length; i++) {
          var arr3 = (arr[i].title).replace(/“|”|&/gi, "");
          if (arr2 == arr3) {
            that.setData({
              detail: arr[i]
            })
          }
        }
        that.setData({
          detail: arr[options.title]
        })
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

  }
})