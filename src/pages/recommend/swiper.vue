<template>
    <div>
        <swiper class="swiper-banner" :options="options" v-if="pics">
            <swiper-slide v-for="(item, index) in pics" :key="index">
                <img :src="item.picUrl" alt="banner" width="100%">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="loading" v-else>
            loading...
        </div>
    </div>
</template>

<script>
    import {get_swiper_data} from '../../../src/tools/api/swiper.js'
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import loading from '../../../src/components/loading02.vue'

    export default {
        components: { swiper, swiperSlide, loading },
        data () {
            return {
                pics: null,
                options: {
                    loop: true,
                    autoplay: {
                        delay: 2000,                    // 2s一次跳转 
                        disableOnInteraction: false     // 如果不设置, 手指滑动轮播图后将不会自动轮播
                    },
                    pagination: {el: '.swiper-pagination'}
                }
            }
        },
        methods: {
            get_data () {
                get_swiper_data().then(res => this.pics=res.data.slider)
            }
        },
        created () {
            this.get_data()
        }
    }
</script>

<style lang="stylus" scoped>
    // 修改分页器样式================================
    .swiper-banner>>>.swiper-pagination-bullet-active
        width .233rem
        opacity .9 !important
        border-radius .08rem
        background-color #fff
    .swiper-banner>>>.swiper-pagination-bullet
        background-color #fff
        opacity .6
        transition all .2s ease
    .loading
        height 1.5rem
        background #fff
        display flex
        justify-content center
        align-items center
</style>
