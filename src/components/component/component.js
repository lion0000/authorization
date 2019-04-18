// compont/rili.js
var bianLIyear
var bianLImonth
var bianLIday
var riLi = []
var shangY = []
var xiaY = []
var xianxuNZ = []
var xuanZheData = []
var windowHeight
require('./longli.js')
var objfunction
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultValue: {
      type: String,
      value: 'default value'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: ['日', '一', '二', '三', '四', '五', '六'],
    year: null, // 遍历的年
    month: null, // 遍历的月
    day: null,
    xianShi: null, // 今天的年月
    xianDay: null, // 几天的日期
    xianShiZongData: [], // 今后7个月遍历的日期
    jiaShu: 1,
    animationData: '',
    count: 0
  },

  /**
   * 组件的方法列表
   */
  ready: function() {
    this.yunXian()
    wx.getSystemInfo({
      success: function (res) {
        windowHeight = res.windowHeight
      }
    })
    this.setData({
      tiao: 'tiao'
    })
  },

  methods: {
    // 运行,循环获取
    yunXian: function () {
      var myDate = new Date()
      var year = 2018
      var timeIntervalYear = myDate.getFullYear()
      var month = myDate.getMonth() + 1
      var day = myDate.getDate()
      var jiaYue = month + 12// 要循环的月份
      var xiabu
      if (jiaYue > 12) {
        xiabu = jiaYue - 12
      } else {
        // console.log(jiaYue)
      }

      if (jiaYue > 12) {
        for (let l = year; l <= parseInt(timeIntervalYear); l++) {
          if (jiaYue > 12) {
            if (l !== parseInt(timeIntervalYear)) {
              for (let ll = 1; ll <= 12; ll++) {
                bianLIyear = l
                bianLImonth = ll
                bianLIday = day
                this.kaiSHiyun()
              }
            } else {
              for (let ll = 1; ll <= xiabu; ll++) {
                bianLIyear = l
                bianLImonth = ll
                bianLIday = day
                this.kaiSHiyun()
              }
            }
          }
        }
      } else {
        for (let l = year; l <= parseInt(year); l++) {
          for (let ll = month; ll <= jiaYue; ll++) {
            bianLIyear = l
            bianLImonth = ll
            bianLIday = day
            this.kaiSHiyun()
          }
        }
      }
      if (month.toString().length < 2) {
        month = '0' + month
      } else {
        month = month
      }
      this.setData({
        xianShiZongData: xianxuNZ,
        xianShi: year + '-' + month,
        xianDay: day
      })
    },
    // 计算每个月的数据
    kaiSHiyun: function () {
      riLi = []
      shangY = []
      xiaY = []
      var dayNum = new Date(bianLIyear, bianLImonth, 0).getDate()
      var dayNumS = new Date(bianLIyear, parseInt(bianLImonth) - 1, 0).getDate()
      var dayNumX = new Date(bianLIyear, parseInt(bianLImonth) + 1, 0).getDate()
      var startWeek = new Date('' + bianLIyear + ',' + bianLImonth + ',1').getDay()
      for (var ij = startWeek - 1; ij >= 0; ij--) {
        shangY.push(parseInt(dayNumS) - parseInt(ij))
      }
      for (var ii = 1; ii <= dayNum; ii++) {
        var riqi = {}
        riqi.data = ii
        riqi.Num = startWeek + (ii - 1) % 7
        riqi.getTime = new Date(bianLIyear + '/' + bianLImonth + '/' + ii).getTime()
        riLi.push(riqi)
      }
      var shu = riLi.length + shangY.length
      if (shu % 7 > 0) {
        for (var ijj = 1; ijj <= 7 - shu % 7; ijj++) {
          xiaY.push(ijj)
        }
      }
      var panXZhong = {}
      var jiaBianLiyue
      if (bianLImonth.toString().length < 2) {
        jiaBianLiyue = '0' + bianLImonth
      } else {
        jiaBianLiyue = bianLImonth
      }
      panXZhong.xian = bianLIyear + '-' + jiaBianLiyue
      panXZhong.xainData = riLi
      panXZhong.shangData = shangY
      panXZhong.xiaData = xiaY
      xianxuNZ.push(panXZhong)
    },
    // 点击选择时间
    dianXuan: function (e) {
      var today = new Date()
      var date1 = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000))
      var date2 = new Date(today.getTime() - (1 * 24 * 60 * 60 * 1000))

      var dateStage = date1.getFullYear() + '-' + ((date1.getMonth() + 1) > 9 ? (date1.getMonth() + 1) : ('0' + (date1.getMonth() + 1)))
      var dateStage2 = date2.getFullYear() + '-' + ((date1.getMonth() + 1) > 9 ? (date1.getMonth() + 1) : ('0' + (date1.getMonth() + 1)))

      var getdate = dateStage + '-' + date1.getDate()

      var millisecond = new Date(getdate.replace(new RegExp('-', 'gm'), '/')).getTime()

      if (e === undefined) {
        xuanZheData = [
          {xuanShiJian: dateStage, xuanDayShi: date1.getDate(), getTime: millisecond, text: '起'}
        ]
        e = {
          currentTarget: {
            dataset: {
              day: date2.getDate(),
              shi: dateStage2
            }
          }
        }
      }

      if (e.hasOwnProperty('day') && e.day !== undefined) {
        xuanZheData = [
          {xuanShiJian: e.xuanShiJian, xuanDayShi: e.xuanDayShi, getTime: e.getTime, text: '起'}
        ]
        e = {
          currentTarget: {
            dataset: {
              day: e.day,
              shi: e.xuanShiJian
            }
          }
        }
      } else if (e.hasOwnProperty('day') && e.day === undefined) {
        xuanZheData = [
          {xuanShiJian: dateStage, xuanDayShi: date1.getDate(), getTime: millisecond, text: '起'}
        ]
        e = {
          currentTarget: {
            dataset: {
              day: date2.getDate(),
              shi: dateStage2
            }
          }
        }
      }
      var shiJIan = e.currentTarget.dataset.shi + '-' + e.currentTarget.dataset.day
      var xuanriArr = shiJIan.split('-')
      var shiJIanHaoMiao = new Date(shiJIan.replace(new RegExp('-', 'gm'), '/')).getTime()
      var chang = windowHeight
      var that = this
      var cunIndex = -1
      var animation = wx.createAnimation({
        transformOrigin: '50% 50%',
        duration: 0,
        timingFunction: 'ease',
        delay: 0
      })
      animation.translateY(chang).step()
      if (xuanriArr[1].length < 2) {
        var xuanYue = '0' + xuanriArr[1]
      } else {
        var xuanYue = xuanriArr[1]
      }
      if (xuanriArr[2].length < 2) {
        var xuanRi = '0' + xuanriArr[2]
      } else {
        var xuanRi = xuanriArr[2]
      }
      for (let d = 0; d < xuanZheData.length; d++) {
        if (shiJIanHaoMiao == xuanZheData[d].getTime) {
          cunIndex = d
        }
      }
      if (cunIndex != -1) {
        xuanZheData.splice(cunIndex, 1)
      } else {
        if (xuanZheData.length < 2) {
          if (xuanZheData.length >= 1) {
            var firstZHI = xuanZheData[0].xuanShiJian + '-' + xuanZheData[0].xuanDayShi
            firstZHI = firstZHI.replace(new RegExp('-', 'gm'), '/')
            var twoZHI = e.currentTarget.dataset.shi + '-' + e.currentTarget.dataset.day
            twoZHI = twoZHI.replace(new RegExp('-', 'gm'), '/')
            // console.log('firstZHI', firstZHI)
            // console.log('twoZHI', twoZHI)
            if (new Date(twoZHI).getTime() < new Date(firstZHI).getTime()) {
              var cha = new Date(firstZHI).getTime() - new Date(twoZHI).getTime()
              xuanZheData.splice(0, 0, { xuanShiJian: e.currentTarget.dataset.shi, xuanDayShi: e.currentTarget.dataset.day, getTime: shiJIanHaoMiao })
              xuanZheData[1].chaDay = parseInt(cha / 86400000)
              delete xuanZheData[0].chaDay
            } else {
              var cha = new Date(twoZHI).getTime() - new Date(firstZHI).getTime()
              xuanZheData.push({ xuanShiJian: e.currentTarget.dataset.shi, xuanDayShi: e.currentTarget.dataset.day, getTime: shiJIanHaoMiao, chaDay: parseInt(cha / 86400000) })
              delete xuanZheData[0].chaDay
            }
          } else {
            xuanZheData.push({ xuanShiJian: e.currentTarget.dataset.shi, xuanDayShi: e.currentTarget.dataset.day, getTime: shiJIanHaoMiao })
          }
        } else {
          var firstZHI = xuanZheData[0].xuanShiJian + '-' + xuanZheData[0].xuanDayShi
          firstZHI = firstZHI.replace(new RegExp('-', 'gm'), '/')
          var twoZHI = e.currentTarget.dataset.shi + '-' + e.currentTarget.dataset.day
          twoZHI = twoZHI.replace(new RegExp('-', 'gm'), '/')
          if (new Date(twoZHI).getTime() < new Date(firstZHI).getTime()) {
            var cha = new Date(firstZHI).getTime() - new Date(twoZHI).getTime()
            xuanZheData.splice(0, 0, { xuanShiJian: e.currentTarget.dataset.shi, xuanDayShi: e.currentTarget.dataset.day, getTime: shiJIanHaoMiao })
            xuanZheData[1].chaDay = parseInt(cha / 86400000)
            delete xuanZheData[0].chaDay
            xuanZheData.splice(2, 1)
          } else {
            var cha = new Date(twoZHI).getTime() - new Date(firstZHI).getTime()
            xuanZheData.splice(1, 1, { xuanShiJian: e.currentTarget.dataset.shi, xuanDayShi: e.currentTarget.dataset.day, getTime: shiJIanHaoMiao, chaDay: parseInt(cha / 86400000) })
            delete xuanZheData[0].chaDay
          }
        }
      }

      var thatBIanHUan
      if (xuanZheData.length >= 2) {
        thatBIanHUan = animation.export()
      } else {
        thatBIanHUan = null
      }
      if (xuanZheData.length == 2) {
        xuanZheData[0].text = '起'; xuanZheData[1].text = '终'
      } else {
        // console.log(xuanZheData[0])
        if (xuanZheData[0]) {
          delete xuanZheData[0].text
        }
        if (xuanZheData[1]) {
          delete xuanZheData[1].text
        }
      }
      that.setData({
        // animationData: thatBIanHUan,
        xuanShiJian: e.currentTarget.dataset.shi,
        xuanDayShi: e.currentTarget.dataset.day,
        xuanri: xuanYue + '-' + xuanRi,
        xuanZheData: xuanZheData
      })
      var xsw_Data = []
      for (let r = 0; r < xuanZheData.length; r++) {
        var obj = {}
        var xsw_day = xuanZheData[r].xuanDayShi.toString()
        if (xsw_day.length < 2) {
          xsw_day = '0' + xsw_day
        }
        obj.data = xuanZheData[r].xuanShiJian + '-' + xsw_day
        obj.getTime = xuanZheData[r].getTime
        if (xuanZheData[r].chaDay) {
          obj.chaDay = xuanZheData[r].chaDay
        }
        obj.text = xuanZheData[r].text
        xsw_Data.push(obj)
      }
      return objfunction(xsw_Data)
    },
    quXiao: function () {
      const myEventDetail = {close: 0} // detail对象，提供给事件监听函数
      this.triggerEvent('myevent', myEventDetail)

      var chang = windowHeight
      var that = this
      var animation = wx.createAnimation({
        transformOrigin: '50% 50%',
        duration: 0,
        timingFunction: 'ease',
        delay: 0
      })

      // xuanZheData = []
      animation.translateY(chang).step()
      that.setData({
        animationData: animation.export(),
        xuanZheData: xuanZheData
      })
      // return objfunction(null)
    },
    quding: function () {
      const myEventDetail = {close: 0, changgeTime: 1} // detail对象，提供给事件监听函数

      this.triggerEvent('myevent', myEventDetail)

      var chang = windowHeight
      var that = this
      var animation = wx.createAnimation({
        transformOrigin: '50% 50%',
        duration: 0,
        timingFunction: 'ease',
        delay: 0
      })
      if (xuanZheData.length == 1) {
        wx.showModal({
          title: '提示',
          content: '请输入结束时间!',
          showCancel: false,
          success: function (res) {
          }
        })
      }
      animation.translateY(chang).step()
      that.setData({
        xuanZheData: xuanZheData,
        animationData: animation.export()
      })
    },
    onshow() {
      var transmitData = this.data.defaultValue.split('.')
      if (transmitData[3] === ' ') {
        transmitData[3] = transmitData[0]
      }

      var obj = {
        xuanShiJian: transmitData.slice(0, 2).join('-'),
        xuanDayShi: transmitData[2],
        shi: transmitData.slice(3, 5).join('-'),
        day: transmitData[5]
      }
      var shiJIan = transmitData.slice(0, 3).join('-')
      obj.getTime = new Date(shiJIan.replace(new RegExp('-', 'gm'), '/')).getTime()

      this.dianXuan(obj)
    },
    /** **************其他事件************************* */
    xianShi: function (obj) {
      this.data.count++
      if (obj.data) {
        objfunction = obj.data
      }
      var chang = windowHeight
      var that = this
      var animation = wx.createAnimation({
        transformOrigin: '50% 50%',
        duration: 0,
        timingFunction: 'ease',
        delay: 0
      })
      animation.translateY(-chang).step()
      that.setData({
        animationData: animation.export()
      })
      if (this.data.count === 1) {
        this.dianXuan()
      }
    }
  }
})
