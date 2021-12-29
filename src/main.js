import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
import '@/assets/scss/style.scss'
import VueGtag from "vue-gtag"
import gamePauseService from '@/plugins/gamePauseService.js'

Vue.config.productionTip = false
defineIonPhaser(window);
Vue.use(VueGtag, {
  config: {id: "G-7Y7Y2DTXPV"}
})
Vue.use(gamePauseService)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
