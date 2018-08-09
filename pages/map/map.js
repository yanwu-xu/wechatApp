const app = getApp()

Page({
    data: {
        markers:'',
        polyline: '',
        longitudeCenter: '',
        latitudeCenter: '',
        longitudeFrom: '',
        latitudeFrom: '',
        longitudeTo: '',
        latitudeTo: '',
        nameFrom: '现在的位置',
        addressFrom: '现在的位置',
        nameTo: '',
        addressTo: '',
        lineLength: ''
    },
    regionchange(e) {
        console.log(5656565,e.type)
    },
    //点击marker
    markertap(e) {
        console.log(1212, e.markerId)
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
    //
    chessMapCommon(type) {
        const app = getApp()
        wx.chooseLocation({
            success: ({longitude, latitude, name, address}) => {
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
                this.setData({
                    polyline: [{
                        points: [{
                            longitude: this.data.longitudeFrom,
                            latitude: this.data.latitudeFrom
                        }, {
                            longitude: this.data.longitudeTo,
                            latitude: this.data.latitudeTo
                        }],
                        color:"#FF0000DD",
                        width: 4,
                        arrowLine: true,
                        dottedLine: true
                    }],
                })
                this.setData({
                    markers: [{
                        iconPath: "./img/map-icon.png",
                        id: 'From',
                        longitude: this.data.longitudeFrom,
                        latitude: this.data.latitudeFrom,
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
                        longitude: this.data.longitudeTo,
                        latitude: this.data.latitudeTo,
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
                    }]
                })
                this.getLength()
            },
            fail: () => {

            }
        })
    },
    onLoad: function () {
        //获取当前位子
        wx.getLocation({
            success: ({longitude, latitude}) => {
                this.setData({
                    longitudeFrom: longitude,
                    latitudeFrom: latitude
                })
                this.chessMapCommon('To')
            }
        })
    },
    chessMap() {
        this.chessMapCommon()
    }
  })
  