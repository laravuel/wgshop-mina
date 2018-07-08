import wepy from 'wepy';
import http from '../utils/http';

// 认证
const authorization = (code, data) => http.request(`/socials/mini_program/authorizations?code=${code}`, { method: 'POST', data });

// 商品
const getProduct = (id, data) => http.request(`/shop/products/${id}`, { data });
const getProductSku = (id, skuId, data) => http.request(`/shop/products/${id}/skus/${skuId}`, { data });

// 购物车
const getCartsCount = () => http.request(`/shop/carts/count`);
const getCarts = (data) => http.request(`/shop/carts`, { data });
const storeCart = (data) => http.request(`/shop/carts`, { method: 'POST', data });
const updateCart = (id, num) => http.request(`/shop/carts/${id}`, { method: 'PUT', data: { num: num } });
const deleteCart = (id) => http.request(`/shop/carts/${id}`, { method: 'DELETE' });

export default {
    authorization,
    getProduct,
    getProductSku,
    getCartsCount,
    getCarts,
    storeCart,
    updateCart,
    deleteCart,
}