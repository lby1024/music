import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/reset.css'
import './assets/css/border.css'

import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

fastclick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('./assets/image/lazy.png')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
