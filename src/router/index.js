import Vue from 'vue'
import Router from 'vue-router'
import recommend from '../../src/pages/recommend/index.vue'
import singer from '../../src/pages/singer/index.vue'
import search from '../../src/pages/search/index.vue'
import detail from '../../src/components/detail/detail.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', redirect: '/recommend'},
        {path: '/recommend', name: 'recommend', component: recommend},
        {path: '/singer', name: 'singer', component: singer},
        {path: '/search', name: 'search', component: search},
        {path: '/detail/:id', name: 'detail', component: detail}
    ]
})

