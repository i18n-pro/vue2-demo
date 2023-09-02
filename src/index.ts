import Vue from 'vue'
import App from './App.vue'
import i18n from './i18n'

Vue.use(i18n)

new Vue({
  el: '#app',
  render: h => h(App)
})
