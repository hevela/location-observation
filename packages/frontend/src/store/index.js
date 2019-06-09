/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import locations from './locations';
import admin from './admin';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    locations,
    admin,
  },
});
