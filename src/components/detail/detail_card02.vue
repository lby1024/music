<template>
    <div class="card" v-if="song" @click="add_song">
        <!-- 左边 图片 -->
        <img v-lazy="pic_src" alt="" class="left">
        <!-- 右边 标题 -->
        <div class="right">
            <p>{{song.songname}}</p>
            <p>
                <span v-for="(item, index) in song.singers" :key="index">
                    {{index===song.singers.length-1?item.name:item.name+' / '}}
                </span>
            </p>
        </div>
    </div>
</template>

<script>
    import store from '@/vux/store.js'

    export default {
        store,
        props: ['song'],
        computed: {
            pic_src () {
                return `https://y.gtimg.cn/music/photo_new/T002R500x500M000${this.song.albummid}.jpg`
            },
        },
        methods: {
            add_song () {
                this.$store.commit('add_song', this.song)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'
    
    .card
        display flex
        align-items center
        height .64rem
        margin-bottom .1rem
        box-sizing border-box
        .left
            display inline-block
            width .5rem
            height .5rem
            margin-right .3rem
        .right
            p
                font-weight bolder
                padding-top 0rem
                width 2rem
                transform translateY(-.06rem)
                no-wrap()
                &:first-child
                    padding-top .2rem
                    font-size .21rem
                &:last-child
                    color gray
                    margin-top .05rem
                    font-size .16rem
                    font-weight normal
</style>
