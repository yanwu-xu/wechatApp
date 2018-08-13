const app = getApp()

Page({
    data: {
        markers: [{
            iconPath: "./img/map-icon.png",
            id: 'From',
            width: 40,
            height: 40,
            label: {
                content: '起点',
                color: '#ffffff',
                textAlign: 'left',
                fontSize: 12,
                bgColor: '#8AC9FF',
                padding: 2,
                borderRadius: 4
            }
        }, {
            iconPath: "./img/map-icon.png",
            id: 'To',
            width: 40,
            height: 40,
            label: {
                content: '终点',
                color: '#ffffff',
                textAlign: 'left',
                fontSize: 12,
                bgColor: '#8AC9FF',
                padding: 2,
                borderRadius: 4
            }
        }],
        polyline: [{
            points: [],
            color:"#FF0000DD",
            width: 4,
            arrowLine: true,
            dottedLine: true
        }],
        longitudeCenter: '',
        latitudeCenter: '',
        longitudeFrom: '',
        latitudeFrom: '',
        longitudeTo: '',
        latitudeTo: '',
        nameFrom: '你的位置',
        addressFrom: '现在的位置',
        nameTo: '',
        addressTo: '',
        lineLength: '',
        showAddressFrom: false,
        showAddressTo: false,
        addressFromDescript: '',
        addressToDescript: '',
        animationFromData: '',
        animationToData: ''
    },
    regionchange(e) {
        console.log(5656565,e.type)
    },
    //点击marker
    markertap(e) {
        this.chessMapCommon(e.markerId)
    },
    //获取两点间距离
    getLength() {
        const EARTH_RADIUS = 6378137.0
        const PI = Math.PI
        let radLat1 = this.data.latitudeFrom*PI/180.0
        let radLat2 = this.data.latitudeTo*PI/180.0
        
        let a = radLat1 - radLat2
        let b = this.data.longitudeFrom*PI/180.0 - this.data.longitudeTo*PI/180.0
        
        let s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)))
        s = s*EARTH_RADIUS
        s = Math.round(s*10000)/10000.0
        this.setData({
            lineLength: s
        })
    },
    //设置map的参数
    setMapData(longitude, latitude, name, address, type) {
        this.setData({
            ['longitude' + type]: longitude,
            ['latitude' + type]: latitude,
            ['name' + type]: name,
            ['address' + type]: address
        })
        let longitudeCenter = (this.data.longitudeTo + this.data.longitudeFrom)/2
        let latitudeCenter = (this.data.latitudeTo + this.data.latitudeFrom)/2
        this.setData({
            longitudeCenter,
            latitudeCenter
        })
        console.log('zhongjain', longitudeCenter, '----', latitudeCenter)
        this.setData({
            'polyline[0].points[0].longitude': this.data.longitudeFrom,
            'polyline[0].points[0].latitude': this.data.latitudeFrom,
            'polyline[0].points[1].longitude': this.data.longitudeTo,
            'polyline[0].points[1].latitude': this.data.latitudeTo
        })
        this.setData({
            'markers[0].longitude': this.data.longitudeFrom,
            'markers[0].latitude': this.data.latitudeFrom,
            'markers[1].longitude': this.data.longitudeTo,
            'markers[1].latitude': this.data.latitudeTo
        })
        this.getLength()
    },
    //调取地图选取地点
    chessMapCommon(type) {
        const app = getApp()
        wx.chooseLocation({
            success: ({longitude, latitude, name, address}) => {
                this.setMapData(longitude, latitude, name, address, type)
            }
        })
    },
    onLoad: function (options) {
        console.log('options', options)
        //获取当前位子
        wx.getLocation({
            success: ({longitude, latitude}) => {
                this.setData({
                    longitudeFrom: longitude,
                    latitudeFrom: latitude
                })
                if(Object.keys(options).length) {
                    wx.authorize({
                        scope: 'scope.userInfo',
                        success: () => {
                            wx.getUserInfo({
                                success: res => {
                                    this.setData({
                                        'markers[0].label.content': res.userInfo.nickName || '',
                                        'markers[1].label.content': options.userName || '',
                                    })
                                }
                            })
                        }
                    })
                    
                    this.setMapData(options.longitude, options.latitude, '终点', '终点address', 'To')
                } else {
                    this.chessMapCommon('To')
                }
            }
        })
    },
    chessMap() {
        this.chessMapCommon()
    },
    addressShowFrom() {
        let animationFrom, animationTo

        if (!this.data.showAddressTo) {
            animationFrom = wx.createAnimation({
                duration: 500,
                timingFunction: 'ease'
            })
            animationTo = wx.createAnimation({})
            if (!this.data.showAddressFrom) {
                animationFrom.translateY(37).step()
            } else {
                animationFrom.translateY(-37).step()
            }
        } else {
            animationFrom = wx.createAnimation({
                duration: 500,
                timingFunction: 'ease',
                delay: 500
            })
            animationTo = wx.createAnimation({
                duration: 500,
                timingFunction: 'ease'
            })
            if (!this.data.showAddressFrom) {
                animationFrom.translateY(37).step()
                animationTo.translateY(-37).step()
            } else {
                animationFrom.translateY(-37).step()
                animationTo.translateY(-37).step()
            }
        }

        this.setData({
            showAddressTo: false,
            showAddressFrom: !this.data.showAddressFrom,
            addressFromDescript: this.data.addressFrom,
            animationFromData: animationFrom.export(),
            animationToData: animationTo.export()
        })
    },
    addressShowTo() {
        let animationTo, animationFrom

        if (!this.data.showAddressFrom) {
            animationTo = wx.createAnimation({
                duration: 500,
                timingFunction: 'ease'
            })
            animationFrom = wx.createAnimation({})
            if (!this.data.showAddressTo) {
                animationTo.translateY(37).step()
            } else {
                animationTo.translateY(-37).step()
            }
        } else {
            animationTo = wx.createAnimation({
                duration: 500,
                timingFunction: 'ease',
                delay: 500
            })
            animationFrom = wx.createAnimation({
                duration: 500,
                timingFunction: 'ease'
            })
            if (!this.data.showAddressTo) {
                animationTo.translateY(37).step()
                animationFrom.translateY(-37).step()
            } else {
                animationTo.translateY(-37).step()
                animationFrom.translateY(-37).step()
            }
        }
        
        this.setData({
            showAddressFrom: false,
            showAddressTo: !this.data.showAddressTo,
            addressToDescript: this.data.addressTo,
            animationFromData: animationFrom.export(),
            animationToData: animationTo.export()
        })
    },
    onShareAppMessage: function(options) {
        return {
            title: '桦通通-小程序',
            path: `/pages/map/map?longitude=${this.data.longitudeFrom}&latitude=${this.data.latitudeFrom}&userName=${app.globalData.userInfo.nickName}`
        }
    }
  })
  