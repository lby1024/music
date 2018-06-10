<template>
    <div class="search">
        <!-- 搜索框 -->
        <input type="text" placeholder="搜索歌曲歌手" v-model="value" class="search-input">

        <!-- 搜索结果list -->
        <scroll class="search-scroll" v-if="search_list">
            <p v-for="(item, index) in search_list" :key="index" @click="addSong(item)" >
                <i class="icon"></i>
                <span>{{item.songname}} - {{item.albumname}}</span>
            </p>
        </scroll>

        <!-- 热门搜索 -->
        <div class="hot" v-if="hot_list" v-show="!search_list">
            <span v-for="(item, index) in hot_list" @click="search(item.singername)">{{item.singername}}</span>
        </div>
        <div class="hot" v-else></div>

        <!-- 历史搜索list -->
        <div class="history" v-show="!search_list">
            <h1 class="title" @click.stop="del_all">
                <span>历史搜索</span>
                <i class="clear"></i>
            </h1>
            <scroll class="history-list" >
                <p v-for="(item, index) in history_list" :key="index" @click.stop="search(item)">
                    <span>{{item}}</span>
                    <i class="del" @click.stop="del(item)"></i>
                </p>
            </scroll>
        </div>
    </div>
</template>

<script>
    import scroll from '@/pages/recommend/scroll.vue'
    import {get_search_data, get_hot_data} from '@/tools/api/search.js'
    import {mapMutations} from 'vuex'
    import store from '../../vux/store.js'    

    export default {
        store,
        components: { scroll },
        created () {
            get_hot_data().then(res => {
                this.hot_list=res.data.showapi_res_body.pagebean.songlist
                // 取出前十名
                this.hot_list = this.hot_list.slice(0,10)
            })
            // 获取本地缓存
            // this.get_localstory()
        },
        data () {
            return {
                search_list: null,                          // 搜索到的数据
                value: null,                                // 搜索框的值
                page: 1,
                timer: null,                                // 将往后台发送数据请求的频率, 最多200ms一次
                hot_list: null,
                history_list: []
            }
        },
        watch: {
            value () {
                this.search_list = null                     // 当value, 发生变化, 先清空 search_list
                if (!this.value)  return                    // 如果value变成空, 就不再往后台发送请求
                if (this.timer) clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
                    get_search_data(this.value, this.page).then(res => {
                        this.search_list = res.data.showapi_res_body.pagebean.contentlist
                        this.search_list = clean_data(this.search_list)         // 提取出需要的数据
                        console.log(this.search_list)
                    })
                }, 200)
            }
        },
        methods: {
            ...mapMutations(['add_song']),
            // 点击搜索到的某一首歌曲并播放
            addSong (song) {
                this.history_list.unshift(this.value)
                this.add_song(song)                     // 将歌曲添加到播放列表
                this.search_list = null                 // 清空搜索列表
                this.value = null                       // 情况搜索框的value
            },
            // 点击热门标签, 进行搜索
            search (value) {
                this.value = value
            },
            // 删除历史搜索里的某一首
            del (value) {
                this.history_list = this.history_list.filter(item=>item!==value)
            },
            // 清除全部list
            del_all () {
                this.history_list = []
            }
        }
    }

    function clean_data (list) {
        // console.log(list)
        list = list.map(item => {
            return {
                singers: [item.singername],          // 歌手
                albumname: item.albumname,           // 专辑名称
                songname: item.songname,             // 歌曲名称
                songmid: item.songmid,               // 获取歌曲播放链接用的
                albummid: item.albummid,             // 获取歌曲图片用
            }
        })
        return list
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'

    .search
        position absolute
        top 0.4rem
        left 0
        right 0
        bottom 0
        background-color $yellow
        .hot
            min-height 1.8rem
            background-color $yellow
            padding 0 0 0 .44rem 
            span
                margin-right .2rem
                margin-bottom .1rem
                display inline-block
                font-size .16rem    
                background-color rgba(182, 224, 39, .39)
                padding .08rem
                border-radius .09rem
        .history
            font-size .18rem
            line-height 2em
            padding .3rem .5rem 0 .5rem
            .title
                border-bottom 2px solid rgba(0, 0, 0, .5)
                display flex
                justify-content space-between
                align-items center
                i 
                    background-image url('../../assets/image/clear.png')
                    my-ico()
            .history-list
                height 2.3rem
                background-color $yellow
                p
                    display flex
                    justify-content space-between
                    align-items center
                    i   
                        background-size 70% auto !important
                        background-image url('../../assets/image/close.png')
                        my-ico()
        .search-scroll
            height 3.9rem
            margin 0 auto
            width 3rem
            background-color rgba(182, 224, 39, .39)
            border-radius .3rem
            box-sizing border-box
            padding 0 .3rem
            p   
                no-wrap()
                font-size .16rem
                line-height 2.5em
                &:first-child
                    padding-top .18rem
                i 
                    margin-right .1rem
                    transform translateY(.02rem)
                    background-image url('../../assets/image/music.png')
                    my-ico()
        input 
            border-radius .1rem
            display block
            height 0.4rem
            margin .3rem auto  
            width 3rem
            box-sizing border-box
            padding-left .39rem
            font-size .15rem
            background-color rgba(182, 224, 39, .39)
            background-image url('../../assets/image/search.png')
            background-size auto 60%
            background-position 3% center
            background-repeat no-repeat


    
</style>
