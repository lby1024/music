<template>
    <div class="progress"
        @touchmove.stop="touchmove"
        @touchend.stop="touchend" >
        <span class="ing">{{ing_time}}</span>
        <span class="line01" ref="line01" @click="turn_to">
            <span class="line02" :style="css_line02()"></span>
            <span class="btn" ref="btn" :style="css_btn()" @touchstart.stop="touchstart"></span>
        </span>
        <span class="end">{{end_time}}</span>
    </div>
</template>

<script>
    import store from '../../vux/store.js'
    import {getMousePos} from '@/tools/get_mouse_pos.js'

    export default {
        store,
        data () {
            return {
                w_line01: 0,            // 灰色进度条长度--->> 生命周期mouted的时候获取
                w_line02: 1,            // 黑色进度条长度--->>　ing_time 改变--->> w_line02 改变 (watch)
                w_line02_start: 0,      // 当手指刚触摸到屏幕时, 黑色进度条的长度
                w_btn: 0,               // 进度条按钮宽度--->> mouted()的时候获取到值
                left_line01: 0,         // 灰色进度条.left 值--->> mounted() 获取到值
                is_moving: false,       // 手指滑动事件是否触发 
                move_start_x: 0,
                move_ing_x: 0,
                s: 0,                   // s = ing_x - start_x 手指滑动位移
                time: 0                 // 黑色进度条长度所对应的时间
            }
        },
        computed: {
            ing_time () {
                let time = this.$store.state.player.ing_time
                return time_change(time)    // 转变成 分 : 秒 格式
            },
            end_time () {
                let time = this.$store.state.player.end_time
                if (!time) return "05:00"
                return time_change(time)    // 转变成 分 : 秒 格式
            }
        },
        watch: {
            // 播放时间发生变化, 改变黑色进度条的长度
            ing_time () {
                if (this.is_moving) return       // 当手指拖拽时, ing_time 无法改变黑色进度条的 w
                let ing_time = this.$store.state.player.ing_time
                let end_time = this.$store.state.player.end_time
                let percent = ing_time/end_time
                let w_line01 = this.$refs.line01.getBoundingClientRect().width
                this.w_line02 = w_line01*percent
            }
        },
        methods: {
            // 点击进度条, 播放进度跳转到点击的位置
            turn_to () {
                let x = getMousePos().x                             // 获取鼠标在屏幕中的坐标
                let w = x-this.left_line01                          // line02(黑色进度条)的长度
                let percent = w/this.w_line01                       // line02/line01
                let end_time = this.$store.state.player.end_time    // 总时长
                this.time = end_time*percent                         // 计算出要 跳 转 到 的 时 间 --->> 时间总长度*(黑色进度条长度/灰色进度条长度)
                this.$store.commit('turn_to_the_time', this.time)
            },
            // 拖动进度条, 改变播放进度
            touchstart (e) {
                // 记录两个初始值:
                //      1: move_start_x--->>　  手指刚触摸到屏幕的坐标点　        --->> 位移 = 实时位移(ing_x)-初始点(start_x)
                //      2: line02_w_start --->> 手指刚触摸到屏幕时黑色进度条的长度 --->>ing长度 = 初始长度 + ing位移    
                this.is_moving = true
                this.move_start_x = e.targetTouches[0].clientX
                this.w_line02_start = this.w_line02
                // console.log('touchstart')
            },
            touchmove (e) {
                if (!this.is_moving) return 
                this.move_ing_x = e.targetTouches[0].clientX
                this.s = this.move_ing_x - this.move_start_x
                let w = this.w_line02_start+this.s                                          // --->>ing长度 = 初始长度 + ing位移
                if (w<0) w = 0
                if (w>this.w_line01) w = this.w_line01
                this.w_line02 = w                                                           // 时实改变黑色进度条的长度
                // console.log('touchmove', this.s, )
            },
            touchend (e) {
                this.is_moving = false
                let percent = this.w_line02/this.w_line01                                    // line02/line01===黑色进度条w/灰色进度条w
                let end_time = this.$store.state.player.end_time                             // 总时长                
                this.time = end_time*percent                                                 // 计算出要 跳 转 到 的 时 间 --->> 时间总长度*(黑色进度条长度/灰色进度条长度)
                this.$store.commit('turn_to_the_time', this.time)                
                console.log('touchend')
            },
            css_line02 () {
                let style = {}
                style['width'] = `${this.w_line02}px`
                return style
            },
            css_btn () {
                let style = {}
                style['left'] = `${this.w_line02-this.w_btn/2}px`
                return style
            }
        },
        mounted () {
            this.w_line01 = this.$refs.line01.getBoundingClientRect().width            
            this.w_btn = this.$refs.btn.getBoundingClientRect().width
            this.left_line01 = this.$refs.line01.getBoundingClientRect().left
        }
    }
    // 例如 : 传入参数 time = 70(s) , return '01:10'
    function time_change (time) {
        let m = parseInt(time/60)
        if (m<=9) m = '0' + m
        let s = parseInt(time%60)
        if (s<=9) s = '0' + s
        return `${m}:${s}`
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'

    .progress
        height .5rem
        position absolute
        left 0
        right 0
        bottom .86rem
        // background-color $yellow
        display flex
        justify-content center
        align-items center
        span
            font-size .15rem
            display inline-block
            &.line01
                flex none
                width 2.1rem
                height 6px
                background-color #ccc
                margin 0 .1rem
                position relative
                .line02
                    position absolute
                    left 0
                    top 0
                    height 6px
                    width 1px
                    background-color #000
                .btn
                    position absolute
                    top -.061rem
                    left -.1rem
                    box-sizing border-box
                    border .06rem solid rgba(0, 0, 0, .8)
                    width .2rem
                    height .2rem
                    background-color $green
                    border-radius .15rem
                    
</style>
