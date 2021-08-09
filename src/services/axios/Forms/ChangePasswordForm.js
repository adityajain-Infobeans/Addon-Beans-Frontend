/* eslint-disable import/prefer-default-export */
const axios = require('axios');

export function changePassword(newPassword) {
  return axios.put('/employee', newPassword);
}
