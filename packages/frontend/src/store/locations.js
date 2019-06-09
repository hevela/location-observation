/* eslint-disable no-param-reassign */
import locationService from '../services/location';

import {
  FETCH_ALL_LOCATIONS,
  FETCH_ALL_LOCATIONS_SUCCESS,
  FETCH_ALL_LOCATIONS_FAILURE,
  CREATE_LOCATION_REQUEST,
  CREATE_LOCATION_SUCCESS,
  CREATE_LOCATION_FAILURE,
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

  createLocationSuccess: false,
  createLocationFailure: false,
  createLocationInProgress: false,
  createLocationError: undefined,

  updateLocationSuccess: false,
  updateLocationFailure: false,
  updateLocationInProgress: false,
  updateLocationError: undefined,

  deleteLocationSuccess: false,
  deleteLocationFailure: false,
  deleteLocationInProgress: false,
  deleteLocationError: undefined,
};

const decimalBase = 10;
const mutations = {
  // "FETCH_ALL" mutations
  [FETCH_ALL_LOCATIONS](state) {
    state.fetchLocationsSuccess = false;
    state.fetchLocationsFailure = false;
    state.fetchLocationsInProgress = true;
    state.fetchLocationsError = undefined;
  },
  [FETCH_ALL_LOCATIONS_SUCCESS](state, data) {
    state.locations = data.locations;
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
  // "CREATE_LOCATION" mutations
  [CREATE_LOCATION_REQUEST](state) {
    state.createLocationSuccess = false;
    state.createLocationFailure = false;
    state.createLocationInProgress = true;
    state.createLocationError = undefined;
  },
  [CREATE_LOCATION_SUCCESS](state, location) {
    const locations = [...state.locations];
    locations.push(location);
    state.locations = locations;
    state.createLocationSuccess = true;
    state.createLocationFailure = false;
    state.createLocationInProgress = false;
    state.createLocationError = undefined;
  },
  [CREATE_LOCATION_FAILURE](state, e) {
    state.createLocationSuccess = false;
    state.createLocationFailure = true;
    state.createLocationInProgress = false;
    state.createLocationError = e.message;
  },
  // "UPDATE_LOCATION" mutations
  [UPDATE_LOCATION_REQUEST](state) {
    state.updateLocationSuccess = false;
    state.updateLocationFailure = false;
    state.updateLocationInProgress = true;
    state.updateLocationError = undefined;
  },
  [UPDATE_LOCATION_SUCCESS](state, location) {
    const locations = [...state.locations];
    const locationIndex = locations.findIndex(
      ({ id }) => id === parseInt(location.id, decimalBase),
    );
    locations[locationIndex] = location;
    state.locations = locations;
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
    state.locations = state.locations.filter(
      ({ id }) => id !== parseInt(locationId, decimalBase),
    );
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
  async createLocation({ commit }, locationObject) {
    commit(CREATE_LOCATION_REQUEST);
    try {
      const { data: { data } } = await locationService.createLocation(locationObject);
      commit(CREATE_LOCATION_SUCCESS, data);
    } catch (e) {
      commit(CREATE_LOCATION_FAILURE, e.message);
    }
  },
  async updateLocation({ commit }, { locationId, locationData }) {
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
      await locationService.deleteLocation(locationId);
      commit(DELETE_LOCATION_SUCCESS, locationId);
    } catch (e) {
      commit(DELETE_LOCATION_FAILURE, e.message);
    }
  },
};

const openMarkerColor = '#00818a';
const closedMarkerColor = '#404b69';
const getters = {
  markerLocations: state => state.locations.map(
    location => (
      {
        id: location.id,
        name: location.name,
        coordinates: [location.longitude, location.latitude],
        color: location.open ? openMarkerColor : closedMarkerColor,
        status: location.open ? 'Open' : 'Closed',
      }
    ),
  ),
};

export default {
  namespaced: true,
  state: locationsState,
  mutations,
  actions,
  getters,
};
