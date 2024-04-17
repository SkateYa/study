/* 
1 页面被打开的时候 onShow 
  0 onShow 不同于onLoad 无法在形参上接收 options参数 
  0.5 判断缓存中有没有token 
    1 没有 直接跳转到授权页面
    2 有 直接往下进行 
  1 获取url上的参数type
  2 根据type来决定页面标题的数组元素 哪个被激活选中 
  2 根据type 去发送请求获取订单数据
  3 渲染页面
2 点击不同的标题 重新发送请求来获取和渲染数据 
 */
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, value: '全部', checked: true },
      { id: 1, value: '待付款', checked: false },
      { id: 2, value: '待发货', checked: false },
      { id: 3, value: '退款/退货', checked: false }
    ],
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }
    // 1 获取当前的小程序的页面栈-数组 长度最大是10页面 
    let pages = getCurrentPages();
    // 数组中，索引最大的页面就是当前页面
    let currentPages = pages[pages.length - 1]
    const { type } = currentPages.options
    this.changeTitleByIndex(type - 1)
    console.log(currentPages.options)
    this.getOrders(type)

  },
  async getOrders(type) {
    const res = await request({ url: '/my/orders/all', data: { type } })
    this.setData({
      orderList: res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
    console.log(this.orderList)
  },
  // 根据标题索引来激活选中，标题数组
  changeTitleByIndex(index) {
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.checked = true : v.checked = false)
    this.setData({
      tabs
    })
  },
  tabsItemChange(e) {
    const { index } = e.detail
    this.changeTitleByIndex(index)
    // 重新发送请求 type=1 index=0
    this.getOrders(index + 1)
  },

})