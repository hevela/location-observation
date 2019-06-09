import vuetify from 'vuetify';
import Vue from 'vue';
import { createLocalVue, mount } from '@vue/test-utils';
import LocationList from '@/components/LocationList.vue';

Vue.use(vuetify);
const locations = [
  {
    id: 1,
    name: 'location 1',
    latitude: 90,
    longitude: 90,
    open: 1,
  },
  {
    id: 2,
    name: 'location 2',
    latitude: 90,
    longitude: 90,
    open: 2,
  },
];

describe('LocationList.vue', () => {
  const localVue = createLocalVue();

  it('renders correctly', () => {
    const wrapper = mount(LocationList, {
      propsData: {
        locations: [],
      },
      localVue,
    });
    expect(wrapper.find('.v-list--two-line')).toBeTruthy();
  });

  it('render a list of locations', () => {
    const wrapper = mount(LocationList, {
      propsData: {
        locations,
      },
      localVue,
    });
    const listItems = wrapper.findAll('.v-list__tile__title');
    expect(listItems.length).toEqual(locations.length);
  });

  it('emits an event with the location data on location click', () => {
    const wrapper = mount(LocationList, {
      propsData: {
        locations,
      },
      localVue,
    });
    expect(wrapper.emitted().locationSelected).toBe(undefined);
    const listItem = wrapper.find('.v-list__tile__title');
    listItem.trigger('click');
    expect(wrapper.emitted().locationSelected).toBeTruthy();
    const triggeredEvent = wrapper.emitted().locationSelected[0][0];
    expect(triggeredEvent).toEqual(locations[0]);
  });

  it('emits an empty event on new location button click', () => {
    const wrapper = mount(LocationList, {
      propsData: {
        locations,
      },
      localVue,
    });
    expect(wrapper.emitted().locationSelected).toBe(undefined);
    const listItem = wrapper.find('.new-location');
    listItem.trigger('click');
    expect(wrapper.emitted().locationSelected[0]).toBeTruthy();
    const triggeredEvent = wrapper.emitted().locationSelected[0][0];
    expect(triggeredEvent).toEqual({});
  });
});
