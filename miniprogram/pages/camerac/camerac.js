// pages/camerac/camerac.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  takePhoto() {  // 定义绑定的事件处理函数
    var that = this;  // 指定this到that，避免绑定的对象改变
    const ctx = wx.createCameraContext()    // 创建 camera 上下文 CameraContext 对象                                                                                                                         
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
        var base64 = wx.getFileSystemManager().readFileSync(res.tempImagePath, 'base64')
        wx.cloud.init()
        wx.cloud.callFunction({
          // 云函数名称
          name: 'RecognizeProduct',
          // 传给云函数的参数
          data: {
            x: base64  // 传图片的base64字符串
          },
          success: function (res) {
            console.log(res);
            that.setData({
              ImageWidth: res.result.Result.ImageWidth + "px",
              ImageHeight: res.result.Result.ImageHeight + "px",
              FaceInfos: res.result.Result.FaceInfos,
            })
          },
          fail: console.error
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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