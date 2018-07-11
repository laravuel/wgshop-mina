import wepy from 'wepy';
import api from '../api/api';

class User {

    data = null;

    async get(refresh = false) {
        console.log('get user');
        if (this.data && !refresh) {
            return this.data;
        }
        let res = await api.getUser();
        this.data = res.data;
        return this.data;
    };

    /**
     * 用户登录状态认证
     */
    async auth() {
        let accessToken = wx.getStorageSync('access_token');
        if (!accessToken) {
            return this.authorization();
        }
        return this.get();
    }

    async authorization() {
        let loginRes = await wepy.login();
        let data = await this.authCode(loginRes.code);
        if (data) {
            return data;
        }
        else {
            wepy.navigateTo({ url: '/pages/auth/login' });
            return false;
        }
    }

    async authCode(code) {
        let res = await api.authorization(code);
        if (res.statusCode == 200 || res.statusCode == 201) {
            wx.setStorageSync('access_token', res.data.meta.access_token);
            this.data = res.data;
            return this.data;
        }
        return false;
    }

    async authorizationLogin(encData, code = '') {
        let res = await api.authorization(code, { enc: encData.encryptedData, iv: encData.iv });
        if (res.statusCode == 200 || res.statusCode == 201) {
            wx.setStorageSync('access_token', res.data.meta.access_token);
            this.data = res.data;
        }
        return this.data;
    }
}

export default new User();