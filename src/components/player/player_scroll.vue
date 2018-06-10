<template>
    <div class="scroll" ref="scroll">
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        data () {
            return {
                scroll: null
            }
        },
        mounted () {
            let scroll = this.$refs.scroll
            this.scroll = new BScroll(scroll, {
                probeType: 2,
                click: true
            })
        },
        methods: {
            scroll_to (ele) {
                this.scroll.scrollToElement(ele)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .scroll
        // height 6.47rem       // 高度在外面设置, 不同的滚动列表, 高度不一样
        overflow hidden
</style>
