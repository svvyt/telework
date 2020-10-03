import Vue from 'vue'
import App from './components/App.vue'

import store from './store'
Vue.config.productionTip = false

new Vue({
  store,
  el: '#app',
  render: h => h(App)
})
