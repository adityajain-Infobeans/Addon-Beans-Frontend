/* eslint-disable import/prefer-default-export */
const axios = require('axios');

export function getSummaryData() {
  return axios.get('/summary');
}
