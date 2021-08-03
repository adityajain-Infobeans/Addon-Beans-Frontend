//  import required stuff from vue/test-utils
import { shallowMount, createLocalVue } from '@vue/test-utils';

// import router, vuex & other dependencies
import Vuex from 'vuex';

// import component to mock
import RequirementComments from '@/components/Forms/RequirementComments.vue';

import flushPromises from 'flush-promises';

const { getComment } = require('@/services/axios/Forms/RequirementComments');

jest.mock('@/services/axios/Forms/RequirementComments');

beforeEach(() => {
  jest.clearAllMocks();
});

const localVue = createLocalVue();
localVue.use(Vuex);

const actions = {
  setComment: jest.fn(),
};

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
  actions,
});

describe('FullComponentTest', () => {});
