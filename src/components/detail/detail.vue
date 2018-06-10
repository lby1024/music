<template>
    <transition name="fade" mode="out-in">
        <div class="detail" v-if="song_list">
            <!-- 头部 -->
            <div class="header" :style="css_header()">
                <i class="back" @click="hidden"></i>
                <div class="veil" :style="css_veil()">
                    <span>{{info.ListName}}</span>
                </div>
            </div>
            <!-- banner图片 -->
            <div class="banner" :style="css_banner()">
                <div class="veil">
                    <span class="btn">随机播放全部</span>
                </div>
            </div>
            <!-- 滚动列表 -->
            <m-scroll>
                <m-card v-if="is_rank" v-for="(item, index) in song_list" :key="index" :song="item" :number="index"></m-card>
                <m-card02 v-if="!is_rank" v-for="(item, index) in song_list" :key="index" :song="item"></m-card02>
            </m-scroll>
        </div>
        <!-- 数据加载没有完成时显示 -->
        <div class="loading" v-if="!song_list">
            loading...
        </div>
    </transition>
</template>

<script>
    import store from '@/vux/store.js'
    import MScroll from './detail-scroll.vue'
    import MCard from './detail_card01.vue'
    import MCard02 from './detail_card02.vue'
    import MLoading from '@/components/loading01.vue'
    import {get_rank_detail, getSingerDetail} from '../../tools/api/detail.js'

    export default {
        store,
        components: { MScroll, MCard, MCard02, MLoading },
        mounted () {
            this.get_data()            
        },
        activated () {   
            this.get_data()
        },
        data () {
            return {
                info: null,                 // detail页面的数据, 标题 和 背景图片
                song_list: null,            // [song, song, song......]
                detail_id: null             // 重路由获取的id
            }
        },
        computed: {
            // better-scroll 的top 值
            top () {
                return this.$store.state.detail.top
            },
            // 是否是rank的详情页面(rank详情页 or singer详情页)
            is_rank () {
                let type = this.$store.state.detail.type
                if (type==='rank') return true
                return false
            }
        },
        methods: {
            // 判断 获取 歌手详情 还是 rank详情
            get_data () {
                if (this.is_rank) {
                    this.get_rank_data()
                }
                else {
                    this.info = this.$store.state.detail.info
                    this.get_singer_data()
                }
            },
            get_rank_data () {
                this.detail_id = this.$route.params.id
                if (!this.detail_id) return                     // id!==null, 就向后台请求数据
                get_rank_detail(this.detail_id)
                .then(res => {
                    // 详情页面的info
                    this.info = res.topinfo
                    // 提取出有用数据
                    this.song_list = res.songlist.map(item=>{
                        return {
                            singers: item.data.singer,          // 歌手
                            albumname: item.data.albumname,     // 专辑名称
                            songname: item.data.songname,       // 歌曲名称
                            songmid: item.data.songmid,         // 获取歌曲播放链接用的
                            albummid: item.data.albummid,       // 获取歌曲图片用
                        }
                    })
                })
            },
            get_singer_data () {
                this.detail_id = this.$route.params.id
                if (!this.detail_id) return                     // id!==null, 就向后台请求数据
                getSingerDetail(this.detail_id)
                .then(res => {
                    let songs = res.data.list
                    // // 提取出有用数据
                    this.song_list = songs.map(item=>{
                        let song = item.musicData
                        return {
                            singers: song.singer,          // 歌手
                            albumname: song.albumname,     // 专辑名称
                            songname: song.songname,       // 歌曲名称
                            songmid: song.songmid,         // 获取歌曲播放链接用的
                            albummid: song.albummid        // 获取歌曲图片用
                        }
                    })
                })
            },
            hidden () {
                this.info = null
                this.song_list = null
                if (this.is_rank) {
                    this.$router.push('/recommend')                
                }
                else {
                    this.$router.push('/singer')
                }
            },
            css_header () {
                let style = {}
                if (this.top<-200) style['background-image'] = `url(${this.info.pic_album})`
                return style
            },
            css_veil () {
                let style = {}
                if (this.top<-200) {
                    style['background-color'] = 'rgba(0, 0, 0, .5)'
                }
                else {
                    style['background-color'] = 'rgba(0, 0, 0, 0)'
                }
                return style

            },
            css_banner () {
                let style = {}
                style['background-image'] = `url(${this.info.pic_album})`
                if (this.top>0) {
                    style['transform'] = `scale(${1+this.top/200})`
                }
                else {
                    style['transform'] = `scale(1)`
                    style['transition'] = 'all .3s ease'                
                }
                return style
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'

    .fade-enter, .fade-leave-to{
        transform translateX(3.75rem)        
    }
    .fade-enter-active, .fade-leave-active{
        transition: all .3s ease
    }
    .detail
        z-index 1
        width 100vw
        height 100vh
        max-width 750px
        position absolute
        left 0
        top 0
        background $yellow
        .header
            position absolute
            top 0
            left 0
            height .4rem
            background-position left  top
            background-size 100% auto 
            background-repeat no-repeat
            width 100%
            z-index 99
            .veil
                height 100%
                display flex
                justify-content center
                align-items center
                color #fff
                font-size .15rem
                font-weight bold
                letter-spacing .1rem
                span
                    width 2.5rem
                    padding-top .05rem
                    display inline-block
                    text-align center
                    no-wrap()
            .back
                z-index 1
                position absolute
                left 0
                top 0
                display inline-block
                width .5rem
                height .4rem
                background-image url('../../assets/image/back.png')
                background-position center center
                background-repeat no-repeat
                background-size 80% 80%
        .banner
            background-position center top
            background-repeat no-repeat
            background-size 100% auto 
            height 2.6rem
            .veil
                height 100%
                background-color rgba(0, 0, 0, .5)
                padding-top 2rem
                box-sizing border-box
                text-align center
                .btn
                    display inline-block
                    border 2px solid $yellow
                    border-radius .2rem
                    width 1.2rem
                    height .3rem
                    line-height .3rem
                    font-size .12rem
                    color $yellow
                    background-image url('../../assets/image/play.png')
                    background-size 15% auto
                    background-repeat no-repeat
                    background-position 10% center
                    padding-left .2rem
                    box-sizing border-box
                    padding-bottom .29rem
    .loading
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        display flex
        justify-content center
        align-items center
        background-color $yellow
</style>
