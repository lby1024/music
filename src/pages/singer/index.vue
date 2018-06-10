<template>
<transition name="singer-nav">
    <div class="singer" v-if="singer_list">
        <!-- 歌手 滚动列表 -->
        <singer-list :list="singer_list" :cur="cur_index"></singer-list>
        <!-- 导航侧边栏 -->
        <m-nav :list="singer_list" @change="change"></m-nav>
    </div>
    <div class="loading" v-else>
        <loading></loading>
    </div>
</transition>
</template>

<script>
    import {getSingers, cleanData} from '../../../src/tools/api/singer.js'
    import singerList from './singer_list.vue'
    import MNav from './singer_nav.vue'
    import loading from '../../components/loading02.vue'

    export default {
        components: {singerList, MNav, loading},
        data () {
            return {
                singer_list: null,   // 歌手列表数据
                cur_index: 0,       // scroll滚动到item的index
                is_touch: false
            }
        },
        methods: {
            get_data () {
                getSingers().then(res => this.singer_list=cleanData(res.data.list))
            },
            // 拖动侧边栏, 滚动scroll
            change (index) {
                this.cur_index = index
            }
        },
        mounted () {
            setTimeout(() => this.get_data(), 3000);
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'

    .singer
        position absolute
        top .4rem
        bottom 0
        left 0
        right 0
    .loading
        position absolute
        top .4rem
        bottom 0
        left 0
        right 0
        display flex
        justify-content center
        align-items center
        background-color $yellow
</style>
