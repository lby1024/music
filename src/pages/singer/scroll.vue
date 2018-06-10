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
            this.init()
        },
        activated () {
            this.init()
        },
        methods: {
            scroll_to (ele) {
                this.scroll.scrollToElement(ele)
            },
            init () {
                let scroll = this.$refs.scroll
                this.scroll = new BScroll(scroll, {
                    probeType: 2,
                    click: true
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
</style>
