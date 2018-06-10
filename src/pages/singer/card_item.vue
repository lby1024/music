<template>
    <div class="singer-card-item" @click="turn_to">
        <img v-lazy="singer.picUrl" alt="">
        <p>{{singer.name}}</p>
    </div>
</template>

<script>
    import store from '../../vux/store.js'    
    
    export default {
        store,
        props: ['singer'],
        methods: {
            turn_to () {
                let id = this.singer.id
                let ListName = this.singer.name
                let pic_album = this.singer.picUrl
                let info = {ListName, pic_album}
                this.$router.push(`/detail/${id}`)
                this.$store.commit('set_detail_type', 'singer')
                this.$store.commit('set_detail_info', info)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'

    .singer-card-item
        padding 0 .2rem
        height .7rem
        display flex
        align-items center
        img 
            width .5rem
            height .5rem
            border-radius .25rem
            margin-right .3rem
        p
            no-wrap()
            width 2rem
            font-size .14rem
</style>
