//  import required stuff from vue/test-utils
import { shallowMount, createLocalVue } from '@vue/test-utils';

// import router, vuex & other dependencies
import Vuex from 'vuex';

// import axios & axios mock
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// import component to mock
import commentField from '@/components/Forms/AddRequirementComments.vue';

// import flushPromises from 'flush-promises';

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
    // setting dummy route for component created method
    const $route = {
      params: {
        id: '1',
      },
    };

    mock.onGet('/Requirement/1').reply(200, {
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
    });

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

    mock.onGet('/Requirement/1').reply(200, {
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
    });

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

  it('disable change status button for HR', async () => {
    // setting dummy route for component created method
    const $route = {
      params: {
        id: '1',
      },
    };

    mock.onGet('/Requirement/1').reply(200, {
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
    });

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

    await wrapper.setData({ status: 1, currentStatus: 1 });

    // Don't show change status btn to non HR users
    const isHRCheck = wrapper.find('[data-testid="isHRCheck"]');
    expect(isHRCheck.exists()).toBe(true);

    // hide submit button initially
    const commentSubmitBtn = wrapper.find('[data-testid="commentSubmitBtn"]');
    const commentSubmitBtnStatus = !!commentSubmitBtn.attributes().disabled;
    expect(commentSubmitBtn.exists()).toBe(true);
    expect(commentSubmitBtnStatus).toBe(true);
  });

  // it('disable change status button for HR', async () => {
  //   // setting dummy route for component created method
  //   const $route = {
  //     params: {
  //       id: '1',
  //     },
  //   };

  //   mock.onGet('/Requirement/1').reply(200, {
  //     status: 'success',
  //     message: 'Requirement data successfully retrieved',
  //     data: {
  //       requirement_id: 1,
  //       emp_id: 2,
  //       status: 1,
  //       timeline: 2,
  //       additional_note: null,
  //       skill_set: '[8,6]',
  //       experience: 2,
  //       number_of_position: 3,
  //       updated_on: '27-07-2021 by Aditya Jain',
  //       created_on: '22-06-2021 by Aditya Jain',
  //       client_id: 2,
  //     },
  //   });

  //   const wrapper = shallowMount(commentField, {
  //     localVue,
  //     store,
  //     computed: {
  //       isHR() {
  //         return true;
  //       },
  //     },
  //     mocks: {
  //       $route,
  //     },
  //     propsData: {
  //       type: undefined,
  //     },
  //   });

  //   wrapper.setData({ status: 2, currentStatus: 1 });
  //   // Don't show change status btn to non HR users
  //   const isHRCheck = wrapper.find('[data-testid="isHRCheck"]');
  //   expect(isHRCheck.exists()).toBe(true);

  //   // hide submit button initially
  //   const commentSubmitBtn = wrapper.find('[data-testid="commentSubmitBtn"]');
  //   const commentSubmitBtnStatus = commentSubmitBtn.attributes().disabled;
  //   expect(commentSubmitBtn.exists()).toBe(true);
  //   expect(commentSubmitBtnStatus).toBe('false');
  // });

  it('submit comment', () => {
    // setting dummy route for component created method
    const $route = {
      params: {
        id: '1',
      },
    };

    mock.onGet('/Requirement/1').reply(200, {
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
    });

    mock.onPost('/comment/').reply(200, {
      status: 'success',
      message: 'Comment created successfully',
      data: {
        comment_id: 3,
        emp_id: 2,
        created_on: '03-08-2021 by Aditya Jain',
        updated_on: '03-08-2021 by Aditya Jain',
        comment_by: 'Aditya Jain',
        requirement_id: '12',
        comment: 'ssssssssssssssssssssssssssssssssssssssssssss',
      },
    });

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
});
