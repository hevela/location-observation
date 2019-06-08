import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';

import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

const SocketInstance = socketio.connect('http://localhost:3000');

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
