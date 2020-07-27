// components/lists/lists.js
Component({
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.getData("新闻", 7)
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    num: {
      type: Number,
      observer(num) {
        this.setData({
            num: num
          }),
          this.getData(this.data.types, num)
      }
    },
    types: {
      type: String,
      observer(types) {
        this.setData({
            types: types
          }),
          this.getData(types, this.data.num)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lists: [],
    num: null,
    types: null,
    types1:null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jump(e) {
    var arr1 = (e.currentTarget.dataset.title.title).replace(/“|”|&/gi, "");
      wx.navigateTo({
        url: "../detail/detail?title=" + arr1 + "&types=" + e.currentTarget.dataset.types
      })
    },
    getData(types, num) {
      const that = this
      wx.request({
        url: 'https://way.jd.com/jisuapi/get?channel=' + types + '&num=' + num + '&start=&appkey=9f7bd223b160b7533e425b413ec40166',
        success(res) {
          that.setData({
            lists: res.data.result.result.list,
            types1:wx.getStorageSync('types')
          })
        }
      })
    }
  }
})