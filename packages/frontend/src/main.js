import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';

import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

const apiServer = process.env.VUE_APP_API_ADDRESS;
const SocketInstance = socketio.connect(apiServer);

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance,
}));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
