import wepy from 'wepy';
import api from '@/api/api';

export default {
    async store(order, options = {}) {
        let res = await api.pay(order.id);
        if(res.error) {
            if(options.error) {
                options.error(order);
            }
            return ;
        }
        let config = res.data.config;
        this.requestPayment(config, order, options);
    },

    requestPayment(params, order, options = {}) {
        params.success = (res) => {
            if(res.errMsg == 'requestPayment:ok' ) {
                wepy.showToast({
                    title: '支付成功',
                    icon: 'success'
                }).then(res => {
                    if(options.success) {
                        options.success(order);
                    }
                });
            }
            else {
                wepy.showToast({
                    title: '支付失败',
                }).then(res => {
                    if(options.error) {
                        options.error(order);
                    }
                });
            }
        };

        params.fail = (res) => {
            wepy.showToast({
                title: '支付失败',
            }).then(res => {
                if(options.error) {
                    options.error(order);
                }
            });
        };

        wx.requestPayment(params);
    }
}