import axios from 'axios';
import store from '../../store';

const { getSummaryData } = require('@/services/axios/Dashboard/RequirementsSummary');
const {
  postComment,
  getRequirementIdData,
  updateStatus,
} = require('@/services/axios/Forms/AddRequirementComments');
const { changePassword } = require('@/services/axios/Forms/ChangePasswordForm');
const { loginEmployee } = require('@/services/axios/Forms/LoginForm');
const { getComment } = require('@/services/axios/Forms/RequirementComments');
const { postRequirement, updateRequirement } = require('@/services/axios/Forms/RequirementForm');
const {
  getRequirementData,
  getSkillsetData,
  getClientsData,
  getEmployeesData,
  deleteRequirementData,
} = require('@/services/axios/Table/RequirementsTable');

axios.interceptors.request.use(
  (config) => {
    const token = store.getters['Auth/token'];
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// eslint-disable-next-line import/prefer-default-export
export const ApiEndpoint = {
  getSummaryData,
  postComment,
  getRequirementIdData,
  updateStatus,
  changePassword,
  loginEmployee,
  getComment,
  postRequirement,
  updateRequirement,
  getRequirementData,
  getSkillsetData,
  getClientsData,
  getEmployeesData,
  deleteRequirementData,
};
