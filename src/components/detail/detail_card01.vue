<template>
    <div class="card" v-if="song" @click="add_song" >
        <div class="left">
            <i class="one" v-if="number===0"></i>
            <i class="two" v-else-if="number===1"></i>
            <i class="three" v-else-if="number===2"></i>
            <span v-else>{{number+1}}</span>
        </div>
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
        props: {
            number: {
                type: Number,
                default: null
            },
            song: {
                type: Object,
                default: null
            }
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
        height .64rem
        margin-bottom .1rem
        box-sizing border-box
        .left
            height .64rem
            width .64rem
            display flex
            justify-content center
            align-items center
            margin-right .18rem
            i
                display inline-block
                width .3rem
                height .3rem
                background-size 100% 100%
                background-position center center
                background-repeat no-repeat
                &.one
                    background-image url('../../assets/image/1.png')
                &.two
                    background-image url('../../assets/image/2.png')
                &.three
                    background-image url('../../assets/image/3.png')
        .right
            font-size .18rem
            display flex
            flex-flow column 
            justify-content center
            box-sizing border-box
            p
                font-weight bolder
                padding-top 0rem
                width 2rem
                transform translateY(-.06rem)
                no-wrap()
                &:first-child
                    padding-top .2rem
                &:last-child
                    color gray
                    margin-top .05rem
                    font-size .16rem
                    font-weight normal
</style>
