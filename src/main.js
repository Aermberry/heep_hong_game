import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
import '@/assets/scss/style.scss'
import VueGtag from "vue-gtag"

Vue.config.productionTip = false
defineIonPhaser(window);
Vue.use(VueGtag, {
  config: {id: "G-BP8DHG569D"}
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
