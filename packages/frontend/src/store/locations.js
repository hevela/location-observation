/* eslint-disable no-param-reassign */
import locationService from '../services/location';

import {
  FETCH_ALL_LOCATIONS,
  FETCH_ALL_LOCATIONS_SUCCESS,
  FETCH_ALL_LOCATIONS_FAILURE,
  UPDATE_LOCATION_REQUEST,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAILURE,
  DELETE_LOCATION_REQUEST,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_FAILURE,
} from '@/store/mutation_names';

const locationsState = {
  locations: [],
  fetchLocationsSuccess: false,
  fetchLocationsFailure: false,
  fetchLocationsInProgress: false,
  fetchLocationsError: undefined,

  updateLocationSuccess: false,
  updateLocationFailure: false,
  updateLocationInProgress: false,
  updateLocationError: undefined,

  deleteLocationSuccess: false,
  deleteLocationFailure: false,
  deleteLocationInProgress: false,
  deleteLocationError: undefined,
};

const mutations = {
  // "FETCH_ALL" mutations
  [FETCH_ALL_LOCATIONS](state) {
    state.fetchLocationsSuccess = false;
    state.fetchLocationsFailure = false;
    state.fetchLocationsInProgress = true;
    state.fetchLocationsError = undefined;
  },
  [FETCH_ALL_LOCATIONS_SUCCESS](state, locations) {
    state.locations = locations;
    state.fetchLocationsSuccess = true;
    state.fetchLocationsFailure = false;
    state.fetchLocationsInProgress = false;
    state.fetchLocationsError = undefined;
  },
  [FETCH_ALL_LOCATIONS_FAILURE](state) {
    state.fetchLocationsSuccess = false;
    state.fetchLocationsFailure = false;
    state.fetchLocationsInProgress = false;
    state.fetchLocationsError = false;
  },
  // "UPDATE_LOCATION" mutations
  [UPDATE_LOCATION_REQUEST](state) {
    state.updateLocationSuccess = false;
    state.updateLocationFailure = false;
    state.updateLocationInProgress = true;
    state.updateLocationError = undefined;
  },
  [UPDATE_LOCATION_SUCCESS](state, location) {
    const locationIndex = state.locations.findIndex(({ id }) => id === location.id);
    state.locations[locationIndex] = location;
    state.updateLocationSuccess = true;
    state.updateLocationFailure = false;
    state.updateLocationInProgress = false;
    state.updateLocationError = undefined;
  },
  [UPDATE_LOCATION_FAILURE](state, e) {
    state.updateLocationSuccess = false;
    state.updateLocationFailure = true;
    state.updateLocationInProgress = false;
    state.updateLocationError = e.message;
  },
  // "DELETE_LOCATION" mutations
  [DELETE_LOCATION_REQUEST](state) {
    state.deleteLocationSuccess = false;
    state.deleteLocationFailure = false;
    state.deleteLocationInProgress = true;
    state.deleteLocationError = undefined;
  },
  [DELETE_LOCATION_SUCCESS](state, locationId) {
    state.locations = state.locations.filter(({ id }) => id !== locationId);
    state.deleteLocationSuccess = true;
    state.deleteLocationFailure = false;
    state.deleteLocationInProgress = false;
    state.deleteLocationError = undefined;
  },
  [DELETE_LOCATION_FAILURE](state, e) {
    state.deleteLocationSuccess = false;
    state.deleteLocationFailure = true;
    state.deleteLocationInProgress = false;
    state.deleteLocationError = e.message;
  },
};

const actions = {
  async fetchAllLocations({ commit }) {
    commit(FETCH_ALL_LOCATIONS);
    try {
      const { data: { data } } = await locationService.getAllLocations();
      commit(FETCH_ALL_LOCATIONS_SUCCESS, data);
    } catch (e) {
      commit(FETCH_ALL_LOCATIONS_FAILURE, e.message);
    }
  },
  async updateLocation({ commit }, { locationId, locationData}) {
    commit(UPDATE_LOCATION_REQUEST);
    try {
      const { data: { data } } = await locationService.updateLocation(locationId, locationData);
      commit(UPDATE_LOCATION_SUCCESS, data);
    } catch (e) {
      commit(UPDATE_LOCATION_FAILURE, e.message);
    }
  },
  async deleteLocation({ commit }, locationId) {
    commit(DELETE_LOCATION_REQUEST);
    try {
      const { data: { data } } = await locationService.deleteLocation(locationId);
      commit(DELETE_LOCATION_SUCCESS, data);
    } catch (e) {
      commit(DELETE_LOCATION_FAILURE, e.message);
    }
  },
};

const getters = {};

export default {
  namespaced: true,
  state: locationsState,
  mutations,
  actions,
  getters,
};
