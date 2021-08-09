/* eslint-disable import/prefer-default-export */
const axios = require('axios');

export function loginEmployee(credentials) {
  return axios.post('/employee', credentials);
}
