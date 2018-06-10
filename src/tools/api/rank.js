import axios from 'axios'
import {jsp} from './jsonp.js'

export function get_rank_data () {
    // 准备数据
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
    let options = {
        param: 'jsonpCallback'
    }
    let data = {
        g_tk:1928093487,
        inCharset:'utf-8',
        outCharset:'utf-8',
        notice:0,
        format:'jsonp',
        uin:0,
        needNewCode:1,
        platform:"h5",
    }
    return jsp(url, data, options)
}
