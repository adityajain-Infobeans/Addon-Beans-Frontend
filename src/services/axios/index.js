import axios from 'axios';
import store from '../../store';

import { getSummaryData } from '@/services/axios/Dashboard/RequirementsSummary';
import {
  postComment,
  getRequirementIdData,
  updateStatus,
} from '@/services/axios/Forms/AddRequirementComments';
import { changePassword } from '@/services/axios/Forms/ChangePasswordForm';
import { loginEmployee } from '@/services/axios/Forms/LoginForm';
import { getComment } from '@/services/axios/Forms/RequirementComments';
import { postRequirement, updateRequirement } from '@/services/axios/Forms/RequirementForm';
import {
  getRequirementData,
  getSkillsetData,
  getClientsData,
  getEmployeesData,
  deleteRequirementData,
} from '@/services/axios/Table/RequirementsTable';

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
