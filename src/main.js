import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

const axios = require('axios');

Vue.use(VueSweetalert2);

axios.defaults.baseURL = 'http://localhost:3000';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
