import {get_lyric} from '../tools/api/lyric.js'

const state = {
    name: '音乐播放器',
    play_list: [],                      // 播放列表
    cur_song: null,                     // 正在播放的歌曲--->>决定了player组件是否加载--->> v-if="cur_song"
    is_playing: false,                  // 播放 or 暂停
    deg: 0,                             // CD的旋转角度
    timer: null,                        // CD旋转用
    play_type: 0,                       // 播放类型 : 单曲循环 or 列表循环 ......
    song_list_show: false,              // 歌曲列表是否显示
    big_show: true,                     // 全屏播放器是否显示
    mini_show: false,
    ing_time: 0,                        // 当前播放到的时间--->> 决定进度条左边时间的显示, 和黑色进度条的长度
    end_time: 0,                        // 一首歌的总时长
    turn_time: 0,                       // 要跳转到的时间
    is_finger_moving: false             // 手指是否在拖拽进度条--->> 如果正在拖拽进度条, get_palyer_time()将不执行
}

const mutations = {
    // 点击播放列表里面某一首歌曲, 换歌
    change_song (state, payload) {
        state.cur_song = payload
        // 2 : cd 重新开始旋转
        state.deg = 0                                   // 旋转角度初始化
        clearInterval(state.timer)                      // 清楚上一个定时器--->> 不然会越转越快
        state.timer = setInterval(()=>state.deg++, 50)  // 启动新的定时器, 每 50ms 转 1deg
        // 4 : 将播放状态设置为true
        state.is_playing = true
    },
    // 点击card, 往歌曲列表添加歌曲, 并播放这首歌曲
    add_song (state, payload) {
        // 0 : 获取歌词--->>并且添加到歌曲对象里面--->> song = {lyric, songname, songmid, singers, ...}
        let lyric
        get_lyric(payload.songmid).then(res=>{
            lyric=res
            let song = {lyric, ...payload}
            // 1 : 往歌曲列表里面添加歌曲
            let list = state.play_list
            list = [song, ...list]                          // 添加歌曲
            list = no_repeat(list)                          // 去重
            state.play_list = list
            // 2 : 将添加的歌曲设置为cur_song
            state.cur_song = song
            // 3 : cd 开始旋转
            state.deg = 0                                   // 旋转角度初始化
            clearInterval(state.timer)                      // 清楚上一个定时器--->> 不然会越转越快
            state.timer = setInterval(()=>state.deg++, 50)  // 启动新的定时器, 每 50ms 转 1deg
            // 4 : 将播放状态设置为true
            state.is_playing = true
            // 5 : 如果song_list.length=1, 显示大播放器, 否则显示小播放器
            if (state.play_list.length===1) {
                state.big_show = true
                state.mini_show = false
            }
            else {
                state.big_show = false
                state.mini_show = true
            }
        })     
    },
    // 点击按钮 播放 or 暂停 
    play_pause (state, payload) {
        // 1 : 改变播放状态
        state.is_playing = payload
        // 2 : 根据播放状态--->> 判断CD是否旋转
        if (payload) {
            state.timer = setInterval(()=>state.deg++, 50)
        }
        else {
            clearInterval(state.timer)
        }
    },
    // 改变列表循环状态
    change_play_type (state, payload) {
        let num = state.play_type
        num++
        if (num>3) num=0
        state.play_type = num
    },
    // 点击 X , 关闭播放器
    close_song_list (state, payload) {
        state.song_list_show = false    // 收起列表
        state.mini_show = false
    },
    // 点击垃圾桶, 清空歌曲列表
    clear_song_list (state, payload) {
        state.play_list = []
    },
    // 歌曲列表的显示和隐藏
    list_show_hidden (state, payload) {
        state.song_list_show = payload
    },
    // 删除某一首歌曲--->>干两件事情 : 1, 播放下面一首歌曲--->> 2, 将歌曲从列表中删除 
    del_one_song (state, payload) {
        let cur_index = payload                                             // 获取要删除歌曲, 在list中的index值
        let next_index = get_next_song_index(cur_index, state.play_list)    // 获取要删除歌曲下面一首歌的index值
        if (state.play_list.length===1) {
            state.cur_song = state.play_list[cur_index]                     // 如果播放列表里面只有一首歌, 那么点击删除按钮后还是播放被删除的歌曲
        }
        else {
            state.cur_song = state.play_list[next_index]                    // 播放被删除歌曲的下面一首歌曲
        }
        state.play_list.splice(cur_index, 1)                                // 将被点击歌曲从列表中删除
    },
    // 播放上一首歌曲
    pre (state, payload) {
        state.deg = 0
        let list = state.play_list
        // 1 : 获取cur_song的index值
        let cur_index = get_cur_song_index(state.cur_song, list)
        // 2 : 获取上一首歌曲的index值
        let pre_index = --cur_index
        if (pre_index<0) pre_index = list.length-1
        // 3 : 播放上一首歌曲
        state.cur_song = state.play_list[pre_index]  
        state.is_playing = true      
    },
    // 播放下一首歌曲
    next (state, payload) {
        state.deg = 0
        let list = state.play_list
        // 1 : 获取cur_song的index值
        let cur_index = get_cur_song_index(state.cur_song, list)
        // 2 : 获取下一首歌曲的index值
        let next_index = ++cur_index
        if (next_index>list.length-1) next_index=0
        // 3 : 播放下一首歌曲
        state.cur_song = state.play_list[next_index]        
        state.is_playing = true      
    },
    // 触发场景 : 当一首歌曲播放完毕的时候--->> 根据type, 播放下一首歌曲
    ended (state, payload) {
        state.deg = 0
        let type = state.play_type
        let list = state.play_list
        // 0 : 当一首歌播放结束, 将播放状态变为false
        state.is_playing = false
        // 1 : 获取cur_song的index值
        let cur_index = get_cur_song_index(state.cur_song, list)
        // 2 : 获取下一首歌的index值
        let next_index
        if (type===0) {         // 如果是列表循环
            next_index = get_next_song_index(cur_index, list)
        }
        else if (type===1) {    // 如果是单曲循环
            next_index = cur_index
        }
        else if (type===2) {    // 如果是顺序播放
            next_index = cur_index+1
            if (next_index>list.length-1)    // 顺序播放到最后一首歌曲, 将不再播放任何歌曲
            {
                next_index = list.length-1
                state.is_playing = false    // is_palying=false, 按钮变为播放cion, 
                clearInterval(state.timer)
            }
        }
        else if (type===3) {    // 如果是随机播放
            let num = list.length
            next_index = cur_index
            while (next_index===cur_index) {
                next_index = parseInt(Math.random()*num)
            }
        }
        // 3 : 播放下一首歌曲
        console.log(next_index, '播放结束后, 自动选择下一首歌曲播放')
        state.cur_song = state.play_list[next_index]
        state.is_playing = true
    },
    // 隐藏全屏播放器, 显示mini播放器--->> 触发场景 : 点击全屏播放器的向下按钮
    big_player_hidden (state, payload) {
        state.big_show = false
        state.mini_show = true
    },
    // 隐藏mini播放器, 显示全屏播放器--->> 触发场景 : 点击mini播放器, 显示全屏播放器
    big_player_show (state, payload) {
        state.big_show = true
        state.mini_show = false
    },
    // 设置时间轴 两端的时间--->> 触发场景 : <audio></audio>的钩子函数@timeupdate
    get_palyer_time (state, payload) {
        if (state.is_finger_moving) return  // 如果正在拖拽进度条, get_palyer_time()将不执行
        state.ing_time = payload.ing_time
        state.end_time = payload.end_time
    },
    // --->> 触发场景 : @1:点击进度条, 跳转时间 @2手指拖动进度条结束时,@touchend时
    turn_to_the_time (state, payload) {
        state.turn_time = payload
        state.is_finger_moving = false
    },
    // 改变cd 角度
    rotate_cd (state, payload) {
        state.deg = payload
    }
}
// 获取cur_song的index值
// 第一个参数 : 当前的歌曲 cur_song = {songname, songmid, singers........}
// 第二个参数 : 歌曲列表 list = [{}, {}, {}....]
function get_cur_song_index (cur_song, list) {
    let cur_song_index
    list.map((item, index)=>{
        if (item.songmid===cur_song.songmid) cur_song_index=index 
    })
    return cur_song_index
}
// 获取下一首歌的index值 
// 第一个参数 : 当前歌曲的index值
// 第二个参数 : 歌曲列表
function get_next_song_index (cur_index, list) {
    let next_index = cur_index+1
    if (next_index>list.length-1) next_index=0
    return next_index
}
// 去重--->> 去掉歌曲列表里面重复的歌曲
function no_repeat (list) {
    list = list.map(item => JSON.stringify(item))   // 将item变成字符串
    list = [...new Set(list)]                       // 去重
    list = list.map(item => JSON.parse(item))       // 将string转变成obj
    return list
}

const detail={
    state,mutations
}

export default detail
