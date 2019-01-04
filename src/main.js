import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFire from 'vuefire';
import Trend from 'vuetrend';
import VueMask from 'di-vue-mask'
import Icon from 'vue-awesome/components/Icon'
import moment from 'moment'
import 'vue-awesome/icons'

import {
  auth
}
from '@/api/firebase'

Vue.config.productionTip = false

import '@/assets/css/tailwind.css'
import '@/global.js'

window.moment = moment

Vue.use(Trend)
Vue.use(VueFire)
Vue.use(VueMask)
Vue.component('v-icon', Icon)

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});