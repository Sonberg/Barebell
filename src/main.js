import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFire from 'vuefire';
import Trend from 'vuetrend';
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'

import {
  auth
}
from '@/api/firebase'

Vue.config.productionTip = false

import '@/assets/css/tailwind.css'
import '@/global.js'

Vue.use(Trend)
Vue.use(VueFire)
Vue.component('v-icon', Icon)

let app;


auth.onAuthStateChanged(() => {
  app = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
});