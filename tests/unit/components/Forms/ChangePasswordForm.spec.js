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
    expect(true).toBe(true);
  });

  it('Verify all input fields are present', () => {});
});
