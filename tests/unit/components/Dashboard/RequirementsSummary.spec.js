//  import required stuff from vue/test-utils
import { shallowMount, createLocalVue } from '@vue/test-utils';

// import router, vuex & other dependencies
import Vuex from 'vuex';

// import axios & axios mock
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// import component to mock
import Summary from '@/components/Dashboard/RequirementsSummary.vue';

import flushPromises from 'flush-promises';

const mock = new MockAdapter(axios);

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  state: {
    Auth: {
      userData: {
        emp_id: 2,
        emp_name: 'Test User',
        emp_email: 'test@email.com',
        token: 'JWT_token',
        is_login: true,
      },
    },
  },
});

describe('FullComponentTest', () => {
  it('Verify default values', () => {
    mock.onGet('/summary').reply(200, {
      status: 'success',
      message: 'Data retrieved successfully',
      data: { totalRequirements: 3, openRequirement: 3, resolvedRequirement: 0 },
    });

    const wrapper = shallowMount(Summary, {
      localVue,
      store,
    });

    const totalRequirements = wrapper.find('[data-testid="totalRequirements"]');
    const openRequirements = wrapper.find('[data-testid="openRequirements"]');
    const resolvedRequirements = wrapper.find('[data-testid="resolvedRequirements"]');

    expect(totalRequirements.exists()).toBe(true);
    expect(openRequirements.exists()).toBe(true);
    expect(resolvedRequirements.exists()).toBe(true);

    expect(totalRequirements.text()).toEqual('0');
    expect(openRequirements.text()).toEqual('0');
    expect(resolvedRequirements.text()).toEqual('0');
  });

  it('Api call resolved successfully', async () => {
    mock.onGet('/summary').reply(200, {
      status: 'success',
      message: 'Data retrieved successfully',
      data: { totalRequirements: 3, openRequirement: 3, resolvedRequirement: 0 },
    });

    const wrapper = shallowMount(Summary, {
      localVue,
      store,
    });
    await flushPromises();

    const totalRequirements = wrapper.find('[data-testid="totalRequirements"]');
    const openRequirements = wrapper.find('[data-testid="openRequirements"]');
    const resolvedRequirements = wrapper.find('[data-testid="resolvedRequirements"]');

    expect(totalRequirements.exists()).toBe(true);
    expect(openRequirements.exists()).toBe(true);
    expect(resolvedRequirements.exists()).toBe(true);

    expect(totalRequirements.text()).toEqual('3');
    expect(openRequirements.text()).toEqual('3');
    expect(resolvedRequirements.text()).toEqual('0');
  });

  it('Api call resolved failed', async () => {
    mock.onGet('/summary').reply(503, {
      data: { status: 'error', message: 'error occurred while connecting with database', data: {} },
    });

    const wrapper = shallowMount(Summary, {
      localVue,
      store,
    });
    await flushPromises();

    const totalRequirements = wrapper.find('[data-testid="totalRequirements"]');
    const openRequirements = wrapper.find('[data-testid="openRequirements"]');
    const resolvedRequirements = wrapper.find('[data-testid="resolvedRequirements"]');

    expect(totalRequirements.exists()).toBe(true);
    expect(openRequirements.exists()).toBe(true);
    expect(resolvedRequirements.exists()).toBe(true);

    expect(totalRequirements.text()).toEqual('0');
    expect(openRequirements.text()).toEqual('0');
    expect(resolvedRequirements.text()).toEqual('0');
  });
});
