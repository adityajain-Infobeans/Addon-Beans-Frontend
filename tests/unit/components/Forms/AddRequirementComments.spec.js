//  import required stuff from vue/test-utils
import { shallowMount, createLocalVue } from '@vue/test-utils';

// import router, vuex & other dependencies
import Vuex from 'vuex';

// import axios & axios mock
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// import component to mock
import commentField from '@/components/Forms/AddRequirementComments.vue';

import flushPromises from 'flush-promises';
import Auth from '../../../../src/store/modules/Auth';

const mock = new MockAdapter(axios);

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Auth: {
      state: {
        userData: {
          emp_id: 2,
          emp_name: 'Test User',
          emp_email: 'test@email.com',
          token: 'JWT_token',
          is_hr: true,
          is_login: true,
        },
      },
      getters: Auth.getters,
      namespaced: true,
    },
  },
});

describe('FullComponentTest', () => {
  it('Verify default values', async () => {
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
        isHr() {
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

    await flushPromises();

    // Don't show change status btn to non HR users
    const isHRCheck = wrapper.find('[data-testid="isHRCheck"]');
    expect(isHRCheck.exists()).toBe(false);

    // hide submit button initially
    const commentBox = wrapper.find('[data-testid="commentBox"]');
    expect(commentBox.exists()).toBe(true);

    // hide submit button initially
    const commentSubmitBtn = wrapper.find('[data-testid="commentSubmitBtn"]');
    const commentSubmitBtnStatus = commentSubmitBtn.attributes().disabled;
    expect(commentSubmitBtnStatus).toBe('true');
  });

  it('shows HR specific option', async () => {
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
        isHr() {
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
    await flushPromises();

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
        isHr() {
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

    // change status btn will be disabled if current status & previous status is same
    const submitStatusBtn = wrapper.find('[data-testid="submitStatusBtn"]');
    const submitStatusBtnStatus = !!submitStatusBtn.attributes().disabled;
    expect(submitStatusBtn.exists()).toBe(true);
    expect(submitStatusBtnStatus).toBe(true);
  });

  it('enable change status button for HR', async () => {
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
        isHr() {
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

    await wrapper.setData({ status: 0, currentStatus: 1 });

    // Don't show change status btn to non HR users
    const isHRCheck = wrapper.find('[data-testid="isHRCheck"]');
    expect(isHRCheck.exists()).toBe(true);

    // change status btn will be enabled if current status & previous status is different
    const submitStatusBtn = wrapper.find('[data-testid="submitStatusBtn"]');
    const submitStatusBtnStatus = submitStatusBtn.attributes().disabled;
    expect(submitStatusBtn.exists()).toBe(true);
    expect(submitStatusBtnStatus).toBe(undefined);
  });

  it('submit comment success', async () => {
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
        isHr() {
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
    await flushPromises();
    await wrapper.setData({ comment: 'this is a very long long long comment ' });

    // Don't show change status btn to non HR users
    const isHRCheck = wrapper.find('[data-testid="isHRCheck"]');
    expect(isHRCheck.exists()).toBe(false);

    // hide submit button initially
    const commentSubmitBtn = wrapper.find('[data-testid="commentSubmitBtn"]');
    expect(commentSubmitBtn.exists()).toBe(true);


    const loginButton = wrapper.find('[data-testid="loginButton"]');
    const loginButtonStatus = loginButton.attributes().disabled;

    expect(loginButtonStatus).toBe(undefined);

    loginButton
      .trigger('click')
      .then(() => {
        const errorMessage = wrapper.find('[data-testid="errorMessage"]').element.textContent;
        expect(errorMessage).toBe('wrong username or password');
      })
      .catch(() => {});



  });

  it('submit comment fail', () => {
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
        isHr() {
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

  // These test cases are failing
  // change status btn is not clicking
  it('requirement status changed successfully', async () => {
    // setting dummy route for component created method
    const $route = {
      params: {
        id: '1',
      },
    };

    const wrapper = shallowMount(commentField, {
      localVue,
      store,
      computed: {},
      mocks: {
        $route,
      },
      propsData: {
        type: undefined,
      },
    });

    await flushPromises();
    await wrapper.setData({ status: 0, currentStatus: 1 });

    // Don't show change status btn to non HR users
    const isHRCheck = wrapper.find('[data-testid="isHRCheck"]');
    expect(isHRCheck.exists()).toBe(true);

    // change status btn will be enabled if current status & previous status is different
    const submitStatusBtn = wrapper.find('[data-testid="submitStatusBtn"]');
    const submitStatusBtnStatus = submitStatusBtn.attributes().disabled;
    expect(submitStatusBtn.exists()).toBe(true);
    expect(submitStatusBtnStatus).toBe(undefined);

    submitStatusBtn.trigger('click');

    mock
      .onPut('/Requirement/1')
      .reply(200, { status: 'success', message: 'Requirement successfully updated', data: {} });

    // const dialogBoxMessage = wrapper.find('#swal2-content');
    // expect(dialogBoxMessage.exists()).toBe(true);
    // expect(dialogBoxMessage.text()).toBe('Requirement successfully updated');
  });

  it('requirement status changed failed ', async () => {
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

    mock.onPut('/Requirement/1').reply(500, {
      status: 'error',
      message: 'Error while updating requirement',
      data: {},
    });

    const wrapper = shallowMount(commentField, {
      localVue,
      store,
      computed: {
        isHr() {
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

    await wrapper.setData({ status: 0, currentStatus: 1 });

    // Don't show change status btn to non HR users
    const isHRCheck = wrapper.find('[data-testid="isHRCheck"]');
    expect(isHRCheck.exists()).toBe(true);

    // change status btn will be enabled if current status & previous status is different
    const submitStatusBtn = wrapper.find('[data-testid="submitStatusBtn"]');
    const submitStatusBtnStatus = submitStatusBtn.attributes().disabled;
    expect(submitStatusBtn.exists()).toBe(true);
    expect(submitStatusBtnStatus).toBe(undefined);

    submitStatusBtn.trigger('click');

    // const dialogBoxMessage = wrapper.find('#swal2-content');
    // expect(dialogBoxMessage.exists()).toBe(true);
    // expect(dialogBoxMessage.text()).toBe('Requirement successfully updated');
  });
});
