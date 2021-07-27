/* eslint-disable import/prefer-default-export */
const axios = require('axios');

export function loginEmployee(email, password) {
  return axios
    .post('/employee', {
      email,
      password,
    })
    .then((response) => response)
    .catch((error) => error);
}
