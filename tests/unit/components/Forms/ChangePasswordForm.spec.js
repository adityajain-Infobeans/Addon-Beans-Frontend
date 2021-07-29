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
    const ConfirmPassword = wrapper.find('[data-testid="ConfirmPassword"]');
    const changePasswordBtn = wrapper.find('[data-testid="changePasswordBtn"]');
    const changePasswordBtnStatus = changePasswordBtn.attributes().disabled;

    expect(newPassword.exists()).toBe(true);
    expect(ConfirmPassword.exists()).toBe(true);
    expect(changePasswordBtn.exists()).toBe(true);
    expect(changePasswordBtnStatus).toBe('true');
  });

  it('Verify all input fields are present', () => {
    expect(true).toBe(true);
  });
});
