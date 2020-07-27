Component({
  data: {
  active: 0,
  list: [
    {
      "url": "/pages/home/home",
      "icon": "wap-home",
      "text": "首页"
    },
    {
      "url": "/pages/smile/smile",
      "icon": "smile",
      "text": "笑话"
    }
  ]
  },
  methods: {
   onChange(e) {
      this.setData({ active: e.detail });
      wx.reLaunch({
        url: this.data.list[e.detail].url
      });
   },
   init() {
       const page = getCurrentPages().pop();
       this.setData({
      　  active: this.data.list.findIndex(item => item.url === `/${page.route}`)
       });
      }
   }
});