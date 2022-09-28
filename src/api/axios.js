/*
 * @Author: Topskys
 * @Date: 2022-09-27 22:51:24
 * @LastEditTime: 2022-09-27 23:09:11
 */
import axios from 'axios';
import config from '../config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro


class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }

    interceptors(instance) {
        // Add a request interceptor
        instance.interceptors.request.use(function (config) {
            // Do something before request is sent
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        // Add a response interceptor
        instance.interceptors.response.use(function (response) {
            // Do something with response data
            return response;
        }, function (error) {
            // Do something with response error
            return Promise.reject(error);
        });
    }

    request(options) {
        const instance = axios.create()
        options = { ...this.getInsideConfig(), ...options }
        this.interceptors(instance)
        return instance(options)
    }
}


export default new HttpRequest(baseUrl)