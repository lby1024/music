import {jsp} from './jsonp.js'

export function getSingers() {
    // 1: 数据准备
    let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
    let options = {
        param: 'jsonpCallback'
    }
    let data = {
        g_tk: 1928093487,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'jsonp',
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    }
    return jsp(url, data, options) // return的是==>>Promise对象
}

export function cleanData(list) {
    // 1: 提取出需要当数据
    let list1 = list.map((item, index) => {
        if (index < 10) {
            return pick_up(item.Fsinger_mid, item.Fsinger_name, 'hot')
        }
        return pick_up(item.Fsinger_mid, item.Fsinger_name, item.Findex)
    })
    // 2: 分组 ==>> 将title相同当obj放到一起==>> 容器为example==>>{title: 'K', data_list: [obj, obj, obj, ...]}
    let o = Grouping(list1)
    
    // 3: 提取出title为A到Z的obj,然后==>>排序
    let a_to_z = []
    for (let key in o) {
        if (key.match(/[A-Z]/)) a_to_z.push(o[key])
    }
    // 按照a到z当顺序排序
    a_to_z.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })

    // 4: 得到[obj_hot, obj_A, obj_B, obj_C, ...]
    let result = [o['hot'], ...a_to_z]
    return result
}

function pick_up(id, name, title) {
    return {
        id: id,
        name: name,
        picUrl: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`,
        title: title
    }
}
function Grouping (list) {
    let o = {}
    list.map((item) => {
        let key = item.title
        if (!o[key]) {
            o[key] = {
                title: key,
                data_list: []
            }
        }
        o[key].data_list.push(item)
    })
    return o
}

