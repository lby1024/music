<template>
<transition name="nomal">
    <div class="song-list" v-if="show" @click.stop="hidden">
        <div class="list">
            <!-- 头部按钮栏 -->
            <div class="header">
                <i :class="play_type_class" @click.stop="change"></i>
                <i class="clear" @click.stop="clear"></i>
                <i class="close" @click.stop="close"></i>
            </div>
            <!-- 列表 -->
            <scroll class="scroll">
                <div class="card" v-for="(item, index) in song_list" :key="index" @click.stop="change_song(item)">
                    <i :class="is_cur(item)"></i>
                    <span>{{item.songname}}</span>
                    <i class="del"  @click.stop="del(index)"></i>
                </div>
            </scroll>
        </div>
    </div>
</transition>
</template>

<script>
    import store from '@/vux/store.js'    
    import scroll from '@/pages/recommend/scroll.vue'

    export default {
        store,
        components: { scroll },
        computed: {
            // 当前正在播放的歌曲
            cur_song () {
                return this.$store.state.player.cur_song
            },
            // 歌曲列表
            song_list () {
                return this.$store.state.player.play_list                
            },
            // 播放类型 播放 or 暂停
            play_type () {
                return this.$store.state.player.play_type
            },
            // 根据不同的 this.play_type 显示不同的icon
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
            // 歌曲列表是否显示
            show () {
                return this.$store.state.player.song_list_show                
            }
        },
        methods: {
            // 点击歌曲列表, 换歌
            change_song (song) {
                this.$store.commit('change_song', song)
            },
            // 改变播放类型, 单曲循环 or 列表循环 ......
            change () {
                this.$store.commit('change_play_type')
            },
            // 关闭播放器
            close () {
                this.$store.commit('close_song_list')
                let player = document.getElementById('audio')
                player.pause()
            },
            // 清空播放列表
            clear () {
                this.$store.commit('clear_song_list')
            },
            // 判断是否是当前歌曲---> 如果是, 就在前面添加一个icon
            is_cur (song) {
                if (song.songmid===this.cur_song.songmid) return 'icon cur'
                return 'icon'
            },
            // 隐藏播放列表
            hidden () {
                this.$store.commit('list_show_hidden', false)
            },
            // 删除某一首歌
            del (song_index) {
                this.$store.commit('del_one_song', song_index)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'    

    .song-list
        height 100vh
        position absolute
        left 0
        right 0
        bottom 0
        background rgba(0, 0, 0, .5)
        &.nomal-enter-active, &.nomal-leave-active
            transition all .1s      // ????不写这个就没有动画效果, 为什么了???????????????????????????????
            .list
                transition all .1s
        &.nomal-enter, &.nomal-leave-to
            .list
                height 0
        .list
            position absolute
            bottom .6rem
            left 0
            right 0
            height 3.8rem
            background-color $yellow
            // transition all .8s ease 
            .header
                height .4rem
                i 
                    display inline-block
                    width .4rem
                    height .4rem
                    background-size 50% 50%
                    background-position center center
                    background-repeat no-repeat
                    &.play-type01
                        margin-left .1rem
                        background-image url('../../../src/assets/image/loop01.png')
                    &.play-type02
                        margin-left .1rem
                        background-image url('../../../src/assets/image/loop02.png')
                    &.play-type03
                        margin-left .1rem
                        background-image url('../../../src/assets/image/order.png')
                    &.play-type04
                        margin-left .1rem
                        background-image url('../../../src/assets/image/random.png')
                    &.clear
                        background-image url('../../../src/assets/image/clear.png')
                        margin-left 2.2rem
                    &.close
                        background-image url('../../../src/assets/image/close.png')
            .scroll
                height 3.4rem
                .card
                    height .4rem
                    display flex
                    align-items center
                    font-size .14rem
                    margin-bottom .1rem
                    .icon
                        display inline-block
                        width .4rem
                        height .4rem
                        background-size 39% 39%
                        background-position 80% 50%
                        background-repeat no-repeat
                        &.cur
                            background-image url('../../../src/assets/image/play02.png')
                    span 
                        width 2.85rem
                    .del
                        display inline-block
                        width .4rem
                        height .4rem
                        background-size 39% 39%
                        background-position 50% 50%
                        background-repeat no-repeat
                        background-image url('../../../src/assets/image/close.png')
</style>
