Page({
    data: {
        deg: 0,
        directionZh: ''
    },
    onLoad: function() {
        wx.onCompassChange(({direction}) => {
            let deg = Math.round(direction*100)/100

            let directionZh = deg === 0 ? '正北' 
                            : deg > 0 && deg < 90 ? '东北'
                            : deg === 90 ? '正东'
                            : deg > 90 && deg < 180 ? '东南'
                            : deg === 180 ? '正南'
                            : deg > 180 && deg < 270 ? '西南'
                            : deg === 270 ? '正西'
                            : deg > 270 && deg < 360 ? '西北'
                            : '正北'

            this.setData({
                deg,
                directionZh
            })
        })
    }
})