/* eslint-disable no-param-reassign */
import adminService from '../services/admin';

import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
} from './mutation_names';


const adminState = {
  signedIn: false,
  signInInProgress: false,
  signInFailure: false,
  signInError: undefined,
};

const mutations = {
  [SIGN_IN_REQUEST](state) {
    state.signedIn = false;
    state.signInInProgress = true;
    state.signInFailure = false;
    state.signInError = undefined;
  },
  [SIGN_IN_SUCCESS](state, jwtToken) {
    state.signedIn = true;
    state.signInInProgress = false;
    state.signInFailure = false;
    state.signInError = undefined;
    sessionStorage.setItem('token', jwtToken);
  },
  [SIGN_IN_FAILURE](state, e) {
    state.signedIn = false;
    state.signInInProgress = false;
    state.signInFailure = true;
    state.signInError = e.message;
  },

  [SIGN_OUT](state) {
    state.signedIn = false;
    state.signInInProgress = false;
    state.signInFailure = false;
    state.signInError = undefined;
    sessionStorage.removeItem('token');
  },
};
const actions = {
  async signIn({ commit }, { username, password }) {
    commit(SIGN_IN_REQUEST);
    try {
      const { data: { data } } = await adminService.authenticate({ username, password });
      commit(SIGN_IN_SUCCESS, data.token);
    } catch (e) {
      commit(SIGN_IN_FAILURE, e);
    }
  },
};
const getters = {
  loggedIn: state => state.signedIn && sessionStorage.getItem('token'),
};
export default {
  namespaced: true,
  state: adminState,
  mutations,
  actions,
  getters,
};
