const app = getApp()

Page({
    data: {
        markers: '',
        polyline: [{
            points: [{
                longitude: 113.3245211,
                latitude: 23.10229
            }, {
                longitude: 113.324520,
                latitude: 23.21229
            }],
            color:"#FF0000DD",
            width: 2,
            dottedLine: true
        }],
        longitude: '',
        latitude: '',
        name: '',
        address: ''
    },
    regionchange(e) {
        console.log(e.type)
    },
    markertap(e) {
        console.log(e.markerId)
    },
    chessMapCommon() {
        const app = getApp()
        wx.chooseLocation({
            success: ({longitude, latitude, name, address}) => {
                this.setData({
                    longitude,
                    latitude,
                    name,
                    address
                })
                this.setData({
                    markers:[{
                        iconPath: "./img/map-icon.png",
                        id: 0,
                        latitude,
                        longitude,
                        width: 40,
                        height: 40,
                        label: {
                            content: app.globalData.userInfo.nickName,
                            color: '#12e694',
                            textAlign: 'left'
                        }
                    }]
                })
            },
            fail: () => {

            }
        })
    },
    onLoad: function () {
        this.chessMapCommon()
    },
    chessMap() {
        this.chessMapCommon()
    }
  })
  