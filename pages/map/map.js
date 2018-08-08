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
        wx.chooseLocation({
            success: ({longitude, latitude, name, address}) => {
                console.log(11111, {longitude, latitude, name, address})
                this.setData({
                    longitude,
                    latitude,
                    name,
                    address
                })
                this.setData({
                    markers:[{
                        iconPath: "./img/icon-home-active.png",
                        id: 0,
                        latitude,
                        longitude,
                        width: 20,
                        height: 20,
                        label: {
                            content: '哈哈哈',
                            color: '#fe5632',
                            textAlign: 'left'
                        }
                    }]
                })
            },
            fail: () => {
                console.log(22223444)
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