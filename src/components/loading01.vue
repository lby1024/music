<template>
    <div class="loading01">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>    
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .loading01 {
        width: 1.5rem;
        height: .28rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    span {
        height: .2rem;
        width: .039rem;
        background-color: #000;
        animation: change 1.2s infinite ease-in-out;
    }
    @keyframes change {
        0% {}
        20% {height: .6rem;}
        40%, 100% {height: .2rem;}
    }
    span:nth-child(1) {
        animation-delay: .1s
    }
    span:nth-child(2) {
        animation-delay: .2s
    }
    span:nth-child(3) {
        animation-delay: .3s
    }
    span:nth-child(4) {
        animation-delay: .4s
    }
    span:nth-child(5) {
        animation-delay: .5s
    }
    span:nth-child(6) {
        animation-delay: .6s
    }
    span:nth-child(7) {
        animation-delay: .7s
    }
    span:nth-child(8) {
        animation-delay: .8s
    }
    span:nth-child(9) {
        animation-delay: .9s
    }
    span:nth-child(10) {
        animation-delay: 1s
    }
</style>