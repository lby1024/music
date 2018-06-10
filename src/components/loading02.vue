<template>
    <div class="loading02">
        <div></div>
        <div></div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .loading02{
        height: .5rem;
        width: .5rem;
        position: relative;
    }
    .loading02>div {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        background-color: yellowgreen;
        opacity: .3;
        animation: change 1.5s infinite ease-in-out;
    }
    .loading02>div:nth-child(2) {
        animation-delay: .7s;
        opacity: .6;
    }
    @keyframes change {
        0% {transform: scale(0)}
        50% {transform: scale(1)}
        100% {transform: scale(0)}
    }
</style>