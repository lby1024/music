<template>
    <m-scroll class="recommend">
        <!-- 轮播图 -->
        <m-swiper></m-swiper>
        <!-- rank-list -->
        <div class="rank-list" v-if="rank_list">
            <m-card :songs="item" v-for="(item, index) in rank_list" :key="index"></m-card>
        </div>
        <!-- 正在加载数据 -->
        <div class="load" v-else>
            <load></load>
        </div>
    </m-scroll>
</template>

<script>
    import MSwiper from './swiper.vue'
    import MCard from './card.vue'
    import MScroll from './scroll.vue'  
    import load from '@/components/loading01.vue'
    import { get_rank_data } from '@/tools/api/rank.js'  


    export default {
        components: {load, MSwiper, MCard, MScroll}  ,
        data () {
            return {
                rank_list: null
            }
        },
        methods: {
            get_data () {
                get_rank_data().then(res => this.rank_list=res.data.topList)
            }
        },
        created () {
            setTimeout(()=>this.get_data(), 2000)
        } 
    }
</script>
<style lang="stylus" scoped>
    @import '~@/assets/css/base.styl'
    
    .recommend
        background-color $yellow
        position absolute
        left 0
        right 0
        bottom 0rem
        top .4rem
        overflow hidden
        .rank-list
            padding .2rem
        .load
            position absolute
            left 0
            right 0
            top 1.5rem
            height 4.4rem
            display flex
            justify-content center
            align-items center
</style>
