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

describe('FullComponentTest', () => {
  it('Verify default values', () => {
    const allCommentData = {
      data: {
        status: 'success',
        message: 'All comments successfully retrieved',
        data: [
          {
            comment_id: 2,
            requirement_id: 1,
            emp_id: 2,
            comment_by: 'Aditya Jain',
            comment: 'test comment\nffffffffffffffffffffffffffffff',
            created_on: '27-07-2021 by Aditya Jain',
            updated_on: '27-07-2021 by Aditya Jain',
          },
          {
            comment_id: 1,
            requirement_id: 1,
            emp_id: 1,
            comment_by: 'Shivraj Singh Rawat',
            comment: 'djgggggggggggggggggggggggggggggggggggggggggggggggggggg',
            created_on: '29-06-2021 by Shivraj Singh Rawat',
            updated_on: '29-06-2021 by Shivraj Singh Rawat',
          },
        ],
      },
    };

    const $route = {
      params: {
        id: '1',
      },
    };

    const resolvePromise = new Promise((resolve) => {
      resolve(allCommentData);
    });

    getComment.mockResolvedValueOnce(resolvePromise);

    const wrapper = shallowMount(RequirementComments, {
      localVue,
      store,
      computed: {
        commentsData() {
          return [];
        },
      },
      mocks: {
        $route,
      },
    });

    const commentsContainer = wrapper.find('[data-testid="commentsContainer"]');
    expect(commentsContainer.exists()).toBe(false);
  });

  it('API call success, verify data is reflected on DOM', async () => {
    const allCommentData = {
      data: {
        status: 'success',
        message: 'All comments successfully retrieved',
        data: [
          {
            comment_id: 2,
            requirement_id: 1,
            emp_id: 2,
            comment_by: 'Aditya Jain',
            comment: 'test comment\nffffffffffffffffffffffffffffff',
            created_on: '27-07-2021 by Aditya Jain',
            updated_on: '27-07-2021 by Aditya Jain',
          },
          {
            comment_id: 1,
            requirement_id: 1,
            emp_id: 1,
            comment_by: 'Shivraj Singh Rawat',
            comment: 'djgggggggggggggggggggggggggggggggggggggggggggggggggggg',
            created_on: '29-06-2021 by Shivraj Singh Rawat',
            updated_on: '29-06-2021 by Shivraj Singh Rawat',
          },
        ],
      },
    };

    const $route = {
      params: {
        id: '1',
      },
    };

    const resolvePromise = new Promise((resolve) => {
      resolve(allCommentData);
    });

    getComment.mockResolvedValueOnce(resolvePromise);

    const wrapper = shallowMount(RequirementComments, {
      localVue,
      store,
      computed: {
        commentsData() {
          return allCommentData.data.data;
        },
      },
      mocks: {
        $route,
      },
    });
    await flushPromises();

    const commentsContainer = wrapper.find('[data-testid="commentsContainer"]');
    expect(commentsContainer.exists()).toBe(true);

    const commentsDataBox = wrapper.findAll('[data-testid="commentsDataBox"]').length;
    expect(commentsDataBox).toEqual(2);
  });

  // it('API call fail, verify data is reflected on DOM', async () => {
  //   const allCommentData = {
  //     data: { status: 'error', message: 'error occurred while connecting with database', data: {} },
  //
  //   };

  //   const $route = {
  //     params: {
  //       id: '1',
  //     },
  //   };

  //   const rejectedData = {
  //     response: {
  //       data: {
  //         status: 'error',
  //         message: 'error occurred while connecting with database',
  //         data: {},
  //       },
  //     },
  //   };

  //   const rejectPromise = new Promise((resolve, reject) => {
  //     reject(rejectedData);
  //   });

  //   getComment.mockRejectedValueOnce(rejectPromise);

  //   const wrapper = shallowMount(RequirementComments, {
  //     localVue,
  //     store,
  //     computed: {
  //       commentsData() {
  //         return allCommentData.data.data;
  //       },
  //     },
  //     mocks: {
  //       $route,
  //     },
  //   });
  //   await flushPromises();

  //   const commentsDataBox = wrapper.findAll('[data-testid="commentsDataBox"]').length;
  //   expect(commentsDataBox).toEqual(0);
  // });
});
