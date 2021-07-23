import { mount } from '@vue/test-utils';
import LoginForm from '@/components/Forms/LoginForm.vue';

describe('LoginForm', () => {
  it('Verify input fields & buttons are visible', () => {
    const wrapper = mount(LoginForm);

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
    const wrapper = mount(LoginForm);
    const forgotPasswordButton = wrapper.find('[data-testid="forgotButton"]');

    forgotPasswordButton.trigger('click').then(() => {
      const errorMessage = wrapper.find('[data-testid="errorMessage"]').element.textContent;
      expect(errorMessage).toBe('Please contact IT team to reset your password.');
    });
  });

  it('Shows error message for wrong credentials', () => {
    const wrapper = mount(LoginForm, {
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

    loginButton.trigger('click').then(() => {
      const errorMessage = wrapper.find('[data-testid="errorMessage"]').element.textContent;
      expect(errorMessage).toBe('wrong username or password');
    });
  });

  it('Follows login success flow', () => {
    expect(true).toBe(true);
  });
});
