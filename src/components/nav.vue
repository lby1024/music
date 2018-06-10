<template>
    <div class="nav" @click="get_router">
        <router-link tag="div" to="/recommend">推荐</router-link>
        <router-link tag="div" to="/singer">歌手</router-link>
        <router-link tag="div" to="/search">搜索</router-link>
        <span class="line" :style="css_line()"></span>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                cur: 0
            }
        },
        mounted () {
            this.get_router()
        },
        methods: {
            get_router () {
                let path_name = this.$router.history.current.name
                if (path_name==='recommend') {
                    this.cur = 0
                }
                else if (path_name==='singer') {
                    this.cur = 1
                }
                else if (path_name==='search') {
                    this.cur = 2
                }
                else {
                    this.cur = null
                }
                // console.log(path_name, typeof path_name)
            },
            css_line () {
                let style = {}
                if (this.cur===0) {
                    style.left = '.43rem'
                }
                else if (this.cur===1) {
                    style.left = '1.65rem'
                }
                else if (this.cur===2) {
                    style.left = '2.9rem'
                }
                else {
                    style.opacity = 0
                }
                return style
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'

    .nav    
        height .4rem
        background-color $yellow
        display flex
        position relative
        span
            position absolute
            width .43rem
            height .039rem
            border-radius .02rem
            opacity .8
            background-color #333
            bottom .038rem
            transition left .3s ease-in-out
        div
            flex auto
            display flex
            justify-content center
            align-items center
            font-size .18rem
            color #333
            font-weight bold
</style>
