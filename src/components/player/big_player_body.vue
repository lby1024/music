<template>
    <swiper class="big-player-body" :options="options">
        <!-- 第一页: 旋转的CD -->
        <swiper-slide class="CD">
            <img v-lazy="pic_src" alt="" :style="css_CD()">
        </swiper-slide>
        <!-- 第二页 : 滚动的歌词 -->
        <swiper-slide class="lyric">
            <scroll class="scroll" v-if="lyric" ref="scroll">
                <p v-for="(item, index) in lyric" :key="index" :class=" index==cur_lyric?'cur lines':'lines' ">{{item.txt}}</p>
            </scroll>
            <div class="no-lyric" v-else> 没有歌词 . . . </div>
        </swiper-slide>
        <!-- 分页器 -->
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import scroll from './player_scroll.vue'
    import store from '../../vux/store.js'    
    import Lyric from 'lyric-parser'

    export default {
        store,
        components: { swiper, swiperSlide, scroll },
        data () {
            return {
                options: {
                    followFinger : false,                   // 如设置为false，手指滑动时slide不会动，当你释放时slide才会切换。
                    pagination: {el: '.swiper-pagination'}
                },
                // 正唱到的那句歌词, 所在行数
                cur_lyric: 0,
                // 降低执行频率用的
                timer: null
            }
        },
        computed: {
            cur_song () {
                return this.$store.state.player.cur_song
            },
            pic_src () {
                return `https://y.gtimg.cn/music/photo_new/T002R500x500M000${this.cur_song.albummid}.jpg`
            },
            // 歌词list = [{time, txt}, {time, txt}, {time, txt}, ......]
            lyric () {
                let lyric = new Lyric(this.cur_song.lyric)      // 将字符串格式的歌词转换成obj = {lines, ....}
                return lyric.lines                             // lyric.lines = [{time, txt}, {time, txt}, {time, txt}, ......]
            },
            ing_time () {
                return this.$store.state.player.ing_time
            },
            deg () {
                return this.$store.state.player.deg
            }
        },
        watch: {
            // 获取正在唱的歌词是第几行
            ing_time () {
                // 降低频率
                if (this.timer) clearTimeout(this.timer)
                this.timer = setTimeout(() => this.cur_lyric=get_curline_number(this.ing_time, this.lyric), 100)    // 获取正在唱的歌词是第几行
            },
            // 滚动歌词
            cur_lyric () {
                if (this.cur_lyric<9) return
                let ele = document.getElementsByClassName('lines')[this.cur_lyric-9]
                this.$refs.scroll.scroll_to(ele)
            }
        },
        methods: {
            // cd 旋转功能的实现
            css_CD () {
                let style = {}
                style['transform'] = `rotate(${this.deg}deg)`
                return style
            }
        }
    }
    // 获取正在唱的歌词是第几行
    // ing_time 在哪个区间 [第0句歌词0s开始唱, 第1句歌词10s开始唱, 第2句歌词20s开始唱,.... ]--->> ing_time==15, 10<15<20, return index=1
    // 第一个参数 : 当前时间
    // 第二个参数 : 歌词数据 [{time, txt}, {time, txt}, {time, txt}, ......]
    function get_curline_number (ing, list) {
        for (let i=0; i<list.length; i++) {
            let x = ing                                 // a < x < b
            let a = list[i].time/1000
            let b = list[i+1]?list[i+1].time/1000:3600  // 如果唱到最后一句, list[index+1]必然不存在, 此时b==3600s=1小时==无穷大
            if (a<x&&x<b) return i
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'

    .big-player-body
        // background-color $yellow
        overflow visible
        margin-bottom .3rem
        position absolute
        left 0
        right 0
        top .85rem
        bottom 1.36rem
        &>>>.swiper-pagination-bullet-active
            width .233rem
            border-radius .08rem
            background-color black 
        &>>>.swiper-pagination-bullet
            background-color black 
            opacity .6
            transition all .2s ease    
            transform translateY(.39rem)
        .CD
            display flex
            justify-content center
            align-items center
            img 
                width 3rem
                border-radius 1.5rem
                border 12px solid rgba(3, 3, 3, .5)
                box-sizing border-box
        .lyric
            height 100%
            .scroll
                height 100%
                p
                    text-align center
                    font-size .15rem
                    line-height 1.5em
                    color #333
                    &.cur
                        font-size .18rem
                        font-weight bolder
                        color #333
        .no-lyric
            height 100%
            display flex
            justify-content center
            align-items center
</style>
