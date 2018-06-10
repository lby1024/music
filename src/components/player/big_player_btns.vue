<template>
    <div class="big-player-btns">
        <i :class="play_type_class" @click.prevent.stop="change"></i>
        <i class="pre" @click.prevent.stop="pre"></i>
        <i :class="play_class" @click.prevent.stop="play_pause"></i>
        <i class="next" @click.prevent.stop="next"></i>
        <i :class="is_collection?'collection-yes':'collection-no'" @click.prevent.stop="collection"></i>
    </div>
</template>

<script>
    import store from '../../vux/store.js'

    export default {
        store,
        data () {
            return {
                is_collection: false
            }
        },
        computed: {
            is_playing () {
                return this.$store.state.player.is_playing
            },
            // 按钮显示 播放icon or 暂停icon
            play_class () {
                if (this.is_playing) return 'pause'
                return 'play'
            },
            // 根据不同的 列表循环 显示不同的icon
            play_type_class () {
                if (this.play_type===0) {
                    return 'play-type01'
                }
                else if (this.play_type===1) {
                    return 'play-type02'
                }
                else if (this.play_type===2) {
                    return 'play-type03'
                }
                else if (this.play_type===3) {
                    return 'play-type04'
                }
            },
            // 播放类型 : 单曲循环 or 列表循环 ......
            play_type () {
                return this.$store.state.player.play_type
            }
        },
        methods: {
            // 改变播放类型, 单曲循环 or 列表循环 ......
            change () {
                this.$store.commit('change_play_type')
            },
            // 播放 or 暂停
            play_pause () {
                let player = document.getElementById('audio')
                if (this.is_playing) {
                    player.pause()
                }
                else {
                    player.play()
                }
                // 改变图标状态
                this.$store.commit('play_pause', !this.is_playing)      // 改变按钮图标
            },
            // 收藏 or 取消收藏
            collection () {
                this.is_collection = !this.is_collection
            },
            // 播放下一首歌曲
            next () {
                this.$store.commit('next')
            },
            // 播放上一首歌曲
            pre () {
                this.$store.commit('pre')
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .big-player-btns
        height .4rem
        // background-color $yellow
        position absolute
        left 0
        right 0
        bottom .46rem
        display flex
        justify-content space-around
        align-items center 
        padding 0 .3rem
        i
            display inline-block
            width .3rem
            height .3rem
            background-size 80% 80%
            background-position center center 
            background-repeat no-repeat
            &.play-type01
                background-image url('../../../src/assets/image/loop01.png')
            &.play-type02
                background-image url('../../../src/assets/image/loop02.png')
            &.play-type03
                background-image url('../../../src/assets/image/order.png')
            &.play-type04
                background-image url('../../../src/assets/image/random.png')
            &.pre
                background-image url('../../assets/image/pre.png')
            &.play
                background-size 100% 100%
                background-image url('../../assets/image/play02.png')
            &.pause
                background-size 100% 100%
                background-image url('../../assets/image/stop02.png')
            &.next
                background-image url('../../assets/image/next.png')
            &.collection-yes
                background-image url('../../assets/image/collection02.png')
            &.collection-no
                background-image url('../../assets/image/collection01.png')
            

</style>
