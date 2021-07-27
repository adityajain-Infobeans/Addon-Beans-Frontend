/* eslint-disable import/prefer-default-export */
const axios = require('axios');

export function getSummaryData(token) {
  return axios
    .get('/summary', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);
}
