import axios from 'axios'
import {
    jsp
} from './jsonp.js'

export function get_rank_detail(topid) {
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
    let options = {
        param: 'jsonpCallback'
    }
    let data = {
        topid,
        g_tk: 1928093487,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'jsonp',
        needNewCode: 1,
        uin: 0,
        tpl: 3,
        page: 'detail',
        type: 'top',
        platform: 'h5'
    }
    return jsp(url, data, options) // return一个promise对象
}

export function getSingerDetail(singermid) {
    // console.log(singermid)
    // console.log('0025NhlN2yWrP4')
    // 1: 数据准备
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    let options = {
        param: 'jsonpCallback'
    }
    let data = {
        singermid,
        g_tk: 1928093487,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'jsonp',
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        begin: 0,
        num: 80,
        songstatus: 1
    }
    return jsp(url, data, options) // return的是==>>Promise对象
}
