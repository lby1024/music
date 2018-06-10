<template>
    <div class="player">
        <!-- 歌曲列表 -->
        <song-list></song-list>
        <!-- 大播放器 -->
        <big-player v-show="is_big_show" v-if="cur_song"></big-player>
        <!-- 小播放器 -->
        <mini-player v-show="is_mini_show" v-if="cur_song"></mini-player>
        <!-- 播放标签 -->
        <audio :src="mp3_src" id="audio" 
            autoplay="autoplay" 
            @error="player_error" 
            @timeupdate="player_timeupdate" 
            @ended="ended"></audio>
    </div>
</template>

<script>
    import store from '../../vux/store.js'
    import miniPlayer from './mini_player.vue'
    import bigPlayer from './big_player.vue'
    import songList from './song_list.vue'

    export default {
        store,
        components: {miniPlayer, songList, bigPlayer},
        mouted () {
            this.player = document.getElementById('audio')
        },
        data () {
            return {
                has_err: false,
                player: null,
                deg: 0
            }
        },
        computed: {
            type () {
                return this.$store.state.player.play_type
            },
            cur_song () {
                return this.$store.state.player.cur_song
            },
            mp3_src () {
                if (!this.cur_song) return
                return `https://dl.stream.qqmusic.qq.com/C100${this.cur_song.songmid}.m4a?fromtag=46`
            },
            is_playing () {
                return this.$store.state.player.is_playing
            },
            is_big_show () {
                return this.$store.state.player.big_show
            },
            is_mini_show () {
                return this.$store.state.player.mini_show
            },
            // 要跳转到的时间
            turn_to_the_time () {
                return this.$store.state.player.turn_time
            }
        }, 
        watch: {
            turn_to_the_time () {
                let player = document.getElementById('audio')                
                player.currentTime = this.turn_to_the_time
            }
        },   
        methods: {
            player_error () {
                console.log('播放器发生错误')
                this.has_err = true
            },
            player_timeupdate (e) {
                // 向vuex 发送 ing_time, end_time
                let ing_time = e.target.currentTime
                let end_time = e.target.duration
                let payload = {ing_time, end_time}
                this.$store.commit('get_palyer_time', payload)
            },
            // 当一首歌曲播放完成时
            ended () {
                if (this.type===1) {
                    console.log('播放结束', '单曲循环')
                    let player = document.getElementById('audio')
                    player.play()
                }
                else {
                    console.log('播放结束', '别的循环')
                    this.$store.commit('ended')
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'

    .player
        background rgba(3, 3, 3, 0)
        position absolute
        left 0
        right 0
        bottom 0
        height 0
        z-index 2
</style>
