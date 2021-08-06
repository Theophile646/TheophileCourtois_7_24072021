import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import store from './store'

library.add(faHome, faUser, faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

//**Global Variables**
//ApiUrl
Vue.prototype.$apiUrl = 'http://localhost:3000/api';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')