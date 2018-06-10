<template>
    <div id="app">
        <m-nav class="nav"></m-nav>
        <keep-alive exclude="detail">
            <router-view></router-view>
        </keep-alive>
        <player></player>
    </div>
</template>

<script>
    import MNav from '@/components/nav.vue'
    import player from '../src/components/player/index.vue'

    export default {
        components: {MNav, player}
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'

    #app
        height 100vh
        width 100vw
        max-width 750px
        margin 0 auto
        background-color #fff
        position relative
        overflow hidden
        display flex
        flex-flow column
        .nav
            flex none
</style>
