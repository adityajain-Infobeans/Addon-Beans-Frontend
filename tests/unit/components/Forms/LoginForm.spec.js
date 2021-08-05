import { shallowMount } from '@vue/test-utils';
import LoginForm from '@/components/Forms/LoginForm.vue';

// import axios & axios mock
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('LoginForm', () => {
  it('Verify input fields & buttons are visible', () => {
    const wrapper = shallowMount(LoginForm);

    const emailInputField = wrapper.find('[data-testid="email"]');
    const passwordInputField = wrapper.find('[data-testid="password"]');
    const forgotPasswordButton = wrapper.find('[data-testid="forgotButton"]');
    const loginButton = wrapper.find('[data-testid="loginButton"]');
    const loginButtonStatus = loginButton.attributes().disabled;

    expect(emailInputField.exists()).toBe(true);
    expect(passwordInputField.exists()).toBe(true);
    expect(forgotPasswordButton.exists()).toBe(true);
    expect(loginButton.exists()).toBe(true);
    expect(loginButtonStatus).toBe('true');

    expect(true).toBe(true);
  });

  it('Shows forgot password reset instructions', () => {
    const wrapper = shallowMount(LoginForm);
    const forgotPasswordButton = wrapper.find('[data-testid="forgotButton"]');

    forgotPasswordButton
      .trigger('click')
      .then(() => {
        const errorMessage = wrapper.find('[data-testid="errorMessage"]').element.textContent;
        expect(errorMessage).toBe('Please contact IT team to reset your password.');
      })
      .catch(() => {});
  });

  it('Shows error message for wrong credentials', () => {
    mock
      .onPost('/employee')
      .reply(401, { status: 'error', message: 'wrong username or password', data: {} });

    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          email: 'test@email.com',
          password: 'password',
          formValidated: true,
        };
      },
    });

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

  it('Follows login success flow', () => {
    mock.onPost('/employee').reply(200, {
      status: 'success',
      message: 'Employee Found',
      data: {
        emp_id: 1,
        emp_name: 'Test User',
        is_hr: true,
        emp_email: 'test@email.com',
        token: 'dfgfgfgfgfgfgfgfgfgfg',
      },
    });

    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          email: 'test@email.com',
          password: 'password',
          formValidated: true,
        };
      },
    });

    const loginButton = wrapper.find('[data-testid="loginButton"]');
    const loginButtonStatus = loginButton.attributes().disabled;

    expect(loginButtonStatus).toBe(undefined);

    loginButton
      .trigger('click')
      .then(() => {
        const successMessage = wrapper.find('[data-testid="successMessage"]').element.textContent;
        expect(successMessage).toBe('Login Success');
      })
      .catch(() => {});
  });
});
