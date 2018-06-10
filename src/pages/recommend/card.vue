<template>
    <div class="card" >
        <div class="show" @click="show_detail">
            <div class="pic" :style="{'background-image': `url(${songs.picUrl})`}"></div>
            <div class="right">
                <p>{{`1 ${songs.songList[0].songname} - ${songs.songList[0].singername}`}}</p>
                <p>{{`2 ${songs.songList[1].songname} - ${songs.songList[1].singername}`}}</p>
                <p>{{`3 ${songs.songList[2].songname} - ${songs.songList[2].singername}`}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../../vux/store.js'    

    export default {
        store,
        props: {
            songs: {
                type: Object,
                default: null
            }
        },
        methods: {
            show_detail () {
                let id = this.songs.id
                this.$store.commit('set_detail_type', 'rank')
                this.$router.push(`/detail/${id}`)                
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'    

    .card
        height 1rem
        margin-bottom .2rem
        background-color rgba(182, 224, 39, .15)
        .show
            height 100%
            display flex
            .pic
                height 1rem
                width 1rem
                background-position center center
                background-size 100% 100%
                background-repeat no-repeat
                margin-right .2rem
                .mask
                    width 100%
                    height 100%
                    background-color rgba(0, 0, 0, .39)
                    display flex
                    justify-content center
                    align-items center
                    color #fff
                    font-size .2rem
                    font-weight bolder 
            .right    
                padding .1rem 0
                display flex
                flex-flow column
                justify-content space-around
                p
                    font-size .18rem
                    padding-top .08rem
                    width 2rem
                    no-wrap()
        .load
            width 100%
            height 100%
            display flex
            justify-content center
            align-items center
</style>
