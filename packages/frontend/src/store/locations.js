import { FETCH_ALL_LOCATIONS_FAILURE } from '@/store/mutation_names';

const state = {
  locations: [],
  fetchSuccess: undefined,
  fetchFailure: undefined,
  fetchInProgress: undefined,
  fetchError: undefined,
};

const actions = {
  fetchAllLocations({ commit }) {
    try {
      console.log();
    } catch (e) {
      commit(FETCH_ALL_LOCATIONS_FAILURE, e.message);
    }
  },
};

const mutations = {};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
