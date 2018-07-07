import wepy from 'wepy';

export default {
    /**
     * 获取两个坐标的距离
     * @param {*} rLoc 
     * @param {*} dLoc 
     */
    getDistance(rLoc, dLoc) {
        let radius = 6378.137;
        let pi = 3.1415926;
        let radiusRLoc = {
            lat: rLoc.lat * pi / 180.0,
            lng: rLoc.lng * pi / 180.0
        }
        let radiusDLoc = {
            lat: dLoc.lat * pi / 180.0,
            lng: dLoc.lng * pi / 180.0
        }
        let hLat = radiusRLoc.lat - radiusDLoc.lat;
        let hLng = radiusRLoc.lng - radiusDLoc.lng;
        let distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(hLat / 2), 2) + Math.cos(radiusRLoc.lat) * Math.cos(radiusDLoc.lat) * Math.pow(Math.sin(hLng / 2), 2)));
        distance = Math.round(distance * radius) / 1000;

        return distance;
    },

    /**
     * 克隆对象
     * @param {Object} obj 
     * @returns {Object}
     */
    clone(obj) {
        var newObj = {};
        if (obj instanceof Array) {
            newObj = [];
        }
        for (var key in obj) {
            var val = obj[key];
            newObj[key] = typeof val === 'object' ? this.clone(val) : val;
        }
        return newObj;
    },

    /**
     * 转换小程序scene参数为数组
     * @param {string} scene 
     * @returns {Array}
     */
    handleScene(scene) {
        scene = decodeURIComponent(scene);
        if (!scene) return null;
        let sceneParams = scene.split('&');
        if (!sceneParams) return null;
        let params = {};
        for (let item of sceneParams) {
            let arr = item.split('=');
            if (arr && arr.length == 2) {
                params[arr[0]] = arr[1];
            }
        }
        return params;
    },

    /**
     * 获取当前地理位置坐标
     */
    async getLocation() {
        return wepy.getLocation().then(res => {
            let location = {
                lng: res.longitude,
                lat: res.latitude
            };
            return location;
        });
    }
}