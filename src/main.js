import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import JsonExcel from "vue-json-excel";

import "../src/assets/css/main.css"
import "../src/assets/css/bootstrap-grid.min.css"

Vue.component("downloadExcel", JsonExcel);
Vue.config.productionTip = false

Vue.use(VueMeta)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
