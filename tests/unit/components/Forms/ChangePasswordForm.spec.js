//  import required stuff from vue/test-utils
import { shallowMount } from '@vue/test-utils';

// import axios & axios mock
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// import component to mock
import ChangePasswordForm from '@/components/Forms/ChangePasswordForm.vue';

const mock = new MockAdapter(axios);

describe('FullComponentTest', () => {
  it('Verify default values', () => {
    const wrapper = shallowMount(ChangePasswordForm);

    const newPassword = wrapper.find('[data-testid="newPassword"]');
    const confirmPassword = wrapper.find('[data-testid="ConfirmPassword"]');
    const changePasswordBtn = wrapper.find('[data-testid="changePasswordBtn"]');
    const changePasswordBtnStatus = changePasswordBtn.attributes().disabled;
    const missMatchAlert = wrapper.find('#swal2-title');

    expect(newPassword.exists()).toBe(true);
    expect(confirmPassword.exists()).toBe(true);
    expect(changePasswordBtn.exists()).toBe(true);
    expect(changePasswordBtnStatus).toBe('true');
    expect(missMatchAlert.exists()).toBe(false);
  });

  it('Verify Password Mismatch verification', () => {
    const wrapper = shallowMount(ChangePasswordForm);
    const newPassword = wrapper.find('[data-testid="newPassword"]');
    const confirmPassword = wrapper.find('[data-testid="ConfirmPassword"]');
    const changePasswordBtn = wrapper.find('[data-testid="changePasswordBtn"]');

    newPassword.element.value = 'value';
    confirmPassword.element.value = 'value1';

    changePasswordBtn
      .trigger('click')
      .then(() => {
        const missMatchAlert = wrapper.find('#swal2-title');
        expect(missMatchAlert.exists()).toBe(true);
      })
      .catch(() => {});
  });

  it('Verify Weak Password verification', () => {
    const wrapper = shallowMount(ChangePasswordForm);
    const newPassword = wrapper.find('[data-testid="newPassword"]');
    const confirmPassword = wrapper.find('[data-testid="ConfirmPassword"]');
    const changePasswordBtn = wrapper.find('[data-testid="changePasswordBtn"]');

    newPassword.element.value = 'password123';
    confirmPassword.element.value = 'password123';

    changePasswordBtn
      .trigger('click')
      .then(() => {
        const weakPasswordAlert = wrapper.find('#swal2-title');
        expect(weakPasswordAlert.exists()).toBe(true);
      })
      .catch(() => {});
  });

  it('Verify successful API call', () => {
    mock
      .onPut('/employee')
      .reply(200, { status: 'success', message: 'Password successfully updated', data: {} });

    const wrapper = shallowMount(ChangePasswordForm);
    const newPassword = wrapper.find('[data-testid="newPassword"]');
    const confirmPassword = wrapper.find('[data-testid="ConfirmPassword"]');
    const changePasswordBtn = wrapper.find('[data-testid="changePasswordBtn"]');

    newPassword.element.value = 'SecurePassword@1234';
    confirmPassword.element.value = 'SecurePassword@1234';

    changePasswordBtn
      .trigger('click')
      .then(() => {
        const missMatchAlert = wrapper.find('#swal2-title');
        expect(missMatchAlert.exists()).toBe(true);

        const alertContent = wrapper.find('#swal2-content');
        expect(alertContent.text()).toBe('Password successfully updated');
      })
      .catch((error) => {
        console.log(error);
      });
  });

  it('Verify fail API call', () => {
    mock.onPut('/employee').reply(503, {
      data: { status: 'error', message: 'error occurred while connecting with database', data: {} },
    });

    const wrapper = shallowMount(ChangePasswordForm);
    const newPassword = wrapper.find('[data-testid="newPassword"]');
    const confirmPassword = wrapper.find('[data-testid="ConfirmPassword"]');
    const changePasswordBtn = wrapper.find('[data-testid="changePasswordBtn"]');

    newPassword.element.value = 'SecurePassword@1234';
    confirmPassword.element.value = 'SecurePassword@1234';

    changePasswordBtn
      .trigger('click')
      .then(() => {
        const missMatchAlert = wrapper.find('#swal2-title');
        expect(missMatchAlert.exists()).toBe(true);

        const alertContent = wrapper.find('#swal2-content');
        expect(alertContent.text()).toBe('error occurred while connecting with database');
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
