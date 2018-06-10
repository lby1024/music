<template>
    <div :class="nav_class" v-if="list" 
        @touchstart.stop.prevent="touchstart" 
        @touchmove.stop.prevent="touchmove" 
        @touchend.stop.prevent="touchend" 
        >
        <!-- 热 - a - b - c ....z -->
        <span v-for="(item, index) in list" :key="index" class="abc" >{{item.title==="hot"?"热":item.title}}</span>
        <!-- 拖拽时弹出的消息框 -->
        <div class="alert" v-if="is_fingers_moving">
            <span>{{list[index].title==="hot"?"热":list[index].title}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                is_fingers_moving: false,   // 手指是否拖动
                start_y: null,              // <span>热</span> 的y坐标
                abc_height: null,           // 每个<span></span> 的height
                height: null,               // 所有span的高度和
                ing_y: null,                // 手指的时实y坐标
                s: null,                    // s = ing_y - start_y
                index: 0
            }
        },
        props: ['list'],
        watch: {
            list () {
                console.log('$$$$$$$$$$$$$$$$$$$$$$$$', 'singer-nav监听父组建传来的值')     // mmp, 为什么监听不到
            }
        },
        computed: {
            nav_class () {
                if (this.is_fingers_moving) return 'singer-nav black'
                return 'singer-nav'
            }
        },
        methods: {
            touchstart () {
                this.is_fingers_moving = true
                let spans = document.getElementsByClassName('abc')
                // 获取<span>热</span>的height, 以及在屏幕中的y坐标
                let abc = spans[0]
                if (!abc) return console.log('获取不到<span>热</span>')
                abc = abc.getBoundingClientRect()
                this.start_y = abc.top
                this.abc_height = abc.height
                // 获取所有<span></span> 的高度总和
                this.height = this.abc_height*spans.length
                console.log('touchstart')
            },
            touchmove (e) {
                this.ing_y = e.touches[0].clientY        // 手指在屏幕中的y坐标
                this.s = this.ing_y-this.start_y
                let index = Math.floor(this.s/this.abc_height)
                if (index<0) index=0
                if (index>22) index=22
                this.index = index
                this.$emit('change', index)
                // console.log('touchmove', index)
            },
            touchend () {
                this.is_fingers_moving = false
                console.log('touchend')
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .singer-nav
        width .39rem
        position absolute
        top -.4rem
        bottom 0
        right 0
        color #333
        font-size .14rem
        font-weight bold
        display flex
        flex-flow column nowrap
        justify-content center
        align-items center
        &.black
            background-color rgba(0, 0, 0, .5)
            color #fff
        span 
            height .2rem
        .alert
            position absolute
            top 0
            bottom 0
            right 0
            width 3.75rem
            display flex
            justify-content center
            align-items center
            span 
                color #fff
                width 1.5rem
                height 1.5rem
                line-height 1.5rem
                text-align center
                font-size .3rem
                border-radius .3rem
                background-color rgba(0,0,0,.5)
</style>
