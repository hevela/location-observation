import vuetify from 'vuetify';
import Vuex from 'vuex';
import Vue from 'vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import locationsStore, { markers } from '../stubs/locationsStore';
import {
  UPDATE_LOCATION_SUCCESS,
  CREATE_LOCATION_SUCCESS,
  DELETE_LOCATION_SUCCESS,
} from '../../src/store/mutation_names';

jest.mock('mapbox-gl', () => ({
  get: jest.fn(),
}));

import Home from '@/views/Home.vue';

Vue.use(vuetify);

describe('Home.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let wrapper;
  let actions;
  let mutations;
  let store;

  beforeEach(() => {
    actions = {
      fetchAllLocations: jest.fn(),
    };
    mutations = {
      [UPDATE_LOCATION_SUCCESS]: jest.fn(),
      [CREATE_LOCATION_SUCCESS]: jest.fn(),
      [DELETE_LOCATION_SUCCESS]: jest.fn(),
    };
    store = new Vuex.Store({
      modules: {
        locations: {
          ...locationsStore,
          actions,
          mutations,
        },
      },
    });
    wrapper = shallowMount(Home, {
      localVue,
      propsData: {},
      store,
    });
  });

  it('renders the existing locations correctly', () => {
    // every marker has a popup with the name and status of the location
    const renderedMarkers = wrapper.findAll('.popup');
    renderedMarkers.wrappers.forEach((marker, index) => {
      expect(
        marker.text(),
      ).toEqual(`${markers[index].name} - ${markers[index].status}`);
    });
  });
});
