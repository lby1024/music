<template>
<transition name="big">
    <div class="big-player">
        <!-- 头部 >>> 功能 : 隐藏按钮, 显示歌名 -->
        <h1 class="top">
            <i class="down" @click="hidden"></i>
            <span>{{cur_song.songname}}</span>
        </h1>
        <!-- veil -->
        <img :src="pic_src" class="veil">
        <!-- body : 旋转的cd, 滚动的歌词 -->
        <m-body class="middle"></m-body>
        <!-- 进度条 -->
        <m-progress class="progress"></m-progress>
        <!-- 按钮 -->
        <m-btns class="btns"></m-btns>
        
    </div>
</transition>
</template>

<script>
    import MBody from './big_player_body.vue'
    import MProgress from './big-player-progress.vue'
    import MBtns from './big_player_btns.vue'
    import store from '../../vux/store.js'
    
    export default {
        store,
        components: { MBody, MProgress, MBtns },
        computed: {
            cur_song () {
                return this.$store.state.player.cur_song
            },
            pic_src () {
                return `https://y.gtimg.cn/music/photo_new/T002R500x500M000${this.cur_song.albummid}.jpg`
            },
        },
        methods: {
            // 隐藏全屏播放器
            hidden () {
                this.$store.commit('big_player_hidden')
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'
    
    .big-player
        position absolute
        height 100vh
        bottom 0
        left 0
        right 0
        background $yellow
        &.big-enter-active, &.big-leave-active
            transition opacity .8s ease 
            .top, .progress, .btns
                transition transform .8s ease
            .middle >>> .CD
                    transition transform .8s ease
        &.big-enter, &.big-leave-to
            opacity 0
            .top
                transform translateY(-2rem)        
            .progress, .btns
                transform translateY(2rem)
            .middle >>> .CD
                    transform translate(-2rem, 5rem) scale(.1)
        h1
            height .6rem
            line-height .6rem
            margin-bottom .25rem
            position relative
            text-align center
            z-index 1
            i
                position absolute
                left 0
                top 0
                width .6rem
                height .6rem
                background-image url('../../../src/assets/image/down.png')
                background-position center center
                background-size 50% 50%
                background-repeat no-repeat
            span 
                font-size .21rem
                display inline-block
                width 2rem
                no-wrap()
        .veil
            position absolute
            top 0
            height 100vh
            right 0
            left 0
            opacity .39
            background-color orange
            filter blur(9px)
</style>
