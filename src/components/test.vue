<template>
    <div class="test">
        <scroll>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
        </scroll>
    </div>
</template>

<script>
    import scroll from './detail/detail-scroll.vue'

    export default {
        components: {
            scroll
        }
    }
</script>

<style lang="stylus" scoped>
    .test
        position absolute
        top 0
        left 0
        width 100%
        .card
            height .8rem
            margin-bottom .2rem
            background-color yellowgreen
</style>
