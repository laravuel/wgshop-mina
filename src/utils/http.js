import wepy from 'wepy';
import user from '../store/user';
import env from '../env';

export default {
    before(url, params) {
        params.method = params.method || 'GET';
        params.header = {};
        let accessToken = wx.getStorageSync('access_token');
        if (accessToken) {
            params.header['Authorization'] = 'Bearer ' + accessToken;
        }
        if(params._v) {
            params.header['Accept'] = `application/prs.${env.apiSubType}.${params._v}+json`;
        }
        params.url = env.apiProtocol + env.apiUrl + url;
        return params;
    },

    after(res) {
        wepy.hideLoading();
        if (res.header.access_token) {
            wx.setStorageSync('access_token', res.header.access_token);
        }
        if (res.statusCode != 200 && res.statusCode != 201) {
            if (res.statusCode == 401 || res.statusCode == 403) {
                if (res.statusCode == 403) {
                    wx.removeStorageSync('access_token');
                }
                // 跳转至授权页面
                wepy.navigateTo({ url: '/pages/auth/login' });
            }
            else {
                wepy.showToast({
                    title: res.data.message,
                    icon: 'none'
                });
            }
            res.error = true;
        }

        return res;
    },

    async request(url, params = {}) {
        params = this.before(url, params);

        let loading = true;
        if (typeof (params._loading) != 'undefined') {
            loading = params._loading;
        }
        if (loading) {
            wepy.showLoading({
                mask: true,
                title: '加载中'
            });
        }
        let res = await wepy.request(params);

        // 请求结束
        res = this.after(res);
        return res;
    }
};