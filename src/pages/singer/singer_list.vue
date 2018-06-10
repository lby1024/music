<template>
    <scroll class="singer-scroll" v-if="list" ref="scroll">
        <card v-for="(item, index) in list" :key="index" :singers='item' class="cards"></card>
    </scroll>
</template>

<script>
    import scroll from './scroll.vue'
    import card from './card.vue'

    export default {
        components: {scroll, card},
        props: {
            list: {
                type: Array,
                default: null
            },
            // cur等于多少就滚到哪个item
            cur: {
                type: Number,
                default: null
            }
        },
        watch: {
            cur () {
                let card = document.getElementsByClassName('cards')[this.cur]
                this.$refs.scroll.scroll_to(card)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'

    .singer-scroll
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        background-color $yellow
        overflow hidden
</style>
