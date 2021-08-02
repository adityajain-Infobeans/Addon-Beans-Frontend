//  import required stuff from vue/test-utils
import { shallowMount, createLocalVue } from '@vue/test-utils';

// import router, vuex & other dependencies
import Vuex from 'vuex';

// import component to mock
import Summary from '@/components/Dashboard/RequirementsSummary.vue';

import flushPromises from 'flush-promises';

const { getSummaryData } = require('@/services/axios/Dashboard/RequirementsSummary');

jest.mock('@/services/axios/Dashboard/RequirementsSummary');

beforeEach(() => {
  jest.clearAllMocks();
});

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
