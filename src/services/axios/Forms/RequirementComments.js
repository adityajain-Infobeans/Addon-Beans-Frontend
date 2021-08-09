/* eslint-disable import/prefer-default-export */
const axios = require('axios');

export function getComment(RequirementId) {
  return axios.get(`/comment/T_${RequirementId}`);
}
