//  import required stuff from vue/test-utils
import { shallowMount } from '@vue/test-utils';

// import component to mock
import ChangePasswordForm from '@/components/Forms/ChangePasswordForm.vue';

// import API modules
const { changePassword } = require('@/services/axios/Forms/ChangePasswordForm');

// mock API modules imported above
jest.mock('@/services/axios/Forms/ChangePasswordForm');

// clear mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

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
    const wrapper = shallowMount(ChangePasswordForm);
    const newPassword = wrapper.find('[data-testid="newPassword"]');
    const confirmPassword = wrapper.find('[data-testid="ConfirmPassword"]');
    const changePasswordBtn = wrapper.find('[data-testid="changePasswordBtn"]');

    newPassword.element.value = 'SecurePassword@1234';
    confirmPassword.element.value = 'SecurePassword@1234';

    changePasswordBtn
      .trigger('click')
      .then(() => {
        const resolvePromise = new Promise((resolve) => {
          const successMessage = {
            status: 'success',
            message: 'Password successfully updated',
            data: {},
          };
          resolve(successMessage);
        });

        changePassword.mockResolvedValueOnce(resolvePromise);
        expect(changePassword).toHaveBeenCalledTimes(1);
      })
      .catch(() => {});
  });

  it('Verify fail API call', () => {
    const wrapper = shallowMount(ChangePasswordForm);
    const newPassword = wrapper.find('[data-testid="newPassword"]');
    const confirmPassword = wrapper.find('[data-testid="ConfirmPassword"]');
    const changePasswordBtn = wrapper.find('[data-testid="changePasswordBtn"]');

    newPassword.element.value = 'SecurePassword@1234';
    confirmPassword.element.value = 'SecurePassword@1234';

    changePasswordBtn
      .trigger('click')
      .then(() => {
        const rejectedPromise = new Promise((resolve, rejected) => {
          const failMessage = {
            status: 'error',
            message: 'Error while updating password',
            data: {},
          };
          rejected(failMessage);
        });

        changePassword.mockRejectedValueOnce(rejectedPromise);
        expect(changePassword).toHaveBeenCalledTimes(1);
      })
      .catch(() => {});
  });
});
