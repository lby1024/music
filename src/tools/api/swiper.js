// 获取轮播图数据

import {jsp} from './jsonp.js'
// import axios from 'axios'

export function get_swiper_data() { // 获取轮播图
    // 1: 数据准备
    let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    let options = {
        param: 'jsonpCallback'
    }
    let data = {
        g_tk: 1928093487,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'jsonp',
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    }
    return jsp(url, data, options) // return的是==>>Promise对象
}
