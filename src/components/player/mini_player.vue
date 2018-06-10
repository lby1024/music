<template>
    <transition name="fade">
        <div class="mini">
            <!-- 最左边的图片 -->
            <img v-lazy="pic_src" alt="CD" :style="css_CD()" @click.stop="hidden">
            <!-- 歌手, 歌曲名称 -->
            <div class="info" @click.stop="hidden">
                <p>{{cur_song.songname}}</p>
                <p>
                    <span v-for="(item, index) in cur_song.singers" :key="index">{{index===cur_song.singers.length-1?item.name:item.name+' / '}}</span>
                </p>
            </div>
            <!-- 播放 or 暂停 按钮 -->
            <i :class="btn_class" @click="play_pause"></i>
            <!-- 歌曲列表 按钮 -->
            <i class="list" @click="open_hidden"></i>
        </div>    
    </transition>
</template>

<script>
    import store from '../../vux/store.js'

    export default {
        store,
        computed: {
            deg () {
                return this.$store.state.player.deg
            },
            cur_song () {
                return this.$store.state.player.cur_song
            },
            pic_src () {
                return `https://y.gtimg.cn/music/photo_new/T002R500x500M000${this.cur_song.albummid}.jpg`
            },
            is_playing () {
                return this.$store.state.player.is_playing
            },
            btn_class () {
                if (this.is_playing) return 'btn pause'
                return 'btn play'
            },
            is_list_show () {
                return this.$store.state.player.song_list_show
            }
        },
        methods: {
            // 播放 or 暂停
            play_pause () {
                // 1 : 播放 or 暂停 音乐
                let player = document.getElementById('audio')
                if (this.is_playing===false) {
                    player.play()
                }
                else {
                    player.pause()
                }
                // 2 : 改变图标状态
                this.$store.commit('play_pause', !this.is_playing)      // 改变按钮图标
            },
            // cd 旋转功能的实现
            css_CD () {
                let style = {}
                style['transform'] = `rotate(${this.deg}deg)`
                return style
            },
            // 打开歌曲列表
            open_hidden () {
                this.$store.commit('list_show_hidden', !this.is_list_show)
            },
            // 隐藏mini播放器, 显示全屏播放器
            hidden () {
                this.$store.commit('big_player_show')
            }
        }        
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'
    
    .mini
        height .6rem
        background-color #333
        position absolute
        bottom 0
        left 0
        right 0
        display flex
        align-items center
        img 
            width .39rem
            height .39rem
            border-radius .39rem
            margin-left .2rem
            margin-right .2rem
        .info
            color $yellow
            font-size .16rem
            p
                no-wrap()
                width 1.8rem
                &:last-child
                    font-size .12rem
                    margin-top .06rem
                    color #928e6d
        .btn
            display inline-block
            width .39rem
            height .39rem
            background-size 80% 80%
            background-position center center
            margin-right .23rem
            background-repeat no-repeat
            &.play
                background-image url('../../assets/image/play.png')
            &.pause
                background-image url('../../assets/image/stop.png')
        .list
            display inline-block
            width .39rem
            height .39rem
            background-size 100% 100%
            background-position center center
            background-image url('../../assets/image/list.png')


    .fade-enter, .fade-leave-to{
        opacity: 0;
        transform translateY(6rem)     // 注意别用left
    }
    .fade-enter-active, .fade-leave-active{
       transition: all .5s
    }
</style>
