import wepy from 'wepy';
import api from '@/api/api';

export default {
    async store(order, options = {}) {
        let res = await api.pay(order.id);
        if (res.error) {
            wx.showModal({
                title: '支付失败',
                content: res.data.message,
                showCancel: false,
                success: function (ret) {
                    if(options.error) {
                        options.error(order);
                    }
                }
            })
            return;
        }
        let config = res.data.config;
        this.requestPayment(config, order, options);
    },

    requestPayment(params, order, options = {}) {
        params.success = (res) => {
            if (res.errMsg == 'requestPayment:ok') {
                wepy.showToast({
                    title: '支付成功',
                    icon: 'success'
                }).then(res => {
                    if (options.success) {
                        options.success(order);
                    }
                });
            }
            else {
                wx.showModal({
                    title: '提示',
                    content: '支付失败',
                    showCancel: false,
                    success: () => {
                        if (options.error) {
                            options.error(order);
                        }
                    }
                })
            }
        };

        params.fail = (res) => {
            wx.showModal({
                title: '提示',
                content: '支付失败',
                showCancel: false,
                success: () => {
                    if (options.error) {
                        options.error(order);
                    }
                }
            })
        };

        wx.requestPayment(params);
    }
}