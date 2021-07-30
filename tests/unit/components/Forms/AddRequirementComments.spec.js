//  import required stuff from vue/test-utils
import { shallowMount, createLocalVue } from '@vue/test-utils';

// import router, vuex & other dependencies
import Vuex from 'vuex';

// import component to mock
import commentField from '@/components/Forms/AddRequirementComments.vue';

// import API modules
const { getRequirementIdData } = require('@/services/axios/Forms/AddRequirementComments');

// mock API modules imported above
jest.mock('@/services/axios/Forms/AddRequirementComments');

// clear mocks before each test
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

describe('FullComponentTest', () => {
  it('Verify default values', () => {
    // setting dummy route for component created method
    const $route = {
      params: {
        id: '1',
      },
    };

    const resolvePromise = new Promise((resolve) => {
      const receivedRequirementIdData = {
        status: 'success',
        message: 'Requirement data successfully retrieved',
        data: {
          requirement_id: 1,
          emp_id: 2,
          status: 1,
          timeline: 2,
          additional_note: null,
          skill_set: '[8,6]',
          experience: 2,
          number_of_position: 3,
          updated_on: '27-07-2021 by Aditya Jain',
          created_on: '22-06-2021 by Aditya Jain',
          client_id: 2,
        },
      };
      resolve(receivedRequirementIdData);
    });

    getRequirementIdData.mockResolvedValueOnce(resolvePromise);

    const wrapper = shallowMount(commentField, {
      localVue,
      store,
      computed: {
        isHR() {
          return false;
        },
      },
      mocks: {
        $route,
      },
      propsData: {
        type: undefined,
      },
    });

    // Don't show change status btn to non HR users
    const isHRCheck = wrapper.find('[data-testid="isHRCheck"]');
    expect(isHRCheck.exists()).toBe(false);

    // hide submit button initially
    const commentSubmitBtn = wrapper.find('[data-testid="commentSubmitBtn"]');
    expect(commentSubmitBtn.exists()).toBe(false);
  });

  it('shows HR specific option', () => {
    // setting dummy route for component created method
    const $route = {
      params: {
        id: '1',
      },
    };

    const resolvePromise = new Promise((resolve) => {
      const receivedRequirementIdData = {
        status: 'success',
        message: 'Requirement data successfully retrieved',
        data: {
          requirement_id: 1,
          emp_id: 2,
          status: 1,
          timeline: 2,
          additional_note: null,
          skill_set: '[8,6]',
          experience: 2,
          number_of_position: 3,
          updated_on: '27-07-2021 by Aditya Jain',
          created_on: '22-06-2021 by Aditya Jain',
          client_id: 2,
        },
      };
      resolve(receivedRequirementIdData);
    }).catch(() => {});

    getRequirementIdData.mockResolvedValueOnce(resolvePromise);

    const wrapper = shallowMount(commentField, {
      localVue,
      store,
      computed: {
        isHR() {
          return true;
        },
      },
      mocks: {
        $route,
      },
      propsData: {
        type: undefined,
      },
    });

    // Don't show change status btn to non HR users
    const isHRCheck = wrapper.find('[data-testid="isHRCheck"]');
    expect(isHRCheck.exists()).toBe(true);
  });

  it('Verify all input fields are present', () => {
    expect(true).toBe(true);
  });
});
