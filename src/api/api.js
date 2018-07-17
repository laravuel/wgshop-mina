import wepy from 'wepy';
import http from '../utils/http';

// 认证
const getUser = (data) => http.request(`/user`, { data });
const authorization = (code, data) => http.request(`/socials/mini_program/authorizations?code=${code}`, { method: 'POST', data });

// 支付
const pay = (orderId, data = {}) => http.request(`/pay/${orderId}`, { method: 'POST', data: Object.assign(data, { type: 'mini_program' }) });

// 分类
const getCategories = (data) => http.request(`/shop/categories`, { data });

// 商品
const getProducts = (object) => http.request(`/shop/products`, object);
const getProduct = (id, data) => http.request(`/shop/products/${id}`, { data });
const getProductSku = (id, skuId, data) => http.request(`/shop/products/${id}/skus/${skuId}`, { data });

// 购物车
const getCartsCount = () => http.request(`/shop/carts/count`);
const getCarts = (data) => http.request(`/shop/carts`, { data });
const storeCart = (data) => http.request(`/shop/carts`, { method: 'POST', data });
const updateCart = (id, num) => http.request(`/shop/carts/${id}`, { method: 'PUT', data: { num: num } });
const deleteCart = (id) => http.request(`/shop/carts/${id}`, { method: 'DELETE' });

// 收货地址
const getDistricts = (data) => http.request(`/districts`, { _loading: false, data });
const getAddresses = (data) => http.request(`/user/addresses`, { data });
const getAddress = (id, data) => http.request(`/user/addresses/${id}`, { data });
const storeAddress = (data) => http.request(`/user/addresses`, { method: 'POST', data });
const updateAddress = (id, data) => http.request(`/user/addresses/${id}`, { method: 'PUT', data });
const deleteAddress = (id) => http.request(`/user/addresses/${id}`, { method: 'DELETE' });

// 订单
const getOrders = (object) => http.request(`/shop/orders`, object);
const getOrder = (id, data) => http.request(`/shop/orders/${id}`, { data });
const storeOrder = (data) => http.request(`/shop/orders`, { method: 'POST', data });
const updateOrder = (id, data) => http.request(`/shop/orders/${id}`, { method: 'PUT', data });
const cancelOrder = (id) => http.request(`/shop/orders/${id}/cancel`, { method: 'POST' });
const receivingOrder = (id) => http.request(`/shop/orders/${id}/receiving`, { method: 'POST' });

// 优惠券
const getUserCoupons = (object) => http.request(`/user/coupons`, object);
const getUserCoupon = (id, data) => http.request(`/user/coupons/${id}`, { data });
const storeCoupon = (couponId, data = {}) => http.request(`/user/coupons`, { method: 'POST', data: Object.assign(data, { coupon_id: couponId }) });
const getCoupons = (data) => http.request(`/shop/coupons`, { data });
const getCoupon = (id, data) => http.request(`/shop/coupons/${id}`, { data });

// 专题/促销
const getSpecials = (object) => http.request(`/shop/specials`, object);
const getSpecial = (id, data) => http.request(`/shop/specials/${id}`, { data });

export default {
    getUser,
    authorization,
    pay,
    getProducts,
    getProduct,
    getProductSku,
    getCartsCount,
    getCarts,
    storeCart,
    updateCart,
    deleteCart,
    getDistricts,
    getAddress,
    getAddresses,
    storeAddress,
    updateAddress,
    deleteAddress,
    getOrders,
    getOrder,
    storeOrder,
    updateOrder,
    cancelOrder,
    receivingOrder,
    getUserCoupons,
    getUserCoupon,
    getCoupons,
    getCoupon,
    getCategories,
    storeCoupon,
    getSpecials,
    getSpecial,
}