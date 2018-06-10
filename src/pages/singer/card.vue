<template>
    <div class="singers-card">
        <h1>{{singers.title==="hot"?"热门":singers.title}}</h1>
        <card-item v-for="(item, index) in singers.data_list" :key="index" :singer="item"></card-item>
    </div>
</template>

<script>
    import cardItem from './card_item.vue'

    export default {
        components: { cardItem },
        props: {
            singers: {
                type: Object,
                default: null
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'

    .singers-card
        h1
            background-color rgba(182, 224, 39, .15)
            height .3rem
            line-height .3rem
            font-size .14rem
            padding 0 .2rem
</style>
