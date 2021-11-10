/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export function loginEmployee(credentials) {
  return axios.post('/employee', credentials);
}
