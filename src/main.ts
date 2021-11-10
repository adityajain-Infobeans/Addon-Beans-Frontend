import axios from 'axios';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://infobeans-support.herokuapp.com/' : 'http://localhost:3000';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
