<template>
    <div class="scroll" ref="scroll">
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import store from '@/vux/store.js'

    export default {
        store,
        mounted () {
            this.init()
        },
        data () {
            return {
                scroll: null,
                timer: null
            }
        },
        methods: {
            set_top () {
                this.$store.commit('set_detail_top', this.scroll.y)
            },
            init () {
                let scroll = this.$refs.scroll
                this.scroll = new BScroll(scroll, {
                    click: true,
                    probeType: 3
                })
                this.scroll.on("scroll", ()=>this.set_top());
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'
    
    .scroll
        position absolute
        top 2.6rem
        left 0
        bottom 0
        right 0
        .container
            padding .2rem
            background-color $yellow
            box-sizing border-box
</style>
