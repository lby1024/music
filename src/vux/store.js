import Vue from 'vue'
import Vuex from 'vuex'


import detail from './vuex_detail.js'
import player from './vuex_player.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        detail,
        player
    }
})