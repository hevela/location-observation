import vuetify from 'vuetify';
import Vuex from 'vuex';
import Vue from 'vue';
import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import locationsStore from '../stubs/locationsStore';
import LocationForm from '@/components/LocationForm.vue';

Vue.use(vuetify);

describe('LocationForm.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let wrapper;
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      createLocation: jest.fn(),
      updateLocation: jest.fn(),
      deleteLocation: jest.fn(),
    };
    store = new Vuex.Store({
      modules: {
        locations: {
          ...locationsStore,
          actions,
        },
      },
    });
  });

  it('renders an empty form', () => {
    wrapper = shallowMount(LocationForm, {
      localVue,
      propsData: {},
      store,
    });
    const formTextModels = [
      'name',
      'latitude',
      'longitude',
    ];
    expect(wrapper.contains('.location-form')).toBe(true);
    formTextModels.forEach((field) => {
      expect(wrapper.vm[field]).toBe('');
    });
    expect(wrapper.vm.open).toBe(undefined);
  });

  it('validates an empty form as false', () => {
    wrapper = mount(LocationForm, {
      localVue,
      propsData: {},
      store,
      sync: false,
    });
    expect(wrapper.vm.$refs.form.validate()).toBe(false);
  });

  it('validates a filled form as true', () => {
    wrapper = mount(LocationForm, {
      localVue,
      propsData: {},
      store,
      sync: false,
    });
    // Empty form
    expect(wrapper.vm.$refs.form.validate()).toBe(false);
    // Fill form
    wrapper.find('[aria-label="Name"]').setValue('test');
    wrapper.find('[aria-label="Status"]').setValue(0);
    wrapper.find('[aria-label="Latitude"]').setValue('123');
    wrapper.find('[aria-label="Longitude"]').setValue('123');
    expect(wrapper.vm.$refs.form.validate()).toBe(true);
  });

  it('validates an incorrect filled form as false', () => {
    wrapper = mount(LocationForm, {
      localVue,
      propsData: {},
      store,
      sync: false,
    });
    // Empty form
    expect(wrapper.vm.$refs.form.validate()).toBe(false);
    // Fill form
    wrapper.find('[aria-label="Name"]').setValue('test');
    wrapper.find('[aria-label="Status"]').setValue(0);
    wrapper.find('[aria-label="Latitude"]').setValue('incorrect data');
    wrapper.find('[aria-label="Longitude"]').setValue('123');
    expect(wrapper.vm.$refs.form.validate()).toBe(false);
  });

  it('edits a location', () => {
    wrapper = mount(LocationForm, {
      localVue,
      propsData: {},
      store,
      sync: false,
    });
    wrapper.vm.locationId = 1;
    // Fill form
    wrapper.find('[aria-label="Name"]').setValue('test');
    wrapper.find('[aria-label="Status"]').setValue(0);
    wrapper.find('[aria-label="Latitude"]').setValue('123');
    wrapper.find('[aria-label="Longitude"]').setValue('123');
    expect(wrapper.vm.$refs.form.validate()).toBe(true);
    wrapper.find('.submit-button').trigger('click');
    expect(actions.updateLocation).toHaveBeenCalled();
  });

  it('creates a location', () => {
    wrapper = mount(LocationForm, {
      localVue,
      propsData: {},
      store,
      sync: false,
    });
    // Fill form
    wrapper.find('[aria-label="Name"]').setValue('test');
    wrapper.find('[aria-label="Status"]').setValue(0);
    wrapper.find('[aria-label="Latitude"]').setValue('123');
    wrapper.find('[aria-label="Longitude"]').setValue('123');
    expect(wrapper.vm.$refs.form.validate()).toBe(true);
    wrapper.find('.submit-button').trigger('click');
    expect(actions.createLocation).toHaveBeenCalled();
  });

  it('deletes a location', (done) => {
    wrapper = mount(LocationForm, {
      localVue,
      propsData: {},
      store,
      sync: false,
    });
    wrapper.vm.locationId = 1;
    wrapper.vm.$nextTick(() => {
      wrapper.find('.delete-button').trigger('click');
      expect(actions.deleteLocation).toHaveBeenCalled();
      done();
    });
  });
});
