import vuetify from 'vuetify';
import Vuex from 'vuex';
import Vue from 'vue';
import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import adminStore from '../stubs/adminStore';
import SignIn from '@/views/SignIn.vue';

Vue.use(vuetify);

describe('SignIn.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let wrapper;
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      signIn: jest.fn(),
    };
    store = new Vuex.Store({
      modules: {
        admin: {
          ...adminStore,
          actions,
        },
      },
    });
  });

  it('renders an empty form', () => {
    wrapper = shallowMount(SignIn, {
      localVue,
      propsData: {},
      store,
    });
    const formTextModels = [
      'username',
      'password',
    ];
    expect(wrapper.contains('.sign-in-form')).toBe(true);
    formTextModels.forEach((field) => {
      expect(wrapper.vm[field]).toBe('');
    });
    expect(wrapper.vm.open).toBe(undefined);
  });

  it('calls an action on submit', () => {
    wrapper = mount(SignIn, {
      localVue,
      store,
      sync: false,
    });
    wrapper.find('[aria-label="Username"]').setValue('test');
    wrapper.find('[aria-label="Password"]').setValue('test');
    wrapper.find('.authenticate-button').trigger('click');
    expect(actions.signIn).toHaveBeenCalled();
  });
});
